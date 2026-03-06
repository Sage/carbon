import React from "react";
import DipsBox, { DipsBoxProps } from ".";

const BasicBoxExample = (props: Partial<DipsBoxProps>) => {
  return (
    <DipsBox data-element="dips-box" {...props}>
      Content
    </DipsBox>
  );
};

export default BasicBoxExample;
