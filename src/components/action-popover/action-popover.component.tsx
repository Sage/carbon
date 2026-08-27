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

import { MenuButton, MenuButtonOverrideWrapper } from "./action-popover.style";
import Events from "../../__internal__/utils/helpers/events";
import { PopoverMenu } from "../../__internal__/popover-menu";
import createGuid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import ActionPopoverItem from "./action-popover-item/action-popover-item.component";
import {
  ActionPopoverProvider,
  Alignment,
} from "./__internal__/action-popover.context";
import useModalManager from "../../hooks/__internal__/useModalManager";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import checkChildrenForString from "./__internal__/action-popover.utils";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";
import Button from "../button/__next__";
import ActionPopoverDivider from "./action-popover-divider.component";

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
  /**
   * @deprecated This prop will be removed in a future major release.
   * Horizontal alignment is now inferred from menu placement.
   */
  horizontalAlignment?: Alignment;
  /**
   * @deprecated This prop will be removed in a future major release.
   * Submenus now default to opening on the right and automatically flip when space is constrained.
   */
  submenuPosition?: Alignment;
  /** Unique ID */
  id?: string;
  /** Callback to be called on menu open */
  onOpen?: () => void;
  /** Callback to be called on menu close */
  onClose?: () => void;
  /**
   * @deprecated This prop will be removed in a future major release.
   * The menu now opens with adaptive placement and flips when space is constrained.
   */
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
      placement,
      horizontalAlignment = "left",
      submenuPosition = "right",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const l = useLocale();
    const [isOpen, setOpenState] = useState(false);
    const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
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

    invariant(
      hasProperChildren,
      `ActionPopover only accepts children of type \`${ActionPopoverItem.displayName}\`` +
        ` and \`${ActionPopoverDivider.displayName}\`.`,
    );

    const mappedPlacement = useMemo(() => {
      if (rightAlignMenu) {
        return "bottom-start";
      }

      return "bottom-end";
    }, [rightAlignMenu]);

    const setOpen = useCallback(
      (value: boolean) => {
        if (value && !isOpen) {
          onOpen();
        }
        if (!value && isOpen) {
          onClose();
        }
        if (!value) {
          setOpenSubmenuId(null);
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
        // The menu renders inline within this wrapper, so clicks on menu items bubble
        // up to here. Only clicks on the trigger itself should toggle the menu.
        const target = e.target as HTMLElement | null;
        if (!target?.closest("[data-element='action-popover-button']")) {
          return;
        }

        e.stopPropagation();
        const isOpening = !isOpen;
        setOpen(isOpening);
        if (!isOpening) {
          // Closing the menu should focus the MenuButton
          focusButton();
        }
      },
      [isOpen, setOpen, focusButton],
    );

    // Keyboard commands implemented as recommended by WAI-ARIA best practices
    // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html

    const onButtonKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        // Only handle keydown events originating from the trigger button itself.
        // This prevents menu item keydowns (e.g., Enter on an href link) from bubbling
        // up and being intercepted by this handler, which would prevent native navigation.
        const target = e.target as HTMLElement | null;
        const fromTrigger = Boolean(
          target?.closest("[data-element='action-popover-button']"),
        );

        if (!fromTrigger) {
          return;
        }

        if (Events.isSpaceKey(e) || Events.isEnterKey(e)) {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }
      },
      [setOpen],
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
        <MenuButtonOverrideWrapper>
          <Button
            variant="default"
            variantType="subtle"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            aria-haspopup="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-controls={menuID}
            aria-expanded={isOpen}
            data-element="action-popover-button"
          >
            Action
          </Button>
        </MenuButtonOverrideWrapper>
      );
    };

    useAdaptiveSidebarModalFocus(() => setOpenState(false));

    const parentID = id || `ActionPopoverButton_${guid}`;
    const menuID = `ActionPopoverMenu_${guid}`;

    return (
      <MenuButton
        id={parentID}
        {...{ onKeyDown: onButtonKeyDown, onClick: onButtonClick, isOpen }}
        ref={buttonRef}
        {...rest}
        {...tagComponent("action-popover-wrapper", rest)}
      >
        <ActionPopoverProvider
          value={{
            setOpenPopover: setOpen,
            focusButton,
            submenuPosition,
            horizontalAlignment,
            openSubmenuId,
            setOpenSubmenuId,
          }}
        >
          <PopoverMenu
            open={isOpen}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isButtonMenu
            placement={mappedPlacement}
            controlReference={buttonRef}
            controlWrapperStyle={{ display: "contents" }}
            listRef={menu}
            listboxAriaLabelledBy={parentID}
            id={menuID}
            disableBackgroundUI={isInFlatTable}
            data-component="action-popover"
            data-role="action-popover"
            popoverControl={() => menuButton(menuID)}
          >
            {children}
          </PopoverMenu>
        </ActionPopoverProvider>
      </MenuButton>
    );
  },
);

export default ActionPopover;
