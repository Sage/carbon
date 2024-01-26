import React, { useState, useEffect, useRef, useCallback } from "react";
import invariant from "invariant";
import { Side } from "@floating-ui/dom";

import { ButtonProps } from "../../button";
import { filterOutStyledSystemSpacingProps } from "../../../style/utils";
import SelectTextbox, { FormInputPropTypes } from "../select-textbox";
import guid from "../../../__internal__/utils/helpers/guid";
import withFilter from "../utils/with-filter.hoc";
import StyledSelect from "../select.style";
import SelectList, {
  SelectListProps,
} from "../select-list/select-list.component";
import isExpectedOption from "../utils/is-expected-option";
import isNavigationKey from "../utils/is-navigation-key";
import Logger from "../../../__internal__/utils/logger";
import useStableCallback from "../../../hooks/__internal__/useStableCallback";
import useFormSpacing from "../../../hooks/__internal__/useFormSpacing";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import { CustomSelectChangeEvent } from "../simple-select";
import { OptionData } from "../simple-select/simple-select.component";

let deprecateInputRefWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;

const FilterableSelectList = withFilter<SelectListProps>(SelectList);

export interface FilterableSelectProps
  extends Omit<FormInputPropTypes, "defaultValue" | "value"> {
  /** Prop to specify the aria-label attribute of the component input */
  "aria-label"?: string;
  /** Prop to specify the aria-labeledby property of the component input */
  "aria-labelledby"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | Record<string, unknown>;
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal?: boolean;
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
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Maximum list height - defaults to 180 */
  listMaxHeight?: number;
  /** Placement of the select list in relation to the input element */
  listPlacement?: Side;
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
}

