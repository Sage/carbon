import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";

import {
  MenuButton,
  ButtonIcon,
  StyledButtonIcon,
} from "./action-popover.style";
import Events from "../../__internal__/utils/helpers/events";
import Popover from "../../__internal__/popover";
import createGuid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import ActionPopoverMenu from "./action-popover-menu/action-popover-menu.component";
import ActionPopoverItem from "./action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "./action-popover-divider/action-popover-divider.component";
import ActionPopoverContext from "./action-popover-context";
import useModalManager from "../../hooks/__internal__/useModalManager";

interface RenderButtonProps {
  tabIndex: number;
  "data-element": string;
  ariaAttributes: {
    "aria-haspopup": string;
    "aria-label": string;
    "aria-controls": string;
    "aria-expanded": string;
  };
}

export interface ActionPopoverProps extends MarginProps {
  /** Children for popover component */
  children?: React.ReactNode;
  /** Horizontal alignment of menu items content */
  horizontalAlignment?: "left" | "right";
  /** Unique ID */
  id?: string;
  /** Callback to be called on menu open */
  onOpen?: () => void;
  /** Callback to be called on menu close */
  onClose?: () => void;
  /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
  /** Render a custom menu button to override default ellipsis icon */
  renderButton?: (buttonProps: RenderButtonProps) => React.ReactNode;
  /** Boolean to control whether menu should align to right */
  rightAlignMenu?: boolean;
}

const onOpenDefault = () => {};
const onCloseDefault = () => {};

export const ActionPopover = ({
  children,
  id,
  onOpen = onOpenDefault,
  onClose = onCloseDefault,
  rightAlignMenu,
  renderButton,
  placement = "bottom",
  horizontalAlignment = "left",
  ...rest
}: ActionPopoverProps) => {
  const l = useLocale();
  const [isOpen, setOpenState] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [guid] = useState(createGuid());
  const buttonRef = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const itemCount = useMemo(() => {
    return React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child) && child.type === ActionPopoverItem;
    }).length;
  }, [children]);

  const hasProperChildren = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) => {
        if (!React.isValidElement(child)) {
          return true;
        }

        return (
          child.type !== ActionPopoverItem &&
          child.type !== ActionPopoverDivider
        );
      }
    );

    return !incorrectChild;
  }, [children]);

  invariant(
    hasProperChildren,
    `ActionPopover only accepts children of type \`${ActionPopoverItem.displayName}\`` +
      ` and \`${ActionPopoverDivider.displayName}\`.`
  );

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

  const focusButton = useCallback(() => {
    const button = buttonRef.current?.querySelector<HTMLElement>(
      "[data-element='action-popover-button']"
    );

    button?.focus();
  }, []);

  const onButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      const isOpening = !isOpen;
      setOpen(isOpening);
      if (!isOpening) {
        // Closing the menu should focus the MenuButton
        focusButton();
      }
    },
    [isOpen, setOpen, focusButton]
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

  const handleEscapeKey = useCallback(
    (e) => {
      /* istanbul ignore else */
      if (Events.isEscKey(e)) {
        setOpen(false);
        focusButton();
      }
    },
    [setOpen, focusButton]
  );

  useModalManager(isOpen, handleEscapeKey, buttonRef);

  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      // If the event didn't came from part of this component, close the menu.
      // There will be multiple document click listeners but we cant prevent propagation because it will interfere with
      // other instances on the same page

      const isInMenu = menu.current && menu.current.contains(target as Node);
      const isInButton =
        buttonRef.current && buttonRef.current.contains(target as Node);

      if (!isInMenu && !isInButton) {
        setOpen(false);
      }
    };
    const event = "click";
    document.addEventListener(event, handler, { capture: true });

    return function cleanup() {
      document.removeEventListener(event, handler, { capture: true });
    };
  }, [setOpen]);

  const menuButton = (menuID: string) => {
    if (renderButton) {
      return renderButton({
        tabIndex: isOpen ? -1 : 0,
        "data-element": "action-popover-button",
        ariaAttributes: {
          "aria-haspopup": "true",
          "aria-label": l.actionPopover.ariaLabel(),
          "aria-controls": menuID,
          "aria-expanded": `${isOpen}`,
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
        tabIndex={isOpen ? -1 : 0}
        data-element="action-popover-button"
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

export default ActionPopover;
