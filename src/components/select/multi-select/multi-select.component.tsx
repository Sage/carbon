import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import type { HTMLAttributes } from "react";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../../style/utils";
import SelectTextbox, {
  FormInputPropTypes,
} from "../__internal__/select-textbox";
import { CommonTextboxProps } from "../../textbox";
import { NON_FUNCTIONING_PROPS } from "../../textbox/textbox.component";
import type { TextInputProps } from "../../textbox/__internal__/__next__/text-input.component";
import filterPropsByName from "../../../__internal__/utils/helpers/filter-props";
import guid from "../../../__internal__/utils/helpers/guid";
import { ListPlacement } from "../__internal__/select-list/select-list.component";
import NextSelectList, {
  SelectListOnSelectData,
} from "../__internal__/select-list/__next__";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import {
  StyledSelectMultiSelect,
  StyledSelectedValuesDescription,
} from "./multi-select.style";
import Pill, { PillProps } from "../../pill";
import isExpectedOption from "../__internal__/utils/is-expected-option";
import isExpectedValue from "../__internal__/utils/is-expected-value";
import isNavigationKey from "../__internal__/utils/is-navigation-key";
import useStableCallback from "../../../hooks/__internal__/useStableCallback";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import useAdaptiveSidebarModalFocus from "../../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import { CustomSelectChangeEvent } from "../simple-select";

