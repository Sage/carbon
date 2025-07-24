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
import useLocale from "../../../hooks/__internal__/useLocale";

export interface ResponsiveVerticalMenuProps extends TagProps {
  /** The content of the menu */
  children?: ReactNode;
  /** The height of the primary and secondary menus */
  height?: string;
  /** The value (in pixels) at which the ResponsiveVerticalMenu will become responsive/modal */
  responsiveBreakpoint?: number;
  /** The width of the primary and secondary menus when in default mode */
  width?: string;
  /** Set Menu launcher button data tag props */
  launcherButtonDataProps?: TagProps;
}

const BaseMenu = ({
  children,
  height,
  responsiveBreakpoint = 700,
  width,
  launcherButtonDataProps,
  ...rest
}: ResponsiveVerticalMenuProps) => {
  const locale = useLocale();
  const {
    active,
    activeMenuItem,
    buttonRef,
    containerRef,
    menuRef,
    responsiveMode,
    setActive,
    setActiveMenuItem,
    setReducedMotion,
    setResponsiveMode,
  } = useResponsiveVerticalMenu();

  const [childItemCount, setChildItemCount] = useState(0);
  const largeScreen = useIsAboveBreakpoint(responsiveBreakpoint);
  const [left, setLeft] = useState("auto");
  const [responsiveWidth, setResponsiveWidth] = useState("100%");
  const [top, setTop] = useState("auto");
  const subMenuRef = useRef<HTMLUListElement>(null);
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
        setResponsiveWidth(`${menuContainer.getBoundingClientRect().width}px`);
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
    setActive((previous) => !previous);
    // Make sure the menu is closed when the button is clicked (prevents historic menu items being retained in memory)
    setActiveMenuItem(null);
  }, [active, setActive, setActiveMenuItem]);

  useLayoutEffect(() => {
    measureDimensions();

    // Measure dimensions when the window is resized
    window.addEventListener("resize", measureDimensions);

    return () => {
      window?.removeEventListener("resize", measureDimensions);
    };
  }, [active, measureDimensions, menu, responsiveMode]);

  const isResizingRef = useRef(false);
  const resizeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      isResizingRef.current = true;

      if (resizeTimeoutRef.current !== null) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        isResizingRef.current = false;
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current !== null) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleBlur = ({ relatedTarget, target }: FocusEvent) => {
      /* istanbul ignore if */
      if (!containerRef.current) {
        return;
      }

      const relatedTargetIsWithinContainer = containerRef.current.contains(
        relatedTarget as Node,
      );

      if (!relatedTargetIsWithinContainer) {
        /* istanbul ignore if */
        if (relatedTarget === null && target !== buttonRef.current) {
          setTimeout(() => {
            if (!activeMenuItem && !isResizingRef.current) {
              setActive(false);
            }
          }, 10);
        }
      }
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
  }, [
    active,
    activeMenuItem,
    buttonRef,
    containerRef,
    handleOutsideClick,
    responsiveMode,
  ]);

  useEffect(() => {
    setReducedMotion?.(reduceMotion);
    setResponsiveMode?.(!largeScreen);
  }, [largeScreen, reduceMotion, setReducedMotion, setResponsiveMode]);

  const countChildren = useCallback((currentChildren: React.ReactNode) => {
    // If there are no children, return 0
    if (!currentChildren) {
      return 0;
    }

    // If the content of children is a single React element, count it and check its children
    if (React.isValidElement(currentChildren)) {
      const nodeChildren: number = countChildren(
        currentChildren.props.children,
      );
      return 1 + nodeChildren;
    }

    // If the content of children is an array of React elements, iterate through them
    const childrenAsArray = React.Children.toArray(currentChildren);

    /* istanbul ignore else */
    if (childrenAsArray.length) {
      const reducedChildren: number = childrenAsArray.reduce(
        (acc: number, child: React.ReactNode) => {
          /* istanbul ignore else */
          if (React.isValidElement(child)) {
            const total = acc + 1;
            const childrenCount = countChildren(child.props.children);
            return total + childrenCount;
          }
          return acc;
        },
        0,
      );

      return reducedChildren;
    }
    return 0;
  }, []);

  useEffect(() => {
    const previousChildCount = childItemCount;
    const newChildCount = countChildren(children);

    if (previousChildCount !== newChildCount) {
      setChildItemCount(newChildCount);
      setActiveMenuItem(null);
    }
  }, [childItemCount, children, countChildren, setActiveMenuItem]);

  return (
    <div ref={containerRef}>
      <StyledButton
        active={active}
        aria-controls="responsive-vertical-menu-primary"
        aria-expanded={active}
        aria-label={locale.verticalMenu.ariaLabels?.responsiveMenuLauncher()}
        buttonType="tertiary"
        iconType="squares_nine"
        id="responsive-vertical-menu-launcher"
        onClick={handleActiveToggle}
        ref={buttonRef}
        {...tagComponent("responsive-vertical-menu-launcher", {
          "data-role": "responsive-vertical-menu-launcher",
          ...launcherButtonDataProps,
        })}
      />
      {responsiveMode ? (
        <Modal open={active}>
          <Box position="fixed" top={0} width={responsiveWidth}>
            <Box
              boxSizing="border-box"
              display="flex"
              justifyContent="flex-end"
              width="100%"
              backgroundColor="var(--colorsGray850)"
              p={1}
            >
              <StyledCloseButton
                aria-label={locale.verticalMenu.ariaLabels?.responsiveMenuCloseButton()}
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
