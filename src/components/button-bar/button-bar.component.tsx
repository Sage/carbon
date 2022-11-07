import React, { useMemo } from "react";
import invariant from "invariant";
import { SpaceProps } from "styled-system";

import { Expand } from "../../__internal__/utils/helpers/types";
import StyledButtonBar from "./button-bar.style";
import Button from "../button";
import IconButton from "../icon-button";

export interface ButtonBarProps extends Expand<SpaceProps> {
  children: React.ReactNode;
  /** Apply fullWidth style to the button bar */
  fullWidth?: boolean;
  /** Defines an Icon position for buttons: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Assigns a size to the buttons: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
}

const ButtonBar = ({
  children,
  size = "medium",
  iconPosition = "before",
  fullWidth = false,
  ...rest
}: ButtonBarProps) => {
  const hasProperChildren = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) => {
        if (!React.isValidElement(child)) {
          return true;
        }

        return child.type !== Button && child.type !== IconButton;
      }
    );

    return !incorrectChild;
  }, [children]);

  invariant(
    hasProperChildren,
    "ButtonBar accepts only `Button` or `IconButton` elements."
  );

  const getBtnProps = (child: React.ReactElement) => {
    const btnProps = {
      ...child.props,
      buttonType: "secondary",
      size,
      iconPosition,
      fullWidth,
      "aria-label":
        child.type === IconButton
          ? child.props?.ariaLabel || child.props?.children?.props?.type
          : "",
    };
    return btnProps;
  };

  return (
    <StyledButtonBar {...rest} fullWidth={fullWidth} size={size}>
      {React.Children.map(children as React.ReactElement[], (child) => (
        <child.type {...getBtnProps(child)} />
      ))}
    </StyledButtonBar>
  );
};

export default ButtonBar;
