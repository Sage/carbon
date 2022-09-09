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
  return (
    <TypeIconStyle variant={variant} transparent={transparent}>
      <Icon type={variant} />
    </TypeIconStyle>
  );
};

export default TypeIcon;
