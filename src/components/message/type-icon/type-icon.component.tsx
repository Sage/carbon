import React from "react";

import TypeIconStyle from "./type-icon.style";
import Icon from "../../icon";
import { MessageVariant } from "../message.component";

export interface TypeIconProps {
  /** set background to be invisible */
  transparent?: boolean;
  /** set type of message based on new DLS standard */
  variant?: MessageVariant;
}

const TypeIcon = ({ variant = "info", transparent = false }: TypeIconProps) => {
  function iconToRender() {
    if (variant === "neutral") return "info";
    if (variant === "success") return "tick_circle";
    return variant;
  }
  return (
    <TypeIconStyle variant={variant} transparent={transparent}>
      <Icon type={iconToRender()} />
    </TypeIconStyle>
  );
};

export default TypeIcon;
