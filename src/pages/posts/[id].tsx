import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { PostDocument } from "../../generated/output/graphql";
import { Layout } from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  return fetching ? (
    <Layout>
      {" "}
      <div>loading...</div>
    </Layout>
  ) : (
    <Layout>
      <Heading>{data.post.title}</Heading>
      <div>{data?.post?.text}</div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
