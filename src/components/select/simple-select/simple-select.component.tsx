import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../../style/utils";
import StyledSelect from "../select.style";
import SelectTextbox, {
  FormInputPropTypes,
} from "../__internal__/select-textbox";
import SelectList, {
  ListPlacement,
  SelectListProps,
} from "../__internal__/select-list/select-list.component";
import guid from "../../../__internal__/utils/helpers/guid";
import getNextChildByText from "../__internal__/utils/get-next-child-by-text";
import isExpectedOption from "../__internal__/utils/is-expected-option";
import isNavigationKey from "../__internal__/utils/is-navigation-key";
import Logger from "../../../__internal__/utils/logger";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";

export interface CustomSelectChangeEvent
  extends React.ChangeEvent<HTMLInputElement> {
  selectionConfirmed?: boolean;
}

export interface SimpleSelectProps
  extends Omit<FormInputPropTypes, "defaultValue" | "value"> {
  /** Prop to specify the aria-describedby property of the component input */
  "aria-describedby"?: string;
  /** Prop to specify the aria-label attribute of the component input */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component input */
  "aria-labelledby"?: string;
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** When true component will work in multi column mode.
   * Children should consist of OptionRow components in this mode
   */
  multiColumn?: boolean;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** If true the component input has no border and is transparent */
  transparent?: boolean;
  /** The selected value(s) */
  value: string | Record<string, unknown>;
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
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Specify a callback triggered on change */
  onChange: (
    ev: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Override the default width of the list element. Number passed is converted into pixel value */
  listWidth?: number;
}

export const SimpleSelect = React.forwardRef<
  HTMLInputElement,
  SimpleSelectProps
>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      value,
      id,
      label,
      name,
      disabled,
      readOnly,
      children,
      transparent,
      openOnFocus = false,
      onOpen,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onBlur,
      isLoading,
      listMaxHeight,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      tooltipPosition,
      "data-element": dataElement,
      "data-role": dataRole,
      listPlacement = "bottom",
      flipEnabled = true,
      enableVirtualScroll,
      virtualScrollOverscan,
      required,
      listWidth,
      ...props
    },
    ref,
  ) => {
    const selectListId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const filterTimer = useRef<number | undefined>(undefined);
    const isMouseDownReported = useRef<boolean>();
    const isTimerCounting = useRef<boolean>();
    const isClickTriggeredBySelect = useRef<boolean>();
    const filterText = useRef<string>();
    const [textboxRef, setTextboxRef] = useState<HTMLInputElement>();
    const [isOpen, setOpenState] = useState(false);
    const [activeDescendantId, setActiveDescendantId] = useState<string>("");
    const [textValue, setTextValue] = useState<string | undefined>("");
    const [selectedValue, setSelectedValue] = useState<
      string | Record<string, unknown> | undefined
    >(value);
    const inputId = useRef(id || guid());
    const { labelId } = useInputAccessibility({
      id: inputId.current,
      label,
    });
    const focusTimer = useRef<number | undefined>(undefined);

    const childOptions = useMemo(
      () => React.Children.toArray(children),
      [children],
    ) as React.ReactElement[];

    const createCustomEvent = useCallback(
      (
        newValue?: string | Record<string, unknown>,
        selectionConfirmed = false,
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

    const selectValueStartingWithText = useCallback(
      (newFilterText: string) => {
        const previousIndex = childOptions.findIndex(
          (child) =>
            React.isValidElement(child) &&
            isExpectedOption(child, selectedValue),
        );
        const match = getNextChildByText(
          newFilterText,
          childOptions,
          previousIndex,
        );

        if (match) {
          onChange(createCustomEvent(match.props.value));
        }
      },
      [childOptions, createCustomEvent, onChange, selectedValue],
    );

    const triggerFilterChange = useCallback(
      (newCharacter: string) => {
        if (isTimerCounting.current) {
          const newVal = filterText.current + newCharacter;

          filterText.current = newVal;
          selectValueStartingWithText(newVal);
          window.clearTimeout(filterTimer.current);
        } else {
          filterText.current = newCharacter;
          selectValueStartingWithText(newCharacter);
        }

        isTimerCounting.current = true;
        window.clearTimeout(filterTimer.current);

        filterTimer.current = window.setTimeout(() => {
          isTimerCounting.current = false;
          filterText.current = "";
        }, 500);
      },
      [selectValueStartingWithText],
    );

    const handleTextboxKeydown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        onKeyDown?.(event);

        if (readOnly) return;

        if (key === " " || isNavigationKey(key)) {
          event.preventDefault();

          setOpenState((isAlreadyOpen) => {
            if (!isAlreadyOpen) onOpen?.();

            return true;
          });
        } else if (key.length === 1 && !event.metaKey && !event.ctrlKey) {
          triggerFilterChange(key);
        }
      },
      [triggerFilterChange, onKeyDown, onOpen, readOnly],
    );

    const handleGlobalClick = useCallback((event: MouseEvent) => {
      const notInContainer =
        containerRef.current &&
        !containerRef.current.contains(event.target as Node);
      const notInList =
        listboxRef.current &&
        !listboxRef.current.contains(event.target as Node);

      isMouseDownReported.current = false;

      if (notInContainer && notInList && !isClickTriggeredBySelect.current) {
        setOpenState(false);
      }

      isClickTriggeredBySelect.current = false;
    }, []);

    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    useEffect(() => {
      const matchingOption = childOptions.find((child) =>
        isExpectedOption(child, selectedValue),
      );
      let newText = "";

      if (matchingOption) {
        newText = matchingOption.props.text;
      }

      setTextValue(newText);
    }, [selectedValue, childOptions]);

    useEffect(() => {
      const clickEvent = "click";

      window.addEventListener(clickEvent, handleGlobalClick);

      return function cleanup() {
        window.removeEventListener(clickEvent, handleGlobalClick);
      };
    }, [handleGlobalClick]);

    useEffect(() => {
      return function cleanup() {
        window.clearTimeout(filterTimer.current);
        window.clearTimeout(focusTimer.current);
      };
    }, []);

    function handleTextboxClick(event: React.MouseEvent<HTMLInputElement>) {
      isMouseDownReported.current = false;

      onClick?.(event);

      setOpenState((isAlreadyOpen) => {
        if (isAlreadyOpen) {
          return false;
        }

        onOpen?.();

        return true;
      });
    }

    function handleDropdownIconClick(
      event: React.MouseEvent<HTMLInputElement>,
    ) {
      handleTextboxClick(event);
    }

    function handleListMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (isMouseDownReported.current) {
        return;
      }

      onBlur?.(event);
    }

    function handleTextboxMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      if (isClickTriggeredBySelect.current) {
        return;
      }

      onFocus?.(event);

      if (isMouseDownReported.current) {
        isMouseDownReported.current = false;

        return;
      }

      if (openOnFocus) {
        window.clearTimeout(focusTimer.current);

        // we need to use a timeout here as there is a race condition when rendered in a modal
        // whereby the select list isn't visible when the select is auto focused straight away
        focusTimer.current = window.setTimeout(() => {
          setOpenState((isAlreadyOpen) => {
            if (isAlreadyOpen) {
              return true;
            }

            onOpen?.();

            return true;
          });
        });
      }
    }

    function updateValue(
      newValue?: string | Record<string, unknown>,
      text?: string,
      selectionConfirmed?: boolean,
    ) {
      onChange?.(createCustomEvent(newValue, selectionConfirmed));
    }

    const onSelectOption: NonNullable<SelectListProps["onSelect"]> = (
      optionData,
    ) => {
      const {
        text,
        value: newValue,
        selectionType,
        id: selectedOptionId,
        selectionConfirmed,
      } = optionData;
      const isClickTriggered = selectionType === "click";

      updateValue(newValue, text, selectionConfirmed);
      setActiveDescendantId(selectedOptionId);

      if (selectionType !== "navigationKey") {
        setOpenState(false);
      }

      if (isClickTriggered) {
        isClickTriggeredBySelect.current = true;
        textboxRef?.focus();
      }
    };

    const onSelectListClose = useCallback(() => {
      setOpenState(false);
    }, []);

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
        disabled,
        readOnly,
        selectedValue,
        formattedValue: textValue,
        onClick: handleTextboxClick,
        iconOnClick: handleDropdownIconClick as (
          ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
        ) => void,
        label,
        labelId,
        onMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onKeyDown: handleTextboxKeydown,
        onBlur: handleTextboxBlur,
        tooltipPosition,
        required,
        transparent,
        ...filterOutStyledSystemSpacingProps(props),
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

    const selectList = (
      <SelectList
        ref={listboxRef}
        id={selectListId.current}
        labelId={labelId}
        anchorElement={textboxRef?.parentElement || undefined}
        onSelect={onSelectOption}
        onMouseDown={handleListMouseDown}
        onSelectListClose={onSelectListClose}
        highlightedValue={selectedValue}
        listMaxHeight={listMaxHeight}
        isLoading={isLoading}
        onListScrollBottom={onListScrollBottom}
        tableHeader={tableHeader}
        multiColumn={multiColumn}
        listPlacement={listWidth !== undefined ? placement : listPlacement}
        flipEnabled={flipEnabled}
        isOpen={isOpen}
        enableVirtualScroll={enableVirtualScroll}
        virtualScrollOverscan={virtualScrollOverscan}
        listWidth={listWidth}
      >
        {children}
      </SelectList>
    );

    const marginProps = filterStyledSystemMarginProps(props);

    return (
      <StyledSelect
        transparent={transparent}
        disabled={disabled}
        readOnly={readOnly}
        data-component="simple-select"
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...marginProps}
      >
        <div ref={containerRef}>
          <SelectTextbox
            ref={assignInput}
            ariaLabel={ariaLabel}
            aria-controls={selectListId.current}
            activeDescendantId={activeDescendantId}
            ariaLabelledby={ariaLabelledby}
            aria-describedby={ariaDescribedBy}
            isOpen={isOpen}
            value={textValue}
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelect>
    );
  },
);

export default SimpleSelect;
