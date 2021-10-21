import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import {
  MenuButton,
  ButtonIcon,
  StyledButtonIcon,
} from "./action-popover.style";
import Events from "../../__internal__/utils/helpers/events";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Popover from "../../__internal__/popover";
import createGuid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import ActionPopoverMenu from "./action-popover-menu/action-popover-menu.component";
import ActionPopoverItem from "./action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "./action-popover-divider/action-popover-divider.component";
import ActionPopoverContext from "./action-popover-context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ActionPopover = ({
  children,
  id,
  onOpen,
  onClose,
  rightAlignMenu,
  renderButton,
  placement = "bottom",
  horizontalAlignment,
  ...rest
}) => {
  const l = useLocale();
  const [isOpen, setOpenState] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [guid] = useState(createGuid());
  const buttonRef = useRef();
  const menu = useRef();

  const itemCount = useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) => child.type === ActionPopoverItem
    ).length;
  }, [children]);

  const mappedPlacement = useMemo(() => {
    if (placement === "top" && !rightAlignMenu) {
      return "top-end";
    }

    if (placement === "top" && rightAlignMenu) {
      return "top-start";
    }

    if (placement === "bottom" && rightAlignMenu) {
      return "bottom-start";
    }

    return "bottom-end";
  }, [placement, rightAlignMenu]);

  const setOpen = useCallback(
    (value) => {
      if (value && !isOpen) {
        onOpen();
      }
      if (!value && isOpen) {
        onClose();
      }
      setOpenState(value);
    },
    [isOpen, onOpen, onClose]
  );

  const onButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      const isOpening = !isOpen;
      setOpen(isOpening);
      if (!isOpening) {
        // Closing the menu should focus the MenuButton
        buttonRef.current
          .querySelector("[data-component='action-popover-button']")
          .focus();
      }
    },
    [isOpen, setOpen]
  );

  // Keyboard commands implemented as recommended by WAI-ARIA best practices
  // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html

  const onButtonKeyDown = useCallback(
    (e) => {
      if (Events.isSpaceKey(e) || Events.isDownKey(e) || Events.isEnterKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        setFocusIndex(0);
        setOpen(true);
      } else if (Events.isUpKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        setFocusIndex(itemCount - 1);
        setOpen(true);
      }
    },
    [itemCount, setOpen]
  );

  const focusButton = useCallback(
    () =>
      buttonRef.current
        .querySelector("[data-component='action-popover-button']")
        .focus(),
    []
  );

  useEffect(() => {
    const handler = ({ target }) => {
      // If the event didn't came from part of this component, close the menu.
      // There will be multiple document click listeners but we cant prevent propagation because it will interfere with
      // other instances on the same page
      if (
        !buttonRef.current.contains(target) &&
        menu.current &&
        !menu.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const event = "click";
    document.addEventListener(event, handler, { capture: true });

    return function cleanup() {
      document.removeEventListener(event, handler, { capture: true });
    };
  }, [setOpen]);

  const menuButton = (menuID) => {
    if (renderButton) {
      return renderButton({
        tabIndex: isOpen ? "-1" : "0",
        "data-component": "action-popover-button",
        ariaAttributes: {
          "aria-haspopup": "true",
          "aria-label": l.actionPopover.ariaLabel(),
          "aria-controls": menuID,
          "aria-expanded": isOpen,
        },
      });
    }

    return (
      <StyledButtonIcon
        role="button"
        aria-haspopup="true"
        aria-label={l.actionPopover.ariaLabel()}
        aria-controls={menuID}
        aria-expanded={isOpen}
        tabIndex={isOpen ? "-1" : "0"}
        data-component="action-popover-button"
      >
        <ButtonIcon type="ellipsis_vertical" />
      </StyledButtonIcon>
    );
  };

  const parentID = id || `ActionPopoverButton_${guid}`;
  const menuID = `ActionPopoverMenu_${guid}`;
  const menuProps = {
    buttonRef,
    parentID,
    setFocusIndex,
    focusIndex,
    menuID,
    isOpen,
    setOpen,
    rightAlignMenu,
    placement,
    horizontalAlignment,
  };

  return (
    <MenuButton
      id={parentID}
      data-component="action-popover-wrapper"
      {...{ onKeyDown: onButtonKeyDown, onClick: onButtonClick, isOpen }}
      ref={buttonRef}
      {...rest}
    >
      {menuButton(menuID)}
      <ActionPopoverContext.Provider
        value={{ setOpenPopover: setOpen, focusButton, isOpenPopover: isOpen }}
      >
        {isOpen && (
          <Popover placement={mappedPlacement} reference={buttonRef}>
            <ActionPopoverMenu
              data-component="action-popover"
              role="menu"
              ref={menu}
              {...menuProps}
            >
              {children}
            </ActionPopoverMenu>
          </Popover>
        )}
      </ActionPopoverContext.Provider>
    </MenuButton>
  );
};

ActionPopover.propTypes = {
  ...marginPropTypes,
  /** Unique ID */
  id: PropTypes.string,
  /** Callback to be called on menu open */
  onOpen: PropTypes.func,
  /** Callback to be called on menu close */
  onClose: PropTypes.func,
  /** Boolean to control whether menu should align to right */
  rightAlignMenu: PropTypes.bool,
  /** Children for popover component */
  children(props, propName, componentName) {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (child === null) {
        return;
      }
      if (
        ![
          ActionPopoverItem.displayName,
          ActionPopoverDivider.displayName,
        ].includes(child.type.displayName)
      ) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${ActionPopoverItem.displayName}\`` +
            ` and \`${ActionPopoverDivider.displayName}\`.`
        );
      }
    });

    return error;
  },
  /** Render a custom menu button to override default ellipsis icon */
  renderButton: PropTypes.func,
  /** Horizontal alignment of menu items content */
  horizontalAlignment: PropTypes.oneOf(["left", "right"]),
  /** Set whether the menu should open above or below the button */
  placement: PropTypes.oneOf(["top", "bottom"]),
};

const onOpen = () => {};
const onClose = () => {};

ActionPopover.defaultProps = {
  id: null,
  onOpen,
  onClose,
  horizontalAlignment: "left",
};

export default ActionPopover;
