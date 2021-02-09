import React from "react";
import PropTypes from "prop-types";
import StyledPill from "./pill.style";
import Icon from "../icon";
import { validProps } from "../../utils/ether";
import tagComponent from "../../utils/helpers/tags";
import IconButton from "../icon-button";

class Pill extends React.Component {
  static marginSpaceProps = ["m", "mt", "mr", "mb", "ml", "mx", "my"];

  static getMarginSpacePropTypes() {
    return Pill.marginSpaceProps.reduce((prev, curr) => {
      prev[curr] = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
      return prev;
    }, {});
  }

  static safeProps = ["onClick", ...this.marginSpaceProps];

  renderCloseIcon() {
    const { onDelete } = this.props;
    return (
      <IconButton onAction={onDelete} data-element="close" aria-label="close">
        <Icon type="cross" bgSize="small" bgTheme="none" />
      </IconButton>
    );
  }

  render() {
    const {
      fill,
      onDelete,
      colorVariant,
      borderColor,
      pillRole,
      children,
      size,
    } = this.props;

    return (
      <StyledPill
        {...validProps(this)}
        inFill={fill}
        colorVariant={colorVariant}
        isDeletable={onDelete}
        pillRole={pillRole}
        size={size}
        borderColor={borderColor}
        {...tagComponent("pill", this.props)}
      >
        {children}
        {onDelete && this.renderCloseIcon()}
      </StyledPill>
    );
  }
}

Pill.propTypes = {
  /** Styled system margin spacing props */
  ...Pill.getMarginSpacePropTypes(),
  /** Change the color of a status pill. */
  colorVariant: PropTypes.oneOf(["neutral", "negative", "positive", "warning"]),
  /** Override color variant, provide any color from palette or any valid css color value. */
  borderColor: PropTypes.string,
  /** The content to display inside of the pill.  */
  children: PropTypes.string.isRequired,
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill: PropTypes.bool,
  /** Sets the type of pill in use. */
  pillRole: PropTypes.oneOf(["tag", "status"]),
  /** Callback function for when the pill is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the remove icon is clicked. */
  onDelete: PropTypes.func,
  size: PropTypes.oneOf(["S", "M", "L", "XL"]),
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
