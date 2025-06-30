/**
 * Provides context for managing focus within a menu component.
 * This context allows for tracking expanded items, focusing on specific items,
 * and moving focus in various directions (next, previous, parent, first child, last child).
 */
import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Logger from "../../../../__internal__/utils/logger";

interface MenuFocusContextType {
  expandedItems: string[];
  expandItem: (id: string, expand: boolean) => void;
  focusedItemId: string | null;
  getRegisteredItems: () => Array<{
    id: string;
    ref: RefObject<HTMLElement>;
    parentId?: string;
  }>;
  focusItem: (id: string) => void;
  moveFocus: (
    direction: "next" | "prev" | "parent" | "firstChild" | "lastChild",
  ) => void;
  registerMenuItem: (
    id: string,
    ref: RefObject<HTMLElement>,
    parentId?: string,
  ) => void;
}

// Create a context for menu focus
const MenuFocusContext = createContext<MenuFocusContextType | undefined>(
  undefined,
);

// Custom hook to use the MenuFocusContext
export const useMenuFocus = () => {
  // Get the current context value
  const context = useContext(MenuFocusContext);

  // If context is undefined, it means the hook is being used outside of a MenuFocusProvider
  /* istanbul ignore next */
  if (!context) {
    Logger.error("useMenuFocus must be used within a MenuFocusProvider");
    // Return a default value to avoid breakages
    return {
      expandedItems: [],
      expandItem: () => {},
      focusedItemId: null,
      getRegisteredItems: () => [],
      focusItem: () => {},
      moveFocus: () => {},
      registerMenuItem: () => {},
    } as MenuFocusContextType;
  }

  // Return the current context value
  return context;
};

export const MenuFocusProvider = ({ children }: { children: ReactNode }) => {
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  // State to track the currently focused item
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  // Ref to hold registered menu items
  const menuItemsRef = useRef<
    Map<
      string,
      {
        ref: RefObject<HTMLElement>;
        parentId?: string;
        childIds: string[];
      }
    >
  >(new Map());

  // Function to register a menu item
  // This function takes an id, a ref to the item, and an optional parentId
  // and stores the item in the menuItemsRef map.
  // If a parentId is provided, it also updates the parent's childIds array
  // to include the new item.
  const registerMenuItem = useCallback(
    (id: string, ref: RefObject<HTMLElement>, parentId?: string) => {
      menuItemsRef.current.set(id, {
        ref,
        parentId,
        childIds: [],
      });

      if (parentId) {
        const parentItem = menuItemsRef.current.get(parentId);
        parentItem?.childIds.push(id);
      }
    },
    [],
  );

  // Function to get all registered menu items
  // This function returns an array of objects, each containing the id,
  // ref, parentId, and childIds of the registered items.
  const getRegisteredItems = useCallback(() => {
    const items = Array.from(menuItemsRef.current.entries()).map(
      ([id, { ref, parentId, childIds }]) => ({
        id,
        ref,
        parentId,
        childIds,
      }),
    );
    return items;
  }, []);

  // Function to focus on a specific menu item
  // This function takes an id and focuses the corresponding item
  // by calling the focus method on its ref.
  // It also updates the focusedItemId state to the new id.
  const focusItem = useCallback((id: string) => {
    const item = menuItemsRef.current.get(id);
    /* istanbul ignore else */
    if (item?.ref?.current) {
      item.ref.current.focus();
      setFocusedItemId(id);
    }
  }, []);

  // Function to expand or collapse a menu item
  // This function takes an id and a boolean value (expand)
  // and updates the expandedItems state accordingly.
  // If expand is true, it adds the id to the expandedItems array;
  // otherwise, it removes the id from the array.
  const expandItem = useCallback((id: string, expand: boolean) => {
    if (expand) {
      setExpandedItems((prev) => [...prev, id]);
    } else {
      setExpandedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  }, []);

  // Function to move focus in a specific direction
  // This function takes a direction (next, prev, parent, firstChild, lastChild)
  // and moves the focus accordingly.
  // It uses the current focusedItemId to determine the current item
  // and then finds the next item based on the direction.
  // It also handles expanding/collapsing items as needed.
  const moveFocus = useCallback(
    (direction: "next" | "prev" | "parent" | "firstChild" | "lastChild") => {
      /* istanbul ignore if */
      if (!focusedItemId) return;

      // Get the current item based on the focusedItemId
      const currentItem = menuItemsRef.current.get(focusedItemId);

      // If the current item is not found, return early
      /* istanbul ignore if */
      if (!currentItem) return;

      let allItems = [];
      let visibleItems = [];
      let currentIndex = -1;

      switch (direction) {
        // Move focus to the parent item
        case "parent":
          /* istanbul ignore else */
          if (currentItem.parentId) {
            focusItem(currentItem.parentId);
          }
          break;

        // Move focus to the first child
        // If the current item has children and is not already expanded,
        // expand it and focus on the first child
        case "firstChild":
          /* istanbul ignore else */
          if (currentItem.childIds.length > 0) {
            if (!expandedItems.includes(focusedItemId)) {
              expandItem(focusedItemId, true);
            }
            focusItem(currentItem.childIds[0]);
          }
          break;

        // Move focus to the last child
        // Moving backwards through the menu works slightly differently:
        // If the current item has children, get the last child. Before focusing on it,
        // check if the last child is expanded. If it is, focus on its last child.
        // If the last child is not expanded (i.e. it's just a link), focus on it directly.
        case "lastChild":
          /* istanbul ignore else */
          if (currentItem.childIds.length > 0) {
            const lastChild =
              currentItem.childIds[currentItem.childIds.length - 1];
            /* istanbul ignore else */
            if (lastChild) {
              /* istanbul ignore if */
              if (expandedItems.includes(lastChild)) {
                const lastChildItem = getRegisteredItems().find(
                  (item) => item.id === lastChild,
                );
                if (lastChildItem) {
                  focusItem(
                    lastChildItem.childIds[lastChildItem.childIds.length - 1],
                  );
                }
              } else {
                focusItem(lastChild);
              }
            }
          }
          break;

        // Move focus to the next or previous item
        // This case handles both next and previous focus movement.
        // Whilst this functionality is not currently used in the menu,
        // it is included for completeness/future-proofing.
        /* istanbul ignore next */
        default:
          allItems = Array.from(menuItemsRef.current.keys());
          visibleItems = allItems.filter((id) => {
            const item = menuItemsRef.current.get(id);
            if (!item || !item.parentId) return true;

            const parentVisible = expandedItems.includes(item.parentId);
            return parentVisible;
          });

          currentIndex = visibleItems.indexOf(focusedItemId);
          if (currentIndex !== -1) {
            const nextIndex =
              direction === "next"
                ? (currentIndex + 1) % visibleItems.length
                : (currentIndex - 1 + visibleItems.length) %
                  visibleItems.length;

            focusItem(visibleItems[nextIndex]);
          }
          break;
      }
    },
    [focusedItemId, focusItem, expandedItems, expandItem, getRegisteredItems],
  );

  const value = {
    expandedItems,
    expandItem,
    focusedItemId,
    focusItem,
    getRegisteredItems,
    registerMenuItem,
    moveFocus,
  };

  // Provide the current context value to the MenuFocusContext
  return (
    <MenuFocusContext.Provider value={value}>
      {children}
    </MenuFocusContext.Provider>
  );
};
