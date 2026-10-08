import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { PopoverMenuContext, MenuHeadingContext } from "../../contexts";
import guid from "../../../utils/helpers/guid";
import type { TagProps } from "../../../utils/helpers/tags";

const StyledMenuHeadingWithIcon = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) =>
    $size === "small"
      ? "var(--global-space-comp-2-xs)"
      : "var(--global-space-comp-xs)"};
`;

const StyledMenuHeading = styled.li<{ $size: string }>`
  div[data-element="text"] {
    ${({ $size }) => {
      const fontSize = $size.charAt(0);
      return `
        padding: 0 var(--global-space-comp-m);
        font: var(--global-font-static-comp-medium-${fontSize});
        margin-left: calc(var(--global-space-comp-m) - 2px);
      `;
    }}
    color: var(--input-dropdown-label-alt);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
`;

interface MenuItemHeadingProps extends TagProps {
  children: React.ReactNode;
  text: string;
  icon?: React.ReactNode;
  headingContent?: React.ReactNode;
  /** @internal Render the heading and its options as one labelled listbox group. */
  semanticGroup?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

const MenuItemHeading = ({
  children,
  text,
  icon,
  headingContent,
  semanticGroup = false,
  id,
  style,
  "data-element": dataElement,
  "data-role": dataRole,
}: MenuItemHeadingProps) => {
  const { size } = useContext(PopoverMenuContext);
  const headingId = useRef(`popover-menu-heading-${guid()}`);

  const textProps = { "data-element": "text", id: headingId.current };

  const heading =
    headingContent || icon ? (
      <StyledMenuHeadingWithIcon
        data-role="text-with-icon"
        $size={size}
        {...textProps}
      >
        {headingContent || icon}
        {!headingContent && text}
      </StyledMenuHeadingWithIcon>
    ) : (
      <div {...textProps}>{text}</div>
    );

  const items = (
    <MenuHeadingContext.Provider value={{ headingId: headingId.current }}>
      <ul
        role={semanticGroup ? "presentation" : "listbox"}
        aria-label={semanticGroup ? undefined : text}
      >
        {children}
      </ul>
    </MenuHeadingContext.Provider>
  );

  return (
    <StyledMenuHeading
      as={semanticGroup ? "div" : undefined}
      data-component="popover-menu-item-heading"
      data-element={dataElement}
      data-role={dataRole}
      id={id}
      style={style}
      $size={size}
      role={semanticGroup ? "group" : "option"}
      aria-labelledby={semanticGroup ? headingId.current : undefined}
    >
      {heading}
      {items}
    </StyledMenuHeading>
  );
};

MenuItemHeading.displayName = "PopoverMenuItemHeading";

export default MenuItemHeading;
