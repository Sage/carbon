import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";

import {
  MenuItem,
  MenuItemDivider,
  PopoverMenu,
  PopoverControlProps,
} from "../../__internal__/popover-menu";
import createGuid from "../../__internal__/utils/helpers/guid";
import Events from "../../__internal__/utils/helpers/events";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import useLocale from "../../hooks/__internal__/useLocale";
import {
  ActionPopoverProvider,
  Alignment,
} from "./__internal__/action-popover.context";
import checkChildrenForString from "./__internal__/action-popover.utils";
import MenuButton from "./action-popover.style";
import ActionPopoverDivider from "./action-popover-divider/action-popover-divider.component";
import ActionPopoverItem, {
  ActionPopoverItemProps,
} from "./action-popover-item/action-popover-item.component";
import Icon from "../icon";
import Button from "../button/__next__";
import { TypeaheadHandler } from "../../__internal__/popover-menu/hooks";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";

export interface RenderButtonProps {
  tabIndex: number;
  "data-element": string;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  ariaAttributes: {
    "aria-haspopup"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-controls"?: string;
    "aria-expanded"?: string;
  };
}

export interface ActionPopoverProps extends MarginProps, TagProps {
  /** Children for popover component */
  children?: React.ReactNode;
  /** @deprecated This prop is no longer supported and has no effect. */
  horizontalAlignment?: Alignment;
  /** @deprecated This prop is no longer supported and has no effect. */
  submenuPosition?: Alignment;
  /** Unique ID */
  id?: string;
  /** Callback to be called on menu open */
  onOpen?: () => void;
  /** Callback to be called on menu close */
  onClose?: () => void;
  /** @deprecated This prop will be removed in a future release. */
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
  /**
   * Content for the action popover button.
   */
  buttonLabel?: React.ReactNode;
}

export type ActionPopoverHandle = {
  focusButton: () => void;
} | null;

const onOpenDefault = () => {};
const onCloseDefault = () => {};

const isActionPopoverChild = (child: React.ReactNode) =>
  React.isValidElement(child) &&
  (child.type === ActionPopoverItem || child.type === ActionPopoverDivider);

