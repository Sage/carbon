import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

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
import {
  ActionPopoverProvider,
  Alignment,
} from "./__internal__/action-popover.context";
import useModalManager from "../../hooks/__internal__/useModalManager";
import {
  findFirstFocusableItem,
  findLastFocusableItem,
  getItems,
  checkChildrenForString,
} from "./__internal__/action-popover.utils";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";

export interface RenderButtonProps {
  tabIndex: number;
  "data-element": string;
  ariaAttributes: {
    "aria-haspopup": string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-controls": string;
    "aria-expanded": string;
  };
}

export interface ActionPopoverProps extends MarginProps, TagProps {
  /** Children for popover component */
  children?: React.ReactNode;
  /** Horizontal alignment of menu items content */
  horizontalAlignment?: Alignment;
  /** Sets submenu position */
  submenuPosition?: Alignment;
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
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** Prop to specify an aria-labelledby for the component */
  "aria-labelledby"?: string;
  /** Prop to specify an aria-describedby for the component */
  "aria-describedby"?: string;
}

export type ActionPopoverHandle = {
  focusButton: () => void;
} | null;

const onOpenDefault = () => {};
const onCloseDefault = () => {};

export const ActionPopover = forwardRef<
  ActionPopoverHandle,
  ActionPopoverProps
>(
  (
    {
      children,
      id,
      onOpen = onOpenDefault,
      onClose = onCloseDefault,
      rightAlignMenu,
      renderButton,
      placement = "bottom",
      horizontalAlignment = "left",
      submenuPosition = "left",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const l = useLocale();
    const [isOpen, setOpenState] = useState(false);
    const [focusIndex, setFocusIndex] = useState(0);
    const [guid] = useState(createGuid());
    const buttonRef = useRef<HTMLDivElement>(null);
    const menu = useRef<HTMLUListElement>(null);
    const { isInFlatTable } = useContext(FlatTableContext);

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
        },
      );

      return !incorrectChild;
    }, [children]);

    const items = useMemo(() => getItems(children), [children]);

    const firstFocusableItem = findFirstFocusableItem(items);

    const lastFocusableItem = findLastFocusableItem(items);

    invariant(
      hasProperChildren,
      `ActionPopover only accepts children of type \`${ActionPopoverItem.displayName}\`` +
        ` and \`${ActionPopoverDivider.displayName}\`.`,
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
      (value: boolean) => {
        if (value && !isOpen) {
          onOpen();
        }
        if (!value && isOpen) {
          onClose();
        }
        setOpenState(value);
      },
      [isOpen, onOpen, onClose],
    );

    const focusButton = useCallback(() => {
      const button = buttonRef.current?.querySelector<HTMLElement>(
        "[data-element='action-popover-button']",
      );

      button?.focus();
    }, []);

    useImperativeHandle<ActionPopoverHandle, ActionPopoverHandle>(
      ref,
      () => ({
        focusButton() {
          focusButton();
        },
      }),
      [focusButton],
    );

    const onButtonClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        const isOpening = !isOpen;
        setFocusIndex(firstFocusableItem);
        setOpen(isOpening);
        if (!isOpening) {
          // Closing the menu should focus the MenuButton
          focusButton();
        }
      },
      [isOpen, firstFocusableItem, setOpen, focusButton],
    );

    // Keyboard commands implemented as recommended by WAI-ARIA best practices
    // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html

    const onButtonKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (
          Events.isSpaceKey(e) ||
          Events.isDownKey(e) ||
          Events.isEnterKey(e)
        ) {
          e.preventDefault();
          e.stopPropagation();
          setFocusIndex(firstFocusableItem);
          setOpen(true);
        } else if (Events.isUpKey(e)) {
          e.preventDefault();
          e.stopPropagation();
          setFocusIndex(lastFocusableItem);
          setOpen(true);
        }
      },
      [firstFocusableItem, lastFocusableItem, setOpen],
    );

    const handleEscapeKey = useCallback(
      (e: KeyboardEvent) => {
        /* istanbul ignore else */
        if (Events.isEscKey(e)) {
          setOpen(false);
          focusButton();
        }
      },
      [setOpen, focusButton],
    );

    useModalManager({
      open: isOpen,
      closeModal: handleEscapeKey,
      modalRef: buttonRef,
    });

    useEffect(() => {
      const handler = ({ target }: MouseEvent) => {
        // If the event didn't come from part of this component, close the menu.
        // There will be multiple document click listeners but we cant prevent propagation because it will interfere with
        // other instances on the same page

        const isInMenu = menu?.current?.contains(target as Node);
        const isInButton = buttonRef?.current?.contains(target as Node);

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
        const renderButtonComponent = renderButton({
          tabIndex: isOpen ? -1 : 0,
          "data-element": "action-popover-button",
          ariaAttributes: {
            "aria-haspopup": "true",
            "aria-label": ariaLabel || l.actionPopover.ariaLabel(),
            "aria-labelledby": ariaLabelledBy,
            "aria-describedby": ariaDescribedBy,
            "aria-controls": menuID,
            "aria-expanded": `${isOpen}`,
          },
        });

        const buttonHasString = checkChildrenForString(renderButtonComponent);

        return renderButton({
          tabIndex: isOpen ? -1 : 0,
          "data-element": "action-popover-button",
          ariaAttributes: {
            "aria-haspopup": "true",
            "aria-label": buttonHasString
              ? undefined
              : ariaLabel || l.actionPopover.ariaLabel(),
            "aria-labelledby": ariaLabelledBy,
            "aria-describedby": ariaDescribedBy,
            "aria-controls": menuID,
            "aria-expanded": `${isOpen}`,
          },
        });
      }

      return (
        <StyledButtonIcon
          role="button"
          aria-haspopup="true"
          aria-label={ariaLabel || l.actionPopover.ariaLabel()}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
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
        {...{ onKeyDown: onButtonKeyDown, onClick: onButtonClick, isOpen }}
        ref={buttonRef}
        {...rest}
        {...tagComponent("action-popover-wrapper", rest)}
      >
        {menuButton(menuID)}
        <ActionPopoverProvider
          value={{
            setOpenPopover: setOpen,
            focusButton,
            submenuPosition,
            isOpenPopover: isOpen,
          }}
        >
          {isOpen && (
            <Popover
              placement={mappedPlacement}
              reference={buttonRef}
              disableBackgroundUI={isInFlatTable}
            >
              <ActionPopoverMenu
                data-component="action-popover"
                ref={menu}
                {...menuProps}
              >
                {children}
              </ActionPopoverMenu>
            </Popover>
          )}
        </ActionPopoverProvider>
      </MenuButton>
    );
  },
);

export default ActionPopover;
