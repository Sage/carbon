import React from "react";
import Link, { LinkProps } from "./link.component";
import Box from "../box";

const blackBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 0, 0)",
  margin: "100px",
};

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
    <div style={blackBackground}>
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        This is a link
      </Link>
    </div>
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
