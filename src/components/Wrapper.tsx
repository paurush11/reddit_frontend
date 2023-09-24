import { Box } from "@chakra-ui/react";
import React from "react";

export type variantWrapper = "small" | "regular" | "Large";
interface WrapperProps {
  children: any;
  variant: variantWrapper;
}

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
          : "1000px"
      }
      w="100%"
    >
      {children}
    </Box>
  );
};
