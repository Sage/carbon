import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import invariant from "invariant";
import { Side } from "@floating-ui/dom";

import { filterOutStyledSystemSpacingProps } from "../../../style/utils";
import SelectTextbox, { FormInputPropTypes } from "../select-textbox";
import guid from "../../../__internal__/utils/helpers/guid";
import withFilter from "../utils/with-filter.hoc";
import SelectList from "../select-list/select-list.component";
import {
  StyledSelectPillContainer,
  StyledSelectMultiSelect,
  StyledAccessibilityLabelContainer,
} from "./multi-select.style";
import Pill, { PillProps } from "../../pill";
import isExpectedOption from "../utils/is-expected-option";
import isExpectedValue from "../utils/is-expected-value";
import isNavigationKey from "../utils/is-navigation-key";
import Logger from "../../../__internal__/utils/logger";
import useStableCallback from "../../../hooks/__internal__/useStableCallback";
import useFormSpacing from "../../../hooks/__internal__/useFormSpacing";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import { OptionProps } from "../option";
import { OptionRowProps } from "../option-row";

let deprecateInputRefWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;

const FilterableSelectList = withFilter(SelectList);

export interface MultiSelectProps
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
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string[] | Record<string, unknown>[];
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal?: boolean;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
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
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string[] | Record<string, unknown>[];
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Maximum list height - defaults to 180 */
  listMaxHeight?: number;
  /** Placement of the select list in relation to the input element */
  listPlacement?: Side;
  /** Use the opposite list placement if the set placement does not fit */
  flipEnabled?: boolean;
  /** Wraps the pill text when it would overflow the input width */
  wrapPillText?: boolean;
  /** Set this prop to enable a virtualised list of options. If it is not used then all options will be in the
   * DOM at all times, which may cause performance problems on very large lists */
  enableVirtualScroll?: boolean;
  /** The number of options to render into the DOM at once, either side of the currently-visible ones.
   * Higher values make for smoother scrolling but may impact performance.
   * Only used if the `enableVirtualScroll` prop is set. */
  virtualScrollOverscan?: number;
}

