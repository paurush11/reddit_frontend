import { Flex, Grid, Img } from "@chakra-ui/react";
import React from "react";
import { ProfileRightSideProps } from "../interfaces/allProps";

export const ProfileRightSide: React.FC<ProfileRightSideProps> = ({
  meData,
}) => {
  return (
    <Flex ml={"auto"} direction={"column"} gap={3}>
      <Img
        src="https://media.licdn.com/dms/image/D5603AQGtbSjR1PNbgA/profile-displayphoto-shrink_800_800/0/1676588561888?e=1701302400&v=beta&t=heQXQ2Rkh0HtoWDJA6snDpxRqjMUA8hCQf_Ftdz3ssQ"
        pl={20}
        pr={20}
        borderRadius={"50%"}
      ></Img>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}></Grid>
    </Flex>
  );
};
