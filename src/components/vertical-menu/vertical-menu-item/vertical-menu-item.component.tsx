import React, { useState, useContext } from "react";
import { PaddingProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { IconType } from "../../icon";
import {
  StyledVerticalMenuItem,
  StyledTitle,
  StyledAdornment,
  StyledList,
  StyledChevronIcon,
  StyledTitleIcon,
} from "../vertical-menu.style";
import MenuItemContext from "./__internal__/menu-item.context";
import { useVerticalMenuContext } from "../__internal__/vertical-menu.context";

export interface VerticalMenuItemProps<T = React.ElementType>
  extends PaddingProps,
    TagProps {
  /** Children of the menu item - another level of VerticalMenuItems */
  children?: React.ReactNode;
  /** Default open state of the component */
  defaultOpen?: boolean;
  /** Title of the menu item */
  title: string;
  /** Adornment of the menu item meant to be rendered on the right side */
  adornment?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /** Icon meant to be rendered on the left side */
  iconType?: IconType;
  /** Whether the menu item is active or not */
  active?: boolean | ((isOpen: boolean) => boolean);
  /** Height of the menu item */
  height?: string;
  /**  Href, when passed the menu item will be rendered as an anchor tag */
  href?: string;
  /** Optional component to render instead of the default div, useful for rendering router link components */
  component?: T;
}

type InferredComponentProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  keyof VerticalMenuItemProps<T>
>;

export const VerticalMenuItem = <T,>({
  defaultOpen = false,
  title,
  iconType,
  adornment,
  children,
  component,
  active,
  height = "56px",
  href,
  ...rest
}: T extends React.ElementType
  ? InferredComponentProps<T> & VerticalMenuItemProps<T>
  : VerticalMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleOnClick = () => {
    setIsOpen((state) => !state);
  };

  const { level } = useContext(MenuItemContext);

  const { isFullScreen } = useVerticalMenuContext();

  const renderAdornment = () =>
    typeof adornment === "function" ? adornment(isOpen) : adornment;

  const shouldDisplayActiveState =
    typeof active === "function" ? active(isOpen) : active;

  let itemProps = {};

  if (href) {
    itemProps = {
      as: "a",
      href,
    };
  }

  if (component) {
    itemProps = {
      as: component,
      href,
      tabIndex: 0,
      ...rest,
    };
  }

  if (children) {
    itemProps = {
      as: "button",
      type: "button",
      "aria-expanded": isOpen,
      onClick: handleOnClick,
    };
  }

  const paddingX = `calc(var(--spacing500) + (${level} * var(--spacing400)))`;

  return (
    <li>
      <StyledVerticalMenuItem
        height={height}
        px={paddingX}
        py={2}
        active={shouldDisplayActiveState}
        {...itemProps}
        {...filterStyledSystemPaddingProps(rest)}
        {...tagComponent("vertical-menu-item", rest)}
      >
        {iconType && <StyledTitleIcon type={iconType} />}

        <StyledTitle>{title}</StyledTitle>

        {adornment && <StyledAdornment>{renderAdornment()}</StyledAdornment>}

        {children && !isFullScreen && (
          <StyledChevronIcon
            type={isOpen ? "chevron_up_thick" : "chevron_down_thick"}
          />
        )}
      </StyledVerticalMenuItem>

      {(isOpen || isFullScreen) && (
        <MenuItemContext.Provider value={{ level: level + 1 }}>
          <StyledList>{children}</StyledList>
        </MenuItemContext.Provider>
      )}
    </li>
  );
};

export default VerticalMenuItem;
