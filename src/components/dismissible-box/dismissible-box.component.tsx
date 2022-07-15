import React from "react";
import { SpaceProps } from "styled-system";

import { StyledDismissibleBox } from "./dismissible-box.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import { BoxProps } from "../box";

export interface DismissibleBoxProps
  extends SpaceProps,
    Omit<BoxProps, "display" | "justifyContent"> {
  /** Flag to control whether the thicker left border highlight should be rendered */
  hasBorderLeftHighlight?: boolean;
  /** The content to render in the component */
  children?: React.ReactNode;
  /** Callback to be called when the close icon button is clicked */
  onClose: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Use this prop to override the default width. Numbers from 0-1 are converted to percentage widths. Numbers greater
   * than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to
   * responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme.
   * Please note this component has a minWidth of 600px */
  width?: number | string;
  /** Set the base color variant */
  variant?: "light" | "dark";
}

const variantStyles = {
  light: {
    backgroundColor: "#FFFFFF",
  },
  dark: {
    backgroundColor: "--colorsUtilityMajor050",
  },
};

const DismissibleBox = ({
  hasBorderLeftHighlight = true,
  children,
  onClose,
  variant = "light",
  ...rest
}: DismissibleBoxProps) => (
  <StyledDismissibleBox
    backgroundColor={variantStyles[variant].backgroundColor}
    p="20px 24px 20px 20px"
    hasBorderLeftHighlight={hasBorderLeftHighlight}
    {...rest}
    display="flex"
    justifyContent="space-between"
  >
    {children}
    <span>
      <IconButton onAction={onClose} aria-label="close-button" ml={3}>
        <Icon type="close" color="--colorsActionMinor500" />
      </IconButton>
    </span>
  </StyledDismissibleBox>
);

export default DismissibleBox;
