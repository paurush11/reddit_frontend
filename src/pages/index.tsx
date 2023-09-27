import { Button, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { useQuery } from "urql";
import { Layout } from "../components/Layout";
import { MeDocument, PostsDocument } from "../generated/output/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

import { Posts } from "../components/Posts";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 40,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });
  const [{ data: meData }] = useQuery({
    query: MeDocument,
  });

  return (
    <Layout variant="regular">
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Posts postData={data} meData={meData} />
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            m={"auto"}
            mt={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.Posts[data.posts.Posts.length - 1].createdAt,
              });
            }}
          >
            load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
