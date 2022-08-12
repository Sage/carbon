import React, {
  useContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "styled-components";
import { MarginProps } from "styled-system";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Icon, { IconType } from "../icon";
import Button from "../button";
import StyledSplitButton from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import Events from "../../__internal__/utils/helpers/events";
import guid from "../../__internal__/utils/helpers/guid";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { baseTheme } from "../../style/themes";
import useMenuKeyboardNavigation from "../../hooks/__internal__/useMenuKeyboardNavigation";

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
  const buttonChildren = useMemo(() => React.Children.toArray(children), [
    children,
  ]);
  const buttonChildrenRefs = useMemo<React.RefObject<HTMLButtonElement>[]>(
    () => buttonChildren.map(() => React.createRef()),
    [buttonChildren]
  );
  const splitButtonNode = useRef<HTMLDivElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const hideButtons = useCallback(() => {
    if (toggleButton.current === document.activeElement) return;

    setShowAdditionalButtons(false);
  }, []);

  const handleKeyDown = useMenuKeyboardNavigation(
    toggleButton,
    buttonChildrenRefs,
    hideButtons
  );

  function showButtons() {
    setShowAdditionalButtons(true);

    /* istanbul ignore else */
    if (splitButtonNode.current) {
      setMinWidth(
        CONTENT_WIDTH_RATIO *
          splitButtonNode.current.getBoundingClientRect().width
      );
    }
  }

  function handleToggleButtonKeyDown(
    ev: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (
      Events.isEnterKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDownKey(ev) ||
      Events.isUpKey(ev)
    ) {
      ev.preventDefault();

      if (!showAdditionalButtons) {
        showButtons();
      }

      setTimeout(() => {
        buttonChildrenRefs[0]?.current?.focus();
      }, 0);
    } else if (Events.isEscKey(ev)) {
      setShowAdditionalButtons(false);
      ev.preventDefault();
    }
  }

  const mainButtonProps = {
    onMouseEnter: hideButtons,
    onFocus: hideButtons,
    onTouchStart: hideButtons,
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
    ...(!disabled && { onMouseEnter: showButtons }),
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

  function childrenWithProps() {
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.filter(Boolean).map((child, index) => {
      const childProps = {
        key: index.toString(),
        role: "menuitem",
        ref: buttonChildrenRefs[index],
        tabIndex: -1,
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
          if (child.props.onClick) child.props.onClick(ev);
          hideButtons();
          toggleButton.current?.focus();
        },
      };

      return React.cloneElement(child, childProps);
    });
  }

  function renderAdditionalButtons() {
    if (!showAdditionalButtons) return null;

    return (
      <Popover placement="bottom-end" reference={splitButtonNode}>
        <StyledSplitButtonChildrenContainer
          role="menu"
          aria-label={text}
          data-element="additional-buttons"
          align={align}
          minWidth={minWidth}
          onKeyDown={handleKeyDown}
        >
          {childrenWithProps()}
        </StyledSplitButtonChildrenContainer>
      </Popover>
    );
  }

  const handleClick = useClickAwayListener(hideButtons);

  return (
    <StyledSplitButton
      aria-haspopup="true"
      onMouseLeave={hideButtons}
      onClick={handleClick}
      ref={splitButtonNode}
      {...componentTags()}
      {...filterStyledSystemMarginProps(rest)}
    >
      {renderMainButton()}
      {renderAdditionalButtons()}
    </StyledSplitButton>
  );
};

export default SplitButton;
