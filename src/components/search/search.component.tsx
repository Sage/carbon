import React, { useEffect, useRef, useImperativeHandle } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import StyledSearch, {
  StyledSearchInput,
  StyledSearchButton,
} from "./search.style";
import { CommonTextboxProps } from "../textbox";
import { ValidationProps } from "../../__internal__/validations";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";

export interface SearchEvent {
  target: {
    name?: string;
    id?: string;
    value: string;
  };
}

export interface SearchProps
  extends ValidationProps,
    MarginProps,
    TagProps,
    Pick<CommonTextboxProps, "label" | "inputHint"> {
  /** Prop to accessible name of the Search input. To be used when there is no visible label */
  "aria-label"?: string;
  /** Prop to specify the accessible name of the Search button */
  searchButtonAriaLabel?: string;
  /** Prop to apply the id attribute to the Search input */
  id?: string;
  /** Prop to apply the name attribute to the Search input */
  name?: string;
  /** Prop for `onBlur` events on the Search input */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` events on the Search input */
  onChange: (ev: SearchEvent) => void;
  /** Prop for `onClick` events on the Search component.
   *  `onClick` events are triggered when the `searchButton` is clicked or when the search input is cleared using the cross icon.
   */
  onClick?: (ev: SearchEvent) => void;
  /** Sets whether clearing the search input should trigger `onChange` with an empty value. */
  triggerOnClear?: boolean;
  /** Prop for `onFocus` events on the Search input */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onKeyDown` events on the Search input */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Prop to specify the placeholder text of the Search input */
  placeholder?: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Pass a boolean to render a search Button with default text.
   * Pass a string to override the text in the search Button
   * */
  searchButton?: boolean | string;
  /** Data tag prop bag for the Search button */
  searchButtonDataProps?: TagProps;
  /**
   * Prop to specify the width of the entire Search component, includes the Search input and the Search button.
   * Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /**
   * Prop for specifying the max-width of the entire Search component, includes the Search input and button.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** Prop to specify the current value of the Search input */
  value: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Prop to specify the styling of the search component. Use the `inverse` prop for dark backgrounds.
   */
  variant?: "default" | "dark";
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Input tabindex
   */
  tabIndex?: number;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * @deprecated This prop is no longer supported on Search and will eventually be removed.
   */
  info?: ValidationProps["info"];
  /** When set to `true`, inverts the Search input and button styling for use on darker backgrounds. */
  inverse?: boolean;
  /** Controls the size of the Search input and button. */
  size?: "S" | "M" | "L";
}

export type SearchHandle = {
  /** Programmatically focus on the Search input. */
  focus: () => void;
} | null;

// need to extend sizes form textbox and pass these down to textbox and the button

// investigate where tabIndex is used

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
      searchButtonDataProps,
      searchButtonAriaLabel,
      placeholder,
      variant = "default",
      "aria-label": ariaLabel,
      error,
      warning,
      info,
      triggerOnClear,
      inverse,
      size = "M",
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

    // ensures the onClick callback is triggered with an empty value when the search input is cleared using the cross icon, but only if the `triggerOnClear` prop is set to true
    useEffect(() => {
      const inputElement = inputRef.current;

      if (!inputElement || !triggerOnClear) {
        return;
      }

      const handleSearch = (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (target.value !== "") {
          return;
        }

        onClick?.({
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: "",
          },
        });
      };

      inputElement.addEventListener("search", handleSearch);

      return () => {
        inputElement.removeEventListener("search", handleSearch);
      };
    }, [id, name, onClick, triggerOnClear]);

    const searchButtonText = locale.search.searchButtonText();

    const sizeMap = {
      S: "small",
      M: "medium",
      L: "large",
    } as const;

    const searchButtonSize = sizeMap[size];

    return (
      <StyledSearch
        ref={searchRef}
        id={id}
        name={name}
        searchWidth={searchWidth}
        maxWidth={maxWidth}
        {...tagComponent("search", rest)}
        {...filterStyledSystemMarginProps(rest)}
        {...rest}
      >
        <StyledSearchInput
          placeholder={placeholder}
          value={value}
          aria-label={
            ariaLabel || (label ? undefined : locale.search.searchButtonText())
          }
          label={label}
          inputHint={inputHint}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          error={error}
          warning={warning}
          my={0} // prevents any form spacing being applied
        />
        <StyledSearchButton
          aria-label={searchButtonAriaLabel || searchButtonText}
          size={searchButtonSize}
          px={2}
          variantType="subtle"
          inverse={inverse || variant === "dark"}
          iconType="search"
          className="search-button"
          {...tagComponent(`${searchButtonText}-button`, {
            "data-element": `${searchButtonText}-button`,
            ...searchButtonDataProps,
          })}
          {...(onClick && {
            onClick: () => onClick({ target: { name, id, value } }),
          })}
        ></StyledSearchButton>
      </StyledSearch>
    );
  },
);

export default Search;
