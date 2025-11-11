import React from "react";
import carbonLogo from "../../../logo/carbon-logo.png";
import Link, { LinkProps } from "./link.component";
import Box from "../box";

export const LinkComponent = (props: LinkProps) => {
  return (
    <Box m="100px">
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        This is a link
      </Link>
    </Box>
  );
};

export const LinkComponentWithImage = (props: LinkProps) => {
  const Logo = () => <img src={carbonLogo} alt="Logo" height="30px" />;
  return (
    <Box m={4}>
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        <Logo />
      </Link>
    </Box>
  );
};

export const LinkComponentWithDarkBackground = (props: LinkProps) => {
  return (
    <Box m="100px" bg="black">
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        This is a link
      </Link>
    </Box>
  );
};

export const LinkComponentAsButton = (props: LinkProps) => {
  return (
    <Box m="100px">
      <Link onClick={() => {}} {...props}>
        This is a link
      </Link>
    </Box>
  );
};
