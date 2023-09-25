import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { MyPostsQuery, Post } from "../generated/output/graphql";

interface ProfileLeftSideProps {
  allPosts: MyPostsQuery;
}

export const ProfileLeftSide: React.FC<ProfileLeftSideProps> = ({
  allPosts,
}) => {
  return (
    <Box m={4}>
      <Flex flexDirection={"column"} gap={2}>
        <Flex justifyContent={"center"} gap={4}>
          <Button>Posts</Button>
          <Button>Comments</Button>
          <Button>Saved</Button>
          <Button>Hidden</Button>
          <Button>Up-Voted</Button>
          <Button>Down-Voted</Button>
        </Flex>
        <hr />
      </Flex>
    </Box>
  );
};
