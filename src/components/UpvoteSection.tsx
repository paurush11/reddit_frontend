import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { useMutation } from "urql";
import { VoteDocument } from "../generated/output/graphql";
import { UpvoteSectionProps } from "../interfaces/allProps";

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
