import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { MeDocument, PostsDocument } from "../generated/output/graphql";
import { useQuery } from "urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Heading,
  Stack,
  Text,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

import { UpvoteSection } from "../components/UpvoteSection";
import { EditDeleteButtons } from "../components/EditDeleteButtons";

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
        <Stack spacing={8}>
          {data!.posts.Posts.map((post) =>
            !post ? null : (
              <Flex key={post._id} p={5} shadow="md" borderWidth="4px">
                <UpvoteSection post={post} />
                <Box flex={1}>
                  <NextLink href={"/posts/[id]"} as={`/posts/${post._id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text> Posted By - {post.creator.username}</Text>
                  <Text mt={4}>{post.text.slice(0, 200)}</Text>
                </Box>
                {meData?.Me?._id === post.creatorId && (
                  <Box ml={"auto"}>
                    {" "}
                    <EditDeleteButtons post={post}></EditDeleteButtons>
                  </Box>
                )}
              </Flex>
            ),
          )}
        </Stack>
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
