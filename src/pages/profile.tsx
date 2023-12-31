import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { MeDocument, MyPostsDocument } from "../generated/output/graphql";
import { useQuery } from "urql";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { ProfileLeftSide } from "../components/ProfileLeftSide";
import { ProfileRightSide } from "../components/ProfileRightSide";

interface profileProps {}

const profile: React.FC<profileProps> = ({}) => {
  const [{ data: meData, fetching }] = useQuery({
    query: MeDocument,
  });
  const [variables, setVariables] = useState({
    limit: 40,
    cursor: null as null | string,
  });
  const [{ data: allPostsData }] = useQuery({
    query: MyPostsDocument,
    variables: variables,
  });
  const date = new Date(Date.parse(meData?.Me?.createdAt)).toDateString();

  return fetching ? (
    <Layout variant="small">..loading</Layout>
  ) : (
    <Layout>
      <Grid templateColumns="7fr 4fr" gap={4} minH="80vh">
        <Box borderRight="1px solid grey" overflowY="auto">
          <ProfileLeftSide allPosts={allPostsData} />
        </Box>
        <ProfileRightSide meData={meData} />
      </Grid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(profile);
