import React, { useEffect, useMemo, useRef } from "react";
import styled, { type CSSObject } from "styled-components";

import {
  PopoverMenu,
  MenuItem,
  MenuItemLeading,
  MenuItemLabel,
  MenuItemSubtext,
  MenuItemDivider,
  MenuItemHeading,
  type PopoverControlProps,
  type PopoverMenuProps,
} from "../../../../../__internal__/popover-menu";
import Option, { OptionProps } from "../../../option";
import ActionOption from "../../../action-option";
import OptionGroupHeader, {
  OptionGroupHeaderProps,
} from "../../../option-group-header";
import Icon from "../../../../icon";
import Loader from "../../../../loader/__next__";
import isExpectedOption from "../../utils/is-expected-option";
import guid from "../../../../../__internal__/utils/helpers/guid";
import useSelectListVirtualization, {
  type SelectVirtualRow,
} from "./use-select-list-virtualization";

const SelectPopoverMenu = (props: PopoverMenuProps<HTMLInputElement>) => (
  <PopoverMenu<HTMLInputElement> {...props} />
);

const StyledSelectPopoverMenu = styled(SelectPopoverMenu)`
  [data-element="select-list-wrapper"] {
    z-index: var(--carbon-zindex-popover);
  }

  [data-component="popover-menu-item"] {
    column-gap: 0;
  }

  [data-component="popover-menu-divider"] {
    margin: 0;
    padding: ${({ size }) =>
      `var(--global-space-comp-${size === "small" ? "xs" : size === "large" ? "m" : "s"}) var(--global-space-comp-m)`};
  }

  [data-component="popover-menu-item-heading"] > [data-element="text"] {
    margin: 0;
    padding-top: var(--global-space-comp-m);
    padding-right: var(--global-space-comp-m);
    padding-bottom: 0;
    padding-left: var(--global-space-comp-xl);
  }
`;

const StyledOptionLeading = styled.span<{
  $size: PopoverMenuProps["size"];
}>`
  display: flex;
  align-items: center;
  padding-right: ${({ $size }) =>
    `var(--global-space-comp-${$size === "small" ? "xs" : "s"})`};
`;

const VirtualOptionRow = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export interface SelectListOnSelectData {
  /** The id of the selected option */
  id?: string;
  /** The visible text of the selected option */
  text?: string;
  /** The internal value of the selected option */
  value?: string | Record<string, unknown>;
}

export interface NextSelectListProps {
  /** id applied to the listbox element (e.g. for aria-controls) */
  id?: string;
  /** id of the element labelling the listbox */
  labelId?: string;
  /** Options (and optional OptionGroupHeaders) to render within the list */
  children?: React.ReactNode;
  /** Whether the list is open */
  open: boolean;
  /** Size of the list items */
  size?: "small" | "medium" | "large";
  /** Maximum list height. Overrides the size-based default when provided */
  maxHeight?: string;
  /** Placement of the list relative to the control */
  placement?: React.ComponentProps<typeof PopoverMenu>["placement"];
  /** The currently selected value, used to render the selected tick */
  selectedValue?: string | Record<string, unknown>;
  /** Renders the control (e.g. the Select textbox) that the list is anchored to */
  popoverControl: (
    ref: React.RefObject<HTMLInputElement>,
    props: PopoverControlProps,
  ) => React.ReactNode;
  /** Override the default control reference used for positioning */
  controlReference?: React.RefObject<HTMLDivElement | HTMLLIElement>;
  /** Custom styles applied to the control wrapper element */
  controlWrapperStyle?: CSSObject;
  /** Accessible label for the listbox */
  listboxAriaLabel?: string;
  /** A callback for when an option is selected */
  onSelect: (data: SelectListOnSelectData) => void;
  /** A callback for when the list should be closed */
  onClose: (event?: Event, value?: string) => void;
  /** Set this prop to only render the currently-visible options into the DOM. If not used then all options
   * will be in the DOM at all times, which may cause performance problems on very large lists */
  enableVirtualScroll?: boolean;
  /** The number of options to render into the DOM at once, either side of the currently-visible ones.
   * Only used if the `enableVirtualScroll` prop is set. */
  virtualScrollOverscan?: number;
  /** Whether the list may flip to the opposite placement when space is limited. */
  flipEnabled?: boolean;
  /** Callback triggered when the user scrolls to the bottom of the list. */
  onListScrollBottom?: () => void;
  /** When set, Space and Tab confirm the currently-focused option (single-select listbox behaviour). */
  selectOnSpaceAndTab?: boolean;
  /** If true, a loader is displayed in the list. Renders on its own for a general loading state,
   * or below the options for a lazy-loading state. */
  isLoading?: boolean;
}

const isOptionElement = (
  child: React.ReactNode,
): child is React.ReactElement<OptionProps> =>
  React.isValidElement(child) &&
  (child.type === Option || child.type === ActionOption);

