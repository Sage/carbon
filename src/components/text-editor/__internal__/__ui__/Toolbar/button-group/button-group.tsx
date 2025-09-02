import React from "react";
import StyledButtonGroup from "./button-group.style";
import { ButtonGroupProps } from "../../../__utils__/interfaces";

const ButtonGroup = ({
  children,
  name,
  namespace,
  showDivider = true,
}: ButtonGroupProps) => {
  if (!children) return null;

  return (
    <StyledButtonGroup id={`${namespace}-${name}`}>
      {children}
      {showDivider && <div role="separator" className="button-group-divider" />}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
