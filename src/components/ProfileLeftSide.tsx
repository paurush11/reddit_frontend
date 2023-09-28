import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProfileLeftSideProps, postDataType } from "../interfaces/allProps";
import { Posts } from "./Posts";
import { useQuery } from "urql";
import {
  GetCommentsQuery,
  GetSavedPostsDocument,
  GetSavedPostsQuery,
  MeDocument,
  MyPostsDocument,
  MyPostsQuery,
  MyVotedPostsDocument,
  MyVotedPostsQuery,
  PostsDocument,
  PostsQuery,
} from "../generated/output/graphql";

export const ProfileLeftSide: React.FC<ProfileLeftSideProps> = ({}) => {
  const [{ data: meData }] = useQuery({
    query: MeDocument,
  });
  const [variables, setVariables] = useState({
    limit: 40,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });
  const [prevButtonIdx, setPrevButtonIdx] = useState<number>(0);
  const [buttonIdx, setButtonIdx] = useState<number>(0);
  const [allPostData, setAllPostData] = useState<
    PostsQuery["posts"]["Posts"] | null
  >(data.posts.Posts);


console.log(data)
  useEffect(() => {
    if (buttonIdx === 0) {
      if (!fetching) {
        const myPostData: PostsQuery["posts"]["Posts"] =
          data?.posts.Posts.filter((p) => p.creatorId === meData.Me._id);
        setAllPostData(myPostData);
      }
    } else if (buttonIdx === 1) {
      ///saved
      if (!fetching) {
        const myPostData: PostsQuery["posts"]["Posts"] =
          data?.posts.Posts.filter(
            (p) => p.savedBy && p.savedBy.includes(meData.Me._id),
          );
        setAllPostData(myPostData);
      }
    } else if (buttonIdx === 2) {
      ///hidden
      if (!fetching) {
        const myPostData: PostsQuery["posts"]["Posts"] =
          data?.posts.Posts.filter(
            (p) => p.hiddenBy && p.hiddenBy.includes(meData.Me._id),
          );
        setAllPostData(myPostData);
      }
    } else if (buttonIdx === 3) {
      if (!fetching) {
        const myPostData: PostsQuery["posts"]["Posts"] =
          data?.posts.Posts.filter(
            (p) =>
              p.creatorId === meData.Me._id &&
              p.voteStatus &&
              p.voteStatus === 1,
          );
        setAllPostData(myPostData);
      }
    } else if (buttonIdx === 4) {
      if (!fetching) {
        const myPostData: PostsQuery["posts"]["Posts"] =
          data?.posts.Posts.filter(
            (p) =>
              p.creatorId === meData.Me._id &&
              p.voteStatus &&
              p.voteStatus === -1,
          );
        setAllPostData(myPostData);
      }
    } else if (buttonIdx === 5) {
    }
  }, [buttonIdx]);

  return (
    <Box m={4}>
      <Flex flexDirection={"column"} gap={2}>
        <Flex justifyContent={"center"} gap={4}>
          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(0);
            }}
          >
            Posts
          </Button>

          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(1);
            }}
          >
            Saved
          </Button>
          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(2);
            }}
          >
            Hidden
          </Button>
          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(3);
            }}
          >
            Up-Voted
          </Button>
          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(4);
            }}
          >
            Down-Voted
          </Button>
          <Button
            onClick={() => {
              setPrevButtonIdx(buttonIdx);
              setButtonIdx(5);
            }}
          >
            Comments
          </Button>
        </Flex>
        <hr />
      </Flex>

      <Posts meData={meData} dataType={"allPostData"} postData={allPostData} />
    </Box>
  );
};
