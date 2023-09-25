import { Box, Flex, Grid, Img } from "@chakra-ui/react";
import React from "react";
import { MeQuery, MeQueryVariables } from "../generated/output/graphql";

interface ProfileRightSideProps {
  meData: MeQuery;
}

export const ProfileRightSide: React.FC<ProfileRightSideProps> = ({
  meData,
}) => {
  return (
    <Flex ml={"auto"} direction={"column"} gap={3}>
      <Img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        pl={20}
        pr={20}
      ></Img>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}></Grid>
    </Flex>
  );
};
