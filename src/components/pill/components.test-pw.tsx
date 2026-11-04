import React from "react";
import Pill, { PillProps } from ".";

const darkGreyBackground: React.CSSProperties = {
  backgroundColor: "rgb(38, 38, 38)",
};

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
    <div style={darkGreyBackground}>
      <Pill {...args}>{children}</Pill>
    </div>
  );
};
