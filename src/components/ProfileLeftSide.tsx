import { Box, Button, Flex, useQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  GetCommentsQuery,
  GetSavedPostsQuery,
  MeQuery,
  MyPostsDocument,
  MyPostsQuery,
  MyVotedPostsQuery,
  Post,
  PostsQuery,
} from "../generated/output/graphql";
import { ProfileLeftSideProps } from "../interfaces/allProps";

export const ProfileLeftSide: React.FC<ProfileLeftSideProps> = ({
  allPosts,
}) => {
  const [variables, setVariables] = useState({
    limit: 40,
    cursor: null as null | string,
  });

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
