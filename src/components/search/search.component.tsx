import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useContext,
  useState,
  useCallback,
} from "react";
import styled from "styled-components";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { CommonTextboxProps } from "../textbox";
import Button from "../button/__next__";
import { ValidationProps } from "../../__internal__/validations";
import useLocale from "../../hooks/__internal__/useLocale";
import Divider from "../divider";
import TextInput from "../textbox/__internal__/__next__";
import MenuContext from "../menu/__internal__/menu.context";
import {
  PopoverMenu,
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
} from "../../__internal__/popover-menu";
import type { PopoverControlProps } from "../../__internal__/popover-menu/popover-menu.component";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";
import { Search as LegacySearch } from "./__internal__/legacy/search.component";
import ResultsAnnouncement from "./__internal__/results-announcement.component";
import guid from "../../__internal__/utils/helpers/guid";

const AssistiveHint = styled.span`
  display: none;
`;

const DEFAULT_MIN_QUERY_LENGTH = 3;

export interface SearchEvent {
  target: {
    name?: string;
    id?: string;
    value: string;
  };
}

export type SearchTextboxProps = Pick<
  CommonTextboxProps,
  | "tooltipPosition"
  | "name"
  | "id"
  | "onFocus"
  | "onKeyDown"
  | "onBlur"
  | "label"
  | "inputHint"
  | "size"
  | "inputWidth"
  | "className"
  | "labelInline"
  | "required"
>;

export interface SearchListData {
  /** The value identifying this item */
  value: string;
  /** The display label text */
  label: string;
  /** Optional prefix shown before the label */
  labelPrefix?: string;
  /** Optional subtext shown below the label */
  subtext?: string;
  /** Optional leading slot content (e.g. an icon) */
  leading?: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional id for the list item element */
  id?: string;
  /** Optional click handler for the item. Receives the mouse event and the item's value. */
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string) => void;
}

export interface SearchListGroup {
  /** The heading label for this group, e.g. "Recent" | "Suggested" */
  heading: string;
  /** Optional icon rendered before the heading text */
  icon?: React.ReactNode;
  items: SearchListData[];
}

export interface SearchPopoverProps {
  /** When `true`, renders the new popover menu anchored to the Search input. */
  open?: boolean;
  /** Minimum number of characters required before announcing available results. */
  minQueryLength?: number;
  /** Structured list data to render as grouped menu items in the popover. */
  listData?: SearchListGroup[];
  /** Callback fired when a list item is selected. Receives the item's value. */
  onListItemSelect?: (value: string) => void;
  /** Callback fired when the popover requests to close. */
  onClose?: (event?: Event, value?: string) => void;
}

export interface SearchProps
  extends ValidationProps,
    MarginProps,
    TagProps,
    SearchTextboxProps,
    SearchPopoverProps {
  /** Prop to specify the accessible name of the Search input. To be used when no visible label is provided */
  "aria-label"?: string;
  /** Prop to specify the accessible name of the Search button */
  searchButtonAriaLabel?: string;
  /** Prop for `onChange` events on the Search input */
  onChange: (ev: SearchEvent) => void;
  /** Prop for `onClick` events on the Search button.
   *  `onClick` events are triggered when the Search button is clicked
   *  or when the Search input's cross icon is clicked if the `triggerOnClear` prop is set to `true`.
   */
  onClick?: (ev: SearchEvent) => void;
  /** Sets whether the `onClick` action should be triggered when the Search cross icon is clicked. */
  triggerOnClear?: boolean;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Pass a boolean to render a search Button with default text.
   * Pass a string to override the text in the search Button
   * */
  searchButton?: boolean | string;
  /** Data tag prop bag for searchButton */
  searchButtonDataProps?: TagProps;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed. Use `inputWidth` instead.
   * Prop for specifying the width of the Search container. This value is mapped to `inputWidth`.
   * Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /**
   * Prop for specifying the max-width of the Search input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. */
  placeholder?: CommonTextboxProps["placeholder"];
  /** Current value */
  value: string;
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. `variant="dark"` is mapped to `inverse={true}` to preserve legacy behavior. */
  variant?: "default" | "dark";
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. Input tabindex */
  tabIndex?: number;
  /** When set to `true`, inverts the Search input and button styling for use on darker backgrounds. */
  inverse?: boolean;
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. */
  warning?: CommonTextboxProps["warning"];
}

export type SearchHandle = {
  /** Programmatically focus the search input. */
  focus: () => void;
  /** Programmatically focus the search button. */
  focusButton: () => void;
} | null;

