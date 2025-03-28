import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  StyledButton,
  StyledDivider,
  StyledMenuItemContent,
  StyledParentMenuItem,
  StyledSubMenuChildMenuItem,
  StyledSubMenuMenuItem,
  StyledSubMenuParentMenuItem,
  StyledVerticalMenu,
  StyledVerticalMenuWrapper,
  StyledVerticalSubMenu,
} from "./v2.style";

import Icon from "../../icon";

import useMediaQuery from "../../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import V2MenuContext, { V2MenuItem } from "./v2.context";

export interface GlobalNavV2Props extends TagProps {
  height?: string;
  items: V2MenuItem[];
}

interface SubMenuPaneProps {
  active?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  height?: string;
  menuRef: React.RefObject<HTMLDivElement>;
  reduceMotion?: boolean;
}

interface MenuPaneProps extends SubMenuPaneProps {
  items: V2MenuItem[];
}

interface MenuItemProps {
  item: V2MenuItem;
}

const MenuItemContent = ({ item }: MenuItemProps) => {
  return item.customIcon ? (
    <StyledMenuItemContent>
      {item.customIcon()}
      {item.label}
    </StyledMenuItemContent>
  ) : (
    <StyledMenuItemContent>
      {item.icon && <Icon type={item.icon} />}
      {item.label}
    </StyledMenuItemContent>
  );
};

const MenuItem = ({ item }: MenuItemProps) => {
  const { activeMenuItem, setActiveMenuItem } = useContext(V2MenuContext);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeMenuItem?.id === item.id;

  if (item.divider) {
    return (
      <li>
        <StyledDivider />
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li>
        <StyledParentMenuItem
          active={isActive}
          aria-expanded={isActive}
          type="button"
          onClick={() => {
            if (isActive) {
              setActiveMenuItem(null);
            } else {
              setActiveMenuItem(item);
            }
          }}
        >
          <MenuItemContent item={item} />
          <Icon type="chevron_right_thick" />
        </StyledParentMenuItem>
      </li>
    );
  }

  return (
    <li>
      <StyledSubMenuMenuItem href={item.href}>
        <MenuItemContent item={item} />
      </StyledSubMenuMenuItem>
    </li>
  );
};

// Sub-Menu Item Component
const SubMenuItem = ({ item }: MenuItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(false);

  if (item.divider) {
    return (
      <li>
        <StyledDivider />
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li>
        <StyledSubMenuParentMenuItem
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <MenuItemContent item={item} />

          <Icon type={expanded ? "chevron_up_thick" : "chevron_down_thick"} />
        </StyledSubMenuParentMenuItem>
        {expanded && (
          <div>
            <ul>
              {item.children?.map((subItem) => {
                if (subItem.divider) {
                  return (
                    <li>
                      <StyledDivider nested />
                    </li>
                  );
                }
                return (
                  <li>
                    <StyledSubMenuChildMenuItem href={subItem.href}>
                      <MenuItemContent item={subItem} />
                    </StyledSubMenuChildMenuItem>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  }

  return (
    <li>
      <StyledSubMenuMenuItem href={item.href}>
        <MenuItemContent item={item} />
      </StyledSubMenuMenuItem>
    </li>
  );
};

const MenuPane = ({
  active,
  buttonRef,
  height,
  items,
  menuRef,
  reduceMotion,
}: MenuPaneProps) => {
  if (!active) return null;

  return (
    <StyledVerticalMenu
      alignItems="center"
      backgroundColor="black"
      data-component="global-nav-v2-menu"
      display={active ? "flex" : "none"}
      flexDirection="column"
      height={height}
      justifyContent="flex-start"
      reduceMotion={reduceMotion}
      ref={menuRef}
      px={2}
      top={
        buttonRef && buttonRef.current
          ? `${buttonRef.current.getBoundingClientRect().bottom}px`
          : "auto"
      }
      width="320px"
    >
      <ul>
        {items.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </ul>
    </StyledVerticalMenu>
  );
};

const SubMenuPane = ({
  active,
  buttonRef,
  height,
  menuRef,
  reduceMotion,
}: SubMenuPaneProps) => {
  const { activeMenuItem } = useContext(V2MenuContext);
  const [left, setLeft] = useState("auto");
  const [top, setTop] = useState("auto");

  useLayoutEffect(() => {
    if (active && menuRef && menuRef.current) {
      setLeft(`${menuRef.current.getBoundingClientRect().right}px`);
    } else {
      setLeft("auto");
    }

    if (active && buttonRef && buttonRef.current) {
      setTop(`${buttonRef.current.getBoundingClientRect().bottom}px`);
    } else {
      setTop("auto");
    }
  }, [active, buttonRef, menuRef]);

  if (!active || !activeMenuItem || !activeMenuItem.children) return null;

  return (
    <StyledVerticalSubMenu
      alignItems="center"
      backgroundColor="black"
      data-component="global-nav-v2-submenu"
      display={active ? "flex" : "none"}
      flexDirection="column"
      height={height || undefined}
      justifyContent="flex-start"
      left={left}
      reduceMotion={reduceMotion}
      px={2}
      top={top}
      width="320px"
    >
      <ul>
        {activeMenuItem?.children.map((subItem) => (
          <SubMenuItem key={subItem.id} item={subItem} />
        ))}
      </ul>
    </StyledVerticalSubMenu>
  );
};

export const GlobalNavV2 = ({ height, items, ...rest }: GlobalNavV2Props) => {
  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const [active, setActive] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<V2MenuItem | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();

      setActive(false);
      setActiveMenuItem(null);
    }
  };

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    const notInContainer =
      containerRef.current &&
      !containerRef.current.contains(event.target as Node);

    if (notInContainer) {
      setActive(false);
      setActiveMenuItem(null);
    }
  }, []);

  useEffect(() => {
    if (active) {
      document.addEventListener("keydown", handleClose);
    } else {
      document.removeEventListener("keydown", handleClose);
    }

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [active]);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return function cleanup() {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <V2MenuContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
      <StyledVerticalMenuWrapper
        ref={containerRef}
        {...tagComponent("global-nav-v2", rest)}
      >
        <StyledButton
          active={active}
          buttonType="tertiary"
          data-component="global-nav-v2-toggle"
          iconType="squares_nine"
          onClick={() => setActive(!active)}
          ref={buttonRef}
        />
        <MenuPane
          active={active}
          buttonRef={buttonRef}
          height={height}
          items={items}
          menuRef={menuRef}
          reduceMotion={reduceMotion}
        />
        <SubMenuPane
          active={active}
          buttonRef={buttonRef}
          height={height}
          menuRef={menuRef}
          reduceMotion={reduceMotion}
        />
      </StyledVerticalMenuWrapper>
    </V2MenuContext.Provider>
  );
};

export default GlobalNavV2;