const validateChildren = (children: React.ReactNode, componentName: string) => {
  const invalidChild = React.Children.toArray(children).find(
    (child) => !isActionPopoverChild(child),
  );

  invariant(
    !invalidChild,
    `${componentName} only accepts children of type \`${ActionPopoverItem.displayName}\`` +
      ` and \`${ActionPopoverDivider.displayName}\`.`,
  );
};

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
      horizontalAlignment: _horizontalAlignment,
      submenuPosition: _submenuPosition,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      buttonLabel,
      ...rest
    },
    ref,
  ) => {
    const l = useLocale();
    const [isOpen, setOpenState] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [guid] = useState(createGuid());
    const buttonRef = useRef<HTMLDivElement>(null);
    const handledEscape = useRef(false);
    const { isInFlatTable } = useContext(FlatTableContext);
    const resolvedButtonLabel =
      buttonLabel === undefined ? (
        <>
          {l.actionPopover.buttonLabel?.()}
          {!isInFlatTable && <Icon type="ellipsis_vertical" />}
        </>
      ) : (
        buttonLabel
      );

    validateChildren(children, "ActionPopover");

    const setOpen = useCallback(
      (value: boolean) => {
        if (value && !isOpen) onOpen();
        if (!value && isOpen) onClose();
        if (!value) setOpenSubmenu(null);
        setOpenState(value);
      },
      [isOpen, onClose, onOpen],
    );

    const focusButton = useCallback(() => {
      buttonRef.current
        ?.querySelector<HTMLElement>("[data-element='action-popover-button']")
        ?.focus();
    }, []);

    useImperativeHandle<ActionPopoverHandle, ActionPopoverHandle>(
      ref,
      () => ({ focusButton }),
      [focusButton],
    );

    const handleButtonClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-element='action-popover-button']")) return;

        const opening = !isOpen;
        setOpen(opening);
        if (!opening) focusButton();
      },
      [focusButton, isOpen, setOpen],
    );

    const handleButtonKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-element='action-popover-button']")) return;

        // prevent escape closing parent components
        if (Events.isEscKey(event)) {
          event.stopPropagation();
        }

        if (Events.isSpaceKey(event) || Events.isEnterKey(event)) {
          event.preventDefault();
          setOpen(true);
        }
      },
      [setOpen],
    );

    const handleAlphaKeyNavigation = (args: TypeaheadHandler) => {
      const { ev, items, setAriaActivedescendant, focus } = args;

      if (ev.key.trim().length !== 1 || ev.ctrlKey || ev.metaKey || ev.altKey) {
        return;
      }

      ev.stopPropagation();

      const character = ev.key.toLowerCase();
      const matches = items.filter((item) =>
        item.textContent?.trim().toLowerCase().startsWith(character),
      );

      if (!matches.length) {
        return;
      }

      const highlightedItem = items.find((item) =>
        item.contains(document.activeElement),
      );
      const currentIndex = highlightedItem
        ? items.indexOf(highlightedItem)
        : /* istanbul ignore next */ -1;
      const itemToFocus =
        matches.find((item) => items.indexOf(item) > currentIndex) ??
        matches[0];

      setAriaActivedescendant(itemToFocus.id);
      focus(itemToFocus, highlightedItem, true);
    };

    useAdaptiveSidebarModalFocus(() => setOpenState(false));

    const parentID = id || `ActionPopoverButton_${guid}`;
    const menuID = `ActionPopoverMenu_${guid}`;
    const mappedPlacement = useMemo(() => {
      if (placement === "top") return rightAlignMenu ? "top-start" : "top-end";
      return rightAlignMenu ? "bottom-start" : "bottom-end";
    }, [placement, rightAlignMenu]);

    const mapChildrenToPopoverMenu = useCallback(
      (nodes: React.ReactNode, parentKey = "item"): React.ReactNode =>
        React.Children.toArray(nodes).map((child) => {
          /* istanbul ignore if */
          if (!React.isValidElement(child)) return null;

          const childKey = `${parentKey}-${child.key}`;

          if (child.type === ActionPopoverDivider) {
            return <MenuItemDivider key={`${childKey}-divider`} />;
          }

          const item = child as React.ReactElement<ActionPopoverItemProps>;
          const { submenu } = item.props;
          let submenuChildren: React.ReactNode;

          if (React.isValidElement(submenu)) {
            const menu = submenu as React.ReactElement<{
              children?: React.ReactNode;
            }>;
            validateChildren(menu.props.children, "ActionPopoverMenu");
            submenuChildren = mapChildrenToPopoverMenu(
              menu.props.children,
              childKey,
            );
          }

          const itemKey = childKey;

          return (
            <MenuItem
              key={itemKey}
              disabled={item.props.disabled}
              submenu={submenuChildren}
              submenuOpen={openSubmenu === itemKey}
              onSubmenuOpen={() => setOpenSubmenu(itemKey)}
              onSubmenuClose={() =>
                setOpenSubmenu((current) =>
                  current === itemKey ? null : current,
                )
              }
            >
              {React.cloneElement(item, {
                submenu: undefined,
                __isSubmenuParent: !!submenu,
              })}
            </MenuItem>
          );
        }),
      [openSubmenu],
    );

    const popoverChildren = useMemo(
      () => (isOpen ? mapChildrenToPopoverMenu(children) : null),
      [children, isOpen, mapChildrenToPopoverMenu],
    );

    const renderControl = (
      controlRef: React.RefObject<HTMLElement>,
      controlProps: PopoverControlProps,
    ) => {
      const commonProps: RenderButtonProps = {
        tabIndex: isOpen ? -1 : 0,
        "data-element": "action-popover-button",
        className: isOpen ? "active" : "",
        ref: controlRef,
        ariaAttributes: {
          "aria-haspopup": controlProps["aria-haspopup"],
          "aria-label": ariaLabel || l.actionPopover.ariaLabel(),
          "aria-labelledby": ariaLabelledBy,
          "aria-describedby": ariaDescribedBy,
          "aria-controls": controlProps["aria-controls"],
          "aria-expanded": controlProps["aria-expanded"] ? "true" : "false",
        },
      };

      if (renderButton) {
        const renderedButton = renderButton(commonProps);
        const buttonHasString = checkChildrenForString(renderedButton);

        return renderButton({
          ...commonProps,
          ariaAttributes: {
            ...commonProps.ariaAttributes,
            "aria-label": buttonHasString
              ? undefined
              : commonProps.ariaAttributes["aria-label"],
          },
        });
      }

      return (
        <Button
          {...controlProps}
          ref={controlRef as React.RefObject<HTMLButtonElement>}
          aria-label={
            ariaLabel ||
            (checkChildrenForString(resolvedButtonLabel)
              ? undefined
              : l.actionPopover.ariaLabel())
          }
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-controls={menuID}
          aria-expanded={isOpen}
          data-element="action-popover-button"
          variant="default"
          variantType={isInFlatTable ? "secondary" : "subtle"}
          className={isOpen ? "active" : ""}
        >
          {resolvedButtonLabel}
        </Button>
      );
    };

    return (
      <MenuButton
        id={parentID}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onKeyUp={(event) => {
          // Dialogs close on keyup; consume the release of Escape handled by the menu.
          if (Events.isEscKey(event) && handledEscape.current) {
            handledEscape.current = false;
            event.stopPropagation();
          }
        }}
        ref={buttonRef}
        {...rest}
        {...tagComponent("action-popover-wrapper", rest)}
      >
        <ActionPopoverProvider
          value={{
            setOpenPopover: setOpen,
            focusButton,
          }}
        >
          <PopoverMenu<HTMLElement>
            open={isOpen}
            onOpen={() => setOpen(true)}
            onClose={(event) => {
              if (event instanceof KeyboardEvent && Events.isEscKey(event)) {
                handledEscape.current = true;
              }
              setOpen(false);
            }}
            placement={mappedPlacement}
            id={menuID}
            listboxAriaLabelledBy={parentID}
            isButtonMenu
            popoverControl={renderControl}
            controlWrapperStyle={{ width: "100%" }}
            typeahead={handleAlphaKeyNavigation}
          >
            {popoverChildren}
          </PopoverMenu>
        </ActionPopoverProvider>
      </MenuButton>
    );
  },
);

export default ActionPopover;
