import React, { useState, useRef, useImperativeHandle } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import StyledSearch from "./search.style";
import StyledSearchButton from "./search-button.style";
import Icon from "../icon";
import Textbox from "../textbox";
import Button from "../button";
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

export interface SearchProps extends ValidationProps, MarginProps, TagProps {
  /** Prop to specify the aria-label of the search component */
  "aria-label"?: string;
  /** Prop to specify the aria-label of the search button */
  searchButtonAriaLabel?: string;
  /** Prop for `id` */
  id?: string;
  /** Prop for `name` */
  name?: string;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` events */
  onChange: (ev: SearchEvent) => void;
  /** Prop for `onClick` events.
   *  `onClick` events are triggered when the `searchButton` is clicked
   */
  onClick?: (ev: SearchEvent) => void;

  /**
   * Sets whether the onClick action should be triggered when the Search cross icon is clicked.
   */
  triggerOnClear?: boolean;
  /** Prop for `onFocus` events */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Prop for a placeholder */
  placeholder?: string;
  /**
   * Pass a boolean to render a search Button with default text.
   * Pass a string to override the text in the search Button
   * */
  searchButton?: boolean | string;
  /**
   * Prop for specifying an input width length.
   * Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /**
   * Prop for specifying the max-width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** Current value */
  value: string;
  /** Prop to specify the styling of the search component */
  variant?: "default" | "dark";
  /** Input tabindex */
  tabIndex?: number;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
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
      searchWidth,
      maxWidth,
      searchButton,
      searchButtonAriaLabel,
      placeholder,
      variant = "default",
      "aria-label": ariaLabel = "search",
      tabIndex,
      error,
      warning,
      info,
      tooltipPosition,
      triggerOnClear,
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

    const [isFocused, setIsFocused] = useState(false);

    const isSearchValueEmpty = value.length === 0;

    let buttonProps = {};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    if (searchButton && onClick) {
      buttonProps = {
        onClick: () => {
          onClick({
            target: {
              name,
              id,
              value,
            },
          });
        },
      };
    }

    const handleIconClick = () => {
      onChange?.({
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: "",
        },
      });

      if (triggerOnClear) {
        onClick?.({
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: "",
          },
        });
      }

      inputRef.current?.focus();
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      /* istanbul ignore else */
      if (onBlur) {
        onBlur(event);
      }
    };

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

    const searchButtonText =
      typeof searchButton === "string"
        ? searchButton
        : locale.search.searchButtonText();
    const searchHasValue = !!value?.length;

    return (
      <StyledSearch
        ref={searchRef}
        isFocused={isFocused}
        searchWidth={searchWidth}
        maxWidth={maxWidth}
        searchHasValue={searchHasValue}
        showSearchButton={!!searchButton}
        variant={variant}
        {...filterStyledSystemMarginProps(rest)}
        id={id}
        name={name}
        {...rest}
        {...tagComponent("search", rest)}
      >
        <Textbox
          placeholder={placeholder}
          value={value}
          inputIcon={!isSearchValueEmpty ? "cross" : undefined}
          iconTabIndex={!isSearchValueEmpty ? 0 : -1}
          iconOnClick={handleIconClick}
          iconOnMouseDown={handleMouseDown}
          aria-label={ariaLabel}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          tabIndex={tabIndex}
          error={error}
          warning={warning}
          info={info}
          leftChildren={
            !searchButton ? <Icon type="search" ml={1} /> : undefined
          }
          tooltipPosition={tooltipPosition}
          my={0} // prevents any form spacing being applied
        />
        {searchButton && (
          <StyledSearchButton>
            <Button
              aria-label={searchButtonAriaLabel || searchButtonText}
              size="medium"
              px={2}
              buttonType="primary"
              iconPosition="before"
              iconType="search"
              className="search-button"
              {...buttonProps}
            >
              {searchButtonText}
            </Button>
          </StyledSearchButton>
        )}
      </StyledSearch>
    );
  },
);

export default Search;
