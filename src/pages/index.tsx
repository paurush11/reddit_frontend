import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  DeletePostDocument,
  MeDocument,
  PostsDocument,
} from "../generated/output/graphql";
import { useMutation, useQuery } from "urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Heading,
  Stack,
  Text,
  Link,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });
  const [{ data: meData }] = useQuery({
    query: MeDocument,
  });
  const [, deletePost] = useMutation(DeletePostDocument);

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
                {meData.Me._id === post.creatorId && (
                  <Box ml={"auto"}>
                    <NextLink
                      href={"/posts/edit/[id]"}
                      as={`/posts/edit/${post._id}`}
                    >
                      <IconButton
                        as={Link}
                        mr={2}
                        aria-label={"edit"}
                        onClick={() => {}}
                        icon={<EditIcon />}
                      />
                    </NextLink>
                    <IconButton
                      colorScheme={"red"}
                      aria-label={"delete"}
                      onClick={() => {
                        deletePost({
                          id: post._id,
                        });
                      }}
                      icon={<DeleteIcon />}
                    />
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
