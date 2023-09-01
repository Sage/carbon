import React from "react";
import Heading, { HeadingProps } from ".";
import Pill from "../pill";

export const HeadingComponent = (props: HeadingProps) => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      {...props}
    />
  );
};

export const HeadingComponentWithPills = (props: HeadingProps) => {
  const { pills } = props;

  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      pills={<Pill>{pills as string}</Pill>}
    />
  );
};
