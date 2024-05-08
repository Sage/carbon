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
import StyledSelect from "../select.style";
import SelectTextbox, { FormInputPropTypes } from "../select-textbox";
import SelectList from "../select-list/select-list.component";
import guid from "../../../__internal__/utils/helpers/guid";
import getNextChildByText from "../utils/get-next-child-by-text";
import isExpectedOption from "../utils/is-expected-option";
import isNavigationKey from "../utils/is-navigation-key";
import Logger from "../../../__internal__/utils/logger";
import useFormSpacing from "../../../hooks/__internal__/useFormSpacing";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";

let deprecateUncontrolledWarnTriggered = false;

type TimerId = ReturnType<typeof setTimeout>;

export interface OptionData {
  text?: string;
  value?: string | Record<string, unknown>;
  id?: string;
  selectionType: string;
  selectionConfirmed?: boolean;
}

export interface CustomSelectChangeEvent
  extends React.ChangeEvent<HTMLInputElement> {
  selectionConfirmed?: boolean;
}

export interface SimpleSelectProps
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
  /** Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
}

export const SimpleSelect = React.forwardRef(
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
      "data-component": dataComponent = "simple-select",
      "data-element": dataElement,
      "data-role": dataRole,
      listPlacement = "bottom",
      flipEnabled = true,
      enableVirtualScroll,
      virtualScrollOverscan,
      isOptional,
      required,
      ...props
    }: SimpleSelectProps,
    ref
  ) => {
    const selectListId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const filterTimer = useRef<TimerId>();
    const isMouseDownReported = useRef<boolean>();
    const isControlled = useRef(value !== undefined);
    const isTimerCounting = useRef<boolean>();
    const isClickTriggeredBySelect = useRef<boolean>();
    const filterText = useRef<string>();
    const [textboxRef, setTextboxRef] = useState<HTMLInputElement>();
    const [isOpen, setOpenState] = useState(false);
    const [activeDescendantId, setActiveDescendantId] = useState<string>();
    const [textValue, setTextValue] = useState<string | undefined>("");
    const [selectedValue, setSelectedValue] = useState<
      string | Record<string, unknown> | undefined
    >(value || defaultValue || "");
    const inputId = useRef(id || guid());
    const { labelId } = useInputAccessibility({
      id: inputId.current,
      label,
    });
    const focusTimer = useRef<null | ReturnType<typeof setTimeout>>(null);

    const componentIsUncontrolled =
      !isControlled || (!onChange && defaultValue);

    if (!deprecateUncontrolledWarnTriggered && componentIsUncontrolled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Simple Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    const childOptions = useMemo(() => React.Children.toArray(children), [
      children,
    ]) as React.ReactElement[];

    const createCustomEvent = useCallback(
      (newValue, selectionConfirmed = false) => {
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

    const selectValueStartingWithText = useCallback(
      (newFilterText) => {
        setSelectedValue((previousValue) => {
          const previousIndex = childOptions.findIndex(
            (child) =>
              React.isValidElement(child) &&
              isExpectedOption(child, previousValue)
          );
          const match = getNextChildByText(
            newFilterText,
            childOptions,
            previousIndex
          );

          if (!match) {
            return previousValue;
          }

          if (onChange) {
            onChange(createCustomEvent(match.props.value));
          }

          if (isControlled.current) {
            return previousValue;
          }

          setTextValue(match.props.text);

          return match.props.value;
        });
      },
      [childOptions, createCustomEvent, onChange]
    );

    const triggerFilterChange = useCallback(
      (newCharacter) => {
        if (isTimerCounting.current) {
          const newVal = filterText.current + newCharacter;

          filterText.current = newVal;
          selectValueStartingWithText(newVal);
          clearTimeout(filterTimer.current as TimerId);
        } else {
          filterText.current = newCharacter;
          selectValueStartingWithText(newCharacter);
        }

        isTimerCounting.current = true;
        clearTimeout(filterTimer.current as TimerId);

        filterTimer.current = setTimeout(() => {
          isTimerCounting.current = false;
          filterText.current = "";
        }, 500);
      },
      [selectValueStartingWithText]
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

        if (key === " " || isNavigationKey(key)) {
          event.preventDefault();

          setOpenState((isAlreadyOpen) => {
            if (!isAlreadyOpen && onOpen) {
              onOpen();
            }

            return true;
          });
        } else if (key.length === 1 && !event.metaKey && !event.ctrlKey) {
          triggerFilterChange(key);
        }
      },
      [triggerFilterChange, onKeyDown, onOpen, readOnly]
    );

    const handleGlobalClick = useCallback((event) => {
      const notInContainer =
        containerRef.current && !containerRef.current.contains(event.target);
      const notInList =
        listboxRef.current && !listboxRef.current.contains(event.target);

      isMouseDownReported.current = false;

      if (notInContainer && notInList && !isClickTriggeredBySelect.current) {
        setOpenState(false);
      }

      isClickTriggeredBySelect.current = false;
    }, []);

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
        setSelectedValue(value);
      }
    }, [value, onChange]);

    useEffect(() => {
      const matchingOption = childOptions.find((child) =>
        isExpectedOption(child, selectedValue)
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
        clearTimeout(filterTimer.current as TimerId);
      };
    }, []);

    function handleTextboxClick(event: React.MouseEvent<HTMLInputElement>) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event);
      }

      setOpenState((isAlreadyOpen) => {
        if (isAlreadyOpen) {
          return false;
        }

        if (onOpen) {
          onOpen();
        }

        return true;
      });
    }

    function handleDropdownIconClick(
      event: React.MouseEvent<HTMLInputElement>
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

      if (onBlur) {
        onBlur(event);
      }
    }

    function handleTextboxMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      if (isClickTriggeredBySelect.current) {
        return;
      }

      if (onFocus) {
        onFocus(event);
      }

      if (isMouseDownReported.current) {
        isMouseDownReported.current = false;

        return;
      }

      if (openOnFocus) {
        if (focusTimer.current) {
          clearTimeout(focusTimer.current);
        }

        // we need to use a timeout here as there is a race condition when rendered in a modal
        // whereby the select list isn't visible when the select is auto focused straight away
        focusTimer.current = setTimeout(() => {
          setOpenState((isAlreadyOpen) => {
            if (isAlreadyOpen) {
              return true;
            }

            if (onOpen) {
              onOpen();
            }

            return true;
          });
        });
      }
    }

    function updateValue(
      newValue?: string | Record<string, unknown>,
      text?: string,
      selectionConfirmed?: boolean
    ) {
      if (!isControlled.current) {
        setSelectedValue(newValue);
        setTextValue(text);
      }

      if (onChange) {
        onChange(createCustomEvent(newValue, selectionConfirmed));
      }
    }

    function onSelectOption(optionData: OptionData) {
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
    }

    const onSelectListClose = useCallback(() => {
      setOpenState(false);
    }, []);

    const assignInput = useCallback(
      (element) => {
        setTextboxRef(element);

        if (!ref) {
          return;
        }

        if (typeof ref === "function") {
          ref(element);
        } else {
          ref.current = element;
        }
      },
      [ref]
    );

    function getTextboxProps() {
      return {
        id: inputId.current,
        name,
        disabled,
        readOnly,
        ref: assignInput,
        selectedValue,
        formattedValue: textValue,
        onClick: handleTextboxClick,
        iconOnClick: handleDropdownIconClick as (
          ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
        ) => void,
        label,
        labelId,
        onMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onKeyDown: handleTextboxKeydown,
        onBlur: handleTextboxBlur,
        tooltipPosition,
        required,
        isOptional,
        transparent,
        ...filterOutStyledSystemSpacingProps(props),
      };
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
        loaderDataRole="simple-select-list-loader"
        listPlacement={listPlacement}
        flipEnabled={flipEnabled}
        isOpen={isOpen}
        enableVirtualScroll={enableVirtualScroll}
        virtualScrollOverscan={virtualScrollOverscan}
      >
        {children}
      </SelectList>
    );

    const marginProps = useFormSpacing(props);

    return (
      <StyledSelect
        transparent={transparent}
        disabled={disabled}
        readOnly={readOnly}
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...marginProps}
      >
        <div ref={containerRef}>
          <SelectTextbox
            ariaLabel={ariaLabel}
            aria-controls={selectListId.current}
            activeDescendantId={activeDescendantId}
            ariaLabelledby={ariaLabelledby}
            isOpen={isOpen}
            textboxRef={textboxRef}
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelect>
    );
  }
);

export default SimpleSelect;
