import React from "react";
import LoaderBar, { LoaderBarProps } from ".";

const LoaderBarComponent = (props: LoaderBarProps) => {
  return <LoaderBar mt={2} size="medium" {...props} />;
};

export default LoaderBarComponent;
