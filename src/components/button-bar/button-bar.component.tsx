import React from "react";
import { SpaceProps } from "styled-system";
import StyledButtonBar from "./button-bar.style";
import ButtonBarContext, {
  ButtonBarContextProps,
} from "./__internal__/button-bar.context";

export interface ButtonBarProps extends ButtonBarContextProps, SpaceProps {
  /** Button or IconButton Elements, to be rendered inside the component */
  children: React.ReactNode;
}

export const ButtonBar = ({
  children,
  size = "medium",
  iconPosition = "before",
  fullWidth = false,
  ...rest
}: ButtonBarProps) => (
  <StyledButtonBar {...rest} fullWidth={fullWidth} size={size}>
    <ButtonBarContext.Provider
      value={{ buttonType: "secondary", size, iconPosition, fullWidth }}
    >
      {children}
    </ButtonBarContext.Provider>
  </StyledButtonBar>
);

ButtonBar.displayName = "ButtonBar";

export default ButtonBar;
