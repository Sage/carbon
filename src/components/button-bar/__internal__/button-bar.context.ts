import React from "react";

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

export default React.createContext<ButtonBarContextProps>({});
