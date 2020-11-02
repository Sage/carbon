import React from "react";
import PropTypes from "prop-types";
import { StyledButtonToggleIcon } from "./button-toggle.style";
import Icon from "../icon";
import OptionsHelper from "../../utils/helpers/options-helper";

const ButtonToggleIcon = (props) => (
  <StyledButtonToggleIcon {...props}>
    <Icon
      type={props.buttonIcon}
      fontSize={props.buttonIconSize}
      {...props}
      bgTheme="none"
    />
  </StyledButtonToggleIcon>
);

ButtonToggleIcon.propTypes = {
  /** buttonIcon to render. */
  buttonIcon: PropTypes.string,
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize: PropTypes.oneOf(OptionsHelper.sizesBinary),
};

export default ButtonToggleIcon;
