import React from "react";
import LinkPreview, { LinkPreviewProps } from ".";

const LinkPreviewComponentTest = (props: LinkPreviewProps) => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      {...props}
    />
  );
};

export default LinkPreviewComponentTest;