export const FilterableSelect = React.forwardRef(
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
      disablePortal,
      listActionButton,
      listMaxHeight,
      onListAction,
      isLoading,
      disabled,
      readOnly,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      "data-component": dataComponent = "filterable-select",
      "data-element": dataElement,
      "data-role": dataRole,
      tooltipPosition,
      listPlacement = "bottom",
      flipEnabled = true,
      inputRef,
      enableVirtualScroll,
      virtualScrollOverscan,
      disableDefaultFiltering = false,
      ...textboxProps
    }: FilterableSelectProps,
    ref
  ) => {
    const [activeDescendantId, setActiveDescendantId] = useState<string>();
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

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Filterable Select` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const componentIsUncontrolled =
      !isControlled || (!onChange && defaultValue);

    if (!deprecateUncontrolledWarnTriggered && componentIsUncontrolled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Filterable Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    const createCustomEvent = useCallback(
      (newValue, selectionConfirmed) => {
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
      [name, id]
    );

    const triggerChange = useCallback(
      (newValue, selectionConfirmed) => {
        if (onChange) {
          onChange(createCustomEvent(newValue, selectionConfirmed));
        }
      },
      [onChange, createCustomEvent]
    );

    function findElementWithMatchingText(
      textToMatch: string,
      list: React.ReactNode
    ) {
      return (list as React.ReactElement[]).find((child) => {
        const { text } = child.props;

        return text?.toLowerCase().indexOf(textToMatch?.toLowerCase()) !== -1;
      });
    }

    const updateValues = useCallback(
      (newFilterText: string, isDeleteEvent: boolean) => {
        setSelectedValue((previousValue) => {
          const match = findElementWithMatchingText(newFilterText, children);
          const isFilterCleared = isDeleteEvent && newFilterText === "";

          if (!match || isFilterCleared || match.props.disabled) {
            setTextValue(newFilterText);
            triggerChange("", false);

            return "";
          }

          if (isDeleteEvent) {
            setTextValue(newFilterText);

            return match.props.value;
          }

          triggerChange(match.props.value, false);

          if (
            match.props.text
              ?.toLowerCase()
              .startsWith(newFilterText.toLowerCase())
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
      [children, triggerChange]
    );

    const setMatchingText = useCallback(
      (newValue, isClosing = false) => {
        const matchingOption = (React.Children.toArray(
          children
        ) as React.ReactElement[]).find(
          (child) =>
            React.isValidElement(child) && isExpectedOption(child, newValue)
        );

        if (!matchingOption || matchingOption.props.text === undefined) {
          setTextValue(filterText || "");
        } else if (
          isClosing ||
          matchingOption.props.text
            ?.toLowerCase()
            .startsWith(filterText?.toLowerCase())
        ) {
          setTextValue(matchingOption.props.text);
        }
      },
      [children, filterText]
    );

    const handleTextboxChange = useCallback(
      (event) => {
        const newValue = event.target.value;
        const isDeleteEvent =
          event.nativeEvent.inputType === "deleteContentBackward" ||
          event.nativeEvent.inputType === "deleteContentForward" ||
          event.nativeEvent.inputType === "delete";

        updateValues(newValue, isDeleteEvent);
        setFilterText(newValue);
        setOpen(true);
      },
      [updateValues]
    );

    const fillLastFilterCharacter = useCallback(
      (key) => {
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
      [textValue]
    );

    const handleTextboxKeydown = useCallback(
      (event) => {
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
      [fillLastFilterCharacter, onKeyDown, readOnly]
    );

    const valueToUse = isControlled.current ? value : selectedValue;

    const handleGlobalClick = useCallback(
      (event) => {
        const notInContainer =
          containerRef.current && !containerRef.current.contains(event.target);
        const notInList =
          listboxRef.current && !listboxRef.current.contains(event.target);

        isMouseDownReported.current = false;

        if (notInContainer && notInList) {
          setMatchingText(valueToUse, true);
          setOpen(false);
        }
      },
      [setMatchingText, valueToUse]
    );

    useEffect(() => {
      const modeSwitchedMessage =
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
        "Decide between using a controlled or uncontrolled input element for the lifetime of the component";
      const onChangeMissingMessage =
        "onChange prop required when using a controlled input element";

      invariant(
        isControlled.current === (value !== undefined),
        modeSwitchedMessage
      );
      invariant(
        !isControlled.current || (isControlled.current && onChange),
        onChangeMissingMessage
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
        onListActionMissingMessage
      );
    }, [listActionButton, onListAction]);

    useEffect(() => {
      if (isControlled.current) {
        setMatchingText(value);
      }
      // update text value only when children are changing
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, children]);

    const onFilterChange = useStableCallback(
      onFilterChangeProp as (filterTextArg: unknown) => void
    );
    const isFirstRender = useRef(true);
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
      const textStartsWithFilter = textValue
        ?.toLowerCase()
        .startsWith(filterText?.toLowerCase());
      const isTextboxActive = !disabled && !readOnly;

      if (
        isTextboxActive &&
        textboxRef &&
        filterText?.length &&
        textValue?.length > filterText?.length &&
        textStartsWithFilter
      ) {
        textboxRef.selectionStart = filterText.length;
      }
    }, [textValue, filterText, textboxRef, disabled, readOnly]);

    const onSelectOption = useCallback(
      (optionData: OptionData) => {
        const {
          id: selectedOptionId,
          text,
          value: newValue,
          selectionType,
          selectionConfirmed,
        } = optionData;

        if (selectionType === "tab") {
          setOpen(false);
          textboxRef?.focus();

          return;
        }

        if (!isControlled.current) {
          setSelectedValue(newValue);
          setHighlightedValue(newValue);
        }

        setTextValue(text || /* istanbul ignore next */ "");
        triggerChange(newValue, selectionConfirmed);
        setActiveDescendantId(selectedOptionId);

        if (selectionType !== "navigationKey") {
          openOnFocusFlagBlock.current = !!openOnFocus;
          setOpen(false);
          textboxRef?.focus();
          textboxRef?.select();
          openOnFocusFlagBlock.current = false;
        }
      },
      [textboxRef, triggerChange, openOnFocus]
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
    }

    function handleDropdownIconClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event as React.MouseEvent<HTMLInputElement>);
      }

      setOpen((isAlreadyOpen) => {
        return !isAlreadyOpen;
      });
    }

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

    const assignInput = useCallback(
      (element) => {
        setTextboxRef(element);

        if (inputRef || !ref) {
          return;
        }

        if (typeof ref === "function") {
          ref(element);
        } else {
          ref.current = element;
        }
      },
      [ref, inputRef]
    );

    function getTextboxProps() {
      return {
        id: inputId.current,
        name,
        label,
        disabled,
        readOnly,
        ref: assignInput,
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
        inputRef,
        ...filterOutStyledSystemSpacingProps(textboxProps),
      };
    }

    const selectListProps = {
      ref: listboxRef,
      id: selectListId.current,
      labelId,
      anchorElement: textboxRef?.parentElement || undefined,
      onSelect: onSelectOption,
      onSelectListClose,
      onMouseDown: handleListMouseDown,
      filterText,
      highlightedValue,
      noResultsMessage,
      disablePortal,
      listActionButton,
      listMaxHeight,
      onListAction: handleOnListAction,
      isLoading,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      loaderDataRole: "filterable-select-list-loader",
      listPlacement,
      flipEnabled,
      isOpen,
      enableVirtualScroll,
      virtualScrollOverscan,
    };

    const selectList = disableDefaultFiltering ? (
      <SelectList {...selectListProps}>{children}</SelectList>
    ) : (
      <FilterableSelectList {...selectListProps} filterText={filterText}>
        {children}
      </FilterableSelectList>
    );

    const marginProps = useFormSpacing(textboxProps);

    return (
      <StyledSelect
        hasTextCursor
        readOnly={readOnly}
        disabled={disabled}
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...marginProps}
      >
        <div ref={containerRef}>
          <SelectTextbox
            activeDescendantId={activeDescendantId}
            ariaLabel={ariaLabel}
            ariaLabelledby={ariaLabelledby}
            labelId={label ? labelId : undefined}
            aria-controls={selectListId.current}
            isOpen={isOpen}
            hasTextCursor
            textboxRef={textboxRef}
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelect>
    );
  }
);

export default FilterableSelect;
