import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import StyledPill from "./pill.style";
import Icon from "../icon";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import IconButton from "../icon-button";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);
const renderCloseIcon = (onDelete) => (
  <IconButton onAction={onDelete} data-element="close" aria-label="close">
    <Icon type="cross" />
  </IconButton>
);

const Pill = ({
  wrapText,
  borderColor,
  colorVariant,
  children,
  fill,
  maxWidth,
  onClick,
  onDelete,
  pillRole,
  size,
  truncate,
  ...rest
}) => (
  <StyledPill
    inFill={fill}
    colorVariant={colorVariant}
    isDeletable={onDelete}
    pillRole={pillRole}
    size={size}
    borderColor={borderColor}
    onClick={onClick}
    {...tagComponent("pill", rest)}
    maxWidth={maxWidth}
    wrapText={wrapText}
    {...rest}
  >
    {children}
    {onDelete && renderCloseIcon(onDelete)}
  </StyledPill>
);

Pill.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Override color variant, provide design token, any color from palette or any valid css color value. */
  borderColor: PropTypes.string,
  /** The content to display inside of the pill.  */
  children: PropTypes.string.isRequired,
  /** Change the color of a status pill. */
  colorVariant: PropTypes.oneOf(["neutral", "negative", "positive", "warning"]),
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill: PropTypes.bool,
  /** Sets the max-width of the pill. */
  maxWidth: PropTypes.string,
  /** Callback function for when the pill is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the remove icon is clicked. */
  onDelete: PropTypes.func,
  /** Sets the type of pill in use. */
  pillRole: PropTypes.oneOf(["tag", "status"]),
  /** Sets the size of the pill. */
  size: PropTypes.oneOf(["S", "M", "L", "XL"]),
  /** Allow the text within pill to wrap. */
  wrapText: PropTypes.bool,
};

Pill.defaultProps = {
  colorVariant: "neutral",
  fill: false,
  onClick: null,
  onDelete: null,
  pillRole: "tag",
  size: "M",
};

export default Pill;
