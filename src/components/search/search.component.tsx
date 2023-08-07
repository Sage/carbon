import React, { useState, useMemo, useEffect } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledSearch from "./search.style";
import StyledSearchButton, { StyledButtonIcon } from "./search-button.style";
import Icon, { IconType } from "../icon";
import Textbox from "../textbox";
import Button from "../button";
import { ValidationProps } from "../../__internal__/validations";
import Logger from "../../__internal__/utils/logger";

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
  /** A callback to retrieve the input reference */
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
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
  /** Prop boolean to state whether the `search` icon renders */
  searchButton?: boolean;
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
  /** Prop for active search threshold. This must be a positive number */
  threshold?: number;
  /** Prop for `controlled` use */
  value?: string;
  /** Prop to specify the styling of the search component */
  variant?: "default" | "dark";
  /** Input tabindex */
  tabIndex?: number;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

let deprecateInputRefWarnTriggered = false;
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
      threshold = 3,
      searchWidth,
      maxWidth,
      searchButton,
      searchButtonAriaLabel = "search button",
      placeholder,
      variant = "default",
      "aria-label": ariaLabel = "search",
      inputRef,
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

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Search` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

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

    invariant(
      threshold === undefined ||
        (typeof threshold === "number" && threshold > 0),
      "Threshold must be a positive number"
    );

    const [searchValue, setSearchValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [searchIsActive, setSearchIsActive] = useState(
      initialValue.length >= threshold
    );

    useEffect(() => {
      setSearchIsActive(
        !isControlled
          ? searchValue.length >= threshold
          : value.length >= threshold
      );
    }, [isControlled, searchValue, threshold, value]);

    const [iconType, iconTabIndex] = useMemo<
      [IconType | undefined, number]
    >(() => {
      const isSearchValueEmpty = !isControlled
        ? searchValue.length === 0
        : value.length === 0;
      const isFocusedOrActive =
        isFocused ||
        searchIsActive ||
        inputRef?.current === document.activeElement;

      if (!isSearchValueEmpty) {
        return ["cross", 0];
      }

      if (
        !isFocusedOrActive ||
        threshold === 0 ||
        (!searchButton && isSearchValueEmpty)
      ) {
        return ["search", -1];
      }

      return [undefined, -1];
    }, [
      isControlled,
      searchValue,
      value,
      isFocused,
      searchIsActive,
      threshold,
      searchButton,
      inputRef,
    ]);

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
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

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

    const isSearchTyped =
      isFocused || (!isControlled ? !!searchValue.length : !!value.length);

    return (
      <StyledSearch
        isFocused={isFocused}
        searchWidth={searchWidth}
        maxWidth={maxWidth}
        searchIsActive={searchIsActive}
        searchHasValue={!isControlled ? !!searchValue?.length : !!value?.length}
        showSearchButton={searchButton}
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
          inputIcon={iconType}
          iconTabIndex={iconTabIndex}
          iconOnClick={handleIconClick}
          iconOnMouseDown={handleMouseDown}
          aria-label={ariaLabel}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref || inputRef}
          tabIndex={tabIndex}
          error={error}
          warning={warning}
          info={info}
          tooltipPosition={tooltipPosition}
        />
        {searchButton && (
          <StyledSearchButton>
            {isSearchTyped && (
              <Button
                aria-label={searchButtonAriaLabel}
                size="medium"
                px="16px"
                {...buttonProps}
              >
                <StyledButtonIcon>
                  <Icon type="search" />
                </StyledButtonIcon>
              </Button>
            )}
          </StyledSearchButton>
        )}
      </StyledSearch>
    );
  }
);

Search.displayName = "Search";

export default Search;
