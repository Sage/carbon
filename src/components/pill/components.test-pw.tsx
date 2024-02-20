import React from "react";
import Pill, { PillProps } from ".";
import Box from "../box";

export const PillComponent = ({
  children = "noop",
  ...args
}: Partial<PillProps>) => {
  return <Pill {...args}>{children}</Pill>;
};

export const PillOnDarkBackground = ({
  children = "noop",
  ...args
}: Partial<PillProps>) => {
  return (
    <Box backgroundColor="#262626">
      <Pill {...args}>{children}</Pill>
    </Box>
  );
};
