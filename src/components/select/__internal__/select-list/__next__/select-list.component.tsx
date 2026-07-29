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

const SelectPopoverMenu = (props: PopoverMenuProps<HTMLInputElement>) => (
  <PopoverMenu<HTMLInputElement> {...props} />
);

const StyledSelectPopoverMenu = styled(SelectPopoverMenu)`
  [data-element="select-list-wrapper"] {
    z-index: var(--carbon-zindex-popover);
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
  /** When set, keyboard navigation stops at the first/last option instead of looping around. */
  disableNavigationLoop?: boolean;
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
  enableVirtualScroll,
  virtualScrollOverscan,
  disableNavigationLoop,
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

  const mappedChildren = useMemo(() => {
    const renderOption = (option: React.ReactElement<OptionProps>) => {
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

      const selected = isExpectedOption(option, selectedValue);
      const label = optionChildren ?? text;

      const menuItem = (
        <MenuItem
          key={option.key ?? optionId ?? (value ? String(value) : text)}
          id={optionId}
          {...optionHtmlProps}
          action={isAction}
          disabled={disabled}
          selected={selected}
          onClick={() => {
            if (disabled || !value) return;

            if (isAction && optionOnClick) {
              optionOnClick(value);
              onClose(undefined, typeof value === "string" ? value : undefined);
              return;
            }

            onSelect({ id: optionId, text, value });
            onClose(undefined, typeof value === "string" ? value : undefined);
          }}
        >
          <MenuItemLeading selectedIcon={selected}>{leading}</MenuItemLeading>
          <MenuItemLabel prefix={prefix}>{label}</MenuItemLabel>
          {subtext && <MenuItemSubtext>{subtext}</MenuItemSubtext>}
        </MenuItem>
      );

      if (!divider) {
        return [menuItem];
      }

      return [
        menuItem,
        <MenuItemDivider
          key={`${option.key ?? optionId ?? String(value)}-divider`}
        />,
      ];
    };

    const output: React.ReactNode[] = [];
    let groupHeader: React.ReactElement<OptionGroupHeaderProps> | null = null;
    let groupItems: React.ReactNode[] = [];

    const flushGroup = () => {
      if (groupItems.length === 0 && !groupHeader) {
        return;
      }

      if (groupHeader) {
        const {
          label,
          icon,
          id: headerId,
          children: headerChildren,
        } = groupHeader.props;
        output.push(
          <MenuItemHeading
            key={groupHeader.key ?? headerId ?? label}
            text={label ?? ""}
            icon={icon ? <Icon type={icon} /> : undefined}
            headingContent={headerChildren}
            semanticGroup
          >
            {groupItems}
          </MenuItemHeading>,
        );
      } else {
        output.push(...groupItems);
      }

      groupHeader = null;
      groupItems = [];
    };

    React.Children.forEach(children, (child) => {
      if (isOptionGroupHeaderElement(child)) {
        flushGroup();
        groupHeader = child;
        return;
      }

      if (isOptionElement(child)) {
        groupItems.push(...renderOption(child));
      }
    });

    flushGroup();

    return output;
  }, [children, selectedValue, onSelect, onClose]);

  const initialScrollIndex = useMemo(() => {
    let index = -1;
    let optionIndex = 0;
    React.Children.forEach(children, (child) => {
      if (isOptionElement(child)) {
        if (isExpectedOption(child, selectedValue)) {
          index = optionIndex;
        }
        optionIndex += 1;
      }
    });
    return index;
  }, [children, selectedValue]);

  const listContent = isLoading
    ? [
        ...mappedChildren,
        <MenuItem key="select-list-loader" disabled>
          <Loader
            loaderType="ring"
            size={size}
            data-role="select-list-loader"
          />
        </MenuItem>,
      ]
    : mappedChildren;

  return (
    <StyledSelectPopoverMenu
      data-role="select-list-popover-menu"
      open={open}
      size={size}
      maxHeight={resolvedMaxHeight}
      placement={placement}
      id={id}
      controlReference={controlReference}
      controlWrapperStyle={controlWrapperStyle}
      listboxAriaLabelledBy={labelId}
      listboxAriaLabel={listboxAriaLabel}
      listRef={listRef}
      onClose={onClose}
      popoverControl={popoverControl}
      enableVirtualScroll={enableVirtualScroll}
      virtualScrollOverscan={virtualScrollOverscan}
      disableNavigationLoop={disableNavigationLoop}
      flipEnabled={flipEnabled}
      selectOnSpaceAndTab={selectOnSpaceAndTab}
      enablePageNavigation
      focusSelectedOnOpen
      closeOnFocusOut
      initialScrollIndex={initialScrollIndex}
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
