import { fetchExchange } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
} from "../generated/output/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";

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
export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
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
