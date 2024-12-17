import React from "react";
import { SpaceProps } from "styled-system";

import useLocale from "../../hooks/__internal__/useLocale";
import {
  StyledDismissibleBox,
  StyledDismissibleBoxProps,
} from "./dismissible-box.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import { BoxProps } from "../box";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface DismissibleBoxProps
  extends SpaceProps,
    StyledDismissibleBoxProps,
    Omit<BoxProps, "display" | "justifyContent" | "bg" | "backgroundColor">,
    Omit<TagProps, "data-component"> {
  /** The content to render in the component */
  children?: React.ReactNode;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: TagProps;
  /** Callback to be called when the close icon button is clicked */
  onClose: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Use this prop to override the default width. Numbers from 0-1 are converted to percentage widths. Numbers greater
   * than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to
   * responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme.
   * Please note this component has a minWidth of 600px */
  width?: number | string;
}

export const DismissibleBox = ({
  children,
  closeButtonDataProps,
  onClose,
  borderRadius = "borderRadius100",
  ...rest
}: DismissibleBoxProps) => {
  const locale = useLocale();

  return (
    <StyledDismissibleBox
      p="20px 24px 20px 20px"
      data-component="dismissible-box"
      borderRadius={borderRadius}
      {...rest}
    >
      {children}
      <span data-element="close-button-wrapper">
        <IconButton
          onClick={onClose}
          aria-label={locale.dismissibleBox.ariaLabels.close()}
          ml={3}
          {...tagComponent("close-button", {
            "data-element": "close-button",
            ...closeButtonDataProps,
          })}
        >
          <Icon type="close" color="--colorsActionMinor500" />
        </IconButton>
      </span>
    </StyledDismissibleBox>
  );
};

export default DismissibleBox;
