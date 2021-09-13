import { ThemeContext } from "styled-components";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import Icon from "../../icon";
import baseTheme from "../../../style/themes/base";

const InternalButtonIcon = ({ buttonType, ...props }) => {
  const theme = useContext(ThemeContext) || baseTheme;
  const iconColorMap = {
    primary: theme.colors.white,
    secondary: theme.colors.primary,
    tertiary: theme.colors.primary,
    darkBackground: theme.colors.primary,
  };

  return (
    <Icon
      bg="transparent"
      bgSize="extra-small"
      {...props}
      color={iconColorMap[buttonType]}
    />
  );
};

InternalButtonIcon.propTypes = {
  buttonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
  /** HTML button type property */
  type: PropTypes.string,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
};

export default InternalButtonIcon;
