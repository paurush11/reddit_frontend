import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "urql";
import { PostDocument } from "../generated/output/graphql";

export const useGetPostFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string"
      ? parseInt(router.query.id as string)
      : -1;
  const [variables] = useState({
    identifier: intId,
  });

  const [{ data, error, fetching }] = useQuery({
    query: PostDocument,
    variables: variables,
  });

  if (error) console.log(error);
  if (data) console.log(intId);

  return [{ data, error, fetching }];
};
