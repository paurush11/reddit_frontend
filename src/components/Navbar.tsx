import { Box, Button, Center, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import React from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/output/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useQuery({
    query: MeDocument,
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useMutation(LogoutDocument);
  let body = null;
  if (isServer() || fetching) {
    //loading
    body = <div>Loading...</div>;
  } else if (!data?.Me) {
    //user not logged in
    body = (
      <Box ml={"auto"} alignItems={"center"} justifyContent={"center"}>
        <NextLink href={"/login"}>
          <Link mr={2} color={"white"}>
            Login
          </Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link color={"white"}>Register</Link>
        </NextLink>
      </Box>
    );
  } else {
    //user  logged in
    body = (
      <Flex alignItems={"center"} justifyContent={"center"} gap={8}>
        <NextLink href={"./create-post"} >
          <Link as={Button} ml={"auto"} >Create Posts</Link>
        </NextLink>
        <Flex gap={2}>

        <Box mr={2} color={"white"} >
          {data.Me.username}
        </Box>
        <Button
          variant="link"
          color={"BLACK"}
          isLoading={logoutFetching}
          onClick={() => {
            logout({});
          }}
          >
          Logout
        </Button>
          </Flex>
      </Flex>
    );
  }
  return (
    <Flex position={"sticky"} top={0} zIndex={1} bg={"#ED001C"} p={4}>
      <NextLink href={"/"}>
        <Link>
          <Heading>LiReddit</Heading>
        </Link>
      </NextLink>
      
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
