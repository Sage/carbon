import React, { useCallback, useState, useRef } from "react";

import { FlexboxProps, LayoutProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { StyledMenuWrapper } from "./menu.style";
import { StrictMenuProvider } from "./__internal__/strict-menu.context";
import MenuContext from "../menu/__internal__/menu.context";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import { MENU_ITEM_CHILDREN_LOCATOR } from "./__internal__/locators";

/** @deprecated */
export type MenuType = "light" | "dark" | "white" | "black";

export interface MenuProps
  extends TagProps,
    Pick<
      LayoutProps,
      | "width"
      | "minWidth"
      | "maxWidth"
      | "overflow"
      | "overflowX"
      | "verticalAlign"
    >,
    FlexboxProps {
  /** Children elements */
  children: React.ReactNode;
  /**
   * @deprecated Please use the `variant` prop instead.
   */
  menuType?: MenuType;
  /** Set the color variant of the component */
  variant?: "white" | "black";
}

export const Menu = ({
  menuType,
  variant = "white",
  children,
  ...rest
}: MenuProps) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const ref = useRef<HTMLUListElement>(null);
  const [focusId, setFocusId] = useState<string | undefined>(undefined);
  const [itemIds, setItemIds] = useState<string[]>([]);

  let computedVariant: "white" | "black" = variant;
  if (menuType === "light" || menuType === "white") {
    computedVariant = "white";
  } else if (menuType === "dark" || menuType === "black") {
    computedVariant = "black";
  }

  const registerItem = useCallback((id: string) => {
    setItemIds((prevState) => {
      return [...prevState, id];
    });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItemIds((prevState) => {
      return prevState.filter((itemId) => itemId !== id);
    });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    /* istanbul ignore else */
    if (ref.current) {
      const focusableItems = ref.current.querySelectorAll(
        MENU_ITEM_CHILDREN_LOCATOR,
      );

      /* istanbul ignore else */
      if (focusableItems) {
        const newIndex = menuKeyboardNavigation(
          event,
          Array.from(focusableItems),
        );

        /* istanbul ignore else */
        if (newIndex !== undefined) {
          setFocusId(itemIds[newIndex]);
        }
      }
    }
  };

  return (
    <StyledMenuWrapper
      {...rest}
      {...tagComponent("menu", rest)}
      ref={ref}
      role="list"
      onKeyDown={handleKeyDown}
    >
      <StrictMenuProvider
        value={{
          variant: computedVariant,
          openSubmenuId,
          setOpenSubmenuId,
          focusId,
          updateFocusId: setFocusId,
          registerItem,
          unregisterItem,
        }}
      >
        <MenuContext.Provider value={{ inMenu: true }}>
          {children}
        </MenuContext.Provider>
      </StrictMenuProvider>
    </StyledMenuWrapper>
  );
};

export default Menu;
