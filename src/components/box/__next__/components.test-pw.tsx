import React from "react";
import NextBox, { NextBoxProps } from ".";

const BasicBoxExample = (props: Partial<NextBoxProps>) => {
  return (
    <NextBox data-element="next-box" {...props}>
      Content
    </NextBox>
  );
};

export default BasicBoxExample;
