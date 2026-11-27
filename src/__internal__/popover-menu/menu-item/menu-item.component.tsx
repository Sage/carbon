import React, { useContext, useRef, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  PopoverMenuContext,
  MenuHeadingContext,
  MenuItemContext,
  type PopoverMenuContextProps,
  type PopoverControlProps,
} from "../contexts";
import useIdPolyfill from "../../../hooks/__internal__/useIdPolyfill";
import Icon from "../../../components/icon";
import { buttonMenuItemQuerySelector } from "../utils";
import combineRefs from "../../utils/helpers/combine-refs";
import MenuOptionItem, {
  type MenuOptionItemProps,
} from "./menu-option-item.component";
import { menuItemLayout } from "./menu-item-layout.style";

export interface MenuItemProps extends MenuOptionItemProps {
  submenu?: React.ReactNode;
  submenuWidth?: string;
  submenuOpen?: boolean;
  onSubmenuOpen?: () => void;
  onSubmenuClose?: () => void;
}

interface StyledMenuItemProps {
  $size?: PopoverMenuContextProps["size"];
  $disabled?: boolean;
  $isButtonMenu?: boolean;
}

interface SubmenuControlProps extends PopoverControlProps {
  disabled?: boolean;
}

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  ${menuItemLayout}

  & > [data-element="submenu-parent"] > [data-role="button-child-container"] {
    flex: 1;
  }

  &:focus {
    outline: none;
  }

  ${({ $disabled }) =>
    $disabled
      ? css`
          * {
            color: var(--popover-label-disabled);
          }
          & > button,
          & > a {
            background-color: transparent;
          }
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
          color: var(--popover-label-default);

          & > button:active,
          & > a:active {
            background-color: var(--popover-bg-active);
            color: var(--popover-label-active);
          }

          & > button:not(:active):hover,
          & > a:not(:active):hover {
            color: var(--popover-label-hover);
            background-color: var(--popover-bg-hover);
          }
        `}
`;

const SubmenuParentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: var(--global-space-comp-s);
`;

const cloneSubmenuParent = (
  children: React.ReactNode,
  submenuControlProps: SubmenuControlProps,
) => {
  /* istanbul ignore if */
  if (!React.isValidElement(children) || React.Children.count(children) !== 1) {
    return children;
  }

  return React.cloneElement(children as React.ReactElement, {
    "data-element": "submenu-parent",
    children: (
      <SubmenuParentWrapper data-element="submenu-parent-wrapper">
        {(children as React.ReactElement).props.children}
        <Icon type="caret_right" data-element="submenu-icon" ml="auto" />
      </SubmenuParentWrapper>
    ),
    ...submenuControlProps,
  });
};

const getChildDisabledState = (node: React.ReactNode): boolean => {
  if (!React.isValidElement(node)) return false;

  const props = node.props as {
    disabled?: boolean;
    "aria-disabled"?: boolean | "true" | "false";
    children?: React.ReactNode;
  };

  if (
    props.disabled ||
    props["aria-disabled"] === true ||
    props["aria-disabled"] === "true"
  ) {
    return true;
  }

  // Recurse so wrappers still work (e.g. ButtonNext inside another component)
  return React.Children.toArray(props.children).some(getChildDisabledState);
};

const focusFirstSubmenuItem = (
  submenuRef: React.RefObject<HTMLUListElement>,
) => {
  const firstSubmenuItem = submenuRef.current?.querySelector(
    buttonMenuItemQuerySelector(true),
  ) as HTMLElement | null;
  firstSubmenuItem?.focus();
};

