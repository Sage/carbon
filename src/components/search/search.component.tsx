import React, { useState, useRef } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledSearch from "./search.style";
import StyledSearchButton from "./search-button.style";
import Icon from "../icon";
import Textbox from "../textbox";
import Button from "../button";
import { ValidationProps } from "../../__internal__/validations";
import Logger from "../../__internal__/utils/logger";
import useLocale from "../../hooks/__internal__/useLocale";

export interface SearchEvent {
  target: {
    name?: string;
    id?: string;
    value: string;
  };
}

export interface SearchProps extends ValidationProps, MarginProps {
  /** Prop to specify the aria-label of the search component */
  "aria-label"?: string;
  /** Prop to specify the aria-label of the search button */
  searchButtonAriaLabel?: string;
  /** Prop for `uncontrolled` use */
  defaultValue?: string;
  /** Prop for `id` */
  id?: string;
  /** Prop for `name` */
  name?: string;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` events */
  onChange?: (ev: SearchEvent) => void;
  /** Prop for `onClick` events.
   *  `onClick` events are triggered when the `searchButton` is clicked
   */
  onClick?: (ev: SearchEvent) => void;
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
  /** Prop for `controlled` use */
  value?: string;
  /** Prop to specify the styling of the search component */
  variant?: "default" | "dark";
  /** Input tabindex */
  tabIndex?: number;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

let deprecateUncontrolledWarnTriggered = false;

export const Search = React.forwardRef(
  (
    {
      defaultValue,
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
      searchButtonAriaLabel = "search button",
      placeholder,
      variant = "default",
      "aria-label": ariaLabel = "search",
      tabIndex,
      error,
      warning,
      info,
      tooltipPosition,
      ...rest
    }: SearchProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const isControlled = value !== undefined;
    const initialValue = isControlled ? value : defaultValue;
    const locale = useLocale();
    const searchRef = useRef<HTMLDivElement>(null);

    if (!deprecateUncontrolledWarnTriggered && !isControlled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Search` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    invariant(
      typeof initialValue === "string",
      "This component has no initial value"
    );

    const [searchValue, setSearchValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const isSearchValueEmpty = !isControlled
      ? searchValue.length === 0
      : value.length === 0;

    let buttonProps = {};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if (!isControlled) {
        setSearchValue(event.target.value);
      }
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
              value: !isControlled ? searchValue : value,
            },
          });
        },
      };
    }

    const handleIconClick = () => {
      setSearchValue("");

      if (onChange) {
        onChange({
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: "",
          },
        });
      }

      const input = searchRef.current?.querySelector("input");
      input?.focus();
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

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    const searchButtonText =
      typeof searchButton === "string"
        ? searchButton
        : locale.search.searchButtonText();
    const searchHasValue = !isControlled
      ? !!searchValue?.length
      : !!value?.length;

    return (
      <StyledSearch
        ref={searchRef}
        isFocused={isFocused}
        searchWidth={searchWidth}
        maxWidth={maxWidth}
        searchHasValue={searchHasValue}
        showSearchButton={!!searchButton}
        variant={variant}
        mb={0}
        {...filterStyledSystemMarginProps(rest)}
        {...tagComponent("search", rest)}
        id={id}
        name={name}
        {...rest}
      >
        <Textbox
          placeholder={placeholder}
          value={!isControlled ? searchValue : value}
          inputIcon={!isSearchValueEmpty ? "cross" : undefined}
          iconTabIndex={!isSearchValueEmpty ? 0 : -1}
          iconOnClick={handleIconClick}
          iconOnMouseDown={handleMouseDown}
          aria-label={ariaLabel}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          tabIndex={tabIndex}
          error={error}
          warning={warning}
          info={info}
          leftChildren={
            !searchButton ? <Icon type="search" ml={1} /> : undefined
          }
          tooltipPosition={tooltipPosition}
        />
        {searchButton && (
          <StyledSearchButton>
            <Button
              aria-label={searchButtonAriaLabel}
              size="medium"
              px={2}
              buttonType="primary"
              iconPosition="before"
              iconType="search"
              {...buttonProps}
            >
              {searchButtonText}
            </Button>
          </StyledSearchButton>
        )}
      </StyledSearch>
    );
  }
);

Search.displayName = "Search";

export default Search;
