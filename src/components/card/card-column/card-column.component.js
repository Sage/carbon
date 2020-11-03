import React from "react";
import PropTypes from "prop-types";
import StyledCardColumn from "./card-column.style";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";

const { alignFull } = OptionsHelper;

const CardColumn = ({ align, children, ...props }) => (
  <StyledCardColumn align={align} data-element="card-column" {...props}>
    {children}
  </StyledCardColumn>
);

CardColumn.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(alignFull),
  children: PropTypes.node.isRequired,
};

CardColumn.defaultProps = {
  align: "center",
};

export default CardColumn;