const isOptionGroupHeaderElement = (
  child: React.ReactNode,
): child is React.ReactElement<OptionGroupHeaderProps> =>
  React.isValidElement(child) && child.type === OptionGroupHeader;

interface OptionRow extends SelectVirtualRow {
  option?: React.ReactElement<OptionProps>;
  group?: React.ReactElement<OptionGroupHeaderProps>;
  groupIndex: number;
}

interface OptionGroup {
  key: React.Key;
  header?: React.ReactElement<OptionGroupHeaderProps>;
  rows: OptionRow[];
}

// Retain nested-array and fragment key paths without cloning the supplied options.
const buildOptionGroups = (
  children: React.ReactNode,
  selectedValue: NextSelectListProps["selectedValue"],
) => {
  const groups: OptionGroup[] = [{ key: "ungrouped", rows: [] }];
  const visit = (nodes: React.ReactNode, prefix = "", fallbackIndex = 0) => {
    if (Array.isArray(nodes)) {
      nodes.forEach((node, index) =>
        visit(node, Array.isArray(node) ? `${prefix}${index}:` : prefix, index),
      );
      return;
    }
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      const key = `${prefix}${child.key === null ? fallbackIndex : `$${child.key}`}`;
      if (child.type === React.Fragment) {
        visit(child.props.children, `${key}/`);
      } else if (isOptionGroupHeaderElement(child)) {
        groups.push({
          key:
            child.props.id === undefined
              ? `key:${key}`
              : `id:${child.props.id}`,
          header: child,
          rows: [],
        });
      } /* istanbul ignore else */ else if (isOptionElement(child)) {
        const group = groups[groups.length - 1];
        group.rows.push({
          key:
            child.props.id === undefined
              ? `key:${key}`
              : `id:${child.props.id}`,
          id: child.props.id,
          option: child,
          group: group.header,
          groupIndex: group.rows.length,
          disabled: child.props.disabled,
          selected: isExpectedOption(child, selectedValue),
        });
      }
    });
  };
  visit(children);
  return groups;
};

