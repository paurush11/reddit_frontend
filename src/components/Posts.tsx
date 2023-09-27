import { Box, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { UpvoteSection } from "./UpvoteSection";
import { EditDeleteButtons } from "./EditDeleteButtons";

import NextLink from "next/link";

import { BsFillBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { PostsProps } from "../interfaces/allProps";

export const Posts: React.FC<PostsProps> = ({ postData, meData }) => {
  return (
    <Stack spacing={8}>
      {postData?.posts.Posts.map((post) =>
        !post ? null : (
          <Flex key={post._id} p={5} shadow="md" borderWidth="4px">
            <UpvoteSection post={post} />
            <Box flex={1}>
              <NextLink href={"/posts/[id]"} as={`/posts/${post._id}`}>
                <Heading fontSize="xl">{post.title}</Heading>
              </NextLink>
              <Text> Posted By - {post.creator.username}</Text>
              <Text mt={4}>{post.text.slice(0, 200)}</Text>
            </Box>
            <Flex
              flexDirection={"column"}
              ml={"auto"}
              justifyContent={"space-between"}
            >
              <Box ml={"auto"}>
                <IconButton
                  aria-label={"Save Post"}
                  icon={<BsFillBookmarkFill />}
                />
                {meData?.Me?._id === post.creatorId && (
                  <EditDeleteButtons post={post}></EditDeleteButtons>
                )}
              </Box>
              <Box ml={"auto"}>
                <IconButton
                  aria-label={"Add comment"}
                  icon={<FaRegComment />}
                />
              </Box>
            </Flex>
          </Flex>
        ),
      )}
    </Stack>
  );
};
