import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
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
const Index = () => {
  const [{ data, fetching }] = useQuery({
    query: PostsDocument,
    variables: {
      limit: 100,
    },
  });

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
          <Button m={"auto"} mt={8}>
            load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
