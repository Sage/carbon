import React from "react";
import Loader, { LoaderProps } from ".";
import Button from "../button";

const LoaderInsideButton = (props: LoaderProps) => {
  return (
    <Button buttonType="primary" aria-label="Loading">
      <Loader isInsideButton {...props} />
    </Button>
  );
};

export default LoaderInsideButton;
