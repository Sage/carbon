import React from "react";
import styledSystemPropTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import StyledCardRow from "./card-row.style";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const paddingSizes = {
  small: 2,
  medium: 3,
  large: 4,
};

const CardRow = ({ children, spacing = "medium", ...props }) => {
  return (
    <StyledCardRow
      data-element="card-row"
      py={paddingSizes[spacing]}
      {...props}
    >
      {children}
    </StyledCardRow>
  );
};

CardRow.propTypes = {
  /** Styled system padding props */
  ...paddingPropTypes,
  children: PropTypes.node.isRequired,
  /** Spacing prop is set in Card and defines the padding for the CardRow (the first CardRow has no padding by default). For more granular control of CardRow padding these can be over-ridden by Padding props from styled-system (see table below). */
  spacing: PropTypes.oneOf(OptionsHelper.sizesRestricted),
};

export default CardRow;
