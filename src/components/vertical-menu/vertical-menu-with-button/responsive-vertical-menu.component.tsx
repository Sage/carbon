import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useResponsiveVerticalMenu } from "./responsive-vertical-menu.context";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import Icon, { IconType } from "../../icon";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {
  StyledButton,
  StyledGlobalVerticalMenuWrapper,
  StyledResponsiveMenu,
  StyledResponsiveMenuAction,
  StyledResponsiveMenuItem,
} from "./responsive-vertical-menu.style";
import { MenuItemContent } from "./responsive-vertical-menu-item";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

const DepthContext = createContext(0);

interface ResponsiveVerticalMenuItemProps {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export interface ResponsiveVerticalMenuProps extends TagProps {
  children?: React.ReactNode;
}

export const BaseMenu = ({
  children,
  ...rest
}: {
  children?: React.ReactNode;
}) => {
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
  const largeScreen = useIsAboveBreakpoint(700);
  const [left, setLeft] = useState("auto");
  const [top, setTop] = useState("auto");
  const subMenuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  useEffect(() => {
    setReducedMotion?.(reduceMotion);
    setResponsiveMode?.(!largeScreen || false);
  }, [largeScreen, reduceMotion, setReducedMotion, setResponsiveMode]);

  useLayoutEffect(() => {
    if (activeMenuItem && menuRef && menuRef.current) {
      setLeft(`${menuRef.current.getBoundingClientRect().right}px`);
    } else {
      setLeft("auto");
    }

    if (activeMenuItem && buttonRef && buttonRef.current) {
      setTop(`${buttonRef.current.getBoundingClientRect().bottom}px`);
    } else {
      setTop("auto");
    }
  }, [activeMenuItem, buttonRef, menuRef]);

  // const handleClose = useCallback((e: KeyboardEvent) => {
  //   if (e.key === "Escape") {
  //     e.preventDefault();

  //     setActive(false);
  //   }
  // }, []);

  // const handleOutsideClick = useCallback((event: MouseEvent) => {
  //   const notInContainer =
  //     containerRef.current &&
  //     !containerRef.current.contains(event.target as Node);

  //   if (notInContainer) {
  //     setActive(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (active) {
  //     document.addEventListener("keydown", handleClose);
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", handleClose);
  //   };
  // }, [active, handleClose]);

  // useEffect(() => {
  //   window.addEventListener("click", handleOutsideClick);

  //   return function cleanup() {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [handleOutsideClick]);

  // useEffect(() => {
  //   const handleBlur = () => {
  //     setTimeout(() => {
  //       if (
  //         containerRef.current &&
  //         !containerRef.current.contains(document.activeElement)
  //       ) {
  //         setActive(false);
  //       }
  //     }, 0);
  //   };

  //   const currentContainer = containerRef.current;
  //   currentContainer?.addEventListener("focusout", handleBlur);

  //   return () => {
  //     currentContainer?.removeEventListener("focusout", handleBlur);
  //   };
  // }, [active, handleClose]);

  return (
    <>
      <StyledButton
        active={active}
        buttonType="tertiary"
        data-component="global-nav-v2-toggle"
        iconType="squares_nine"
        onClick={() => {
          setActive(!active);
          setActiveMenuItem(null);
        }}
        ref={buttonRef}
      />
      <StyledGlobalVerticalMenuWrapper
        ref={containerRef}
        {...rest}
        {...tagComponent("global-nav-v2", rest)}
      >
        {active && (
          <>
            <StyledResponsiveMenu
              id="responsive-vertical-menu-primary"
              menu="primary"
              ref={menuRef}
              top={top}
            >
              {children}
            </StyledResponsiveMenu>

            {activeMenuItem && !responsiveMode ? (
              <StyledResponsiveMenu
                id="responsive-vertical-menu-secondary"
                left={left}
                menu="secondary"
                ref={subMenuRef}
                top={top}
              >
                {activeMenuItem.children}
              </StyledResponsiveMenu>
            ) : null}
          </>
        )}
      </StyledGlobalVerticalMenuWrapper>
    </>
  );
};

const BaseItem = ({
  children,
  customIcon,
  icon,
  id,
  href,
  label,
}: ResponsiveVerticalMenuItemProps) => {
  const { activeMenuItem, containerRef, responsiveMode, setActiveMenuItem } =
    useResponsiveVerticalMenu();
  const [expanded, setExpanded] = useState(false);
  const depth = useContext(DepthContext);
  const isActive = activeMenuItem?.id === id;

  const hasChildren = React.Children.count(children) > 0;

  return (
    <>
      {hasChildren ? (
        <>
          <StyledResponsiveMenuItem
            active={isActive}
            aria-expanded={isActive}
            id={id}
            onClick={() => {
              if (depth === 0 && !responsiveMode) {
                setActiveMenuItem(
                  activeMenuItem ? null : { id, label, children },
                );
              } else {
                setExpanded(!expanded);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && isActive && !e.shiftKey) {
                if (containerRef.current) {
                  const subMenu = containerRef.current.querySelector(
                    '[id="responsive-vertical-menu-secondary"]',
                  );
                  if (subMenu) {
                    const firstChild = subMenu.firstChild as HTMLElement;
                    if (firstChild) {
                      e.preventDefault();
                      firstChild.focus();
                    }
                  }
                }
              }
            }}
            tabIndex={0}
            type="button"
          >
            <MenuItemContent
              customIcon={customIcon}
              icon={icon}
              label={label}
            />
            <Icon type="chevron_right_thick" />
          </StyledResponsiveMenuItem>
          {expanded && <div>{children}</div>}
        </>
      ) : (
        <StyledResponsiveMenuAction href={href} id={id} tabIndex={0}>
          <MenuItemContent customIcon={customIcon} icon={icon} label={label} />
        </StyledResponsiveMenuAction>
      )}
    </>
  );
};

export const ResponsiveVerticalMenu = ({
  children,
  ...props
}: ResponsiveVerticalMenuProps) => {
  return (
    <DepthContext.Provider value={0}>
      <BaseMenu {...props}>{children}</BaseMenu>
    </DepthContext.Provider>
  );
};

export const ResponsiveVerticalMenuItem = ({
  children,
  id,
  label,
  ...props
}: ResponsiveVerticalMenuItemProps) => {
  const depth = useContext(DepthContext);

  return (
    <BaseItem id={id} label={label} {...props} data-depth={depth}>
      {children && (
        <DepthContext.Provider value={depth + 1}>
          {children}
        </DepthContext.Provider>
      )}
    </BaseItem>
  );
};

export default ResponsiveVerticalMenu;
