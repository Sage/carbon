import React from "react";
import Content from ".";

const ContentComponentTest = ({
  children = "This is an example of some content",
  ...props
}) => {
  return (
    <Content title="Title" {...props}>
      {children}
    </Content>
  );
};

export default ContentComponentTest;