const SelectList = ({
  id,
  labelId,
  children,
  open,
  size = "medium",
  maxHeight,
  placement = "bottom",
  selectedValue,
  popoverControl,
  controlReference,
  controlWrapperStyle,
  listboxAriaLabel,
  onSelect,
  onClose,
  enableVirtualScroll = false,
  virtualScrollOverscan = 5,
  flipEnabled = true,
  onListScrollBottom,
  selectOnSpaceAndTab,
  isLoading,
}: NextSelectListProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const resolvedMaxHeight =
    maxHeight ?? `calc(5.5 * var(--global-size-${size.charAt(0)}))`;

  useEffect(() => {
    const list = listRef.current;
    if (!open || !list || !onListScrollBottom) return undefined;

    const handleScroll = () => {
      if (list.scrollHeight - list.scrollTop <= list.clientHeight + 1) {
        onListScrollBottom();
      }
    };

    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);
  }, [open, onListScrollBottom]);

  const listId = useRef(id ?? `select-list-${guid()}`).current;
  const groups = useMemo(
    () => buildOptionGroups(children, selectedValue),
    [children, selectedValue],
  );
  const rows = useMemo<OptionRow[]>(
    () => [
      ...groups.flatMap((group) => group.rows),
      ...(isLoading
        ? [
            {
              key: "select-list-loader",
              disabled: true,
              isLoader: true,
              groupIndex: 0,
            },
          ]
        : []),
    ],
    [groups, isLoading],
  );
  const virtualization = useSelectListVirtualization({
    rows,
    open,
    enabled: enableVirtualScroll,
    overscan: virtualScrollOverscan,
    listRef,
    listId,
    selectOnSpaceAndTab,
    onClose,
  });

  const renderOption = (
    row: OptionRow,
    virtualProps?: ReturnType<typeof virtualization.optionProps>,
    positionProps?: {
      "data-index": number;
      measureElement: React.RefCallback<HTMLLIElement>;
      style: React.CSSProperties;
    },
  ) => {
    const { option, key } = row;
    if (!option) {
      return (
        <MenuItem key={key} disabled {...positionProps}>
          <Loader
            loaderType="ring"
            size={size}
            data-role="select-list-loader"
          />
        </MenuItem>
      );
    }
    const isAction = option.type === ActionOption;
    const {
      value,
      text,
      children: optionChildren,
      disabled,
      leading,
      prefix,
      subtext,
      divider,
      id: optionId,
      // These props either belong to the legacy Option implementation or
      // are owned by the listbox/menu item rendered in its place.
      borderColor: _borderColor,
      fill: _fill,
      inert: _inert,
      index: _index,
      onClick: optionOnClick,
      onSelect: _onSelect,
      role: _role,
      variant: _variant,
      "aria-disabled": _ariaDisabled,
      "aria-selected": _ariaSelected,
      ...optionHtmlProps
    } = option.props;

    const { selected } = row;
    const label = optionChildren ?? text;

    const menuItem = (
      <MenuItem
        key={row.key}
        id={optionId}
        {...optionHtmlProps}
        {...virtualProps}
        {...positionProps}
        action={isAction}
        disabled={disabled}
        selected={selected}
        onClick={() => {
          if (disabled || !value) return;

          if (optionOnClick) {
            optionOnClick(value);
            onClose(undefined, typeof value === "string" ? value : undefined);
            return;
          }

          onSelect({ id: optionId, text, value });
          onClose(undefined, typeof value === "string" ? value : undefined);
        }}
      >
        <MenuItemLeading selectedIcon={selected}>
          {leading && (
            <StyledOptionLeading $size={size}>{leading}</StyledOptionLeading>
          )}
        </MenuItemLeading>
        <MenuItemLabel prefix={prefix}>{label}</MenuItemLabel>
        {subtext && <MenuItemSubtext>{subtext}</MenuItemSubtext>}
      </MenuItem>
    );

    if (!divider) {
      return menuItem;
    }

    return [menuItem, <MenuItemDivider key={`${row.key}-divider`} />];
  };

  const renderGroup = (
    header: React.ReactElement<OptionGroupHeaderProps>,
    items: React.ReactNode,
    index: number,
    key: React.Key,
  ) => {
    const {
      label,
      icon,
      id: headerId,
      style,
      children: headingContent,
      "data-element": dataElement,
      "data-role": dataRole,
    } = header.props;
    return (
      <MenuItemHeading
        key={key}
        id={index === 0 ? headerId : undefined}
        style={index === 0 ? style : undefined}
        data-element={index === 0 ? dataElement : undefined}
        data-role={index === 0 ? dataRole : undefined}
        text={label ?? ""}
        icon={icon ? <Icon type={icon} /> : undefined}
        headingContent={headingContent}
        semanticGroup
        visuallyHiddenHeading={index > 0}
      >
        {items}
      </MenuItemHeading>
    );
  };

  const listContent = enableVirtualScroll
    ? [
        ...virtualization.virtualItems.map((item) => {
          const row = rows[item.index];
          const style: React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${item.start}px)`,
          };
          const optionProps = row.isLoader
            ? undefined
            : virtualization.optionProps(item.index);
          if (!row.group && !row.option?.props.divider) {
            return renderOption(row, optionProps, {
              "data-index": item.index,
              measureElement: virtualization.measureElement,
              style: { ...row.option?.props.style, ...style },
            });
          }
          const option = renderOption(row, optionProps);
          return (
            <VirtualOptionRow
              key={item.key}
              role="presentation"
              data-index={item.index}
              ref={virtualization.measureElement}
              style={style}
            >
              {row.group ? (
                renderGroup(row.group, option, row.groupIndex, row.key)
              ) : (
                <ul role="presentation">{option}</ul>
              )}
            </VirtualOptionRow>
          );
        }),
        // Absolutely positioned options need an in-flow spacer to establish the scroll range.
        <li
          key="virtual-scroll-spacer"
          data-role="virtual-scroll-spacer"
          role="presentation"
          aria-hidden="true"
          style={{
            display: "block",
            height: virtualization.virtualHeight,
            margin: 0,
            padding: 0,
            listStyle: "none",
            pointerEvents: "none",
          }}
        />,
      ]
    : [
        ...groups.flatMap((group) => {
          const options = group.rows.map((row) => renderOption(row));
          return group.header
            ? [renderGroup(group.header, options, 0, group.key)]
            : options;
        }),
        ...(isLoading ? [renderOption(rows[rows.length - 1])] : []),
      ];

  return (
    <StyledSelectPopoverMenu
      data-role="select-list-popover-menu"
      open={open}
      size={size}
      maxHeight={resolvedMaxHeight}
      placement={placement}
      id={listId}
      controlReference={controlReference}
      controlWrapperStyle={controlWrapperStyle}
      listboxAriaLabelledBy={labelId}
      listboxAriaLabel={listboxAriaLabel}
      listRef={listRef}
      onClose={onClose}
      popoverControl={popoverControl}
      wrapItems={false}
      onListKeyDown={
        enableVirtualScroll ? virtualization.handleVirtualKeyDown : undefined
      }
      activeDescendant={
        enableVirtualScroll ? virtualization.activeDescendant : undefined
      }
      listStyle={
        enableVirtualScroll
          ? {
              display: "block",
              position: "relative",
              height: virtualization.virtualHeight,
            }
          : undefined
      }
      flipEnabled={flipEnabled}
      selectOnSpaceAndTab={selectOnSpaceAndTab}
      enablePageNavigation
      focusSelectedOnOpen
      highlightSelectedOption
      // The legacy SelectList was positioned beneath a fixed backdrop, so its
      // flip boundary was the viewport rather than an overflowing parent such
      // as FlatTable. Preserve that behaviour for SimpleSelect.
      popoverStrategy="fixed"
      menuWrapperDataElement="select-list-wrapper"
      listTabIndex={-1}
    >
      {listContent}
    </StyledSelectPopoverMenu>
  );
};

export default SelectList;