export const Search = React.forwardRef<SearchHandle, SearchProps>(
  (
    {
      onChange,
      onClick,
      triggerOnClear,
      value,
      id,
      name,
      label,
      placeholder,
      searchButtonDataProps,
      open,
      minQueryLength,
      listData,
      onListItemSelect,
      onClose,
      searchButtonAriaLabel,
      "aria-label": ariaLabel,
      variant,
      inverse,
      error,
      size,
      inputWidth,
      searchButton,
      searchWidth,
      maxWidth,
      tabIndex,
      tooltipPosition,
      warning,
      className,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const assistiveHintId = useRef(guid());
    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const legacyRef = useRef<SearchHandle>(null);
    const [highlightedItemValue, setHighlightedItemValue] = useState<
      string | undefined
    >();

    // in order to support backwards compatibility with the Search component when used within a Menu,
    // we render the LegacySearch component instead of the new Search component when the Search component is rendered within a Menu.
    // This is to avoid any breaking UI changes that may occur from the new Search component being rendered within a Menu
    // as there are no designs for this in the fusion DS
    const { inMenu } = useContext(MenuContext);

    useImperativeHandle<SearchHandle, SearchHandle>(
      ref,
      () => ({
        focus() {
          if (inMenu) {
            legacyRef.current?.focus();
            return;
          }

          inputRef.current?.focus();
        },
        focusButton() {
          buttonRef.current?.focus();
        },
      }),
      [inMenu],
    );

    invariant(typeof value === "string", "This component has no initial value");

    const searchButtonText = locale.search.searchButtonText();

    // calls onClick when search input is cleared using the native clear button in certain browsers (e.g. Chromium & Safari)
    useEffect(() => {
      if (!triggerOnClear || !onClick) return;

      const inputElement = inputRef.current;
      if (!inputElement) return;

      const enterPressedRef = { current: false };

      const handleKeyDown = (event: KeyboardEvent) => {
        enterPressedRef.current = event.key === "Enter";
      };

      const handleNativeSearch = (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (!target.value && !enterPressedRef.current) {
          onClick({
            target: {
              ...(name && { name }),
              ...(id && { id }),
              value: target.value,
            },
          });
        }

        enterPressedRef.current = false;
      };

      inputElement.addEventListener("keydown", handleKeyDown);
      inputElement.addEventListener("search", handleNativeSearch);

      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
        inputElement.removeEventListener("search", handleNativeSearch);
      };
    }, [triggerOnClear, onClick, name, id]);

    const toFiniteNumber = (value?: string) => {
      if (!value) return undefined;
      const parsed = Number.parseFloat(value);

      return Number.isNaN(parsed) ? undefined : parsed;
    };

    const mappedInputWidth = inputWidth ?? toFiniteNumber(searchWidth);

    const legacyOnlyProps = {
      searchButton,
      searchWidth,
      tabIndex,
      tooltipPosition,
      warning,
    };

    const classNames = useMemo(
      () =>
        [
          "search",
          inverse || variant === "dark" ? "inverse" : undefined,
          error ? "error" : undefined,
          className,
        ]
          .filter(Boolean)
          .join(" "),
      [inverse, variant, className, error],
    );

    const enabledItems = useMemo(
      () =>
        listData?.flatMap((group) =>
          group.items.filter((item) => !item.disabled),
        ) ?? [],
      [listData],
    );

    const handleSearchInputKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);

        if (!open || enabledItems.length === 0) {
          return;
        }

        const currentIndex = enabledItems.findIndex(
          (item) => item.value === highlightedItemValue,
        );

        if (event.key === "ArrowDown") {
          const nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % enabledItems.length;
          setHighlightedItemValue(enabledItems[nextIndex].value);
          return;
        }

        if (event.key === "ArrowUp") {
          const nextIndex =
            currentIndex === -1
              ? enabledItems.length - 1
              : (currentIndex - 1 + enabledItems.length) % enabledItems.length;
          setHighlightedItemValue(enabledItems[nextIndex].value);
          return;
        }

        if (event.key === "Home") {
          setHighlightedItemValue(enabledItems[0].value);
          return;
        }

        if (event.key === "End") {
          setHighlightedItemValue(enabledItems[enabledItems.length - 1].value);
        }
      },
      [enabledItems, highlightedItemValue, onKeyDown, open],
    );

    useEffect(() => {
      if (!open) {
        setHighlightedItemValue(undefined);
      }
    }, [open]);

    useEffect(() => {
      if (
        highlightedItemValue &&
        !enabledItems.some((item) => item.value === highlightedItemValue)
      ) {
        setHighlightedItemValue(undefined);
      }
    }, [enabledItems, highlightedItemValue]);

    const renderSearchInput = ({
      ref,
      popoverControlProps,
      inputWidthOverride,
    }: {
      ref?: React.Ref<HTMLInputElement>;
      popoverControlProps?: PopoverControlProps;
      inputWidthOverride?: number;
    } = {}) => (
      <TextInput
        {...rest}
        {...tagComponent("search", rest)}
        className={classNames}
        id={id}
        name={name}
        type="search"
        label={label || ""}
        onChange={onChange}
        onKeyDown={handleSearchInputKeyDown}
        value={value}
        size={size}
        inputWidth={inputWidthOverride ?? mappedInputWidth}
        maxWidth={maxWidth}
        error={error}
        aria-label={
          ariaLabel || (label ? undefined : locale.search.searchButtonText())
        }
        ref={combineRefs(ref, inputRef)}
        {...popoverControlProps}
        // only pass the aria-describedby prop to the input when the popoverControlProps are present, as this indicates that the input is being rendered within a popover menu
        {...(popoverControlProps && {
          "aria-describedby": assistiveHintId.current,
        })}
        inputIcon={
          <>
            <Divider
              aria-hidden
              data-role="search-divider"
              height={`calc(100% - var(--global-space-comp-${size?.charAt(0) || "m"}))`}
              p={0}
              type="vertical"
            />
            <Button
              ref={buttonRef}
              aria-label={searchButtonAriaLabel || searchButtonText}
              className="search-button"
              iconType="search"
              inverse={inverse}
              size={size}
              variant="default"
              variantType="subtle"
              {...tagComponent(`${searchButtonText}-button`, {
                "data-element": `${searchButtonText}-button`,
                ...searchButtonDataProps,
              })}
              {...(onClick && {
                onClick: () => onClick({ target: { name, id, value } }),
              })}
            />
          </>
        }
      />
    );

    const searchInput = renderSearchInput();

    const renderListData = () =>
      listData?.map((group, groupIndex) => (
        <React.Fragment key={group.heading}>
          {groupIndex > 0 && <MenuItemDivider />}
          <MenuItemHeading text={group.heading} icon={group.icon}>
            {group.items.map((item) => {
              const {
                value,
                id,
                disabled,
                label,
                labelPrefix,
                subtext,
                leading,
                onClick: onItemClick,
              } = item;
              const isHighlighted = highlightedItemValue === value;

              return (
                <MenuItem
                  key={value}
                  id={id}
                  disabled={disabled}
                  selected={isHighlighted}
                  onClick={(ev) => {
                    onListItemSelect?.(value);
                    onItemClick?.(ev, value);
                    onClose?.(undefined, value);
                  }}
                >
                  <MenuItemLeading selectedIcon={isHighlighted}>
                    {leading}
                  </MenuItemLeading>

                  <MenuItemLabel prefix={labelPrefix}>{label}</MenuItemLabel>
                  {subtext && <MenuItemSubtext>{subtext}</MenuItemSubtext>}
                </MenuItem>
              );
            })}
          </MenuItemHeading>
        </React.Fragment>
      ));

    const resultCount = useMemo(
      () =>
        listData?.reduce((total, group) => total + group.items.length, 0) || 0,
      [listData],
    );

    const resultsAnnouncement = useMemo(() => {
      const configuredMinQueryLength =
        minQueryLength ?? DEFAULT_MIN_QUERY_LENGTH;

      if (value.length === 0) return "";

      if (value.length < configuredMinQueryLength) {
        return locale.search.queryTooShort?.(configuredMinQueryLength);
      }

      if (resultCount === 0) {
        return locale.search.noResults?.();
      }

      return locale.search.results?.(resultCount);
    }, [locale, minQueryLength, resultCount, value]);

    if (inMenu) {
      return (
        <LegacySearch
          {...rest}
          {...legacyOnlyProps}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          id={id}
          error={error}
          placeholder={placeholder}
          name={name}
          label={label}
          variant={variant}
          aria-label={ariaLabel}
          searchButtonAriaLabel={searchButtonAriaLabel}
          searchButtonDataProps={searchButtonDataProps}
          triggerOnClear={triggerOnClear}
          onClick={onClick}
          ref={legacyRef}
        />
      );
    }

    if (open === undefined) {
      return searchInput;
    }

    return (
      <PopoverMenu<HTMLInputElement>
        open={open}
        size={size}
        listboxAriaLabel={
          ariaLabel ?? (typeof label === "string" ? label : undefined)
        }
        controlWrapperStyle={
          mappedInputWidth !== undefined
            ? { width: `${mappedInputWidth}%` }
            : { width: "100%" }
        }
        onClose={(event, selectedValue) => onClose?.(event, selectedValue)}
        popoverControl={(popoverControlRef, popoverControlProps) => (
          <>
            {renderSearchInput({
              ref: popoverControlRef,
              popoverControlProps,
              inputWidthOverride: 100,
            })}
            <AssistiveHint id={assistiveHintId.current}>
              {locale.search.assistiveHint?.()}
            </AssistiveHint>
            <ResultsAnnouncement
              announcement={resultsAnnouncement}
              searchValue={value}
            />
          </>
        )}
      >
        {renderListData()}
      </PopoverMenu>
    );
  },
);

export default Search;
