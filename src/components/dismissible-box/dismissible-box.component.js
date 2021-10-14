import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import StyledDismissibleBox from "./dismissible-box.style";
import IconButton from "../icon-button";
import Icon from "../icon";

const variantStyles = {
  light: {
    backgroundColor: "#FFFFFF",
  },
  dark: {
    backgroundColor: "slateTint90",
  },
};

const DismissibleBox = ({
  hasBorderLeftHighlight = true,
  children,
  onClose,
  variant = "light",
  ...rest
}) => (
  <StyledDismissibleBox
    backgroundColor={variantStyles[variant].backgroundColor}
    p="20px 24px 20px 20px"
    hasBorderLeftHighlight={hasBorderLeftHighlight}
    {...rest}
    minWidth="600px"
    display="flex"
    justifyContent="space-between"
  >
    {children}
    <span>
      <IconButton onAction={onClose} aria-label="close-button" ml={3}>
        <Icon type="close" color="slateTint20" />
      </IconButton>
    </span>
  </StyledDismissibleBox>
);

DismissibleBox.propTypes = {
  ...propTypes.space,
  /** Flag to control whether the thicker left border highlight should be rendered */
  hasBorderLeftHighlight: PropTypes.bool,
  /** The content to render in the component */
  children: PropTypes.node,
  /** Callback to be called when the close icon button is clicked */
  onClose: PropTypes.func.isRequired,
  /** Use this prop to override the default width. Numbers from 0-1 are converted to percentage widths. Numbers greater
   * than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to
   * responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme.
   * Please note this component has a minWidth of 600px */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Set the base color variant */
  variant: PropTypes.oneOf(["light", "dark"]),
};

export default DismissibleBox;
