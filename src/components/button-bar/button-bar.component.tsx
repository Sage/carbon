import React from "react";
import { SpaceProps } from "styled-system";
import StyledButtonBar from "./button-bar.style";
import ButtonBarContext, {
  ButtonBarContextProps,
} from "./__internal__/button-bar.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import Logger from "../../__internal__/utils/logger";

export interface ButtonBarProps
  extends ButtonBarContextProps,
    SpaceProps,
    TagProps {
  /** Button or IconButton Elements, to be rendered inside the component */
  children: React.ReactNode;
}

let deprecationWarningTriggered = false;

export const ButtonBar = ({
  children,
  size = "medium",
  iconPosition = "before",
  fullWidth = false,
  ...rest
}: ButtonBarProps) => {
  if (!deprecationWarningTriggered) {
    Logger.deprecate(
      "The `ButtonBar` component is deprecated and will soon be removed.",
    );
    deprecationWarningTriggered = true;
  }

  return (
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
};

ButtonBar.displayName = "ButtonBar";

export default ButtonBar;
