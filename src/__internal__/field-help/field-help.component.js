import React from "react";
import PropTypes from "prop-types";
import FieldHelpStyle from "./field-help.style";

const FieldHelp = ({ children, labelInline, labelWidth, ...rest }) => (
  <FieldHelpStyle
    data-element="help"
    labelInline={labelInline}
    labelWidth={labelWidth}
    {...rest}
  >
    {children}
  </FieldHelpStyle>
);

FieldHelp.propTypes = {
  /** Child elements */
  children: PropTypes.node,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
};

export default FieldHelp;
