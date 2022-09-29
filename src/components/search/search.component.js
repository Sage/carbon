import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import styledSystemPropTypes from "@styled-system/prop-types";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledSearch from "./search.style";
import StyledSearchButton, { StyledButtonIcon } from "./search-button.style";
import Icon from "../icon";
import Textbox from "../textbox";
import Button from "../button";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Search = ({
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
  searchButton,
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
}) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  invariant(
    typeof initialValue === "string",
    "This component has no initial value"
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

  const [iconType, iconTabIndex] = useMemo(() => {
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

    return ["", -1];
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

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setSearchValue(e.target.value);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  let buttonProps = {};
  if (searchButton && onClick) {
    buttonProps = {
      onClick: (ev) => {
        onClick({
          target: {
            name: ev.target.name || name,
            id: ev.target.id || id,
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

  const handleMouseDown = (ev) => {
    ev.preventDefault();
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.key.length === 1) {
      ev.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(ev);
    }
  };

  const assignInput = (input) => {
    if (inputRef) {
      inputRef.current = input.current;
    }
  };

  return (
    <StyledSearch
      isFocused={isFocused}
      searchWidth={searchWidth}
      searchIsActive={searchIsActive}
      searchHasValue={
        !isControlled
          ? searchValue && searchValue.length
          : value && value.length
      }
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
        inputRef={assignInput}
        tabIndex={tabIndex}
        error={error}
        warning={warning}
        info={info}
        tooltipPosition={tooltipPosition}
      />
      {searchButton && (
        <StyledSearchButton>
          {Boolean(
            isFocused || (!isControlled ? searchValue.length : value.length)
          ) && (
            <Button
              tabIndex={iconTabIndex}
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
};

Search.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Prop for `uncontrolled` use */
  defaultValue: PropTypes.string,
  /** Prop for `controlled` use */
  value: PropTypes.string,
  /** Prop for `onClick` events.
   * `onClick` events are triggered when the `searchButton` is clicked */
  onClick: PropTypes.func,
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `onKeyDown` events */
  onKeyDown: PropTypes.func,
  /** Prop boolean to state whether the `search` icon renders */
  searchButton: PropTypes.bool,
  /** Prop for specifying an input width length.
   * Leaving the `searchWidth` prop with no value will default the width to '100%' */
  searchWidth: PropTypes.string,
  /** Prop for `onFocus` events */
  onFocus: PropTypes.func,
  /** Prop for `onBlur` events */
  onBlur: PropTypes.func,
  /** Prop for `id` */
  id: PropTypes.string,
  /** Prop for `name` */
  name: PropTypes.string,
  /** Prop for active search threshold. This must be a positive number */
  threshold(props, propName) {
    let error;
    if (
      props[propName] &&
      typeof props[propName] === "number" &&
      props[propName] < 0
    ) {
      error = new Error("Threshold must be a positive number.");
    }
    return error;
  },
  /** Prop for a placeholder */
  placeholder: PropTypes.string,
  /** Prop to specify the styling of the search component */
  variant: PropTypes.oneOf(["default", "dark"]),
  /** Prop to specify the aria-label of the search component */
  "aria-label": PropTypes.string,
  /**
   * @private
   * @ignore
   * A callback to retrieve the input reference
   */
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  /** Input tabindex */
  tabIndex: PropTypes.number,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default Search;