export const MultiSelect = React.forwardRef(
  (
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      value,
      defaultValue,
      id,
      label,
      name,
      disabled,
      readOnly,
      children,
      onOpen,
      onFilterChange: onFilterChangeProp,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      openOnFocus = false,
      noResultsMessage,
      placeholder,
      disablePortal,
      isLoading,
      tableHeader,
      multiColumn,
      tooltipPosition,
      size,
      "data-component": dataComponent = "multiselect",
      "data-element": dataElement,
      "data-role": dataRole,
      listPlacement = "bottom",
      listMaxHeight,
      flipEnabled = true,
      wrapPillText = true,
      inputRef,
      enableVirtualScroll,
      virtualScrollOverscan,
      ...textboxProps
    }: MultiSelectProps,
    ref
  ) => {
    const [activeDescendantId, setActiveDescendantId] = useState();
    const selectListId = useRef(guid());
    const accessibilityLabelId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const isInputFocused = useRef(false);
    const isClickTriggeredBySelect = useRef(false);
    const isMouseDownReported = useRef(false);
    const isMouseDownOnInput = useRef(false);
    const isControlled = useRef(value !== undefined);
    const [textboxRef, setTextboxRef] = useState<HTMLInputElement>();
    const [isOpen, setOpenState] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || []
    );
    const [highlightedValue, setHighlightedValue] = useState("");
    const [filterText, setFilterText] = useState("");
    const [placeholderOverride, setPlaceholderOverride] = useState<string>();
    const inputId = useRef(id || guid());
    const { labelId } = useInputAccessibility({
      id: inputId.current,
      label,
    });

    const actualValue = isControlled.current ? value : selectedValue;

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Multi Select` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const componentIsUncontrolled =
      !isControlled || (!onChange && defaultValue);

    if (!deprecateUncontrolledWarnTriggered && componentIsUncontrolled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    const setOpen = useCallback(() => {
      setOpenState((isAlreadyOpen) => {
        if (!isAlreadyOpen && onOpen) {
          onOpen();
        }

        return true;
      });
    }, [onOpen]);

    const createCustomEvent = useCallback(
      (newValue) => {
        const customEvent = {
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: newValue,
          },
        };

        return customEvent as React.ChangeEvent<HTMLInputElement>;
      },
      [name, id]
    );

    /* generic value update function which can be used for both controlled and uncontrolled
     * components, both with and without onChange.
     * It accepts a function to update the value, which is assumed to be have no side effects and therefore
     * be safe to run more than once if needed. */
    const updateValue = useCallback(
      (
        updateFunction: (
          previousValue: string[] | Record<string, unknown>[]
        ) => string[] | Record<string, unknown>[]
      ) => {
        const newValue = updateFunction(
          actualValue as string[] | Record<string, unknown>[]
        );
        // only call onChange if an option has been selected or deselected
        if (onChange && newValue.length !== actualValue?.length) {
          onChange(createCustomEvent(newValue));
        }

        // no need to update selectedValue if the component is controlled: onChange should take care of updating the value
        if (!isControlled.current) {
          setSelectedValue(updateFunction);
        }
      },
      [createCustomEvent, onChange, actualValue]
    );

    function findElementWithMatchingText(
      textToMatch: string,
      list: React.ReactNode
    ) {
      return (list as React.ReactElement[]).find((child) => {
        const { text } = child.props;

        return text?.toLowerCase().indexOf(textToMatch.toLowerCase()) !== -1;
      });
    }

    const handleTextboxChange = useCallback(
      (event) => {
        const newValue = event.target.value;
        const match = findElementWithMatchingText(newValue, children);

        if (match) {
          setHighlightedValue(match.props.value);
        }

        setFilterText(newValue);
        setTextValue(newValue);
        setOpen();
      },
      [children, setOpen]
    );

    const removeSelectedValue = useCallback(
      (index) => {
        isClickTriggeredBySelect.current = true;

        updateValue((previousValue) => {
          if (!previousValue.length) {
            return previousValue;
          }
          const newValue = previousValue.slice(); // spreading does not work but slice does - see https://github.com/microsoft/TypeScript/issues/53670
          newValue.splice(index, 1);

          return newValue;
        });
      },
      [updateValue]
    );

    const handleTextboxKeydown = useCallback(
      (event) => {
        const { key } = event;
        const isDeleteKey = key === "Backspace" || key === "Delete";

        if (onKeyDown) {
          onKeyDown(event);
        }

        if (readOnly) {
          return;
        }

        if (!event.defaultPrevented && isNavigationKey(key)) {
          event.preventDefault();
          setOpen();
        }

        if (isDeleteKey && (filterText === "" || textValue === "")) {
          removeSelectedValue(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [onKeyDown, readOnly, filterText, textValue, setOpen, removeSelectedValue]
    );

    const accessibilityLabel = useMemo(() => {
      return actualValue && actualValue.length
        ? React.Children.map(children, (child) => {
            return React.isValidElement(child) &&
              actualValue.includes(child.props.value)
              ? child.props.text
              : false;
          })
            ?.filter((child) => child)
            .reduce((acc, item) => {
              return acc ? `${acc}, ${item}` : item;
            }, "")
        : null;
    }, [children, actualValue]);

    const handleGlobalClick = useCallback(
      (event) => {
        isMouseDownReported.current = false;

        if (!isOpen) {
          return;
        }

        const notInContainer =
          containerRef.current && !containerRef.current.contains(event.target);

        const notInList =
          listboxRef.current && !listboxRef.current.contains(event.target);

        if (notInContainer && notInList && !isClickTriggeredBySelect.current) {
          setTextValue("");
          setFilterText("");
          setHighlightedValue("");
          setOpenState(false);
        }

        isClickTriggeredBySelect.current = false;
      },
      [isOpen]
    );

    const mapValuesToPills = useMemo(() => {
      const canDelete = !disabled && !readOnly;

      if (!actualValue?.length) {
        return "";
      }

      return actualValue.map((singleValue, index) => {
        const matchingOption = React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) && isExpectedOption(child, singleValue)
        );

        let pillProps: Omit<PillProps, "children"> = {};

        if (React.isValidElement(matchingOption)) {
          pillProps = {
            title: matchingOption.props.text,
            fill: matchingOption.props.fill,
            borderColor: matchingOption.props.borderColor,
          };
        }

        const title = pillProps.title || "";
        const key =
          title +
          ((React.isValidElement(matchingOption) &&
            (matchingOption.props as OptionProps | OptionRowProps).value) ||
            index);

        return (
          <StyledSelectPillContainer key={key}>
            <Pill
              onDelete={
                canDelete ? () => removeSelectedValue(index) : undefined
              }
              wrapText={wrapPillText}
              {...pillProps}
            >
              {title}
            </Pill>
          </StyledSelectPillContainer>
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, disabled, readOnly, actualValue]);

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
    }, [value, onChange]);

    // removes placeholder when a value is present
    useEffect(() => {
      const hasValue = value?.length;
      const hasSelectedValue = actualValue?.length;

      if (hasValue || hasSelectedValue) {
        setPlaceholderOverride(" ");
      } else {
        setPlaceholderOverride(placeholder);
      }
    }, [value, actualValue, placeholder]);

    useEffect(() => {
      const clickEvent = "click";

      window.addEventListener(clickEvent, handleGlobalClick);

      return function cleanup() {
        window.removeEventListener(clickEvent, handleGlobalClick);
      };
    }, [handleGlobalClick]);

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

      setOpenState((isAlreadyOpen) => {
        if (isAlreadyOpen) {
          setFilterText("");
          return false;
        }

        if (onOpen) {
          onOpen();
        }

        return true;
      });
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

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      const triggerFocus = () => onFocus?.(event);

      if (openOnFocus) {
        setOpenState((isAlreadyOpen) => {
          if (isAlreadyOpen) {
            return true;
          }

          if (onOpen) {
            onOpen();
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
      } else if (onFocus && !isInputFocused.current) {
        triggerFocus();
        isInputFocused.current = true;
      }
    }

    const onSelectOption = useCallback(
      (optionData) => {
        const {
          value: newValue,
          selectionType,
          id: selectedOptionId,
        } = optionData;

        if (selectionType === "navigationKey") {
          setHighlightedValue(newValue);
          setActiveDescendantId(selectedOptionId);
          return;
        }

        if (selectionType === "click") {
          isClickTriggeredBySelect.current = true;
        }

        setTextValue("");

        const isAlreadySelected =
          actualValue?.findIndex((val) => isExpectedValue(val, newValue)) !==
          -1;

        textboxRef?.focus();
        isMouseDownReported.current = false;

        updateValue((previousValue) => {
          if (isAlreadySelected) {
            return previousValue;
          }

          return [...previousValue, newValue];
        });
      },
      [textboxRef, actualValue, updateValue]
    );

    const onSelectListClose = useCallback(() => {
      setOpenState(false);
      setFilterText("");
    }, []);

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
        disabled,
        label,
        readOnly,
        placeholder: placeholderOverride,
        leftChildren: mapValuesToPills,
        ref: assignInput,
        formattedValue: textValue,
        selectedValue: actualValue,
        onClick: handleTextboxClick,
        onMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onBlur: handleTextboxBlur,
        iconOnClick: handleDropdownIconClick,
        iconOnMouseDown: handleTextboxMouseDown,
        onKeyDown: handleTextboxKeydown,
        onChange: handleTextboxChange,
        tooltipPosition,
        size,
        inputRef,
        ...filterOutStyledSystemSpacingProps(textboxProps),
      };
    }

    const selectList = (
      <FilterableSelectList
        ref={listboxRef}
        id={selectListId.current}
        labelId={labelId}
        anchorElement={textboxRef?.parentElement || undefined}
        onSelect={onSelectOption}
        onSelectListClose={onSelectListClose}
        onMouseDown={handleListMouseDown}
        filterText={filterText}
        highlightedValue={highlightedValue}
        noResultsMessage={noResultsMessage}
        disablePortal={disablePortal}
        isLoading={isLoading}
        tableHeader={tableHeader}
        multiColumn={multiColumn}
        listPlacement={listPlacement}
        listMaxHeight={listMaxHeight}
        flipEnabled={flipEnabled}
        loaderDataRole="multi-select-list-loader"
        multiselectValues={actualValue}
        isOpen={isOpen}
        enableVirtualScroll={enableVirtualScroll}
        virtualScrollOverscan={virtualScrollOverscan}
      >
        {children}
      </FilterableSelectList>
    );

    const marginProps = useFormSpacing(textboxProps);

    return (
      <StyledSelectMultiSelect
        disabled={disabled}
        readOnly={readOnly}
        hasTextCursor
        size={size}
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...marginProps}
      >
        <div ref={containerRef}>
          <StyledAccessibilityLabelContainer
            data-element="accessibility-label"
            id={accessibilityLabelId.current}
          >
            {accessibilityLabel}
          </StyledAccessibilityLabelContainer>

          <SelectTextbox
            accessibilityLabelId={accessibilityLabelId.current}
            activeDescendantId={activeDescendantId}
            aria-controls={selectListId.current}
            ariaLabel={ariaLabel}
            ariaLabelledby={ariaLabelledby}
            hasTextCursor
            isOpen={isOpen}
            labelId={labelId}
            textboxRef={textboxRef}
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelectMultiSelect>
    );
  }
);

export default MultiSelect;
