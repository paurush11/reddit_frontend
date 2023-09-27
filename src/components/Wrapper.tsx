import { Box } from "@chakra-ui/react";
import React from "react";
import { WrapperProps } from "../interfaces/allProps";

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      mt={8}
      mx={"auto"}
      maxW={
        variant === "regular"
          ? "800px"
          : variant === "small"
          ? "400px"
          : "1500px"
      }
      w="100%"
    >
      {children}
    </Box>
  );
};
