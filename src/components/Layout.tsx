import React from "react";
import { Wrapper } from "./Wrapper";
import Navbar from "./Navbar";
import { LayoutProps } from "../interfaces/allProps";

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
