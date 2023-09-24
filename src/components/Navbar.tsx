import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineUser } from "react-icons/ai";

import React from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/output/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
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
      <Flex alignContent={"center"} m={"auto"}>
        <NextLink href={"/login"} passHref>
          <Link mr={2} color={"white"}>
            Login
          </Link>
        </NextLink>
        <NextLink href={"/register"} passHref>
          <Link color={"white"}>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    //user  logged in
    body = (
      <Flex alignItems={"center"} justifyContent={"center"} gap={8}>
        <NextLink href={"./create-post"} passHref>
          <Link as={Button} ml={"auto"}>
            Create Posts
          </Link>
        </NextLink>
        <Flex gap={2}>
          <Box
            as={Button}
            mr={2}
            gap={2}
            onClick={() => {
              router.push("/profile");
            }}
          >
            <AiOutlineUser />
            {data.Me.username}
          </Box>
          <Button
            variant="link"
            color={"black"}
            isLoading={logoutFetching}
            onClick={() => {
              logout({});
              router.reload();
            }}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex
      position={"sticky"}
      top={0}
      zIndex={1}
      bg={"#ED001C"}
      p={4}
      alignItems={"center"}
    >
      <NextLink href={"/"} passHref>
        <Link>
          <Heading>LiReddit</Heading>
        </Link>
      </NextLink>

      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
