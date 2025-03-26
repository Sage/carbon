import React, { useState, useEffect, useContext } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { FieldsetStyle, StyledLegend } from "./fieldset.style";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface FieldsetProps extends MarginProps, TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldset's legend element. */
  legend?: string;
  /** Flag to configure fields as mandatory. */
  required?: boolean;
  /** Flag to configure fields as optional. */
  isOptional?: boolean;
}

export const Fieldset = ({
  children,
  legend,
  required,
  isOptional,
  ...rest
}: FieldsetProps) => {
  const [ref, setRef] = useState<HTMLFieldSetElement | null>(null);
  const marginProps = filterStyledSystemMarginProps(rest);
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  useEffect(() => {
    if (ref && required) {
      Array.from(
        ref.querySelectorAll("input") || /* istanbul ignore next */ [],
      ).forEach((el) => {
        el.setAttribute("required", "");
      });
    }
  }, [ref, required]);

  return (
    <FieldsetStyle
      ref={setRef}
      newValidation={validationRedesignOptIn}
      {...rest}
      {...marginProps}
      {...tagComponent("fieldset", rest)}
    >
      {legend && (
        <StyledLegend
          data-element="legend"
          isRequired={required}
          isOptional={isOptional}
        >
          {legend}
        </StyledLegend>
      )}
      {children}
    </FieldsetStyle>
  );
};

Fieldset.displayName = "Fieldset";

export default Fieldset;
