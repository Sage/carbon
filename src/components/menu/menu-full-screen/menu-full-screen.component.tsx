import React, { useCallback, useContext, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import {
  StyledMenuFullscreen,
  StyledMenuModal,
  StyledMenuFullscreenHeader,
} from "./menu-full-screen.style";
import { StyledMenuWrapper } from "../menu.style";
import MenuContext from "../__internal__/menu.context";
import Events from "../../../__internal__/utils/helpers/events";
import Box from "../../box";
import IconButton from "../../icon-button";
import Icon from "../../icon";
import Portal from "../../portal";
import FocusTrap from "../../../__internal__/focus-trap";
import MenuDivider from "../menu-divider/menu-divider.component";
import type { TagProps } from "../../../__internal__/utils/helpers/tags";
import useLocale from "../../../hooks/__internal__/useLocale";
import useModalAria from "../../../hooks/__internal__/useModalAria";
import useModalManager from "../../../hooks/__internal__/useModalManager";

export interface MenuFullscreenProps extends Omit<TagProps, "data-component"> {
  /** Accessible name that conveys the purpose of the menu   */
  "aria-label"?: string;
  /** The child elements to render */
  children?: React.ReactNode;
  /** Sets whether the component is open or closed */
  isOpen?: boolean;
  /** The start position for the component to open from */
  startPosition?: "left" | "right";
  /** A callback to be called when the close icon is clicked or enter is pressed when focused */
  onClose: (
    ev:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent
  ) => void;
  /** Manually override the internal modal stacking order to set this as top */
  topModalOverride?: boolean;
}

export const MenuFullscreen = ({
  "aria-label": ariaLabel = "Fullscreen menu",
  "data-element": dataElement,
  "data-role": dataRole,
  children,
  isOpen = false,
  onClose,
  startPosition = "left",
  topModalOverride,
}: MenuFullscreenProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const isTopModal = useModalAria(modalRef);
  const { menuType } = useContext(MenuContext);
  const isDarkVariant = ["dark", "black"].includes(menuType);
  const transitionDuration = 200;
  const locale = useLocale();

  const flattenedChildren = React.Children.toArray(children);
  const childArray = React.Children.toArray(
    flattenedChildren.map((child, index) => {
      if (index < flattenedChildren.length - 1) {
        return (
          <>
            {child}
            <MenuDivider data-role="divider" />
          </>
        );
      }

      return child;
    })
  );

  const closeModal = useCallback(
    (ev: KeyboardEvent) => {
      /* istanbul ignore else */
      if (onClose && Events.isEscKey(ev)) {
        ev.stopImmediatePropagation();
        onClose(ev);
      }
    },
    [onClose]
  );

  useModalManager({
    open: isOpen,
    closeModal,
    modalRef: menuRef,
    topModalOverride,
    focusCallToActionElement: document.activeElement as HTMLElement,
  });

  return (
    <li>
      <Portal>
        <CSSTransition
          nodeRef={menuRef}
          in={isOpen}
          timeout={transitionDuration}
          unmountOnExit
        >
          <StyledMenuFullscreen
            ref={menuRef}
            startPosition={startPosition}
            transitionDuration={transitionDuration}
          >
            <FocusTrap wrapperRef={modalRef} isOpen={isOpen}>
              <StyledMenuModal
                aria-label={ariaLabel}
                aria-modal={isTopModal ? true : undefined}
                data-component="menu-fullscreen"
                data-element={dataElement}
                data-role={dataRole}
                menuType={menuType}
                ref={modalRef}
                role="dialog"
                tabIndex={-1}
              >
                <StyledMenuFullscreenHeader menuType={menuType}>
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
                    ref={contentRef}
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
              </StyledMenuModal>
            </FocusTrap>
          </StyledMenuFullscreen>
        </CSSTransition>
      </Portal>
    </li>
  );
};

export default MenuFullscreen;
