import React from "react";
import PropTypes from "prop-types";
import StyledButton from "./button.style";
import StyledNavbar from "./navbar.style";
import Icon from "../../icon";

const Navbar = ({ onPreviousClick, onNextClick, ...props }) => {
  return (
    <StyledNavbar {...props}>
      <StyledButton onClick={() => onPreviousClick()}>
        <Icon type="chevron_left" />
      </StyledButton>
      <StyledButton onClick={() => onNextClick()}>
        <Icon type="chevron_right" />
      </StyledButton>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default Navbar;
