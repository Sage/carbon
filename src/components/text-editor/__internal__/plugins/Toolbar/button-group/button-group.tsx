import React from "react";
import StyledButtonGroup from "./button-group.style";

type ButtonGroupProps = {
  /** The children of the button group */
  children?: React.ReactNode | React.ReactNode[];
  /** The name of the button group */
  name: string;
  /** The namespace of the containing editor */
  namespace?: string;
  /** Determines if the button group should show a divider */
  showDivider?: boolean;
};

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
      {showDivider && <div className="button-group-divider" />}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
