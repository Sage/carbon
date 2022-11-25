import React from "react";
import StyledMinorButton from "./minor-button.style";
import { ButtonProps } from "../button";

export const MinorButton = ({
  buttonType = "secondary",
  ...rest
}: ButtonProps) => <StyledMinorButton buttonType={buttonType} {...rest} />;

MinorButton.displayName = "MinorButton";

export default MinorButton;
