import { Box, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { UpvoteSection } from "./UpvoteSection";
import { EditDeleteButtons } from "./EditDeleteButtons";

import NextLink from "next/link";

import { BsFillBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { PostsProps, postDataType } from "../interfaces/allProps";
import { useMutation } from "urql";
import { SavePostDocument } from "../generated/output/graphql";

export const Posts: React.FC<PostsProps> = ({ postData, meData, dataType }) => {
  const [, save] = useMutation(SavePostDocument);

  return (
    <Stack spacing={8}>
      {dataType === "allPostData"
        ? postData?.map((post) =>
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
                      onClick={() => {
                        save({ postId: post._id });
                      }}
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
          )
        : // : dataType === "myCommentsData"
          // ? myCommentData?.getComments.map((post) =>
          //     !post ? null : (
          //       <Flex key={post._id} p={5} shadow="md" borderWidth="4px">

          //         <Box flex={1}>
          //           <NextLink href={"/posts/[id]"} as={`/posts/${post._id}`}>
          //             <Heading fontSize="xl">{post.title}</Heading>
          //           </NextLink>
          //           <Text> Posted By - {post.creator.username}</Text>
          //           <Text mt={4}>{post.text.slice(0, 200)}</Text>
          //         </Box>
          //         <Flex
          //           flexDirection={"column"}
          //           ml={"auto"}
          //           justifyContent={"space-between"}
          //         >
          //           <Box ml={"auto"}>
          //             <IconButton
          //               aria-label={"Save Post"}
          //               icon={<BsFillBookmarkFill />}
          //             />

          //             <EditDeleteButtons post={post}></EditDeleteButtons>
          //           </Box>
          //           <Box ml={"auto"}>
          //             <IconButton
          //               aria-label={"Add comment"}
          //               icon={<FaRegComment />}
          //             />
          //           </Box>
          //         </Flex>
          //       </Flex>
          //     ),
          //   )
          null}
    </Stack>
  );
};
