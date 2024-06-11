import React, { useRef } from "react";
import guid from "../../../__internal__/utils/helpers/guid";

import StyledOptionGroup from "./option-group.style";

export interface OptionGroupProps {
  label?: string;
  id?: string;
  children: React.ReactNode;
}

const OptionGroup = React.forwardRef(
  (
    { label, id, children, ...rest }: OptionGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    console.log("option-group-children: ", children);
    const internalIdRef = useRef(id || guid());
    return (
      <StyledOptionGroup
        role="group"
        data-component="option-group"
        id={internalIdRef.current}
        ref={ref as React.ForwardedRef<HTMLLIElement>}
        {...rest}
      >
        {label}
        <ul>{children}</ul>
      </StyledOptionGroup>
    );
  }
);

OptionGroup.displayName = "OptionGroup";

export default OptionGroup;
