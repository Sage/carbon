import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button, { ButtonWithForwardRef } from "../button";
import Events from "../../__internal__/utils/helpers/events";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import Logger from "../../__internal__/utils/logger";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

let deprecatedWarnTriggered = false;

const MultiActionButton = ({
  align = "left",
  disabled,
  as,
  buttonType,
  size,
  children,
  text,
  subtext,
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}) => {
  if (!deprecatedWarnTriggered && as) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      // eslint-disable-next-line max-len
      "The `as` prop is deprecated and will soon be removed from the `MultiActionButton` component interface. You should use the `buttonType` prop to achieve the same styling. The following codemod is available to help with updating your code https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop"
    );
  }

  const ref = useRef();
  const buttonRef = useRef();
  const buttonContainer = useRef();
  const userInputType =
    "ontouchstart" in document.documentElement ? "touchstart" : "click";
  const buttonChildren = React.Children.toArray(children);
  const additionalButtons = useRef(buttonChildren.map(() => React.createRef()));
  const listening = useRef(false);
  const isMainButtonFocused = useRef(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [removeHandleClickOutside, setRemoveHandleClickOutside] = useState(
    false
  );
  const [removeHandleKeyDown, setRemoveHandleKeyDown] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const childrenWithProps = () => {
    return buttonChildren.map((child, index) => {
      const props = {
        key: index.toString(),
        role: "menuitem",
        ref: additionalButtons.current[index],
        tabIndex: -1,
      };

      if (child.type === Button) {
        return <ButtonWithForwardRef {...child.props} {...props} />;
      }

      return React.cloneElement(child, props);
    });
  };

  const hideButtons = useCallback(() => {
    if (isMainButtonFocused.current) return;

    setShowAdditionalButtons(false);
    setRemoveHandleClickOutside(true);

    /* istanbul ignore else */
    if (listening.current) {
      setRemoveHandleKeyDown(true);
      listening.current = false;
    }
  }, []);

  const handleKeyDown = useCallback(
    (ev) => {
      const currentIndex = additionalButtons.current.findIndex(
        (node) => node.current === document.activeElement
      );
      let nextIndex = -1;

      if (Events.isUpKey(ev)) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
        ev.preventDefault();
      }
      if (Events.isDownKey(ev)) {
        nextIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
        ev.preventDefault();
      } else if (Events.isTabKey(ev)) {
        const elements = Array.from(
          document.querySelectorAll(defaultFocusableSelectors)
        ).filter((el) => Number(el.tabIndex) !== -1);
        const indexOf = elements.indexOf(buttonRef.current);
        elements[indexOf]?.focus();

        // timeout enforces that the "hideButtons" method will be run after browser focuses on the next element
        setTimeout(hideButtons, 0);
      }

      if (nextIndex > -1) {
        additionalButtons.current[nextIndex].current.focus();
      }
    },
    [children.length, hideButtons]
  );

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (
        !ref.current.contains(target) &&
        buttonContainer.current &&
        !buttonContainer.current.contains(target)
      ) {
        hideButtons(handleClickOutside, undefined);
      }
    },
    [hideButtons]
  );

  const showButtons = () => {
    document.addEventListener(userInputType, handleClickOutside);
    setShowAdditionalButtons(true);

    setMinWidth(ref.current.getBoundingClientRect().width);

    /* istanbul ignore else */
    if (!listening.current) {
      document.addEventListener("keydown", handleKeyDown);
      listening.current = true;
    }
  };

  const handleMainButtonKeyDown = (ev) => {
    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      additionalButtons.current[0].current.focus();
    }
  };

  const focusMainButton = () => {
    isMainButtonFocused.current = true;
    showButtons();
  };

  const mainButtonProps = () => {
    const opts = {
      disabled,
      displayed: showAdditionalButtons,
      onTouchStart: showButtons,
      onFocus: focusMainButton,
      onBlur: () => {
        isMainButtonFocused.current = false;
      },
      onKeyDown: handleMainButtonKeyDown,
      buttonType: buttonType || as,
      size,
      subtext,
      ...filterOutStyledSystemSpacingProps(rest),
    };

    if (!disabled) {
      opts.onMouseEnter = showButtons;
    }

    return opts;
  };

  const renderAdditionalButtons = () => (
    <Popover placement="bottom-end" reference={ref}>
      <StyledButtonChildrenContainer
        role="menu"
        aria-label={text}
        data-element="additional-buttons"
        align={align}
        minWidth={minWidth}
        ref={buttonContainer}
      >
        {childrenWithProps()}
      </StyledButtonChildrenContainer>
    </Popover>
  );

  useEffect(() => {
    if (removeHandleClickOutside) {
      setRemoveHandleClickOutside(false);
      document.removeEventListener(userInputType, handleClickOutside);
    }

    if (removeHandleKeyDown) {
      setRemoveHandleKeyDown(false);
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [
    handleClickOutside,
    handleKeyDown,
    removeHandleClickOutside,
    removeHandleKeyDown,
    userInputType,
  ]);

  useEffect(() => {
    return () => {
      document.removeEventListener(userInputType, handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown, userInputType]);

  return (
    <StyledMultiActionButton
      aria-haspopup="true"
      onMouseLeave={hideButtons}
      ref={ref}
      data-component="multi-action-button"
      data-element={dataElement}
      data-role={dataRole}
      align={align}
      displayed={showAdditionalButtons}
      {...filterStyledSystemMarginProps(rest)}
    >
      <Button
        aria-haspopup="true"
        aria-expanded={showAdditionalButtons}
        aria-label="Show more"
        data-element="toggle-button"
        key="toggle-button"
        onKeyDown={handleMainButtonKeyDown}
        {...mainButtonProps()}
        forwardRef={buttonRef}
        iconPosition="after"
        iconType="dropdown"
      >
        {text}
      </Button>
      {showAdditionalButtons && renderAdditionalButtons()}
    </StyledMultiActionButton>
  );
};

MultiActionButton.propTypes = {
  ...marginPropTypes,
  /** Button type: "primary" | "secondary" | "tertiary" */
  buttonType: PropTypes.oneOf(["primary", "secondary", "tertiary"]),

  /** The additional button to display. */
  children: PropTypes.node.isRequired,

  /** Second text child, renders under main text, only when size is "large". */
  subtext: PropTypes.string,

  /** Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'. */
  as: PropTypes.string,

  /** The text to be displayed in the SplitButton. */
  text: PropTypes.string.isRequired,

  /** Gives the button a disabled state. */
  disabled: PropTypes.bool,

  /** The size of the MultiActionButton. */
  size: PropTypes.oneOf(["small", "medium", "large"]),

  /** A custom value for the data-element attribute. */
  "data-element": PropTypes.string,

  /** A custom value for the data-element attribute. */
  "data-role": PropTypes.string,

  /** Aligns the button's options */
  align: PropTypes.oneOf(["left", "right"]),
};

export default MultiActionButton;
