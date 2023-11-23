import React from "react";
import Pill, { PillProps } from ".";

const PillComponent = ({ children = "noop", ...args }: Partial<PillProps>) => {
  return <Pill {...args}>{children}</Pill>;
};

export default PillComponent;
