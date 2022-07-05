import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Icon from "../icon";
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
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const CONTENT_WIDTH_RATIO = 0.75;

const SplitButton = ({
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
}) => {
  const theme = useContext(ThemeContext) || baseTheme;
  const isToggleButtonFocused = useRef(false);
  const isFocusedAfterClosing = useRef(false);
  const buttonLabelId = useRef(guid());
  const buttonChildren = React.Children.toArray(children);
  const additionalButtons = useRef(buttonChildren.map(() => React.createRef()));
  const splitButtonNode = useRef();
  const toggleButton = useRef();
  const buttonContainer = useRef();
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);
  const listening = useRef(false);

  const hideButtons = useCallback(() => {
    if (isToggleButtonFocused.current) return;

    setShowAdditionalButtons(false);
  }, []);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (
        !splitButtonNode.current.contains(target) &&
        buttonContainer.current &&
        !buttonContainer.current.contains(target)
      ) {
        hideButtons();
      }
    },
    [hideButtons]
  );

  const handleKeyDown = useCallback(
    (ev) => {
      const numOfChildren = children.length - 1;
      const currentIndex = additionalButtons.current.findIndex(
        (node) => node.current === document.activeElement
      );
      let nextIndex = -1;

      if (Events.isUpKey(ev)) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : numOfChildren;
        ev.preventDefault();
      }

      if (Events.isDownKey(ev)) {
        nextIndex = currentIndex < numOfChildren ? currentIndex + 1 : 0;
        ev.preventDefault();
      }

      if (Events.isTabKey(ev)) {
        const elements = Array.from(
          document.querySelectorAll(defaultFocusableSelectors)
        ).filter((el) => Number(el.tabIndex) !== -1);
        const indexOf = elements.indexOf(toggleButton.current);
        elements[indexOf]?.focus();

        // timeout enforces that the "hideButtons" method will be run after browser focuses on the next element
        setTimeout(hideButtons, 0);
      }

      if (nextIndex > -1) {
        additionalButtons.current[nextIndex].current.focus();
      }
    },
    [hideButtons, children]
  );
  const addListeners = useCallback(() => {
    /* istanbul ignore else */
    if (!listening.current) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      listening.current = true;
    }
  }, [handleKeyDown, handleClickOutside]);

  const removeListeners = useCallback(() => {
    /* istanbul ignore else */
    if (listening.current) {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      listening.current = false;
    }
  }, [handleKeyDown, handleClickOutside]);

  useEffect(() => {
    if (showAdditionalButtons) {
      addListeners();
    }

    return () => {
      removeListeners();
    };
  }, [showAdditionalButtons, addListeners, removeListeners]);

  function mainButtonProps() {
    return {
      onMouseEnter: hideButtons,
      onFocus: hideButtons,
      onTouchStart: hideButtons,
      iconPosition,
      buttonType,
      disabled,
      iconType,
      onClick,
      size,
      subtext,
      ...filterOutStyledSystemSpacingProps(rest),
    };
  }

  function toggleButtonProps() {
    const opts = {
      disabled,
      displayed: showAdditionalButtons,
      onTouchStart: showButtons,
      onFocus: focusToggleButton,
      onBlur: () => {
        isToggleButtonFocused.current = false;
      },
      onKeyDown: handleToggleButtonKeyDown,
      buttonType,
      size,
    };

    if (!disabled) {
      opts.onMouseEnter = showButtons;
    }

    return opts;
  }

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
        {...mainButtonProps()}
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
        {...toggleButtonProps()}
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

  function showButtons() {
    setShowAdditionalButtons(true);
    setMinWidth(
      CONTENT_WIDTH_RATIO *
        splitButtonNode.current.getBoundingClientRect().width
    );
  }

  function handleToggleButtonKeyDown(ev) {
    if (
      Events.isEnterKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDownKey(ev)
    ) {
      ev.preventDefault();

      if (!showAdditionalButtons) {
        showButtons();
      }

      setTimeout(() => {
        additionalButtons.current[0]?.current?.focus();
      }, 0);
    }
  }

  function childrenWithProps() {
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.filter(Boolean).map((child, index) => {
      const childProps = {
        key: index.toString(),
        role: "menuitem",
        ref: additionalButtons.current[index],
        tabIndex: -1,
        onClick: (ev) => {
          if (child.props.onClick) child.props.onClick(ev);
          isToggleButtonFocused.current = false;
          hideButtons();
          isFocusedAfterClosing.current = true;
          toggleButton.current?.focus();
        },
      };

      return React.cloneElement(child, childProps);
    });
  }

  function focusToggleButton() {
    isToggleButtonFocused.current = true;
    if (isFocusedAfterClosing.current) {
      isFocusedAfterClosing.current = false;
      return;
    }

    showButtons();
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
          ref={buttonContainer}
        >
          {childrenWithProps()}
        </StyledSplitButtonChildrenContainer>
      </Popover>
    );
  }

  return (
    <StyledSplitButton
      aria-haspopup="true"
      onMouseLeave={hideButtons}
      ref={splitButtonNode}
      {...componentTags()}
      {...filterStyledSystemMarginProps(rest)}
    >
      {renderMainButton()}
      {renderAdditionalButtons()}
    </StyledSplitButton>
  );
};

SplitButton.propTypes = {
  ...marginPropTypes,
  /** Button type: "primary" | "secondary" */
  buttonType: PropTypes.oneOf(["primary", "secondary"]),
  /** The additional button to display. */
  children: PropTypes.node.isRequired,
  /** A custom value for the data-element attribute */
  "data-element": PropTypes.string,
  /** A custom value for the data-role attribute */
  "data-role": PropTypes.string,
  /** Gives the button a disabled state. */
  disabled: PropTypes.bool,
  /** The size of the buttons in the SplitButton. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** The text to be displayed in the SplitButton. */
  text: PropTypes.string.isRequired,
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition: PropTypes.oneOf(["before", "after"]),
  /** Set align of the rendered content */
  align: PropTypes.oneOf(["left", "right"]),
};

SplitButton.safeProps = ["buttonType", "disabled", "size"];

export default SplitButton;
