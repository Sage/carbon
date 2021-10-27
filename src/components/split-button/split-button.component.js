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
import Button, { ButtonWithForwardRef } from "../button";
import StyledSplitButton from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import Events from "../../__internal__/utils/helpers/events";
import guid from "../../__internal__/utils/helpers/guid";
import Popover from "../../__internal__/popover";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { baseTheme } from "../../style/themes";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const CONTENT_WIDTH_RATIO = 0.75;

const SplitButton = ({
  align = "left",
  as = "secondary",
  buttonType,
  children,
  disabled = false,
  iconPosition = "before",
  iconType,
  onClick,
  size = "medium",
  subtext,
  text,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || baseTheme;
  const isToggleButtonFocused = useRef(false);
  const buttonLabelId = useRef(guid());
  const additionalButtons = useRef([]);
  const splitButtonNode = useRef();
  const buttonContainer = useRef();
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);
  const userInputType = useRef(
    "ontouchstart" in document.documentElement ? "touchstart" : "click"
  );

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
      if (!showAdditionalButtons) {
        return;
      }

      const numOfChildren = children.length - 1;
      const currentIndex = additionalButtons.current.findIndex(isActiveElement);
      let nextIndex = -1;

      if (Events.isUpKey(ev)) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : numOfChildren;
        ev.preventDefault();
      }
      if (Events.isDownKey(ev)) {
        nextIndex = currentIndex < numOfChildren ? currentIndex + 1 : 0;
        ev.preventDefault();
      } else if (Events.isTabKey(ev)) {
        // timeout enforces that the "hideButtons" method will be run after browser focuses on the next element
        setTimeout(hideButtons, 0);
      }

      if (nextIndex > -1) {
        additionalButtons.current[nextIndex].focus();
      }
    },
    [hideButtons, children, showAdditionalButtons]
  );

  useEffect(() => {
    const inputType = userInputType.current;

    document.addEventListener(inputType, handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener(inputType, handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  function mainButtonProps() {
    return {
      onMouseEnter: hideButtons,
      onFocus: hideButtons,
      onTouchStart: hideButtons,
      iconPosition,
      as,
      buttonType,
      disabled,
      iconType,
      onClick,
      size,
      subtext,
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
      buttonType: buttonType || as,
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
      "data-element": rest["data-element"],
      "data-role": rest["data-role"],
    };
  }

  function addRef(ref, index) {
    if (!ref) return;
    additionalButtons.current[index] = ref;
  }

  function getIconColor() {
    const colorsMap = {
      primary: theme.colors.white,
      secondary: theme.colors.primary,
    };
    return colorsMap[buttonType || as];
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
    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      additionalButtons.current[0].focus();
    }
  }

  function childrenWithProps() {
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.filter(Boolean).map((child, index) => {
      const childProps = {
        key: index.toString(),
        role: "menuitem",
        ref: (button) => addRef(button, index),
        tabIndex: -1,
      };
      if (child.type === Button) {
        return <ButtonWithForwardRef {...child.props} {...childProps} />;
      }

      return React.cloneElement(child, childProps);
    });
  }

  function focusToggleButton() {
    isToggleButtonFocused.current = true;
    showButtons();
  }

  function isActiveElement(node) {
    return node === document.activeElement;
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
  /** Button type: "primary" | "secondary" for legacy theme */
  as: PropTypes.oneOf(["primary", "secondary"]),
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

SplitButton.safeProps = ["buttonType", "as", "disabled", "size"];

export default SplitButton;
