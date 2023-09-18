import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { PostDocument } from "../../generated/output/graphql";
import { Layout } from "../../components/Layout";

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string"
      ? parseInt(router.query.id as string)
      : -1;
  const [variables, setVariables] = useState({
    identifier: intId,
  });

  const [{ data, error, fetching }] = useQuery({
    query: PostDocument,
    variables: variables,
  });

  if(error)console.log(error)
if(data)console.log(intId)
  return (
    <Layout>
      { fetching ? <div>loading...</div> :  <div>{data?.post?.text}</div>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
