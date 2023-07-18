import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Client, Provider, fetchExchange } from 'urql'
import { Cache, QueryInput, cacheExchange, } from '@urql/exchange-graphcache';
import { LogoutMutation, MeQuery, MeDocument } from '../generated/output/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const invalidateCache = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "getPosts"
  );

  fieldInfos.map((fi) => {
    cache.invalidate("Query", "getPosts", fi.arguments);
  });
}

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    fetchExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            invalidateCache(cache);
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ Me: null })
            );
          }
        }
      }
    })

  ],

  fetchOptions: {
    credentials: "include",
    headers: {
      'x-forwarded-proto': 'https', /// to set cookie in browser
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp

