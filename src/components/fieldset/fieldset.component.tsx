import React from "react";
import { MarginProps } from "styled-system";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
  StyledFieldsetProps,
} from "./fieldset.style";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

export interface FieldsetProps extends StyledFieldsetProps, MarginProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldsets legend element. */
  legend?: string;
}

export const Fieldset = ({
  children,
  inline = false,
  legend,
  ...rest
}: FieldsetProps) => {
  const getLegend = () => {
    if (!legend) return null;

    return (
      <LegendContainerStyle inline={inline} data-component="legend-style">
        <legend data-element="legend">{legend}</legend>
      </LegendContainerStyle>
    );
  };

  const marginProps = useFormSpacing(rest);

  return (
    <NewValidationContext.Provider value={{ validationRedesignOptIn: false }}>
      <FieldsetStyle
        {...tagComponent("fieldset", rest)}
        {...rest}
        {...marginProps}
      >
        <FieldsetContentStyle data-component="fieldset-style" inline={inline}>
          {getLegend()}
          <FormSpacingProvider marginBottom={undefined}>
            {children}
          </FormSpacingProvider>
        </FieldsetContentStyle>
      </FieldsetStyle>
    </NewValidationContext.Provider>
  );
};

Fieldset.displayName = "Fieldset";

export default Fieldset;
