import React, { useContext, useRef } from "react";
import { ThemeContext } from "styled-components";
import { MarginProps } from "styled-system";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Icon, { IconType } from "../icon";
import Button from "../button";
import StyledSplitButton from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import guid from "../../__internal__/utils/helpers/guid";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { baseTheme } from "../../style/themes";
import useChildButtons from "../../hooks/__internal__/useChildButtons";
import SplitButtonContext from "./__internal__/split-button.context";

const CONTENT_WIDTH_RATIO = 0.75;

export interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    MarginProps {
  /** Set align of the rendered content */
  align?: "left" | "right";
  /** Button type: "primary" | "secondary" */
  buttonType?: "primary" | "secondary";
  /** The additional button to display. */
  children: React.ReactNode;
  /** A custom value for the data-element attribute */
  "data-element"?: string;
  /** A custom value for the data-role attribute */
  "data-role"?: string;
  /** Gives the button a disabled state. */
  disabled?: boolean;
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** The size of the buttons in the SplitButton. */
  size?: "small" | "medium" | "large";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** The text to be displayed in the SplitButton. */
  text: string;
}

export const SplitButton = ({
  align = "left",
  buttonType = "secondary",
  children,
  disabled = false,
  iconPosition = "before",
  iconType,
  onClick,
  size = "medium",
  subtext,
  text,
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}: SplitButtonProps) => {
  const theme = useContext(ThemeContext) || baseTheme;
  const buttonLabelId = useRef(guid());

  const toggleButton = useRef<HTMLButtonElement>(null);

  const {
    showAdditionalButtons,
    showButtons,
    hideButtons,
    buttonNode,
    hideButtonsIfTriggerNotFocused,
    handleToggleButtonKeyDown,
    wrapperProps,
    contextValue,
  } = useChildButtons(toggleButton, CONTENT_WIDTH_RATIO);

  const mainButtonProps = {
    onMouseEnter: hideButtonsIfTriggerNotFocused,
    onFocus: hideButtonsIfTriggerNotFocused,
    onTouchStart: hideButtonsIfTriggerNotFocused,
    iconPosition,
    buttonType,
    disabled,
    iconType,
    onClick: onClick as React.MouseEventHandler<
      HTMLButtonElement | HTMLAnchorElement
    >,
    size,
    subtext,
    ...filterOutStyledSystemSpacingProps(rest),
  };

  const toggleButtonProps = {
    disabled,
    displayed: showAdditionalButtons,
    onTouchStart: showButtons,
    onKeyDown: handleToggleButtonKeyDown,
    buttonType,
    size,
    ...(!disabled && { onMouseEnter: showButtons, onClick: showButtons }),
  };

  function componentTags() {
    return {
      "data-component": "split-button",
      "data-element": dataElement,
      "data-role": dataRole,
    };
  }

  function getIconColor() {
    const colorsMap = {
      primary: theme.colors.white,
      secondary: theme.colors.primary,
    };
    return colorsMap[buttonType];
  }

  function renderMainButton() {
    return [
      <Button
        data-element="main-button"
        key="main-button"
        id={buttonLabelId.current}
        {...mainButtonProps}
      >
        {text}
      </Button>,
      <StyledSplitButtonToggle
        aria-haspopup="true"
        aria-expanded={showAdditionalButtons}
        aria-label="Show more"
        data-element="toggle-button"
        key="toggle-button"
        type="button"
        ref={toggleButton}
        {...toggleButtonProps}
      >
        <Icon
          type="dropdown"
          bgSize="extra-small"
          color={getIconColor()}
          bg="transparent"
          disabled={disabled}
        />
      </StyledSplitButtonToggle>,
    ];
  }

  function renderAdditionalButtons() {
    if (!showAdditionalButtons) return null;

    return (
      <Popover placement="bottom-end" reference={buttonNode}>
        <StyledSplitButtonChildrenContainer
          {...wrapperProps}
          aria-label={text}
          align={align}
        >
          <SplitButtonContext.Provider value={contextValue}>
            {children}
          </SplitButtonContext.Provider>
        </StyledSplitButtonChildrenContainer>
      </Popover>
    );
  }

  const handleClick = useClickAwayListener(hideButtons);
  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <StyledSplitButton
      onMouseLeave={hideButtonsIfTriggerNotFocused}
      onClick={handleClick}
      ref={buttonNode}
      {...componentTags()}
      {...marginProps}
    >
      {renderMainButton()}
      {renderAdditionalButtons()}
    </StyledSplitButton>
  );
};

export default SplitButton;
