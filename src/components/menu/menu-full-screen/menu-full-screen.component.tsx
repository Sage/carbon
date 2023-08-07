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
import Portal from "../../portal";
import MenuDivider from "../menu-divider/menu-divider.component";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface MenuFullscreenProps extends TagProps {
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
  children,
  isOpen,
  startPosition = "left",
  onClose,
  ...rest
}: MenuFullscreenProps) => {
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLUListElement>(null);
  const { menuType } = useContext(MenuContext);
  const isDarkVariant = ["dark", "black"].includes(menuType);

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    /* istanbul ignore else */
    if (Events.isEscKey(ev)) {
      onClose(ev);
    }

    if (Events.isTabKey(ev) && !Events.isShiftKey(ev)) {
      const search = menuWrapperRef.current?.querySelector(
        '[data-component="search"'
      );
      const searchInput = search?.querySelector("input");
      const searchButton = search?.querySelector("button");

      // if there is no value in the search input the button disappears when the input blurs
      // this means we need to programatically set focus to the next menu item
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
    }
  };

  const filteredChildren = React.Children.toArray(children).filter((c) =>
    React.isValidElement(c)
  );

  return (
    <li aria-label="menu-fullscreen">
      <Portal>
        <FocusTrap wrapperRef={menuWrapperRef} isOpen={isOpen}>
          <StyledMenuFullscreen
            ref={menuWrapperRef}
            isOpen={isOpen}
            menuType={menuType}
            startPosition={startPosition}
            onKeyDown={handleKeyDown}
            {...rest}
            {...tagComponent("menu-fullscreen", rest)}
          >
            <StyledMenuFullscreenHeader
              isOpen={isOpen}
              menuType={menuType}
              startPosition={startPosition}
            >
              <IconButton
                aria-label="menu fullscreen close button"
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
                  {filteredChildren.map((child, index) => (
                    <>
                      {child}
                      {index < filteredChildren.length - 1 ? (
                        <MenuDivider />
                      ) : null}
                    </>
                  ))}
                </MenuContext.Provider>
              </StyledMenuWrapper>
            </Box>
          </StyledMenuFullscreen>
        </FocusTrap>
      </Portal>
    </li>
  );
};

export default MenuFullscreen;
