import React from "react";
import PropTypes from "prop-types";
import OptionsHelper from "../../../utils/helpers/options-helper";
import StyledCardFooter from "./card-footer.style";

const { sizesRestricted } = OptionsHelper;

const CardFooter = ({ spacing, children, ...props }) => {
  return (
    <StyledCardFooter
      key="card-footer"
      data-element="card-footer"
      spacing={spacing}
      {...props}
    >
      {children}
    </StyledCardFooter>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  /** size of card for applying padding (small | medium | large) */
  spacing: PropTypes.oneOf(sizesRestricted),
};

export default CardFooter;
