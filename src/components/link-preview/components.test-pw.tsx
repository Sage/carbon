import React from "react";
import carbonLogo from "../../../logo/carbon-logo.png";
import LinkPreview, { LinkPreviewProps } from ".";

const LinkPreviewComponentTest = (props: LinkPreviewProps) => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      image={{ url: carbonLogo, alt: "Carbon logo" }}
      {...props}
    />
  );
};

export default LinkPreviewComponentTest;
