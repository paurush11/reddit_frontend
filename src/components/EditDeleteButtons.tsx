import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { DeletePostDocument, PostQuery } from "../generated/output/graphql";

export const EditDeleteButtons = ({ post }: PostQuery) => {
  const [, deletePost] = useMutation(DeletePostDocument);
  const router = useRouter();
  return (
    <>
      <IconButton
      ml={2}
        as={Link}
        mr={2}
        aria-label={"edit"}
        onClick={() => {
          router.push(`/posts/edit/${post._id}`);
        }}
        icon={<EditIcon />}
      />

      <IconButton
        colorScheme={"red"}
        aria-label={"delete"}
        onClick={() => {
          deletePost({
            id: post._id,
          });
        }}
        icon={<DeleteIcon />}
      />
    </>
  );
};
