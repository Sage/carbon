import React from "react";
import { SpaceProps } from "styled-system";
import StyledButtonBar from "./button-bar.style";
import ButtonBarContext, {
  ButtonBarContextProps,
} from "./__internal__/button-bar.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

/**
 * @deprecated `ButtonBar` has been deprecated. See the Carbon documentation for migration details.
 */
export interface ButtonBarProps
  extends ButtonBarContextProps,
    SpaceProps,
    TagProps {
  /** Button or IconButton Elements, to be rendered inside the component */
  children: React.ReactNode;
}

/**
 * @deprecated `ButtonBar` has been deprecated. See the Carbon documentation for migration details.
 */
const ButtonBar = ({
  children,
  size = "medium",
  iconPosition = "before",
  fullWidth = false,
  ...rest
}: ButtonBarProps) => (
  <StyledButtonBar
    {...rest}
    {...tagComponent("button-bar", rest)}
    fullWidth={fullWidth}
    size={size}
  >
    <ButtonBarContext.Provider
      value={{ buttonType: "secondary", size, iconPosition, fullWidth }}
    >
      {children}
    </ButtonBarContext.Provider>
  </StyledButtonBar>
);

ButtonBar.displayName = "ButtonBar";

export default ButtonBar;
