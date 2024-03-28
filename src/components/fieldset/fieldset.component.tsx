import React, { useState, useEffect } from "react";
import { MarginProps } from "styled-system";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
} from "./fieldset.style";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

export interface FieldsetProps extends MarginProps {
  /** When true, legend is placed in line with the children */
  inline?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldsets legend element. */
  legend?: string;
  /** Flag to configure fields as mandatory. */
  required?: boolean;
  /** Flag to configure fields as optional. */
  isOptional?: boolean;
}

export const Fieldset = ({
  children,
  inline = false,
  legend,
  required,
  isOptional,
  ...rest
}: FieldsetProps) => {
  const [ref, setRef] = useState<HTMLFieldSetElement | null>(null);
  const getLegend = () => {
    if (!legend) return null;

    return (
      <LegendContainerStyle
        isRequired={required}
        isOptional={isOptional}
        inline={inline}
        data-component="legend-style"
      >
        <legend data-element="legend">{legend}</legend>
      </LegendContainerStyle>
    );
  };

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
