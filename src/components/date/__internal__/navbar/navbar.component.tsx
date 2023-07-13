import React from "react";
import StyledButton from "./button.style";
import StyledNavbar from "./navbar.style";
import Icon from "../../../icon";

export interface NavbarProps {
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  className?: string;
}

export const Navbar = ({
  onPreviousClick,
  onNextClick,
  className,
}: NavbarProps) => (
  <StyledNavbar className={className}>
    <StyledButton onClick={() => onPreviousClick?.()}>
      <Icon type="chevron_left" />
    </StyledButton>
    <StyledButton onClick={() => onNextClick?.()}>
      <Icon type="chevron_right" />
    </StyledButton>
  </StyledNavbar>
);

export default Navbar;
