import React, { useState, useEffect } from "react";
import { MarginProps } from "styled-system";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { FieldsetStyle, StyledLegend } from "./fieldset.style";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

export interface FieldsetProps extends MarginProps {
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
  const marginProps = useFormSpacing(rest);

  useEffect(() => {
    if (ref && required) {
      Array.from(
        ref.querySelectorAll("input") || /* istanbul ignore next */ []
      ).forEach((el) => {
        el.setAttribute("required", "");
      });
    }
  }, [ref, required]);

  return (
    <NewValidationContext.Provider value={{ validationRedesignOptIn: false }}>
      <FieldsetStyle
        ref={setRef}
        {...tagComponent("fieldset", rest)}
        {...rest}
        {...marginProps}
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
        <FormSpacingProvider marginBottom={undefined}>
          {children}
        </FormSpacingProvider>
      </FieldsetStyle>
    </NewValidationContext.Provider>
  );
};

Fieldset.displayName = "Fieldset";

export default Fieldset;
