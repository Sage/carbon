import React, { useContext, useRef } from "react";

import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
} from "./menu-full-screen.style";
import { StyledMenuWrapper } from "../menu.style";
import MenuContext from "../menu.context";
import FocusTrap from "../../../__internal__/focus-trap";
import Events from "../../../__internal__/utils/helpers/events";
import Box from "../../box";
import IconButton from "../../icon-button";
import Icon from "../../icon";
import Modal from "../../modal";
import MenuDivider from "../menu-divider/menu-divider.component";
import type { TagProps } from "../../../__internal__/utils/helpers/tags";
import useLocale from "../../../hooks/__internal__/useLocale";
import useModalAria from "../../../hooks/__internal__/useModalAria";

export interface MenuFullscreenProps extends TagProps {
  /** Accessible name that conveys the purpose of the menu. */
  "aria-label"?: string;
  /** The child elements to render */
  children?: React.ReactNode;
  /** Sets whether the component is open or closed */
  isOpen?: boolean;
  /** The start position for the component to open from */
  startPosition?: "left" | "right";
  /** A callback to be called when the close icon is clicked or enter is pressed when focused */
  onClose: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export const MenuFullscreen = ({
  "aria-label": ariaLabel = "Fullscreen menu",
  "data-element": dataElement,
  "data-role": dataRole,
  children,
  isOpen = false,
  startPosition = "left",
  onClose,
}: MenuFullscreenProps) => {
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLUListElement>(null);
  const { menuType } = useContext(MenuContext);
  const isDarkVariant = ["dark", "black"].includes(menuType);
  const locale = useLocale();
  const isTopModal = useModalAria(menuWrapperRef);

  // TODO: Remove this temporary event handler as part of FE-6078
  const handleFocusedSearchButton = (ev: React.KeyboardEvent) => {
    const search = menuWrapperRef.current?.querySelector(
      '[data-component="search"]'
    );
    const searchInput = search?.querySelector("input");
    const searchButton = search?.querySelector("button");

    // if there is no value in the search input the button disappears when the input blurs
    // this means we need to programmatically set focus to the next menu item
    if (
      searchButton &&
      searchInput &&
      !searchInput.value &&
      searchInput === document.activeElement
    ) {
      ev.preventDefault();

      const elements = Array.from(
        menuWrapperRef.current?.querySelectorAll(
          "a, input, button"
        ) as NodeListOf<HTMLElement>
      );

      const index = elements.indexOf(searchInput);
      elements[index + 2]?.focus();
    }
  };

  const flattenedChildren = React.Children.toArray(children);
  const childArray = React.Children.toArray(
    flattenedChildren.map((child, index) => {
      if (index < flattenedChildren.length - 1) {
        return (
          <>
            {child}
            <MenuDivider />
          </>
        );
      }

      return child;
    })
  );

  return (
    <li>
      <Modal
        open={isOpen}
        onCancel={onClose}
        transitionName={`slide-from-${startPosition}`}
      >
        <FocusTrap wrapperRef={menuWrapperRef} isOpen={isOpen}>
          <StyledMenuFullscreen
            aria-label={ariaLabel}
            aria-modal={isTopModal ? true : undefined}
            role="dialog"
            data-component="menu-fullscreen"
            data-element={dataElement}
            data-role={dataRole}
            ref={menuWrapperRef}
            isOpen={isOpen}
            menuType={menuType}
            startPosition={startPosition}
            onKeyDown={(ev) =>
              Events.isTabKey(ev) &&
              !Events.isShiftKey(ev) &&
              handleFocusedSearchButton(ev)
            }
          >
            <StyledMenuFullscreenHeader
              isOpen={isOpen}
              menuType={menuType}
              startPosition={startPosition}
            >
              <IconButton
                aria-label={locale.menuFullscreen.ariaLabels.closeButton()}
                onClick={onClose}
                data-element="close"
              >
                <Icon
                  type="close"
                  color={isDarkVariant ? "--colorsYang100" : undefined}
                />
              </IconButton>
            </StyledMenuFullscreenHeader>
            <Box
              overflowY="auto"
              scrollVariant={isDarkVariant ? "dark" : "light"}
              width="100%"
              height="calc(100% - 40px)"
            >
              <StyledMenuWrapper
                data-component="menu"
                menuType={menuType}
                ref={menuContentRef}
                display="flex"
                flexDirection="column"
                role="list"
                inFullscreenView
              >
                <MenuContext.Provider
                  value={{
                    inFullscreenView: true,
                    menuType,
                    inMenu: true,
                    openSubmenuId: null,
                    setOpenSubmenuId: /* istanbul ignore next */ () => {},
                  }}
                >
                  {childArray}
                </MenuContext.Provider>
              </StyledMenuWrapper>
            </Box>
          </StyledMenuFullscreen>
        </FocusTrap>
      </Modal>
    </li>
  );
};

export default MenuFullscreen;
