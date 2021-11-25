import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import invariant from "invariant";
import StyledSearch, {
  StyledSearchButton,
  StyledButtonIcon,
} from "./search.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Icon from "../icon";
import Textbox from "../textbox";
import Button from "../button";
import Events from "../../__internal__/utils/helpers/events";

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

  const [iconType, iconTabIndex] = useMemo(() => {
    const isSearchValueEmpty = !isControlled
      ? searchValue.length === 0
      : value.length === 0;
    const isFocusedOrActive =
      isFocused ||
      searchIsActive ||
      inputRef?.current === document.activeElement;
    setSearchIsActive(
      !isControlled
        ? searchValue.length >= threshold
        : value.length >= threshold
    );

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

  const handleOnFocus = () => {
    setIsFocused(true);
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

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (ev) => {
    if (Events.isAlphabetKey(ev) || Events.isNumberKey(ev)) {
      ev.stopPropagation();
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
      onFocus={handleOnFocus}
      onClick={handleOnFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
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
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputRef={assignInput}
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
};

export default Search;
