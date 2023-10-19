import React from "react";
import StyledButton from "./button.style";
import StyledNavbar from "./navbar.style";
import Icon from "../../../icon";
import useLocale from "../../../../hooks/__internal__/useLocale";

export interface NavbarProps {
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  className?: string;
}

export const Navbar = ({
  onPreviousClick,
  onNextClick,
  className,
}: NavbarProps) => {
  const locale = useLocale();
  const { previousMonthButton, nextMonthButton } = locale.date.ariaLabels;

  return (
    <StyledNavbar className={className}>
      <StyledButton
        aria-label={previousMonthButton()}
        onClick={() => onPreviousClick?.()}
      >
        <Icon type="chevron_left" />
      </StyledButton>
      <StyledButton
        aria-label={nextMonthButton()}
        onClick={() => onNextClick?.()}
      >
        <Icon type="chevron_right" />
      </StyledButton>
    </StyledNavbar>
  );
};

export default Navbar;
