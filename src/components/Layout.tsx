import React from "react";
import { Wrapper, variantWrapper } from "./Wrapper";
import { Navbar } from "./Navbar";

interface LayoutProps {
  variant?: variantWrapper;
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
    
  );
};
