import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { validProps } from "../../__internal__/utils/ether";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
} from "./fieldset.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Fieldset = (props) => {
  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendContainerStyle inline={props.inline} data-component="legend-style">
        <legend data-element="legend">{props.legend}</legend>
      </LegendContainerStyle>
    );
  };

  const { ...safeProps } = validProps({
    propTypes: Fieldset.propTypes,
    props,
  });

  return (
    <FieldsetStyle
      {...tagComponent("fieldset", props)}
      {...safeProps}
      m={0}
      {...filterStyledSystemMarginProps(props)}
    >
      <FieldsetContentStyle
        data-component="fieldset-style"
        inline={props.inline}
      >
        {legend()}
        {props.children}
      </FieldsetContentStyle>
    </FieldsetStyle>
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
