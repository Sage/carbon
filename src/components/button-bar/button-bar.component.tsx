import React from "react";
import { SpaceProps } from "styled-system";
import StyledButtonBar from "./button-bar.style";

export interface ButtonBarContextProps {
  /** Apply fullWidth style to the button bar */
  fullWidth?: boolean;
  /** Defines an Icon position for buttons: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Assigns a size to the buttons: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: "primary" | "secondary" | "primary";
}
export interface ButtonBarProps extends ButtonBarContextProps, SpaceProps {
  /** Button or IconButton Elements, to be rendered inside the component */
  children: React.ReactNode;
}

export const ButtonBarContext = React.createContext<ButtonBarContextProps>({});

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
