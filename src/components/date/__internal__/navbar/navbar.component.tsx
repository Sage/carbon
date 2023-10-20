import React from "react";
import StyledButton from "./button.style";
import StyledNavbar from "./navbar.style";
import Icon from "../../../icon";
import Events from "../../../../__internal__/utils/helpers/events";
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

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      Events.isLeftKey(ev) ||
      Events.isRightKey(ev) ||
      Events.isUpKey(ev) ||
      Events.isDownKey(ev)
    ) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  return (
    <StyledNavbar className={className}>
      <StyledButton
        aria-label={previousMonthButton()}
        onClick={() => onPreviousClick?.()}
        onKeyDown={handleKeyDown}
      >
        <Icon type="chevron_left" />
      </StyledButton>
      <StyledButton
        aria-label={nextMonthButton()}
        onClick={() => onNextClick?.()}
        onKeyDown={handleKeyDown}
      >
        <Icon type="chevron_right" />
      </StyledButton>
    </StyledNavbar>
  );
};

export default Navbar;
