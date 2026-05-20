import React, { useEffect, useRef, useImperativeHandle, useMemo } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { CommonTextboxProps } from "../textbox";
import Button from "../button/__next__";
import { ValidationProps } from "../../__internal__/validations";
import useLocale from "../../hooks/__internal__/useLocale";
import Divider from "../divider";
import TextInput from "../textbox/__internal__/__next__";

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
  | "placeholder"
  | "label"
  | "inputHint"
  | "size"
  | "inputWidth"
>;

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
   * @deprecated This prop no longer has any effect. This prop will eventually be removed. Use `inputHint` instead.
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
      triggerOnClear,
      value,
      id,
      name,
      label,
      searchButtonDataProps,
      searchButtonAriaLabel,
      "aria-label": ariaLabel,
      inverse,
      size,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
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

    const searchButtonText = locale.search.searchButtonText();

    // calls onClick when search input is cleared using the native clear button in certain browsers (e.g. Chromium & Safari)
    useEffect(() => {
      if (!triggerOnClear || !onClick) return;

      const inputElement = inputRef.current;
      if (!inputElement) return;

      const handleNativeSearch = (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (target.value === "") {
          onClick({
            target: {
              ...(name && { name }),
              ...(id && { id }),
              value: target.value,
            },
          });
        }
      };

      inputElement.addEventListener("search", handleNativeSearch);

      return () => {
        inputElement.removeEventListener("search", handleNativeSearch);
      };
    }, [triggerOnClear, onClick, name, id]);

    const { className: restClassName, ...restProps } = rest as Record<
      string,
      unknown
    >;

    const classNames = useMemo(
      () =>
        ["search", inverse ? "inverse" : undefined, restClassName]
          .filter(Boolean)
          .join(" "),
      [inverse, restClassName],
    );

    return (
      <TextInput
        {...restProps}
        {...tagComponent("search", restProps)}
        className={classNames}
        id={id}
        name={name}
        type="search"
        label={label || ""}
        onChange={onChange}
        value={value}
        size={size}
        aria-label={
          ariaLabel || (label ? undefined : locale.search.searchButtonText())
        }
        ref={inputRef}
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
  },
);

export default Search;
