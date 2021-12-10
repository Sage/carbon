import React from "react";
import PropTypes from "prop-types";
import { StyledButtonToggleIcon } from "./button-toggle.style";
import Icon from "../icon";

const ButtonToggleIcon = (props) => (
  <StyledButtonToggleIcon {...props}>
    <Icon
      type={props.buttonIcon}
      fontSize={props.buttonIconSize}
      bgSize="extra-small"
      {...props}
    />
  </StyledButtonToggleIcon>
);

ButtonToggleIcon.propTypes = {
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * buttonIcon to render.
   */
  buttonIcon: PropTypes.string,
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize: PropTypes.oneOf(["small", "large"]),
};

export default ButtonToggleIcon;
