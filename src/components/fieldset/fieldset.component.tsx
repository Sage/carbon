import React from "react";
import { MarginProps } from "styled-system";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
  StyledFieldsetProps,
} from "./fieldset.style";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";

export interface FieldsetProps extends StyledFieldsetProps, MarginProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldsets legend element. */
  legend?: string;
}

const Fieldset = ({
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

  return (
    <NewValidationContext.Provider value={{ validationRedesignOptIn: false }}>
      <FieldsetStyle
        {...tagComponent("fieldset", rest)}
        {...rest}
        m={0}
        {...filterStyledSystemMarginProps(rest)}
      >
        <FieldsetContentStyle data-component="fieldset-style" inline={inline}>
          {getLegend()}
          {children}
        </FieldsetContentStyle>
      </FieldsetStyle>
    </NewValidationContext.Provider>
  );
};

export default Fieldset;
