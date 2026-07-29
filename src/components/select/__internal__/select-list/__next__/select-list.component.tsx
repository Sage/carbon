import React, { useMemo } from "react";
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
      } = option.props;

      const selected = isExpectedOption(option, selectedValue);
      const label = optionChildren ?? text;

      const menuItem = (
        <MenuItem
          key={optionId ?? String(value) ?? text}
          id={optionId}
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
        const { label, icon, id: headerId } = groupHeader.props;
        output.push(
          <MenuItemHeading
            key={headerId ?? label}
            text={label ?? ""}
            icon={icon ? <Icon type={icon} /> : undefined}
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
    >
      {mappedChildren}
    </PopoverMenu>
  );
};

export default SelectList;
