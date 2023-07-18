import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Client, Provider , fetchExchange, cacheExchange} from 'urql'


const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    fetchExchange,
    cacheExchange

  ],
  
  fetchOptions:{
    credentials:  "include",
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

