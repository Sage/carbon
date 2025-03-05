import React, { useState, useEffect, useRef, useCallback } from "react";
import invariant from "invariant";

import { ButtonProps } from "../../button";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../../style/utils";
import SelectTextbox, {
  FormInputPropTypes,
} from "../__internal__/select-textbox";
import guid from "../../../__internal__/utils/helpers/guid";
import withFilter from "../__internal__/utils/with-filter.hoc";
import StyledSelect from "../select.style";
import SelectList, {
  SelectListProps,
  ListPlacement,
} from "../__internal__/select-list/select-list.component";
import isExpectedOption from "../__internal__/utils/is-expected-option";
import areObjectsEqual from "../__internal__/utils/are-objects-equal";
import isNavigationKey from "../__internal__/utils/is-navigation-key";
import Logger from "../../../__internal__/utils/logger";
import useStableCallback from "../../../hooks/__internal__/useStableCallback";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import { CustomSelectChangeEvent } from "../simple-select";

let deprecateUncontrolledWarnTriggered = false;

const FilterableSelectList = withFilter<SelectListProps>(SelectList);

export interface FilterableSelectProps
  extends Omit<FormInputPropTypes, "defaultValue" | "value"> {
  /** Prop to specify the aria-label attribute of the component input */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component input */
  "aria-labelledby"?: string;
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | Record<string, unknown>;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** True for default text button or a Button Component to be rendered */
  listActionButton?: boolean | React.ReactElement<ButtonProps>;
  /** When true component will work in multi column mode.
   * Children should consist of OptionRow components in this mode
   */
  multiColumn?: boolean;
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage?: string;
  /** A custom callback for when the input text changes */
  onFilterChange?: (filterText: string) => void;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A callback for when the Action Button is triggered */
  onListAction?: () => void;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string | Record<string, unknown>;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Maximum list height - defaults to 180 */
  listMaxHeight?: number;
  /** Placement of the select list in relation to the input element */
  listPlacement?: ListPlacement;
  /** Use the opposite list placement if the set placement does not fit */
  flipEnabled?: boolean;
  /** Set this prop to enable a virtualised list of options. If it is not used then all options will be in the
   * DOM at all times, which may cause performance problems on very large lists */
  enableVirtualScroll?: boolean;
  /** The number of options to render into the DOM at once, either side of the currently-visible ones.
   * Higher values make for smoother scrolling but may impact performance.
   * Only used if the `enableVirtualScroll` prop is set. */
  virtualScrollOverscan?: number;
  /** Boolean to disable automatic filtering and highlighting of options.
   * This allows custom filtering and option styling to be performed outside of the component when the filter text changes. */
  disableDefaultFiltering?: boolean;
  /** Flag to configure component as optional. */
  isOptional?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Specify a callback triggered on change */
  onChange?: (
    ev: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Override the default width of the list element. Number passed is converted into pixel value */
  listWidth?: number;
}

export const FilterableSelect = React.forwardRef<
  HTMLInputElement,
  FilterableSelectProps
>(
  (
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      value,
      defaultValue,
      id,
      name,
      label,
      children,
      onOpen: onOpenProp,
      onChange,
      onFilterChange: onFilterChangeProp,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      openOnFocus,
      noResultsMessage,
      listActionButton,
      listMaxHeight,
      onListAction,
      isLoading,
      disabled,
      readOnly,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      "data-element": dataElement,
      "data-role": dataRole,
      tooltipPosition,
      listPlacement = "bottom",
      flipEnabled = true,
      enableVirtualScroll,
      virtualScrollOverscan,
      disableDefaultFiltering = false,
      isOptional,
      required,
      listWidth,
      ...textboxProps
    },
    ref,
  ) => {
    const [activeDescendantId, setActiveDescendantId] = useState<string>("");
    const selectListId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const isControlled = useRef(value !== undefined);
    const isMouseDownReported = useRef(false);
    const isInputFocused = useRef(false);
    const isMouseDownOnInput = useRef(false);
    const [textboxRef, setTextboxRef] = useState<HTMLInputElement>();
    const [isOpen, setOpen] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState<
      string | Record<string, unknown> | undefined
    >(value || defaultValue || "");
    const receivedValue = useRef(value);
    const [highlightedValue, setHighlightedValue] = useState<
      string | Record<string, unknown> | undefined
    >("");
    const [filterText, setFilterText] = useState("");
    const inputId = useRef(id || guid());
    const { labelId } = useInputAccessibility({
      id: inputId.current,
      label,
    });
    const focusTimer = useRef<null | ReturnType<typeof setTimeout>>(null);
    const openOnFocusFlagBlock = useRef(false);

    const componentIsUncontrolled =
      !isControlled || (!onChange && defaultValue);

    if (!deprecateUncontrolledWarnTriggered && componentIsUncontrolled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Filterable Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
      );
    }

    const createCustomEvent = useCallback(
      (
        newValue: string | Record<string, unknown>,
        selectionConfirmed?: boolean,
      ) => {
        const customEvent = {
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: newValue,
          },
          selectionConfirmed,
        };

        return customEvent as CustomSelectChangeEvent;
      },
      [name, id],
    );

    const triggerChange = useCallback(
      (
        newValue: string | Record<string, unknown>,
        selectionConfirmed: boolean,
      ) => {
        /* istanbul ignore else */
        if (onChange) {
          onChange(createCustomEvent(newValue, selectionConfirmed));
        }
      },
      [onChange, createCustomEvent],
    );

    function findElementWithMatchingText(
      textToMatch: string,
      list: React.ReactNode,
    ) {
      return React.Children.toArray(list).find((child) => {
        const { text } = (child as React.ReactElement).props;

        return text?.toLowerCase().indexOf(textToMatch?.toLowerCase()) !== -1;
      });
    }

    const updateValues = useCallback(
      (newFilterText: string, isDeleteEvent: boolean) => {
        setSelectedValue((previousValue) => {
          const trimmed = newFilterText.trimStart();
          const match = findElementWithMatchingText(
            trimmed,
            children,
          ) as React.ReactElement;
          const isFilterCleared = isDeleteEvent && !newFilterText.length;

          if (!match || isFilterCleared || match.props.disabled) {
            setTextValue(newFilterText);
            triggerChange("", false);

            return "";
          }

          if (trimmed.length) {
            triggerChange(match.props.value, false);
          }

          if (isDeleteEvent) {
            setTextValue(newFilterText);

            return match.props.value;
          }

          if (
            trimmed.length &&
            match.props.text?.toLowerCase().startsWith(trimmed.toLowerCase())
          ) {
            setTextValue(match.props.text);
          } else {
            setTextValue(newFilterText);
          }

          if (isControlled.current) {
            return previousValue;
          }

          setHighlightedValue(match.props.value);

          return match.props.value;
        });
      },
      [children, triggerChange],
    );

    const setMatchingText = useCallback(
      (newValue?: string | Record<string, unknown>, isClosing = false) => {
        const matchingOption = (
          React.Children.toArray(children) as React.ReactElement[]
        ).find(
          (child) =>
            React.isValidElement(child) && isExpectedOption(child, newValue),
        );

        if (!matchingOption || matchingOption.props.text === undefined) {
          setTextValue(filterText || "");

          return;
        }

        /* istanbul ignore else */
        if (
          isClosing ||
          matchingOption.props.text
            ?.toLowerCase()
            .startsWith(filterText?.toLowerCase().trim())
        ) {
          setTextValue(matchingOption.props.text);
        }
      },
      [children, filterText],
    );

    const handleTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const { inputType } = event.nativeEvent as InputEvent;
        const isDeleteEvent =
          inputType === "deleteContentBackward" ||
          inputType === "deleteContentForward" ||
          inputType === "delete";

        updateValues(newValue, isDeleteEvent);
        setFilterText(newValue);
        setOpen(true);
      },
      [updateValues],
    );

    const fillLastFilterCharacter = useCallback(
      (key: string) => {
        setFilterText((previousFilterText) => {
          if (
            previousFilterText?.length === textValue?.length - 1 &&
            key === textValue.slice(-1)
          ) {
            return textValue;
          }

          return previousFilterText;
        });
      },
      [textValue],
    );

    const handleTextboxKeydown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        if (onKeyDown) {
          onKeyDown(event);
        }

        if (readOnly) {
          return;
        }

        if (!event.defaultPrevented && isNavigationKey(key)) {
          event.preventDefault();
          setOpen(true);
        }

        fillLastFilterCharacter(key);
      },
      [fillLastFilterCharacter, onKeyDown, readOnly],
    );

    const valueToUse = isControlled.current ? value : selectedValue;

    const handleGlobalClick = useCallback(
      (event: MouseEvent) => {
        const notInContainer =
          containerRef.current &&
          !containerRef.current.contains(event.target as Node);
        const notInList =
          listboxRef.current &&
          !listboxRef.current.contains(event.target as Node);

        isMouseDownReported.current = false;

        if (notInContainer && notInList) {
          setMatchingText(valueToUse, true);
          setOpen(false);
        }
      },
      [setMatchingText, valueToUse],
    );

    useEffect(() => {
      const modeSwitchedMessage =
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
        "Decide between using a controlled or uncontrolled input element for the lifetime of the component";
      const onChangeMissingMessage =
        "onChange prop required when using a controlled input element";

      invariant(
        isControlled.current === (value !== undefined),
        modeSwitchedMessage,
      );
      invariant(
        !isControlled.current || (isControlled.current && onChange),
        onChangeMissingMessage,
      );
      if (isControlled.current) {
        setSelectedValue((prevValue) => {
          if (value && prevValue !== value) {
            setMatchingText(value);
          }

          return value;
        });
        setHighlightedValue(value);
      } else {
        if (textValue !== selectedValue) {
          setMatchingText(selectedValue);
        }
        if (highlightedValue !== selectedValue) {
          setHighlightedValue(selectedValue);
        }
      }
      // prevent value update on filter change
      // selectedValue and highlightedValue omitted from deps, only want uncontrolled change if onChange/children update
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, onChange, children]);

    const onOpen = useStableCallback(onOpenProp);
    useEffect(() => {
      if (!isOpen) {
        setFilterText("");
      } else if (onOpen) {
        onOpen();
      }
    }, [onOpen, isOpen]);

    useEffect(() => {
      const hasListActionButton = listActionButton !== undefined;
      const onListActionMissingMessage =
        "onListAction prop required when using listActionButton prop";

      invariant(
        !hasListActionButton || (hasListActionButton && onListAction),
        onListActionMissingMessage,
      );
    }, [listActionButton, onListAction]);

    const isFirstRender = useRef(true);

    useEffect(() => {
      // when we render for the first time, we run setMatchingText to populate the input with the correct text
      if (isFirstRender.current) {
        setMatchingText(selectedValue);
      }

      if (isControlled.current) {
        // when value is an object we should only run setMatchingText if the object changes between renders
        if (
          typeof value === "object" &&
          typeof receivedValue.current === "object"
        ) {
          if (!areObjectsEqual(value, receivedValue.current)) {
            setMatchingText(value);
            receivedValue.current = value;
          }
        } else {
          setMatchingText(value);
        }
      }
      // update text value only when children are changing
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, children]);

    const onFilterChange = useStableCallback(
      onFilterChangeProp as (filterTextArg: unknown) => void,
    );

    useEffect(() => {
      if (onFilterChange && !isFirstRender.current) {
        onFilterChange(filterText);
      }
    }, [onFilterChange, filterText]);

    useEffect(() => {
      isFirstRender.current = false;
    }, []);

    useEffect(() => {
      const clickEvent = "click";

      window.addEventListener(clickEvent, handleGlobalClick);

      return function cleanup() {
        window.removeEventListener(clickEvent, handleGlobalClick);
      };
    }, [handleGlobalClick]);

    useEffect(() => {
      const trimmed = filterText?.trimStart();
      const textStartsWithFilter = textValue
        ?.toLowerCase()
        .startsWith(trimmed.toLowerCase());
      const isTextboxActive = !disabled && !readOnly;

      if (
        isTextboxActive &&
        textboxRef &&
        trimmed.length &&
        textValue?.length > trimmed.length &&
        textStartsWithFilter
      ) {
        textboxRef.selectionStart = trimmed.length;
      }
    }, [textValue, filterText, textboxRef, disabled, readOnly]);

    const onSelectOption = useCallback<
      NonNullable<SelectListProps["onSelect"]>
    >(
      (optionData) => {
        const {
          id: selectedOptionId,
          text,
          value: newValue,
          selectionType,
          selectionConfirmed,
        } = optionData;

        if (!isControlled.current) {
          setSelectedValue(newValue);
          setHighlightedValue(newValue);
        }

        setTextValue(text);
        triggerChange(newValue, !!selectionConfirmed);
        setActiveDescendantId(selectedOptionId);

        if (selectionType !== "navigationKey") {
          openOnFocusFlagBlock.current = !!openOnFocus;
          setOpen(false);
          textboxRef?.focus();
          textboxRef?.select();
          openOnFocusFlagBlock.current = false;
        }
      },
      [textboxRef, triggerChange, openOnFocus],
    );

    const onSelectListClose = useCallback(() => {
      setOpen(false);
      setMatchingText(selectedValue, true);
    }, [selectedValue, setMatchingText]);

    function handleTextboxClick(event: React.MouseEvent<HTMLInputElement>) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event);
      }

      setOpen(true);
    }

    function handleDropdownIconClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event as React.MouseEvent<HTMLInputElement>);
      }

      setOpen((isAlreadyOpen) => {
        return !isAlreadyOpen;
      });
    }

    useEffect(() => {
      return () => {
        if (focusTimer.current) {
          clearTimeout(focusTimer.current);
        }
      };
    }, []);

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      const triggerFocus = () => onFocus?.(event);

      if (openOnFocus) {
        if (focusTimer.current) {
          clearTimeout(focusTimer.current);
        }

        if (openOnFocusFlagBlock.current) {
          return;
        }

        // we need to use a timeout here as there is a race condition when rendered in a modal
        // whereby the select list isn't visible when the select is auto focused straight away
        focusTimer.current = setTimeout(() => {
          setOpen((isAlreadyOpen) => {
            if (isAlreadyOpen) {
              return true;
            }

            if (onFocus && !isInputFocused.current) {
              triggerFocus();
              isInputFocused.current = true;
            }

            if (isMouseDownReported.current && !isMouseDownOnInput.current) {
              return false;
            }

            return true;
          });
        });
      } else if (onFocus && !isInputFocused.current) {
        triggerFocus();
        isInputFocused.current = true;
      }
    }

    function handleTextboxBlur(event: React.FocusEvent<HTMLInputElement>) {
      isMouseDownOnInput.current = false;

      if (isMouseDownReported.current) {
        return;
      }

      isInputFocused.current = false;

      if (onBlur) {
        onBlur(event);
      }
    }

    function handleTextboxMouseDown(event: React.MouseEvent<HTMLElement>) {
      isMouseDownReported.current = true;

      if ((event.target as HTMLInputElement).dataset.element === "input") {
        isMouseDownOnInput.current = true;
      }
    }

    function handleListMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleOnListAction() {
      setOpen(false);
      onListAction?.();
    }

    const assignInput = useCallback<React.RefCallback<HTMLInputElement>>(
      (element) => {
        if (!element) return;

        setTextboxRef(element);

        if (!ref) return;
        if (typeof ref === "function") {
          ref(element);
        } else {
          ref.current = element;
        }
      },
      [ref],
    );

    function getTextboxProps() {
      return {
        id: inputId.current,
        name,
        label,
        disabled,
        readOnly,
        selectedValue,
        formattedValue: textValue,
        onClick: handleTextboxClick,
        iconOnClick: handleDropdownIconClick,
        iconOnMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onBlur: handleTextboxBlur,
        onKeyDown: handleTextboxKeydown,
        onChange: handleTextboxChange,
        onMouseDown: handleTextboxMouseDown,
        tooltipPosition,
        required,
        isOptional,
        ...filterOutStyledSystemSpacingProps(textboxProps),
        "data-component": undefined,
      };
    }

    let placement: ListPlacement;

    switch (listPlacement) {
      case "top":
        placement = "top-end";
        break;
      case "bottom":
        placement = "bottom-end";
        break;
      default:
        placement = listPlacement;
    }

    const selectListProps = {
      ref: listboxRef,
      id: selectListId.current,
      labelId,
      anchorElement: textboxRef?.parentElement || undefined,
      onSelect: onSelectOption,
      onSelectListClose,
      onMouseDown: handleListMouseDown,
      filterText: filterText.trim(),
      highlightedValue,
      noResultsMessage,
      listActionButton,
      listMaxHeight,
      onListAction: handleOnListAction,
      isLoading,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      listPlacement: listWidth !== undefined ? placement : listPlacement,
      flipEnabled,
      isOpen,
      enableVirtualScroll,
      virtualScrollOverscan,
      listWidth,
    };

    const selectList = disableDefaultFiltering ? (
      <SelectList {...selectListProps}>{children}</SelectList>
    ) : (
      <FilterableSelectList {...selectListProps}>
        {children}
      </FilterableSelectList>
    );

    const marginProps = filterStyledSystemMarginProps(textboxProps);

    return (
      <StyledSelect
        hasTextCursor
        readOnly={readOnly}
        disabled={disabled}
        data-component="filterable-select"
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...marginProps}
      >
        <div ref={containerRef}>
          <SelectTextbox
            ref={assignInput}
            activeDescendantId={activeDescendantId}
            ariaLabel={ariaLabel}
            ariaLabelledby={ariaLabelledby}
            labelId={label ? labelId : undefined}
            aria-controls={selectListId.current}
            isOpen={isOpen}
            hasTextCursor
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelect>
    );
  },
);

export default FilterableSelect;
