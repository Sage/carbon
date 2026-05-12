import React, { useState, useRef, useImperativeHandle, useMemo } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import StyledSearch from "./search.style";
import Icon from "../icon";
import Textbox, { CommonTextboxProps } from "../textbox";
import Button from "../button/__next__";
import { ValidationProps } from "../../__internal__/validations";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";
import TextInput from "../textbox/__internal__/__next__";
import Divider from "../divider";

export interface SearchEvent {
  target: {
    name?: string;
    id?: string;
    value: string;
  };
}

export interface SearchTextboxProps
  extends Pick<
    CommonTextboxProps,
    | "tooltipPosition"
    | "name"
    | "id"
    | "onFocus"
    | "onKeyDown"
    | "onBlur"
    | "placeholder"
    | "label"
    | "inputHint"
    | "size"
  > {}

export interface SearchProps
  extends ValidationProps,
    MarginProps,
    TagProps,
    SearchTextboxProps {
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
   * Prop for specifying the width of the Search container.
   * Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /**
   * Prop for specifying the max-width of the Search container.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** Current value */
  value: string;
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. Prop to specify the styling of the search component */
  variant?: "default" | "dark";
  /** @deprecated This prop no longer has any effect. This prop will eventually be removed. Input tabindex */
  tabIndex?: number;
  /** When set to `true`, inverts the Search input and button styling for use on darker backgrounds. */
  inverse?: boolean;
}

export type SearchHandle = {
  /** Programmatically focus on root container of Dialog. */
  focus: () => void;
} | null;

export const Search = React.forwardRef<SearchHandle, SearchProps>(
  (
    {
      onChange,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      value,
      id,
      name,
      label,
      inputHint,
      searchWidth,
      maxWidth,
      searchButton,
      searchButtonDataProps,
      searchButtonAriaLabel,
      placeholder,
      variant = "default",
      "aria-label": ariaLabel,
      tabIndex,
      error,
      warning,
      info,
      tooltipPosition,
      triggerOnClear,
      inverse,
      size,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<SearchHandle, SearchHandle>(
      ref,
      () => ({
        focus() {
          inputRef.current?.focus();
        },
      }),
      [],
    );

    invariant(typeof value === "string", "This component has no initial value");

    const isSearchValueEmpty = value.length === 0;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key.length === 1) {
        event.stopPropagation();
      }

      if (Events.isEscKey(event) && !isSearchValueEmpty) {
        event.stopPropagation();

        onChange?.({
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: "",
          },
        });
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    const searchButtonText = locale.search.searchButtonText();
    const searchHasValue = !!value?.length;

    const { className: restClassName, ...filteredRest } = rest as Record<
      string,
      unknown
    >;

    const classNames = useMemo(
      () =>
        [
          "search",
          "with-button",
          restClassName,
        ]
          .filter(Boolean)
          .join(" "),
      [searchHasValue, variant, searchButton, restClassName],
    );

    return (
      <StyledSearch
        ref={searchRef}
        searchWidth={searchWidth}
        maxWidth={maxWidth}
        searchHasValue={searchHasValue}
        showSearchButton={!!searchButton}
        inverse={inverse}
        id={id}
        name={name}
        {...filteredRest}
        {...filterStyledSystemMarginProps(filteredRest)}
        {...tagComponent("search", filteredRest)}
        className={classNames}
      >
        <TextInput
          type="search"
          placeholder={placeholder}
          value={value}
          aria-label={
            ariaLabel || (label ? undefined : locale.search.searchButtonText())
          }
          size={size}
          label={label || ""}
          inputIcon={
            <Divider
              data-role="search-divider"
              aria-hidden
              height={`calc(100% - var(--global-space-comp-${size?.charAt(0) || "m"}))`}
              p={0}
              type="vertical"
            />
          }
          inputHint={inputHint}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          tabIndex={tabIndex}
          error={error}
          warning={warning}
          my={0} // prevents any form spacing being applied
          maxWidth="100%"
        />
        <Button
          inverse={inverse}
          aria-label={searchButtonAriaLabel || searchButtonText}
          size={size}
          px={2}
          variantType="subtle"
          variant="default"
          iconType="search"
          className="search-button"
          {...tagComponent(`${searchButtonText}-button`, {
            "data-element": `${searchButtonText}-button`,
            ...searchButtonDataProps,
          })}
          {...(onClick && {
            onClick: () => onClick({ target: { name, id, value } }),
          })}
        />
      </StyledSearch>
    );
  },
);

export default Search;
