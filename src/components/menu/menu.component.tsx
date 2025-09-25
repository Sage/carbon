import React, { useCallback, useState, useRef } from "react";

import tagComponent from "../../__internal__/utils/helpers/tags";
import { StyledMenuWrapper } from "./menu.style";
import { StrictMenuProvider } from "./__internal__/strict-menu.context";
import MenuContext from "../menu/__internal__/menu.context";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import { MENU_ITEM_CHILDREN_LOCATOR } from "./__internal__/locators";
import Logger from "../../__internal__/utils/logger";

import type { MenuProps } from "./menu.types";

let deprecationWhiteVariantWarningTriggered = false;
let deprecationBlackVariantWarningTriggered = false;

export const Menu = ({ menuType = "light", children, ...rest }: MenuProps) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const ref = useRef<HTMLUListElement>(null);
  const [focusId, setFocusId] = useState<string | undefined>(undefined);
  const [itemIds, setItemIds] = useState<string[]>([]);

  if (menuType === "white" && !deprecationWhiteVariantWarningTriggered) {
    Logger.deprecate(
      "The `white` variant of the `Menu` component is deprecated and will soon be removed. Please use `light` instead.",
    );
    deprecationWhiteVariantWarningTriggered = true;
  }

  if (menuType === "black" && !deprecationBlackVariantWarningTriggered) {
    Logger.deprecate(
      "The `black` variant of the `Menu` component is deprecated and will soon be removed. Please use `dark` instead.",
    );
    deprecationBlackVariantWarningTriggered = true;
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
