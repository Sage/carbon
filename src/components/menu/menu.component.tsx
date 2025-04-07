import React, { useCallback, useState, useRef } from "react";
import { LayoutProps, FlexboxProps } from "styled-system";

import { StyledMenuWrapper } from "./menu.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  MenuType,
  StrictMenuProvider,
} from "./__internal__/strict-menu.context";
import MenuContext from "../menu/__internal__/menu.context";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import { MENU_ITEM_CHILDREN_LOCATOR } from "./__internal__/locators";

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
  /** Defines the color scheme of the component */
  menuType?: MenuType;
}

export const Menu = ({ menuType = "light", children, ...rest }: MenuProps) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const ref = useRef<HTMLUListElement>(null);
  const [focusId, setFocusId] = useState<string | undefined>(undefined);
  const [itemIds, setItemIds] = useState<string[]>([]);

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
      menuType={menuType}
      {...rest}
      {...tagComponent("menu", rest)}
      ref={ref}
      role="list"
      onKeyDown={handleKeyDown}
    >
      <StrictMenuProvider
        value={{
          menuType,
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
