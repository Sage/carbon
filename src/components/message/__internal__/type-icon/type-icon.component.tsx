import React from "react";

import TypeIconStyle from "./type-icon.style";
import Icon from "../../../icon";
import { MessageVariant } from "../../message.component";

export interface TypeIconProps {
  transparent?: boolean;
  variant: MessageVariant;
}

const TypeIcon = ({ variant, transparent }: TypeIconProps) => {
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