export interface MultiSelectProps
  extends Omit<
    FormInputPropTypes,
    | "defaultValue"
    | "value"
    | "info"
    | "fieldHelp"
    | "labelHelp"
    | "labelWidth"
    | "placeholder"
    | "onChangeDeferred"
    | "deferTimeout"
    | "iconOnClick"
    | "iconOnMouseDown"
    | "iconTabIndex"
    | "inputIcon"
    | "align"
    | "leftChildren"
    | "inert"
    | "tooltipPosition"
  > {
  /** Prop to specify the aria-label attribute of the component input */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component input */
  "aria-labelledby"?: string;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** @deprecated `info` no longer has any effect in MultiSelect. */
  info?: FormInputPropTypes["info"];
  /** @deprecated `fieldHelp` no longer has any effect in MultiSelect. Use `inputHint` instead. */
  fieldHelp?: CommonTextboxProps["fieldHelp"];
  /** @deprecated `labelHelp` no longer has any effect in MultiSelect. Use `inputHint` instead. */
  labelHelp?: CommonTextboxProps["labelHelp"];
  /** @deprecated `labelWidth` no longer has any effect in MultiSelect. */
  labelWidth?: FormInputPropTypes["labelWidth"];
  /** @deprecated `placeholder` no longer has any effect in MultiSelect. */
  placeholder?: FormInputPropTypes["placeholder"];
  /** @deprecated `onChangeDeferred` is no longer called by MultiSelect. */
  onChangeDeferred?: CommonTextboxProps["onChangeDeferred"];
  /** @deprecated `deferTimeout` no longer has any effect in MultiSelect. */
  deferTimeout?: CommonTextboxProps["deferTimeout"];
  /** @deprecated `iconOnClick` is no longer called by MultiSelect. */
  iconOnClick?: CommonTextboxProps["iconOnClick"];
  /** @deprecated `iconOnMouseDown` is no longer called by MultiSelect. */
  iconOnMouseDown?: CommonTextboxProps["iconOnMouseDown"];
  /** @deprecated `iconTabIndex` no longer has any effect in MultiSelect. */
  iconTabIndex?: CommonTextboxProps["iconTabIndex"];
  /** @deprecated `inputIcon` no longer has any effect in MultiSelect. */
  inputIcon?: CommonTextboxProps["inputIcon"];
  /** @deprecated `align` no longer has any effect in MultiSelect. */
  align?: TextInputProps["align"];
  /** @deprecated `leftChildren` no longer has any effect in MultiSelect. */
  leftChildren?: TextInputProps["leftChildren"];
  /** @deprecated `inert` is no longer applied by MultiSelect. */
  inert?: HTMLAttributes<HTMLInputElement>["inert"];
  /** @deprecated `multiColumn` no longer enables multi-column options in MultiSelect. */
  multiColumn?: boolean;
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage?: string;
  /** A custom callback for when the input text changes */
  onFilterChange?: (filterText: string) => void;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** @deprecated `tableHeader` is no longer rendered by MultiSelect. */
  tableHeader?: React.ReactNode;
  /** @deprecated `transparent` no longer has any effect in MultiSelect. */
  transparent?: boolean;
  /** The selected value(s) */
  value: string[] | Record<string, unknown>[];
  /** @deprecated `tooltipPosition` no longer has any effect in MultiSelect. */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Maximum list height in pixels. Defaults to five and a half options for the selected size. */
  listMaxHeight?: number;
  /** @deprecated `listPlacement` no longer has any effect; the list is positioned automatically. */
  listPlacement?: ListPlacement;
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
  /** @deprecated `isRequired` no longer has any effect in MultiSelect. Use `required` instead. */
  isRequired?: boolean;
  /** Specify a callback triggered on change */
  onChange: (
    ev: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** @deprecated `listWidth` no longer has any effect in MultiSelect. */
  listWidth?: number;
}

const MULTI_SELECT_NON_FUNCTIONING_PROPS = new Set([
  ...NON_FUNCTIONING_PROPS,
  "align",
  "onChangeDeferred",
  "deferTimeout",
  "iconOnClick",
  "iconOnMouseDown",
  "iconTabIndex",
  "inputIcon",
  "inert",
  "multiColumn",
  "tableHeader",
  "transparent",
  "isRequired",
  "listPlacement",
  "listWidth",
  "fieldHelp",
  "labelHelp",
  "placeholder",
  "leftChildren",
]);

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      value,
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
      isLoading,
      onListScrollBottom,
      size = "medium",
      "data-element": dataElement,
      "data-role": dataRole,
      listMaxHeight,
      flipEnabled = true,
      wrapPillText = true,
      enableVirtualScroll,
      virtualScrollOverscan,
      required,
      ...textboxProps
    },
    ref,
  ) => {
    const selectListId = useRef(guid());
    const selectedValuesDescriptionId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const isInputFocused = useRef(false);
    const isMouseDownReported = useRef(false);
    const isMouseDownOnInput = useRef(false);
    const isOpenedByFocus = useRef(false);
    const [textboxRef, setTextboxRef] = useState<HTMLInputElement>();
    const [isOpen, setOpenState] = useState(false);
    const [pillButtonsInTabOrder, setPillButtonsInTabOrder] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [filterText, setFilterText] = useState("");
    const inputId = useRef(id || guid());
    const { labelId } = useInputAccessibility({
      id: inputId.current,
      label,
    });
    const focusTimer = useRef<null | ReturnType<typeof setTimeout>>(null);
    const setOpen = useCallback(() => {
      setOpenState((isAlreadyOpen) => {
        if (!isAlreadyOpen && onOpen) {
          onOpen();
        }

        return true;
      });
    }, [onOpen]);

    const createCustomEvent = useCallback(
      (
        newValue?: (string | Record<string, unknown>)[],
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

        return customEvent as unknown as CustomSelectChangeEvent;
      },
      [name, id],
    );

    /* generic value update function
     * It accepts a function to update the value, which is assumed to be have no side effects and therefore
     * be safe to run more than once if needed. */
    const updateValue = useCallback(
      (
        updateFunction: (
          previousValue: (string | Record<string, unknown>)[],
        ) => (string | Record<string, unknown>)[],
        selectionConfirmed?: boolean,
      ) => {
        // filters out any empty string values so it is not returned to the onChange
        const newValue = updateFunction(
          value as (string | Record<string, unknown>)[],
        ).filter((v) => v !== "");

        // only call onChange if an option has been selected or deselected
        if (newValue.length !== value?.length) {
          onChange(createCustomEvent(newValue, selectionConfirmed));
        }
      },
      [createCustomEvent, onChange, value],
    );

    const handleTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setFilterText(newValue);
        setTextValue(newValue);
        setOpen();
      },
      [setOpen],
    );

    const removeSelectedValue = useCallback(
      (index: number) => {
        updateValue((previousValue) => {
          if (!previousValue.length) {
            return previousValue;
          }
          const newValue = previousValue.slice(); // spreading does not work but slice does - see https://github.com/microsoft/TypeScript/issues/53670
          newValue.splice(index, 1);

          return newValue;
        }, true);
      },
      [updateValue],
    );

    const onSelectListClose = useCallback(() => {
      setOpenState(false);
      setFilterText("");
      setTextValue("");
    }, []);

    const handleTextboxKeydown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        const isDeleteKey = key === "Backspace" || key === "Delete";

        if (onKeyDown) {
          onKeyDown(event);
        }

        if (key === "Tab" && !event.shiftKey && !event.defaultPrevented) {
          const firstPillButton =
            containerRef.current?.querySelector<HTMLButtonElement>(
              '[data-element="close"]',
            );
          if (firstPillButton) {
            event.preventDefault();
            if (isOpen) {
              event.stopPropagation();
              onSelectListClose();
            }
            setPillButtonsInTabOrder(true);
            firstPillButton.focus();
          }
          return;
        }

        if (readOnly) {
          return;
        }

        if (
          !event.defaultPrevented &&
          (isNavigationKey(key) || (key === "Enter" && !isOpen))
        ) {
          event.preventDefault();
          setOpen();
        }

        if (isDeleteKey && (filterText === "" || textValue === "")) {
          removeSelectedValue(-1);
        }
      },
      [
        onKeyDown,
        readOnly,
        isOpen,
        filterText,
        textValue,
        setOpen,
        removeSelectedValue,
        onSelectListClose,
      ],
    );

    const selectedOptions = useMemo(() => {
      const options = React.Children.toArray(children);
      return (value ?? []).map((singleValue) =>
        options.find(
          (child) =>
            React.isValidElement(child) && isExpectedOption(child, singleValue),
        ),
      );
    }, [children, value]);

    const selectedValuesDescription = selectedOptions
      .map((option) =>
        React.isValidElement<{ text?: string }>(option)
          ? option.props.text
          : undefined,
      )
      .filter((text): text is string => typeof text === "string" && !!text)
      .join(", ");

    const mapValuesToPills = useMemo(() => {
      const canDelete = !disabled && !readOnly;
      let matchingOptionValue: string;

      if (!selectedOptions.length) {
        return "";
      }

      return selectedOptions.map((matchingOption, index) => {
        let pillProps: Omit<PillProps, "children"> = {};

        if (!matchingOption) {
          return null;
        }

        /* istanbul ignore else */
        if (React.isValidElement(matchingOption)) {
          matchingOptionValue =
            matchingOption?.props.value?.value !== undefined
              ? matchingOption?.props.value?.value
              : matchingOption?.props.value;

          pillProps = {
            title: matchingOption.props.text,
            borderColor: matchingOption.props.borderColor,
            variant: matchingOption.props.variant,
            fill: matchingOption.props.fill,
          };
        }

        const title = pillProps.title || /* istanbul ignore next */ "";
        const key =
          title + matchingOptionValue || /* istanbul ignore next */ index;

        return (
          <Pill
            key={key}
            onDelete={
              canDelete
                ? () => {
                    setPillButtonsInTabOrder(false);
                    removeSelectedValue(index);
                  }
                : undefined
            }
            removeButtonTabIndex={pillButtonsInTabOrder ? 0 : -1}
            wrapText={wrapPillText}
            {...pillProps}
          >
            <span data-element="multi-select-pill-text">{title}</span>
          </Pill>
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      disabled,
      readOnly,
      selectedOptions,
      wrapPillText,
      pillButtonsInTabOrder,
      textboxRef,
    ]);

    const onFilterChange = useStableCallback(
      onFilterChangeProp as (filterTextArg: unknown) => void,
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

    function handleTextboxClick(event: React.MouseEvent<HTMLElement>) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event as React.MouseEvent<HTMLInputElement>);
      }

      /* istanbul ignore else */
      if (!openOnFocus || (openOnFocus && !isOpenedByFocus.current)) {
        if (isOpen) {
          setFilterText("");
          setOpenState(false);
          return;
        }

        onOpen?.();

        setOpenState(true);
      } else {
        // This is tested in Playwright.
        // This line of code is triggered when a user initially clicks on the input when `openOnFocus` is true.
        isOpenedByFocus.current = false;
      }
    }

    function handleDropdownIconClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
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

    function handleFieldClick(event: React.MouseEvent<HTMLDivElement>) {
      const target = event.target as HTMLElement;

      if (
        disabled ||
        readOnly ||
        !containerRef.current?.contains(target) ||
        target.closest('input, button, [data-element="input-icon-toggle"]')
      ) {
        return;
      }

      textboxRef?.focus();
      handleTextboxClick(event);
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

    useAdaptiveSidebarModalFocus(() => setOpenState(false));

    function handleTextboxMouseDown(event: React.MouseEvent<HTMLElement>) {
      isMouseDownReported.current = true;

      const targetElement = event.target as HTMLElement;

      // prevent text selection on rapid clicks of non-input elements (e.g. the dropdown icon)
      if (targetElement.dataset?.element !== "input") {
        event.preventDefault();
      }

      if (targetElement.dataset.element === "input") {
        isMouseDownOnInput.current = true;
      }
    }

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      const triggerFocus = () => onFocus?.(event);

      if (isMouseDownReported.current && !isMouseDownOnInput.current) {
        if (onFocus && !isInputFocused.current) {
          triggerFocus();
          isInputFocused.current = true;
        }
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
            if (onFocus && !isInputFocused.current) {
              triggerFocus();
              isInputFocused.current = true;
            }

            isOpenedByFocus.current = isMouseDownOnInput.current;

            return true;
          });
        });
      } else if (onFocus && !isInputFocused.current) {
        triggerFocus();
        isInputFocused.current = true;
      }
    }

    const onSelectOption = useCallback(
      (optionData: SelectListOnSelectData) => {
        const { value: newValue } = optionData;
        setTextValue("");
        setFilterText("");

        textboxRef?.focus();
        isMouseDownReported.current = false;

        updateValue((previousValue) => {
          const selectedIndex = previousValue.findIndex((val) =>
            isExpectedValue(val, newValue),
          );
          if (selectedIndex !== -1) {
            return previousValue.filter((_, index) => index !== selectedIndex);
          }

          return [...previousValue, newValue];
        }, true);
      },
      [textboxRef, updateValue],
    );

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
        label,
        readOnly,
        leftChildren: mapValuesToPills,
        formattedValue: textValue,
        selectedValue: value,
        onClick: handleTextboxClick,
        onMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onBlur: handleTextboxBlur,
        onIconClick: handleDropdownIconClick,
        onKeyDown: handleTextboxKeydown,
        onChange: handleTextboxChange,
        size,
        required,
        ...filterPropsByName(
          filterOutStyledSystemSpacingProps(textboxProps) as Record<
            string,
            unknown
          >,
          MULTI_SELECT_NON_FUNCTIONING_PROPS,
        ),
        "data-component": undefined,
        tabIndex: pillButtonsInTabOrder ? -1 : textboxProps.tabIndex,
      };
    }

    const marginProps = filterStyledSystemMarginProps(textboxProps);

    return (
      <StyledSelectMultiSelect
        $labelInline={textboxProps.labelInline}
        $size={size}
        onClick={handleFieldClick}
        onKeyDownCapture={(event) => {
          if (
            event.key === "Tab" &&
            event.shiftKey &&
            event.target ===
              containerRef.current?.querySelector('[data-element="close"]')
          ) {
            event.preventDefault();
            setPillButtonsInTabOrder(false);
            textboxRef?.focus();
          }
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPillButtonsInTabOrder(false);
          }
        }}
        disabled={disabled}
        readOnly={readOnly}
        hasTextCursor
        size={size}
        data-component="multiselect"
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        className="multi-select"
        {...marginProps}
      >
        <NextSelectList
          open={isOpen}
          id={selectListId.current}
          labelId={labelId}
          size={size}
          maxHeight={
            listMaxHeight !== undefined ? `${listMaxHeight}px` : undefined
          }
          selectedValues={value}
          filterText={filterText.trim()}
          noResultsMessage={noResultsMessage}
          controlReference={containerRef}
          controlWrapperStyle={{ width: "100%" }}
          enableVirtualScroll={enableVirtualScroll}
          virtualScrollOverscan={virtualScrollOverscan}
          flipEnabled={flipEnabled}
          onListScrollBottom={onListScrollBottom}
          isLoading={isLoading}
          onSelect={onSelectOption}
          onClose={onSelectListClose}
          popoverControl={(controlRef, controlProps) => (
            <>
              {selectedValuesDescription && (
                <StyledSelectedValuesDescription
                  id={selectedValuesDescriptionId.current}
                >
                  {selectedValuesDescription}
                </StyledSelectedValuesDescription>
              )}
              <SelectTextbox
                ref={combineRefs(assignInput, controlRef)}
                containerRef={containerRef}
                ariaLabel={ariaLabel}
                ariaLabelledby={ariaLabelledby}
                labelId={labelId}
                isOpen={isOpen}
                value={textValue}
                selectType="multi"
                {...getTextboxProps()}
                {...controlProps}
                aria-describedby={
                  [
                    selectedValuesDescription &&
                      selectedValuesDescriptionId.current,
                    textboxProps["aria-describedby"],
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
                role={readOnly ? undefined : controlProps.role}
                aria-expanded={
                  readOnly ? undefined : controlProps["aria-expanded"]
                }
              />
            </>
          )}
        >
          {children}
        </NextSelectList>
      </StyledSelectMultiSelect>
    );
  },
);

export default MultiSelect;
