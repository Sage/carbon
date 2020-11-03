import React from "react";
import PropTypes from "prop-types";
import { validProps } from "../../../utils/ether";
import tagComponent from "../../../utils/helpers/tags";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
} from "./fieldset.style";
import Logger from "../../../utils/logger/logger";

let deprecatedWarnTriggered = false;

const Fieldset = (props) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`styleOverride` that is used in the `Fieldset` component is deprecated and will soon be removed."
    );
  }

  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendContainerStyle
        inline={props.inline}
        data-component="legend-style"
        styleOverride={props.styleOverride.legend}
      >
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
      styleOverride={props.styleOverride.root}
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
  /** Child elements */
  children: PropTypes.node,
  /** The text for the fieldsets legend element. */
  legend: PropTypes.string,
  /** When true, legend is placed in line with the children */
  inline: PropTypes.bool,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

Fieldset.defaultProps = {
  inline: false,
  styleOverride: {},
};

export default Fieldset;
