import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useContext,
} from "react";
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
import { Search as LegacySearch } from "./__internal__/legacy/search.component";

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
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const legacyRef = useRef<SearchHandle>(null);

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

    if (inMenu) {
      return (
        <LegacySearch
          {...rest}
          {...legacyOnlyProps}
          onChange={onChange}
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

    return (
      <TextInput
        {...rest}
        {...tagComponent("search", rest)}
        className={classNames}
        id={id}
        name={name}
        type="search"
        label={label || ""}
        onChange={onChange}
        value={value}
        size={size}
        inputWidth={mappedInputWidth}
        maxWidth={maxWidth}
        error={error}
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
  },
);

export default Search;
