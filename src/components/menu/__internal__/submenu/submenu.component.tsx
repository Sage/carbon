import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
// import { MaxWidthProps } from "styled-system";
import { MaxWidthProps } from "../../../dips-box/utils/spacing-types";

import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import { StyledSubmenu, StyledSubmenuWrapper } from "./submenu.style";
import Events from "../../../../__internal__/utils/helpers/events";
import { useStrictMenuContext } from "../strict-menu.context";
import { characterNavigation } from "../keyboard-navigation";
import SubmenuContext from "./submenu.context";
import guid from "../../../../__internal__/utils/helpers/guid";
import {
  SCROLLABLE_BLOCK,
  SCROLLABLE_BLOCK_PARENT,
  BLOCK_INDEX_SELECTOR,
  ALL_CHILDREN_SELECTOR,
} from "../locators";
import { VariantType } from "../../menu-item";
import useStableCallback from "../../../../hooks/__internal__/useStableCallback/useStableCallback";
import FixedNavigationBarContext from "../../../navigation-bar/__internal__/fixed-navigation-bar.context";
import { defaultFocusableSelectors as focusableSelectors } from "../../../../__internal__/focus-trap/focus-trap-utils";

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
  title?: React.ReactNode;
  /** onKeyDown handler */
  onKeyDown?: (
    event:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
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
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Accessible label for when no text children are passed to menu item */
  ariaLabel?: string;
  /** Sets the max-width of the submenu container element */
  submenuMaxWidth?: string;
  /** Sets the min-width of the submenu container element */
  submenuMinWidth?: string;
}