const ButtonMenuItem = ({
  children,
  onClick,
  selected,
  disabled,
  submenu,
  submenuOpen,
  onSubmenuOpen,
  onSubmenuClose,
  submenuWidth,
  id,
  measureElement,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: MenuItemProps) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const combinedRef = combineRefs(ref, measureElement);
  const {
    size,
    isButtonMenu,
    isSubmenu,
    onSubmenuCloseContext,
    focusSubmenuParent,
    renderSubmenu,
  } = useContext<PopoverMenuContextProps>(PopoverMenuContext);
  const hasSubmenu = !!submenu;
  const hasDisabledChild = isButtonMenu && getChildDisabledState(children);
  const isDisabled = disabled || hasDisabledChild;
  const clonedSubmenuParentItem = useCallback(
    (submenuControlProps: SubmenuControlProps) =>
      cloneSubmenuParent(children, { ...submenuControlProps }),
    [children],
  );
  const submenuRef = useRef<HTMLUListElement | null>(null);
  const context = useContext(MenuHeadingContext);
  const headingId = context?.headingId;
  const resolvedAriaDescribedBy = [ariaDescribedBy, headingId]
    .filter(Boolean)
    .join(" ");
  const generatedItemId = useIdPolyfill();
  const itemId = id ?? `popover-menu-item-${generatedItemId}`;

  const handleKeydown = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      /* istanbul ignore if */
      if (!hasSubmenu || !isButtonMenu) {
        return;
      }
      /* istanbul ignore else */
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        if (!submenuOpen) {
          onSubmenuOpen?.();
        } else {
          focusFirstSubmenuItem(submenuRef);
        }
        return;
      }
    },
    [hasSubmenu, isButtonMenu, onSubmenuOpen, submenuOpen],
  );

  useEffect(() => {
    if (!submenuOpen) return;

    focusFirstSubmenuItem(submenuRef);
  }, [submenuOpen]);

  const handleSubmenuClose = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      const { activeElement: focusedItem } = document;

      const isActiveInSubmenu =
        focusedItem?.parentElement?.getAttribute("data-component") ===
        "popover-submenu-item";

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();

        /* istanbul ignore else */
        if (isActiveInSubmenu) {
          focusSubmenuParent?.();
          onSubmenuCloseContext?.();

          return;
        }
      }
    },
    [focusSubmenuParent, onSubmenuCloseContext],
  );

  const handleSubmenuParentClick = useCallback(
    (ev: React.MouseEvent<HTMLLIElement>) => {
      onSubmenuOpen?.();
      onClick?.(ev);
    },
    [onSubmenuOpen, onClick],
  );

  if (isButtonMenu && hasSubmenu && renderSubmenu) {
    return renderSubmenu({
      open: !!submenuOpen,
      submenu,
      submenuWidth,
      size,
      onClose: () => onSubmenuClose?.(),
      ref: submenuRef,
      triggerRef: ref,
      control: (controlProps: PopoverControlProps) => {
        return (
          <StyledMenuItem
            ref={combinedRef}
            id={itemId}
            data-component="popover-menu-item"
            className={`popover-menu-item${isDisabled ? "-disabled" : ""}`}
            $size={size}
            onClick={!isDisabled ? handleSubmenuParentClick : undefined}
            onMouseDown={!isDisabled ? (ev) => ev.preventDefault() : undefined}
            onKeyDown={!isDisabled ? handleKeydown : undefined}
            $disabled={isDisabled}
            $isButtonMenu={isButtonMenu}
          >
            {clonedSubmenuParentItem({
              ...controlProps,
              disabled: isDisabled,
            })}
          </StyledMenuItem>
        );
      },
    });
  }

  return (
    <StyledMenuItem
      ref={combinedRef}
      id={itemId}
      data-component={`popover-${isSubmenu ? "submenu" : "menu"}-item`}
      className={`popover-menu-item${isDisabled ? "-disabled" : ""}`}
      $size={size}
      onClick={!isDisabled ? onClick : undefined}
      onMouseDown={!isDisabled ? (ev) => ev.preventDefault() : undefined}
      onKeyDown={handleSubmenuClose}
      $disabled={isDisabled}
      $isButtonMenu={isButtonMenu}
      {...rest}
      aria-describedby={resolvedAriaDescribedBy || undefined}
    >
      <MenuItemContext.Provider value={{ isDisabled: !!isDisabled }}>
        {children}
      </MenuItemContext.Provider>
    </StyledMenuItem>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const { isButtonMenu } = useContext(PopoverMenuContext);

  if (isButtonMenu) return <ButtonMenuItem {...props} />;

  const {
    submenu,
    submenuWidth,
    submenuOpen,
    onSubmenuOpen,
    onSubmenuClose,
    ...optionProps
  } = props;

  return <MenuOptionItem {...optionProps} />;
};

MenuItem.displayName = "PopoverMenuItem";

export default MenuItem;
