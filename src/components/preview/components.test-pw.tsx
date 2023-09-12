import React from "react";
import Preview, { PreviewProps } from ".";

const PreviewComponent = (props: PreviewProps) => {
  return <Preview loading {...props} />;
};
export default PreviewComponent;
