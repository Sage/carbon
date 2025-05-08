import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useResponsiveVerticalMenu } from "./responsive-vertical-menu.context";
import {
  StyledButton,
  StyledCloseButton,
  StyledGlobalVerticalMenuWrapper,
  StyledResponsiveMenu,
} from "./responsive-vertical-menu.style";

import Box from "../../box";

import Modal from "../../modal";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import useMediaQuery from "../../../hooks/useMediaQuery";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { DepthProvider } from "./__internal__/depth.context";
import { MenuFocusProvider } from "./__internal__/focus.context";

export interface ResponsiveVerticalMenuProps extends TagProps {
  /** The content of the menu */
  children?: ReactNode;
  /** The height of the primary and secondary menus */
  height?: string;
  /** The value (in pixels) at which the ResponsiveVerticalMenu will become responsive/modal */
  responsiveBreakpoint?: number;
  /** The width of the primary and secondary menus when in default mode */
  width?: string;
}

const BaseMenu = ({
  children,
  height,
  responsiveBreakpoint = 700,
  width,
  ...rest
}: ResponsiveVerticalMenuProps) => {
  const {
    activeMenuItem,
    buttonRef,
    containerRef,
    menuRef,
    responsiveMode,
    setActiveMenuItem,
    setReducedMotion,
    setResponsiveMode,
  } = useResponsiveVerticalMenu();
  const [active, setActive] = useState(false);
  const largeScreen = useIsAboveBreakpoint(responsiveBreakpoint);
  const [left, setLeft] = useState("auto");
  const [responsiveWidth, setResponsiveWidth] = useState("100%");
  const [top, setTop] = useState("auto");
  const subMenuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const { current: menu } = menuRef;
  const { current: button } = buttonRef;

  const measureDimensions = useCallback(() => {
    // Only calculate the width of the menu if the menu is open in responsive mode
    if (active && responsiveMode) {
      // Get the width of the menu container. The ref might not be set yet, hence
      // the use of `document.querySelector` to find the menu container.
      const menuContainer =
        menu ||
        document.querySelector("[id='responsive-vertical-menu-primary']");
      /* istanbul ignore else */
      if (menuContainer) {
        setResponsiveWidth(
          `${menuContainer.getBoundingClientRect().width - 16}px`,
        );
      }
    }

    if (activeMenuItem && menu) {
      setLeft(`${menu.getBoundingClientRect().right}px`);
    } else {
      setLeft("auto");
    }

    if (activeMenuItem && button) {
      setTop(`${button.getBoundingClientRect().bottom}px`);
    } else {
      setTop("auto");
    }
  }, [active, menu, responsiveMode, activeMenuItem, button]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const notInContainer =
        containerRef.current &&
        !containerRef.current.contains(event.target as Node);

      if (notInContainer) {
        setActive(false);
      }
    },
    [containerRef],
  );

  const handleActiveToggle = useCallback(() => {
    setActive((previousState) => !previousState);
    // Make sure the menu is closed when the button is clicked (prevents historic menu items being retained in memory)
    setActiveMenuItem(null);
  }, [setActiveMenuItem]);

  useLayoutEffect(() => {
    measureDimensions();
  }, [active, measureDimensions, menu, responsiveMode]);

  useEffect(() => {
    const handleBlur = () => {
      setTimeout(() => {
        if (
          containerRef.current &&
          !containerRef.current.contains(document.activeElement)
        ) {
          setActive(false);
        }
      }, 0);
    };

    const handleClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();

        setActive(false);
      }
    };

    const currentContainer = containerRef.current;

    if (active && !responsiveMode) {
      document.addEventListener("keydown", handleClose);
      window.addEventListener("click", handleOutsideClick);
      currentContainer?.addEventListener("focusout", handleBlur);
    }

    return () => {
      document.removeEventListener("keydown", handleClose);
      window.removeEventListener("click", handleOutsideClick);
      currentContainer?.removeEventListener("focusout", handleBlur);
    };
  }, [active, containerRef, handleOutsideClick, responsiveMode]);

  useEffect(() => {
    setReducedMotion?.(reduceMotion);
    setResponsiveMode?.(!largeScreen);
  }, [largeScreen, reduceMotion, setReducedMotion, setResponsiveMode]);

  return (
    <div ref={containerRef}>
      <StyledButton
        active={active}
        buttonType="tertiary"
        data-component="responsive-vertical-menu-launcher"
        data-role="responsive-vertical-menu-launcher"
        iconType="squares_nine"
        id="responsive-vertical-menu-launcher"
        onClick={handleActiveToggle}
        ref={buttonRef}
      />
      {responsiveMode ? (
        <Modal open={active}>
          <Box position="fixed" top={0} width={responsiveWidth}>
            <Box
              display="flex"
              justifyContent="flex-end"
              width="100%"
              backgroundColor="var(--colorsGray850)"
              p={1}
            >
              <StyledCloseButton
                aria-label="close-menu"
                data-component="responsive-vertical-menu-close"
                data-role="responsive-vertical-menu-close"
                iconType="close"
                size="small"
                buttonType="tertiary"
                onClick={() => {
                  setActive(false);
                  setActiveMenuItem(null);
                }}
              />
            </Box>
            <StyledResponsiveMenu
              height={height}
              id="responsive-vertical-menu-primary"
              menu="primary"
              reduceMotion={reduceMotion}
              ref={menuRef}
              responsive
              tabIndex={-1}
              top="48px"
              width={width}
            >
              {children}
            </StyledResponsiveMenu>
          </Box>
        </Modal>
      ) : (
        <StyledGlobalVerticalMenuWrapper
          {...rest}
          {...tagComponent("responsive-vertical-menu", rest)}
        >
          {active && (
            <>
              <StyledResponsiveMenu
                childOpen={!!activeMenuItem}
                data-component="responsive-vertical-menu-primary"
                data-role="responsive-vertical-menu-primary"
                height={height || "100%"}
                id="responsive-vertical-menu-primary"
                menu="primary"
                reduceMotion={reduceMotion}
                ref={menuRef}
                responsive={false}
                tabIndex={-1}
                top={top}
                width={width}
              >
                {children}
              </StyledResponsiveMenu>

              {activeMenuItem ? (
                <StyledResponsiveMenu
                  data-component="responsive-vertical-menu-secondary"
                  data-role="responsive-vertical-menu-secondary"
                  height={height || "100%"}
                  id="responsive-vertical-menu-secondary"
                  left={left}
                  menu="secondary"
                  reduceMotion={reduceMotion}
                  ref={subMenuRef}
                  responsive={false}
                  tabIndex={-1}
                  top={top}
                  width={width}
                >
                  {activeMenuItem.children}
                </StyledResponsiveMenu>
              ) : null}
            </>
          )}
        </StyledGlobalVerticalMenuWrapper>
      )}
    </div>
  );
};

export const ResponsiveVerticalMenu = ({
  children,
  ...props
}: ResponsiveVerticalMenuProps) => {
  return (
    <DepthProvider>
      <MenuFocusProvider>
        <BaseMenu {...props}>{children}</BaseMenu>
      </MenuFocusProvider>
    </DepthProvider>
  );
};

export default ResponsiveVerticalMenu;
