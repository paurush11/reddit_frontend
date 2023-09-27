import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PostsQuery, VoteDocument } from "../generated/output/graphql";
import { useMutation } from "urql";

interface UpvoteSectionProps {
  post: PostsQuery["posts"]["Posts"][0];
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useMutation(VoteDocument);
  const iconColor = "red";
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mr={7}
    >
      <IconButton
        colorScheme={post.voteStatus === 1 ? iconColor : null}
        aria-label={"upvote"}
        onClick={() => {
          vote({
            value: 1,
            postId: post._id,
          });
        }}
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? iconColor : null}
        aria-label={"downvote"}
        onClick={() => {
          vote({
            value: -1,
            postId: post._id,
          });
        }}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
