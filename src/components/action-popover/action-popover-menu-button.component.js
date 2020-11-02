import React from "react";
import PropTypes from "prop-types";
import { MenuButtonOverrideWrapper } from "./action-popover.style";
import Button from "../button";

const ActionPopoverMenuButton = ({
  buttonType,
  iconType,
  iconPosition,
  size,
  children,
  ...props
}) => (
  <MenuButtonOverrideWrapper>
    <Button
      buttonType={buttonType}
      iconType={iconType}
      iconPosition={iconPosition}
      size={size}
      {...props}
    >
      {children}
    </Button>
  </MenuButtonOverrideWrapper>
);

ActionPopoverMenuButton.propTypes = {
  buttonType: PropTypes.string,
  iconType: PropTypes.string,
  iconPosition: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};

export default ActionPopoverMenuButton;
