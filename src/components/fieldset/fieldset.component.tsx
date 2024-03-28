import React from "react";
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
}

export const Fieldset = ({ children, legend, ...rest }: FieldsetProps) => {
  const marginProps = useFormSpacing(rest);

  return (
    <NewValidationContext.Provider value={{ validationRedesignOptIn: false }}>
      <FieldsetStyle
        {...tagComponent("fieldset", rest)}
        {...rest}
        {...marginProps}
      >
        {legend && <StyledLegend data-element="legend">{legend}</StyledLegend>}
        <FormSpacingProvider marginBottom={undefined}>
          {children}
        </FormSpacingProvider>
      </FieldsetStyle>
    </NewValidationContext.Provider>
  );
};

Fieldset.displayName = "Fieldset";

export default Fieldset;
