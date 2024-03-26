import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { MaxWidthProps } from "styled-system";

import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import { StyledSubmenu, StyledSubmenuWrapper } from "./submenu.style";
import Events from "../../../../__internal__/utils/helpers/events";
import MenuContext from "../../menu.context";
import { characterNavigation } from "../keyboard-navigation";
import SubmenuContext from "./submenu.context";
import useClickAwayListener from "../../../../hooks/__internal__/useClickAwayListener";
import guid from "../../../../__internal__/utils/helpers/guid";
import {
  SCROLLABLE_BLOCK,
  SCROLLABLE_BLOCK_PARENT,
  BLOCK_INDEX_SELECTOR,
  ALL_CHILDREN_SELECTOR,
} from "../locators";
import { VariantType } from "../../menu-item";
import useStableCallback from "../../../../hooks/__internal__/useStableCallback/useStableCallback";
import FixedNavigationBarContext from "../../../navigation-bar/fixed-navigation-bar.context";

export interface SubmenuProps {
  /** Children elements */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /**
   * * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Adds an icon to the menu item.
   * */
  icon?: string;
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection?: string;
  /** A title for the menu item that has a submenu. */
  title?: string;
  /** onKeyDown handler */
  onKeyDown?: (
    event:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** set the colour variant for a menuType */
  variant?: VariantType;
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow?: boolean;
  /** When set the submenu opens by click instead of hover */
  clickToOpen?: boolean;
  /** The href to use for the menu item. */
  href?: string;
  /** Maximum width. Any valid CSS string */
  maxWidth?: MaxWidthProps["maxWidth"];
  /** Used to set a submenu parent to passive styling in MenuFullscreen */
  asPassiveItem?: boolean;
  /** Callback triggered when submenu opens. Only valid with submenu prop */
  onSubmenuOpen?: () => void;
  /** Callback triggered when submenu closes. Only valid with submenu prop */
  onSubmenuClose?: () => void;
  /** Callback triggered when the top-level menu item is clicked */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;

  ariaLabel?: string;
}

const Submenu = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement & HTMLDivElement,
  SubmenuProps
>(
  (
    {
      children,
      className,
      title,
      icon,
      submenuDirection = "right",
      onKeyDown,
      variant = "default",
      showDropdownArrow = true,
      clickToOpen,
      href,
      maxWidth,
      asPassiveItem,
      onSubmenuOpen: onSubmenuOpenProp,
      onSubmenuClose,
      onClick,
      ...rest
    }: SubmenuProps,
    ref
  ) => {
    const submenuRef = useRef<HTMLUListElement & HTMLDivElement>(null);
    const submenuId = useRef(guid());
    const menuContext = useContext(MenuContext);
    const {
      inFullscreenView,
      openSubmenuId,
      setOpenSubmenuId,
      menuType,
    } = menuContext;
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusId, setSubmenuFocusId] = useState<string | null>(null);
    const [submenuItemIds, setSubmenuItemIds] = useState<(string | null)[]>([]);
    const [characterString, setCharacterString] = useState("");
    const [applyFocusRadius, setApplyFocusRadius] = useState<boolean>(false);
    const shiftTabPressed = useRef(false);
    const focusFirstMenuItemOnOpen = useRef(false);

    const menuSegmentTitleElement = submenuRef.current?.querySelectorAll(
      "[data-component='menu-segment-title']"
    );
    const segmentBlockExists =
      menuSegmentTitleElement && menuSegmentTitleElement?.length > 0;
    const focusStylingGuardForSegmentChildrenBorderRadius = useRef(
      !segmentBlockExists
    );
    const numberOfChildren = submenuItemIds.length;

    const { submenuMaxHeight } = useContext(FixedNavigationBarContext);

    const onSubmenuOpen = useStableCallback(onSubmenuOpenProp);

    const blockIndex = useMemo(() => {
      const items = submenuRef.current?.querySelectorAll(BLOCK_INDEX_SELECTOR);

      if (items && submenuOpen && numberOfChildren) {
        const childrenArray = Array.from(items);

        const scrollableBlock = submenuRef.current?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK}']`
        );

        const index = scrollableBlock
          ? childrenArray.indexOf(scrollableBlock)
          : -1;

        return scrollableBlock?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK_PARENT}']`
        )
          ? index + 1
          : index;
      }

      return -1;
    }, [submenuOpen, numberOfChildren]);

    const characterTimer = useRef<NodeJS.Timeout | null>(null);

    const startCharacterTimeout = useCallback(() => {
      characterTimer.current = setTimeout(() => {
        setCharacterString("");
      }, 1500);
    }, []);

    const restartCharacterTimeout = useCallback(() => {
      /* istanbul ignore else */
      if (characterTimer.current) {
        clearTimeout(characterTimer.current);
      }
      startCharacterTimeout();
    }, [startCharacterTimeout]);

    const openSubmenu = useCallback(() => {
      setSubmenuOpen(true);
      setOpenSubmenuId(submenuId.current);
    }, [setOpenSubmenuId]);

    const lastMenuItemElement = useRef<Element | undefined>();
    const [
      applyScrollBlockBorderRadius,
      setApplyScrollBlockBorderRadius,
    ] = useState(false);

    const handleBorderRadiusStyling = () => {
      // Finds all ul elements that are not submenus
      const ulElements = submenuRef.current?.querySelectorAll(
        "ul:not([data-component='submenu'])"
      );

      // Finds all menu items in the submenu
      const menuItemElements = submenuRef.current?.querySelectorAll(
        "[data-component='menu-item']"
      );

      // Get the last menu item in the submenu
      const lastMenuItem =
        menuItemElements && menuItemElements[menuItemElements.length - 1];

      lastMenuItemElement.current = lastMenuItem;

      // Get the last segment block
      const lastSegmentBlock = ulElements && ulElements[ulElements.length - 1];

      // Get all the menu items from the last segment block
      const menuItemElementsInSegmentBlock = lastSegmentBlock
        ? lastSegmentBlock.querySelectorAll("[data-component='menu-item']")
        : [];

      // Get the last menu item in the last segment block
      const lastMenuItemInSegmentBlock =
        menuItemElementsInSegmentBlock &&
        menuItemElementsInSegmentBlock[
          menuItemElementsInSegmentBlock.length - 1
        ];

      // Check if the last item in the segment block is the same as the last MenuItem in the submenu
      const isLastItemInSubmenuTheSameLastItemInSegmentBlock =
        lastMenuItemInSegmentBlock &&
        lastMenuItem &&
        lastMenuItemInSegmentBlock === lastMenuItem;

      setApplyFocusRadius(
        !!(
          !focusStylingGuardForSegmentChildrenBorderRadius.current &&
          isLastItemInSubmenuTheSameLastItemInSegmentBlock
        )
      );

      // Array to store all menu item elements
      const menuItemElementsInScrollBlock: Element[] = [];

      // Iterate through each scrollable block and find menu item elements
      ulElements?.forEach((ul) => {
        const menuItemsInBlock = ul.querySelectorAll(
          "[data-component='menu-item']"
        );
        menuItemElementsInScrollBlock.push(...menuItemsInBlock);
      });

      // Get the last menu item in the scroll block
      const lastMenuItemInScrollBlock =
        menuItemElementsInScrollBlock &&
        menuItemElementsInScrollBlock[menuItemElementsInScrollBlock.length - 1];

      // Check if the last item in the scroll block is the same as the last MenuItem in the submenu
      const isLastItemInSubmenuTheSameLastItemInScrollBlock =
        lastMenuItemInScrollBlock && lastMenuItemInScrollBlock === lastMenuItem;

      setApplyScrollBlockBorderRadius(
        isLastItemInSubmenuTheSameLastItemInScrollBlock
      );
    };

    useEffect(() => {
      const handleMouseOver = (event: MouseEvent) => {
        // Get the target element that triggered the event
        const target = event.target as HTMLElement;

        // Get the parent element of the target element as we want the `li` element
        const targetParent = target.parentElement?.parentElement;

        // If the mouse is over the last menu item in the submenu, set the guard to false and focus radius to true
        if (targetParent === lastMenuItemElement.current) {
          focusStylingGuardForSegmentChildrenBorderRadius.current = false;
          setApplyFocusRadius(true);
        }
      };

      if (submenuOpen) {
        document.addEventListener("mouseover", handleMouseOver);
      }

      return () => {
        document.removeEventListener("mouseover", handleMouseOver);
      };
    }, [submenuOpen]);

    useEffect(
      () => {
        handleBorderRadiusStyling();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        submenuOpen,
        submenuItemIds,
        focusStylingGuardForSegmentChildrenBorderRadius.current,
        handleBorderRadiusStyling,
      ]
    );

    useEffect(() => {
      if (submenuOpen && onSubmenuOpen) {
        onSubmenuOpen();
      }
    }, [submenuOpen, onSubmenuOpen]);

    const closeSubmenu = useCallback(() => {
      shiftTabPressed.current = false;
      setSubmenuOpen(false);
      setSubmenuFocusId(null);
      if (onSubmenuClose) {
        onSubmenuClose();
      }
      setCharacterString("");
    }, [onSubmenuClose]);

    useEffect(() => {
      if (openSubmenuId && openSubmenuId !== submenuId.current) {
        closeSubmenu();
      }
    }, [openSubmenuId, closeSubmenu]);

    const findCurrentIndex = useCallback(
      (id) => {
        const index = submenuItemIds.findIndex((itemId) => itemId === id);

        return index;
      },
      [submenuItemIds]
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (!submenuOpen) {
          if (
            Events.isEnterKey(event) ||
            Events.isSpaceKey(event) ||
            Events.isDownKey(event) ||
            Events.isUpKey(event)
          ) {
            event.preventDefault();
            openSubmenu();
            focusFirstMenuItemOnOpen.current = !href;
          }
        }

        if (submenuOpen) {
          focusStylingGuardForSegmentChildrenBorderRadius.current = true;
          const index = findCurrentIndex(submenuFocusId);
          let nextIndex = index;

          if (href && !submenuFocusId) {
            if (
              Events.isDownKey(event) ||
              Events.isUpKey(event) ||
              (Events.isTabKey(event) && !Events.isShiftKey(event))
            ) {
              event.preventDefault();
              setSubmenuFocusId(submenuItemIds[0]);
              return;
            }
          }

          if (nextIndex + 1 === numberOfChildren - 1) {
            focusStylingGuardForSegmentChildrenBorderRadius.current = false;
          }

          if (Events.isTabKey(event) && !Events.isShiftKey(event)) {
            if (nextIndex === numberOfChildren - 1) {
              closeSubmenu();
              return;
            }

            shiftTabPressed.current = false;
            nextIndex += 1;
          }

          if (Events.isTabKey(event) && Events.isShiftKey(event)) {
            if (nextIndex <= 0) {
              closeSubmenu();
              return;
            }

            shiftTabPressed.current = true;
            nextIndex -= 1;
          }

          if (Events.isDownKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;

            if (nextIndex < numberOfChildren - 1) {
              nextIndex += 1;
            }
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;
            focusStylingGuardForSegmentChildrenBorderRadius.current = true;
            setApplyFocusRadius(false);

            if (nextIndex > 0) {
              nextIndex -= 1;
            }
          }

          if (Events.isEscKey(event)) {
            onKeyDown?.(event);
            closeSubmenu();
            return;
          }

          if (Events.isHomeKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;
            nextIndex = 0;
          }

          if (Events.isEndKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;
            nextIndex = numberOfChildren - 1;
          }

          if (event.key.length === 1) {
            event.stopPropagation();
            shiftTabPressed.current = false;

            if (characterTimer.current) {
              restartCharacterTimeout();
            } else {
              startCharacterTimeout();
            }

            setCharacterString(`${characterString}${event.key.toLowerCase()}`);
          } else {
            setCharacterString("");
          }

          const eventIsFromInput = Events.composedPath(event).find(
            (p) =>
              (p as HTMLElement).getAttribute("data-element") === "input" ||
              (p as HTMLElement).getAttribute("data-element") ===
                "input-icon-toggle"
          );

          if (!eventIsFromInput) {
            if (Events.isEnterKey(event)) {
              /* timeout enforces that the "closeSubmenu" method will be run after 
                the browser navigates to the specified href of the menu-item. */
              setTimeout(() => closeSubmenu(), 0);
            }

            if (href && Events.isEnterKey(event)) {
              closeSubmenu();
              return;
            }
          }

          if (nextIndex !== index) {
            setSubmenuFocusId(submenuItemIds[nextIndex]);
          }
        }
      },
      [
        submenuItemIds,
        submenuOpen,
        href,
        numberOfChildren,
        submenuFocusId,
        findCurrentIndex,
        openSubmenu,
        closeSubmenu,
        onKeyDown,
        characterString,
        restartCharacterTimeout,
        startCharacterTimeout,
      ]
    );

    useEffect(() => {
      /* istanbul ignore else */
      if (submenuRef.current && children) {
        const items = submenuRef.current?.querySelectorAll(
          ALL_CHILDREN_SELECTOR
        );

        /* istanbul ignore else */
        if (items) {
          setSubmenuItemIds(
            Array.from(items).map((item) => item.getAttribute("id"))
          );
        }
      }
    }, [children, submenuOpen]);

    useEffect(() => {
      if (
        focusFirstMenuItemOnOpen.current &&
        submenuOpen &&
        !submenuFocusId &&
        submenuItemIds.length
      ) {
        focusFirstMenuItemOnOpen.current = false;
        setSubmenuFocusId(submenuItemIds[0]);
      }
    }, [submenuOpen, submenuFocusId, submenuItemIds]);

    const handleClickAway = () => {
      document.removeEventListener("click", handleClickAway);
      closeSubmenu();
    };

    const handleClickInside = useClickAwayListener(handleClickAway);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      openSubmenu();

      if (onClick) {
        onClick(event);
      }
    };

    useEffect(() => {
      const items = submenuRef.current?.querySelectorAll(ALL_CHILDREN_SELECTOR);
      if (items && characterString !== "") {
        const submenuChildren = Array.from(items);
        const nextItem = characterNavigation(characterString, submenuChildren);

        if (nextItem) {
          setSubmenuFocusId(nextItem.id);
        }
      }
    }, [characterString, submenuItemIds]);

    if (inFullscreenView) {
      return (
        <StyledSubmenuWrapper
          data-component="submenu-wrapper"
          inFullscreenView={inFullscreenView}
          asPassiveItem={asPassiveItem}
          menuType={menuContext.menuType}
          onClick={handleClickInside}
        >
          <StyledMenuItemWrapper
            {...rest}
            onClick={asPassiveItem ? undefined : onClick}
            className={className}
            menuType={menuType}
            ref={ref}
            href={href}
            variant={variant}
            inFullscreenView={inFullscreenView}
            asDiv={asPassiveItem}
          >
            {title}
          </StyledMenuItemWrapper>
          <StyledSubmenu
            data-component="submenu"
            variant={variant}
            menuType={menuType}
            inFullscreenView={inFullscreenView}
            ref={submenuRef}
            applyFocusRadiusStyling={false}
          >
            <SubmenuContext.Provider
              value={{
                handleKeyDown,
                blockIndex,
                updateFocusId: setSubmenuFocusId,
              }}
            >
              {children}
            </SubmenuContext.Provider>
          </StyledSubmenu>
        </StyledSubmenuWrapper>
      );
    }

    return (
      <StyledSubmenuWrapper
        data-component="submenu-wrapper"
        onMouseOver={!clickToOpen ? () => openSubmenu() : undefined}
        onMouseLeave={() => closeSubmenu()}
        isSubmenuOpen={submenuOpen}
        onClick={handleClickInside}
        ref={submenuRef}
      >
        <StyledMenuItemWrapper
          {...rest}
          className={className}
          menuType={menuType}
          ref={ref}
          icon={icon}
          tabIndex={-1}
          variant={variant}
          isOpen={submenuOpen}
          hasSubmenu
          showDropdownArrow={showDropdownArrow}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          clickToOpen={clickToOpen}
          href={href}
          maxWidth={maxWidth}
          aria-expanded={submenuOpen}
        >
          {title}
        </StyledMenuItemWrapper>

        {submenuOpen && (
          <StyledSubmenu
            data-component="submenu"
            submenuDirection={submenuDirection}
            variant={variant}
            menuType={menuType}
            role={blockIndex === 0 ? "presentation" : "list"}
            maxHeight={submenuMaxHeight}
            applyFocusRadiusStyling={applyFocusRadius}
            applyBorderRadiusToScrollBlock={applyScrollBlockBorderRadius}
          >
            <SubmenuContext.Provider
              value={{
                submenuFocusId,
                handleKeyDown,
                blockIndex,
                updateFocusId: setSubmenuFocusId,
                shiftTabPressed: shiftTabPressed.current,
              }}
            >
              {children}
            </SubmenuContext.Provider>
          </StyledSubmenu>
        )}
      </StyledSubmenuWrapper>
    );
  }
);

Submenu.displayName = "submenu";

export default Submenu;
