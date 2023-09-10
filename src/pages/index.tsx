import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { PostsDocument } from "../generated/output/graphql";
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
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });

  console.log(variables);
  console.log(data);

  return (
    <Layout variant="regular">
      <Flex align={"center"}>
        <Heading>LiReddit</Heading>
        <NextLink href={"./create-post"}>
          <Link ml={"auto"}>Create Posts</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((post) => {
            return (
              <Box key={post._id} p={5} shadow="md" borderWidth="4px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.text.slice(0, 200)}</Text>
              </Box>
            );
          })}
        </Stack>
      )}

      {data ? (
        <Flex>
          <Button
            m={"auto"}
            mt={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
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
