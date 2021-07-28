import React from "react";
import PropTypes from "prop-types";
import StyledCardColumn from "./card-column.style";

const CardColumn = ({ align, children, ...props }) => (
  <StyledCardColumn align={align} data-element="card-column" {...props}>
    {children}
  </StyledCardColumn>
);

CardColumn.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(["center", "left", "right"]),
  children: PropTypes.node.isRequired,
};

CardColumn.defaultProps = {
  align: "center",
};

export default CardColumn;
