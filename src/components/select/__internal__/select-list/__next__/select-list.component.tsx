import React, { useCallback, useMemo } from "react";
import type { CSSObject } from "styled-components";

import {
  PopoverMenu,
  MenuItem,
  MenuItemLeading,
  MenuItemLabel,
  MenuItemSubtext,
  MenuItemDivider,
  MenuItemHeading,
  type PopoverControlProps,
} from "../../../../../__internal__/popover-menu";
import Option, { OptionProps } from "../../../option";
import OptionGroupHeader, {
  OptionGroupHeaderProps,
} from "../../../option-group-header";
import Button, { ButtonProps } from "../../../../button";
import useLocale from "../../../../../hooks/__internal__/useLocale";
import Icon from "../../../../icon";
import isExpectedOption from "../../utils/is-expected-option";

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
  /** True for default text button or a Button Component to be rendered */
  listActionButton?: boolean | React.ReactElement<ButtonProps>;
  /** A callback for when the list action button is triggered */
  onListAction?: () => void;
}

const isOptionElement = (
  child: React.ReactNode,
): child is React.ReactElement<OptionProps> =>
  React.isValidElement(child) && child.type === Option;

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
  placement,
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
  listActionButton,
  onListAction,
}: NextSelectListProps) => {
  const mappedChildren = useMemo(() => {
    const renderOption = (option: React.ReactElement<OptionProps>) => {
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
        "data-element": dataElement,
        "data-role": dataRole,
      } = option.props;

      const selected = isExpectedOption(option, selectedValue);
      const label = optionChildren ?? text;

      const menuItem = (
        <MenuItem
          key={optionId ?? String(value) ?? text}
          id={optionId}
          data-element={dataElement}
          data-role={dataRole}
          disabled={disabled}
          selected={selected}
          onClick={() => {
            if (disabled || !value) return;

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
        <MenuItemDivider key={`${optionId ?? value}-divider`} />,
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
            key={headerId ?? label}
            text={label ?? ""}
            icon={icon ? <Icon type={icon} /> : undefined}
            headingContent={headerChildren}
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

  const handleListAction = useCallback(() => {
    onClose();
    onListAction?.();
  }, [onClose, onListAction]);

  const locale = useLocale();

  const footer = useMemo(() => {
    if (listActionButton === undefined) return undefined;

    if (listActionButton === true) {
      return (
        <Button onClick={handleListAction} iconType="add" iconPosition="after">
          {locale.select.actionButtonText()}
        </Button>
      );
    }

    if (!React.isValidElement(listActionButton)) return undefined;

    return React.cloneElement(listActionButton, {
      onClick: handleListAction,
    });
  }, [listActionButton, handleListAction, locale]);

  return (
    <PopoverMenu<HTMLInputElement>
      open={open}
      size={size}
      maxHeight={maxHeight}
      placement={placement}
      id={id}
      controlReference={controlReference}
      controlWrapperStyle={controlWrapperStyle}
      listboxAriaLabelledBy={labelId}
      listboxAriaLabel={listboxAriaLabel}
      onClose={onClose}
      popoverControl={popoverControl}
      enableVirtualScroll={enableVirtualScroll}
      virtualScrollOverscan={virtualScrollOverscan}
      disableNavigationLoop={disableNavigationLoop}
      initialScrollIndex={initialScrollIndex}
      footer={footer}
    >
      {mappedChildren}
    </PopoverMenu>
  );
};

export default SelectList;
