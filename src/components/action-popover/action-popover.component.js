import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import { MenuButton, ButtonIcon } from "./action-popover.style";
import Events from "../../utils/helpers/events";
import createGuid from "../../utils/helpers/guid";
import ActionPopoverMenu from "./action-popover-menu.component";
import ActionPopoverItem from "./action-popover-item.component";
import ActionPopoverDivider from "./action-popover-divider.component";

const ActionPopover = ({
  children,
  id,
  onOpen,
  onClose,
  rightAlignMenu,
  renderButton,
  placement = "bottom",
  ...rest
}) => {
  const [isOpen, setOpenState] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [guid] = useState(createGuid());
  const button = useRef();
  const menu = useRef();

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
        button.current.focus();
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
        onButtonClick(e);
      } else if (Events.isUpKey(e)) {
        e.preventDefault();
        setFocusIndex(items.length - 1);
        setOpen(true);
      }
    },
    [items, onButtonClick, setOpen]
  );

  useEffect(() => {
    const handler = (e) => {
      // If the event came from part of this component, close the menu.
      // There will be multiple document click listeners but we cant prevent propagation because it will interfere with
      // other instances on the same page
      if (!Events.composedPath(e).includes(button.current)) {
        setOpen(false);
      }
    };
    const event = "click";
    document.addEventListener(event, handler);

    return function cleanup() {
      document.removeEventListener(event, handler);
    };
  }, [setOpen]);

  const menuButton = () => {
    if (renderButton) {
      return renderButton({
        tabIndex: -1,
        "data-element": "action-popover-menu-button",
      });
    }

    return <ButtonIcon type="ellipsis_vertical" />;
  };

  const parentID = id || `ActionPopoverButton_${guid}`;
  const menuID = `ActionPopoverMenu_${guid}`;
  const menuProps = {
    button,
    parentID,
    setFocusIndex,
    focusIndex,
    setItems,
    items,
    menuID,
    isOpen,
    setOpen,
    rightAlignMenu,
    placement,
  };

  return (
    <MenuButton
      id={parentID}
      data-component="action-popover-button"
      role="button"
      aria-haspopup="true"
      aria-label={I18n.t("actionpopover.aria-label", {
        defaultValue: "actions",
      })}
      aria-controls={menuID}
      aria-expanded={isOpen}
      tabIndex={isOpen ? "-1" : "0"}
      {...{ onKeyDown: onButtonKeyDown, onClick: onButtonClick, isOpen }}
      ref={button}
      {...rest}
    >
      {menuButton()}
      <ActionPopoverMenu
        data-component="action-popover"
        role="menu"
        ref={menu}
        {...menuProps}
      >
        {children}
      </ActionPopoverMenu>
    </MenuButton>
  );
};

ActionPopover.propTypes = {
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
  /** Set whether the menu should open above or below the button */
  placement: PropTypes.oneOf(["bottom", "top"]),
};

ActionPopover.defaultProps = {
  id: null,
  onOpen: () => {},
  onClose: () => {},
};

export default ActionPopover;
