import React, { ReactNode, useState, useContext } from "react";
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
  StyledCustomIconWrapper,
} from "../vertical-menu.style";
import MenuItemContext from "./__internal__/menu-item.context";
import { useVerticalMenuContext } from "../__internal__/vertical-menu.context";

export type VerticalMenuItemClickEvent =
  | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>;

export interface VerticalMenuItemProps<T = React.ElementType>
  extends PaddingProps,
    TagProps {
  /** Children of the menu item - another level of VerticalMenuItems */
  children?: React.ReactNode;
  /** Custom icon to be displayed. Takes precedence over `iconType` if both are specified. */
  customIcon?: ReactNode;
  /** Default open state of the component */
  defaultOpen?: boolean;
  /** Title of the menu item */
  title: string;
  /** Adornment of the menu item meant to be rendered on the right side */
  adornment?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /** The Carbon icon to be displayed. Defers to `customIcon` if both are defined. */
  iconType?: IconType;
  /** Whether the menu item is active or not */
  active?: boolean | ((isOpen: boolean) => boolean);
  /** Height of the menu item */
  height?: string;
  /**  Href, when passed the menu item will be rendered as an anchor tag */
  href?: string;
  /** A custom click handler to run when the menu item is clicked */
  onClick?: (event: VerticalMenuItemClickEvent) => void;
  /** Optional component to render instead of the default div, useful for rendering router link components */
  component?: T;
}

type InferredComponentProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  keyof VerticalMenuItemProps<T>
>;

const VerticalMenuItem = <T,>({
  defaultOpen = false,
  title,
  iconType,
  adornment,
  children,
  customIcon,
  component,
  active,
  height = "56px",
  href,
  onClick,
  ...rest
}: T extends React.ElementType
  ? InferredComponentProps<T> & VerticalMenuItemProps<T>
  : VerticalMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleOnClick = (e: VerticalMenuItemClickEvent) => {
    setIsOpen((state) => !state);
    if (onClick) {
      onClick(e);
    }
  };

  const { level } = useContext(MenuItemContext);

  const { isFullScreen } = useVerticalMenuContext();

  const renderAdornment = () =>
    typeof adornment === "function" ? adornment(isOpen) : adornment;

  const shouldDisplayActiveState =
    typeof active === "function" ? active(isOpen) : active;

  const itemProps = {
    ...(href && {
      as: "a",
      href,
    }),
    ...(!href &&
      component && {
        as: component,
        tabIndex: 0,
      }),
    ...(!href &&
      !component &&
      (children || onClick) && {
        as: "button",
        type: "button",
        "aria-expanded": isOpen,
      }),
    ...((href || !component) && {
      onClick: handleOnClick,
    }),
    ...rest,
  };

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
        {(iconType || customIcon) &&
          (customIcon ? (
            <StyledCustomIconWrapper>{customIcon}</StyledCustomIconWrapper>
          ) : (
            iconType && <StyledTitleIcon type={iconType} />
          ))}

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
