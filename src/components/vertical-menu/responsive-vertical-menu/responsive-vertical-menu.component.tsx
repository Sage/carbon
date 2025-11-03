import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import { DepthProvider } from "./__internal__/depth.context";
import { MenuFocusProvider } from "./__internal__/focus.context";
import {
  useResponsiveVerticalMenu,
  ResponsiveVerticalMenuProvider,
} from "./responsive-vertical-menu.context";
import {
  ModalContainer,
  StyledButton,
  StyledCloseButton,
  StyledGlobalVerticalMenuWrapper,
  StyledResponsiveMenu,
} from "./responsive-vertical-menu.style";

import Box from "../../box";
import Modal from "../../../__internal__/modal";

import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useLocale from "../../../hooks/__internal__/useLocale";

import FocusTrap from "../../../__internal__/focus-trap";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import Events from "../../../__internal__/utils/helpers/events";

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

export type ResponsiveVerticalMenuHandle = {
  /** Programmatically focus on the launcher button. */
  focusLaunchButton: () => void;
} | null;

const BaseMenu = forwardRef<
  ResponsiveVerticalMenuHandle,
  ResponsiveVerticalMenuProps
>(
  (
    {
      children,
      height,
      responsiveBreakpoint = 700,
      width,
      launcherButtonDataProps,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const {
      active,
      activeMenuItem,
      buttonRef,
      containerRef,
      menuRef,
      responsiveMode,
      top,
      setActive,
      setActiveMenuItem,
      setReducedMotion,
      setResponsiveMode,
      setLeft,
      setTop,
    } = useResponsiveVerticalMenu();

    const [childItemCount, setChildItemCount] = useState(0);
    const largeScreen = useIsAboveBreakpoint(responsiveBreakpoint);
    const [responsiveWidth, setResponsiveWidth] = useState("100%");
    const reduceMotion = !useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { current: menu } = menuRef;
    const { current: button } = buttonRef;

    useImperativeHandle<
      ResponsiveVerticalMenuHandle,
      ResponsiveVerticalMenuHandle
    >(
      ref,
      () => ({
        focusLaunchButton() {
          button?.focus({ preventScroll: true });
        },
      }),
      [button],
    );

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
            `${menuContainer.getBoundingClientRect().width}px`,
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
    }, [active, responsiveMode, activeMenuItem, menu, button, setLeft, setTop]);

    const handleOutsideClick = useCallback(
      (event: MouseEvent) => {
        const notInContainer =
          containerRef.current &&
          !containerRef.current.contains(event.target as Node);

        if (notInContainer) {
          setActive(false);
        }
      },
      [containerRef, setActive],
    );

    const handleActiveToggle = useCallback(() => {
      setActive((previous) => !previous);
      // Make sure the menu is closed when the button is clicked (prevents historic menu items being retained in memory)
      setActiveMenuItem(null);
    }, [setActive, setActiveMenuItem]);

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
      let timeout: NodeJS.Timeout | null = null;
      const handleBlur = (ev: FocusEvent) => {
        /* istanbul ignore if */
        if (!containerRef.current) {
          return;
        }

        if (
          Events.composedPath(ev).includes(buttonRef.current as EventTarget)
        ) {
          return;
        }

        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        timeout = setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
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
        if (timeout) clearTimeout(timeout);
        timeout = null;
      };
    }, [
      active,
      activeMenuItem,
      buttonRef,
      containerRef,
      handleOutsideClick,
      responsiveMode,
      setActive,
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

    const buttonAriaProps = () => {
      if (responsiveMode) {
        return {
          "aria-label":
            locale.verticalMenu.ariaLabels?.responsiveMenuLauncher(),
        };
      }
      return {
        "aria-expanded": active,
        "aria-controls": "responsive-vertical-menu-primary",
        "aria-label": locale.verticalMenu.ariaLabels?.responsiveMenuLauncher(),
      };
    };

    const modalAriaProps = () => {
      return {
        role: "dialog" as const,
        "aria-modal": true,
        "aria-label": locale.verticalMenu.ariaLabels?.responsiveMenuAria(),
      };
    };

    return (
      <div ref={containerRef}>
        <StyledButton
          active={active}
          buttonType="tertiary"
          iconType="squares_nine"
          id="responsive-vertical-menu-launcher"
          onClick={handleActiveToggle}
          ref={buttonRef}
          {...tagComponent("responsive-vertical-menu-launcher", {
            "data-role": "responsive-vertical-menu-launcher",
            ...launcherButtonDataProps,
          })}
          {...buttonAriaProps()}
        />
        {responsiveMode ? (
          <Modal open={active}>
            <FocusTrap wrapperRef={wrapperRef} isOpen={active}>
              <ModalContainer
                ref={wrapperRef}
                width={responsiveWidth}
                tabIndex={-1}
                id="responsive-vertical-menu-dialog"
                {...modalAriaProps()}
              >
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
              </ModalContainer>
            </FocusTrap>
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
              </>
            )}
          </StyledGlobalVerticalMenuWrapper>
        )}
      </div>
    );
  },
);

export const ResponsiveVerticalMenu = forwardRef<
  ResponsiveVerticalMenuHandle,
  ResponsiveVerticalMenuProps
>(({ children, width, height, ...props }, ref) => {
  return (
    <DepthProvider>
      <MenuFocusProvider>
        <ResponsiveVerticalMenuProvider width={width} height={height}>
          <BaseMenu ref={ref} width={width} height={height} {...props}>
            {children}
          </BaseMenu>
        </ResponsiveVerticalMenuProvider>
      </MenuFocusProvider>
    </DepthProvider>
  );
});

export default ResponsiveVerticalMenu;