const Submenu = React.forwardRef<HTMLAnchorElement, SubmenuProps>(
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
      submenuMaxWidth,
      submenuMinWidth,
      ...rest
    }: SubmenuProps,
    ref,
  ) => {
    const [submenuRef, setSubmenuRef] = useState<
      HTMLUListElement | HTMLDivElement | null
    >(null);
    const submenuId = useRef(guid());

    const { inFullscreenView, openSubmenuId, setOpenSubmenuId, menuType } =
      useStrictMenuContext();

    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusId, setSubmenuFocusId] = useState<string | null>(null);
    const [submenuItemIds, setSubmenuItemIds] = useState<(string | null)[]>([]);
    const [characterString, setCharacterString] = useState("");
    const [applyFocusRadius, setApplyFocusRadius] = useState<boolean>(false);
    const [applyFocusRadiusToLastItem, setApplyFocusRadiusToLastItem] =
      useState<boolean>(false);

    const numberOfChildren = submenuItemIds.length;

    const { submenuMaxHeight } = useContext(FixedNavigationBarContext);

    const onSubmenuOpen = useStableCallback(onSubmenuOpenProp);

    const blockIndex = useMemo(() => {
      const items = submenuRef?.querySelectorAll(BLOCK_INDEX_SELECTOR);

      if (items && submenuOpen && numberOfChildren) {
        const childrenArray = Array.from(items);

        const scrollableBlock = submenuRef?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK}']`,
        );

        const index = scrollableBlock
          ? childrenArray.indexOf(scrollableBlock)
          : -1;

        return scrollableBlock?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK_PARENT}']`,
        )
          ? index + 1
          : index;
      }

      return -1;
    }, [submenuOpen, numberOfChildren, submenuRef]);

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

    useEffect(() => {
      return () => {
        if (characterTimer.current) {
          clearTimeout(characterTimer.current);
        }
      };
    }, []);

    const openSubmenu = useCallback(() => {
      setSubmenuOpen(true);
      setOpenSubmenuId(submenuId.current);
    }, [setOpenSubmenuId]);

    const lastMenuItemElement = useRef<Element | undefined>();

    useEffect(() => {
      const handleBorderRadiusStyling = () => {
        /* istanbul ignore next */
        if (!submenuRef) return;

        const allMenuItems = Array.from(
          submenuRef.querySelectorAll("[data-component='menu-item']") ||
            /* istanbul ignore next */ [],
        );

        const lastMenuItem =
          allMenuItems.length > 0
            ? allMenuItems[allMenuItems.length - 1]
            : null;

        lastMenuItemElement.current = lastMenuItem ?? undefined;

        // Clear any previous markers in this submenu in case menu items have changed since last opening
        submenuRef
          .querySelectorAll("[data-last-visible-menu-item]")
          .forEach((el) => el.removeAttribute("data-last-visible-menu-item"));

        // Mark the actual last menu item
        if (lastMenuItem) {
          lastMenuItem.setAttribute("data-last-visible-menu-item", "true");
        }

        // Finds all ul elements that are not submenus
        const ulElements = Array.from(
          submenuRef.querySelectorAll("ul:not([data-component='submenu'])") ||
            /* istanbul ignore next */ [],
        );

        // If there are no segment blocks we can bail early after marking the last item.
        if (ulElements.length === 0) {
          setApplyFocusRadius(false);
          setApplyFocusRadiusToLastItem(false);
          return;
        }

        // Get the last segment block
        const lastSegmentBlock = ulElements[ulElements.length - 1];

        // Check if the last segment block is a scrollable block
        const isLastSegmentBlockScrollableBlock =
          lastSegmentBlock?.parentElement?.dataset.component ===
          SCROLLABLE_BLOCK;

        // Get all the menu items from the last segment block
        const segmentBlockMenuItems = Array.from(
          lastSegmentBlock.querySelectorAll("[data-component='menu-item']") ||
            /* istanbul ignore next */ [],
        );

        // Get the last menu item in the last segment block
        const lastMenuItemInSegmentBlock =
          segmentBlockMenuItems.length > 0
            ? segmentBlockMenuItems[segmentBlockMenuItems.length - 1]
            : null;

        // Check to see if the last menu item in the last segment block is visible
        let isLastMenuItemInSegmentBlockVisible = false;
        if (lastMenuItemInSegmentBlock && lastSegmentBlock) {
          isLastMenuItemInSegmentBlockVisible =
            lastMenuItemInSegmentBlock.getBoundingClientRect().bottom <
            lastSegmentBlock.getBoundingClientRect().bottom;
        }

        // Check if the last item in the segment block is the same as the last MenuItem in the submenu
        const menuItemsMatch =
          !!lastMenuItemInSegmentBlock &&
          !!lastMenuItem &&
          lastMenuItemInSegmentBlock === lastMenuItem;

        // Applies the focus radius to the StyledBox of the StyledScrollableBlock
        setApplyFocusRadius(menuItemsMatch);

        // Applies border radius to the last item in the segment block
        setApplyFocusRadiusToLastItem(
          (menuItemsMatch && !isLastSegmentBlockScrollableBlock) ||
            (menuItemsMatch &&
              isLastSegmentBlockScrollableBlock &&
              !isLastMenuItemInSegmentBlockVisible),
        );
      };

      if (submenuOpen && submenuRef) {
        handleBorderRadiusStyling();
      }
    }, [submenuOpen, submenuRef, numberOfChildren]);

    useEffect(() => {
      if (submenuOpen && onSubmenuOpen) {
        onSubmenuOpen();
      }
    }, [submenuOpen, onSubmenuOpen]);

    const closeSubmenu = useCallback(() => {
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
      (id: string | null) => {
        const index = submenuItemIds.findIndex((itemId) => itemId === id);

        return index;
      },
      [submenuItemIds],
    );

    const handleKeyDown = useCallback(
      (
        event:
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>,
      ) => {
        const isToggleKey =
          Events.isEnterKey(event) || Events.isSpaceKey(event);

        if ((isToggleKey || Events.isDownKey(event)) && !submenuOpen) {
          event.preventDefault();
          openSubmenu();
        }

        if (submenuOpen) {
          const index = findCurrentIndex(submenuFocusId);
          let nextIndex = index;

          if (!submenuFocusId) {
            // toggle close when Space/Enter is pressed on the parent item
            // when parent is a link, allow default behaviour on Enter once submenu is open
            if ((isToggleKey && !href) || (Events.isSpaceKey(event) && href)) {
              event.preventDefault();
              closeSubmenu();
            }

            // close submenu on Shift + Tab from parent item
            if (Events.isShiftKey(event) && Events.isTabKey(event)) {
              closeSubmenu();
            }
          }

          if (Events.isDownKey(event)) {
            event.preventDefault();

            if (nextIndex < numberOfChildren - 1) {
              nextIndex += 1;
            }
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
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
            event.stopPropagation();
            nextIndex = 0;
          }

          if (Events.isEndKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            nextIndex = numberOfChildren - 1;
          }

          if (event.key.length === 1) {
            event.stopPropagation();

            if (characterTimer.current) {
              restartCharacterTimeout();
            } else {
              startCharacterTimeout();
            }

            setCharacterString(`${characterString}${event.key.toLowerCase()}`);
          } else {
            setCharacterString("");
          }

          const eventIsFromInput = Events.composedPath(event.nativeEvent).find(
            (p) =>
              p instanceof HTMLElement &&
              (p.getAttribute("data-element") === "input" ||
                p.getAttribute("data-element") === "input-icon-toggle"),
          );

          if (!eventIsFromInput) {
            if (Events.isEnterKey(event)) {
              /* timeout enforces that the "closeSubmenu" method will be run after 
                the browser navigates to the specified href of the menu-item. */
              setTimeout(() => closeSubmenu(), 0);
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
      ],
    );

    useEffect(() => {
      /* istanbul ignore else */
      if (submenuRef && children) {
        const items = submenuRef?.querySelectorAll(ALL_CHILDREN_SELECTOR);

        /* istanbul ignore else */
        if (items) {
          setSubmenuItemIds(
            Array.from(items)
              .filter((item) => item.querySelector(focusableSelectors))
              .map((item) => item.getAttribute("id")),
          );
        }
      }
    }, [children, submenuOpen, submenuRef]);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      openSubmenu();

      if (onClick) {
        onClick(event);
      }
    };

    useEffect(() => {
      const items = submenuRef?.querySelectorAll(ALL_CHILDREN_SELECTOR);
      if (items && characterString !== "") {
        const submenuChildren = Array.from(items);
        const nextItem = characterNavigation(characterString, submenuChildren);

        if (nextItem) {
          setSubmenuFocusId(nextItem.id);
        }
      }
    }, [submenuRef, characterString, submenuItemIds]);

    const handleSubmenuBlur = (event: React.FocusEvent<HTMLUListElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        closeSubmenu();
      }
    };

    if (inFullscreenView) {
      return (
        <StyledSubmenuWrapper
          data-component="submenu-wrapper"
          inFullscreenView={inFullscreenView}
          asPassiveItem={asPassiveItem}
          menuType={menuType}
        >
          <StyledMenuItemWrapper
            {...rest}
            onClick={asPassiveItem ? undefined : onClick}
            className={className}
            menuType={menuType}
            ref={ref}
            href={href}
            menuItemVariant={variant}
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
            ref={setSubmenuRef}
            applyFocusRadiusStyling={false}
            applyFocusRadiusStylingToLastItem={applyFocusRadiusToLastItem}
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
        data-role="submenu-wrapper"
        onMouseOver={!clickToOpen ? () => openSubmenu() : undefined}
        onMouseLeave={() => closeSubmenu()}
        isSubmenuOpen={submenuOpen}
        ref={setSubmenuRef}
      >
        <StyledMenuItemWrapper
          {...rest}
          className={className}
          menuType={menuType}
          ref={ref}
          icon={icon}
          tabIndex={-1}
          menuItemVariant={variant}
          isOpen={submenuOpen}
          hasSubmenu
          showDropdownArrow={showDropdownArrow}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          clickToOpen={clickToOpen}
          href={href}
          maxWidth={maxWidth}
          aria-expanded={submenuOpen}
          data-role="submenu-parent-item"
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
            applyFocusRadiusStylingToLastItem={applyFocusRadiusToLastItem}
            submenuMaxWidth={submenuMaxWidth}
            submenuMinWidth={submenuMinWidth}
            onBlur={handleSubmenuBlur}
          >
            <SubmenuContext.Provider
              value={{
                submenuFocusId,
                handleKeyDown,
                blockIndex,
                updateFocusId: setSubmenuFocusId,
                submenuHasMaxWidth: !!submenuMaxWidth,
              }}
            >
              {children}
            </SubmenuContext.Provider>
          </StyledSubmenu>
        )}
      </StyledSubmenuWrapper>
    );
  },
);

Submenu.displayName = "submenu";

export default Submenu;
