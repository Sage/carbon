import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
} from "./fieldset.style";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Fieldset = ({ children, inline, legend, ...rest }) => {
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

Fieldset.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Child elements */
  children: PropTypes.node,
  /** The text for the fieldsets legend element. */
  legend: PropTypes.string,
  /** When true, legend is placed in line with the children */
  inline: PropTypes.bool,
};

Fieldset.defaultProps = {
  inline: false,
};

export default Fieldset;
