import React, { useContext, useRef } from "react";
import { ThemeContext } from "styled-components";
import { MarginProps } from "styled-system";
import { flip, offset } from "@floating-ui/dom";

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
import useLocale from "../../hooks/__internal__/useLocale";

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
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** Gives the button a disabled state. */
  disabled?: boolean;
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** The size of the buttons. */
  size?: "small" | "medium" | "large";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** The text to be displayed in the main button. */
  text: string;
  /** Sets rendering position of menu */
  position?: "left" | "right";
}

export const SplitButton = ({
  align = "left",
  position = "right",
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
  "aria-label": ariaLabel,
  ...rest
}: SplitButtonProps) => {
  const locale = useLocale();
  const theme = useContext(ThemeContext) || baseTheme;
  const buttonLabelId = useRef(guid());

  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  const {
    showAdditionalButtons,
    showButtons,
    hideButtons,
    buttonNode,
    handleToggleButtonKeyDown,
    wrapperProps,
    contextValue,
  } = useChildButtons(toggleButton, CONTENT_WIDTH_RATIO);

  const handleMainClick = (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    // ensure button is focused when clicked (Safari)
    mainButtonRef.current?.focus();
    if (onClick) {
      onClick(ev as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const mainButtonProps = {
    onFocus: hideButtons,
    onTouchStart: hideButtons,
    iconPosition,
    buttonType,
    disabled,
    iconType,
    onClick: handleMainClick,
    size,
    subtext,
    ...filterOutStyledSystemSpacingProps(rest),
  };

  const handleToggleClick = () => {
    // ensure button is focused when clicked (Safari)
    toggleButton.current?.focus();
    showButtons();
  };

  const toggleButtonProps = {
    disabled,
    displayed: showAdditionalButtons,
    onTouchStart: showButtons,
    onKeyDown: handleToggleButtonKeyDown,
    onClick: handleToggleClick,
    buttonType,
    size,
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
        ref={mainButtonRef}
        {...mainButtonProps}
      >
        {text}
      </Button>,
      <StyledSplitButtonToggle
        aria-haspopup="true"
        aria-expanded={showAdditionalButtons}
        aria-label={ariaLabel || locale.splitButton.ariaLabel()}
        data-element="toggle-button"
        key="toggle-button"
        type="button"
        ref={toggleButton}
        {...toggleButtonProps}
      >
        <Icon
          type="dropdown"
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
      <Popover
        placement={
          position === "left"
            ? /* istanbul ignore next */ "bottom-start"
            : "bottom-end"
        }
        reference={buttonNode}
        middleware={[
          offset(6),
          flip({
            fallbackStrategy: "initialPlacement",
          }),
        ]}
      >
        <StyledSplitButtonChildrenContainer {...wrapperProps} align={align}>
          <SplitButtonContext.Provider value={contextValue}>
            {React.Children.map(children, (child) => (
              <li>{child}</li>
            ))}
          </SplitButtonContext.Provider>
        </StyledSplitButtonChildrenContainer>
      </Popover>
    );
  }

  const handleClick = useClickAwayListener(hideButtons);
  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <StyledSplitButton
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
