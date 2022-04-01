import React from "react";
import invariant from "invariant";
import StyledColorSampleBox from "./color-sample-box.style";
import StyledTickIcon, { TickIconProps } from "../tick-icon/tick-icon.style";

const ColorSampleBox = ({
  color,
  checked,
}: Pick<TickIconProps, "color" | "checked">): JSX.Element => {
  const hexRegex = /\b[0-9A-Fa-f]{6}\b/g;

  invariant(
    color.match(hexRegex) || color === "transparent",
    `Provide color in a six-digit hex format or 'transparent' in ${ColorSampleBox.displayName}.`
  );

  return (
    <StyledColorSampleBox color={color}>
      {checked && <StyledTickIcon color={color} checked type="tick" />}
    </StyledColorSampleBox>
  );
};

ColorSampleBox.displayName = "ColorSampleBox";

export default ColorSampleBox;
