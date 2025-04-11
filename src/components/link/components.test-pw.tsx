import React from "react";
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
