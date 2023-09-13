import { fetchExchange, stringifyVariables } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
} from "../generated/output/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache, Resolver } from "@urql/exchange-graphcache";

import { filter, pipe, tap } from "wonka";
import { Exchange } from "urql";
import { useRouter } from "next/router";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          useRouter().replace("/login");
        }
      }),
    );
  };

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts",
    );
    // const isItInTheCache = cache.resolve(cache.resolve(entityKey, fieldName, fieldArgs) as string, "posts");
    info.partial = !isItInTheCache;
    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fieldInfo) => {
      const key = cache.resolveFieldByKey(
        entityKey,
        fieldInfo.fieldKey,
      ) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      if (data) results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};
export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            invalidateCache(cache);
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ Me: null }),
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include" as const,
    headers: {
      "x-forwarded-proto": "https", /// to set cookie in browser
    },
  },
});

const invalidateCache = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "getPosts");

  fieldInfos.map((fi) => {
    cache.invalidate("Query", "getPosts", fi.arguments);
  });
};
function sentryFireAndForgetHere() {
  throw new Error("Function not implemented.");
}
