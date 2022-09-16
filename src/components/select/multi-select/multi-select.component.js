import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../../style/utils";
import SelectTextbox, {
  formInputPropTypes,
} from "../select-textbox/select-textbox.component";
import guid from "../../../__internal__/utils/helpers/guid";
import withFilter from "../utils/with-filter.hoc";
import SelectList from "../select-list/select-list.component";
import {
  StyledSelectPillContainer,
  StyledSelectMultiSelect,
  StyledAccessibilityLabelContainer,
} from "./multi-select.style";
import Pill from "../../pill";
import isExpectedOption from "../utils/is-expected-option";
import isExpectedValue from "../utils/is-expected-value";
import isNavigationKey from "../utils/is-navigation-key";

const FilterableSelectList = withFilter(SelectList);

const MultiSelect = React.forwardRef(
  (
    {
      value,
      defaultValue,
      id,
      name,
      disabled,
      readOnly,
      children,
      onOpen,
      onFilterChange,
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
      "data-component": dataComponent,
      "data-element": dataElement,
      "data-role": dataRole,
      listPlacement = "bottom-start",
      listMaxHeight,
      flipEnabled = true,
      wrapPillText = true,
      ...textboxProps
    },
    inputRef
  ) => {
    const [activeDescendantId, setActiveDescendantId] = useState();
    const selectListId = useRef(guid());
    const accessibilityLabelId = useRef(guid());
    const labelId = useRef(guid());
    const containerRef = useRef();
    const listboxRef = useRef();
    const isInputFocused = useRef(false);
    const isClickTriggeredBySelect = useRef(false);
    const isMouseDownReported = useRef(false);
    const isMouseDownOnInput = useRef(false);
    const isControlled = useRef(value !== undefined);
    const [textboxRef, setTextboxRef] = useState();
    const [isOpen, setOpenState] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || []
    );
    const [highlightedValue, setHighlightedValue] = useState("");
    const [filterText, setFilterText] = useState("");
    const [placeholderOverride, setPlaceholderOverride] = useState();

    const actualValue = isControlled.current ? value : selectedValue;

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

        return customEvent;
      },
      [name, id]
    );

    /* generic value update function which can be used for both controlled and uncontrolled
     * components, both with and without onChange.
     * It accepts a function to update the value, which is assumed to be have no side effects and therefore
     * be safe to run more than once if needed. */
    const updateValue = useCallback(
      (updateFunction) => {
        const newValue = updateFunction(actualValue);
        // only call onChange if an option has been selected or deselected
        if (onChange && newValue.length !== actualValue.length) {
          onChange(createCustomEvent(newValue));
        }

        // no need to update selectedValue if the component is controlled: onChange should take care of updating the value
        if (!isControlled.current) {
          setSelectedValue(updateFunction);
        }
      },
      [createCustomEvent, onChange, actualValue]
    );

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
          const newValue = [...previousValue];
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
            return actualValue.includes(child.props.value)
              ? child.props.text
              : false;
          })
            .filter((child) => child)
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

      if (!actualValue.length) {
        return "";
      }

      return actualValue.map((singleValue, index) => {
        const matchingOption = React.Children.toArray(children).find((child) =>
          isExpectedOption(child, singleValue)
        );

        let pillProps = {};

        if (matchingOption) {
          pillProps = {
            title: matchingOption.props.text,
            fill: matchingOption.props.fill,
            borderColor: matchingOption.props.borderColor,
          };
        }

        const { title } = pillProps;
        const key = title + (matchingOption?.props.value || index);

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

    useEffect(() => {
      if (onFilterChange) {
        onFilterChange(filterText);
      }
    }, [filterText, onFilterChange]);

    function handleTextboxClick(event) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event);
      }
    }

    function handleDropdownIconClick(event) {
      isMouseDownReported.current = false;

      if (onClick) {
        onClick(event);
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

    function handleTextboxBlur(event) {
      isMouseDownOnInput.current = false;

      if (isMouseDownReported.current) {
        return;
      }

      isInputFocused.current = false;

      if (onBlur) {
        onBlur(event);
      }
    }

    function handleTextboxMouseDown(event) {
      isMouseDownReported.current = true;

      if (
        event.target.attributes["data-element"] &&
        event.target.attributes["data-element"].value === "input"
      ) {
        isMouseDownOnInput.current = true;
      }
    }

    function handleListMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxFocus(event) {
      const triggerFocus = () => onFocus(event);

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
          actualValue.findIndex((val) => isExpectedValue(val, newValue)) !== -1;

        if (!isAlreadySelected && isControlled.current && onChange) {
          onChange(createCustomEvent([...actualValue, newValue]));
        }

        textboxRef.focus();
        isMouseDownReported.current = false;

        updateValue((previousValue) => {
          if (isAlreadySelected) {
            return previousValue;
          }

          return [...previousValue, newValue];
        });
      },
      [createCustomEvent, onChange, textboxRef, actualValue, updateValue]
    );

    function onSelectListClose() {
      setOpenState(false);
      setFilterText("");
    }

    function findElementWithMatchingText(textToMatch, list) {
      return list.find((child) => {
        const { text } = child.props;

        return (
          text && text.toLowerCase().indexOf(textToMatch.toLowerCase()) !== -1
        );
      });
    }

    function assignInput(input) {
      setTextboxRef(input.current);

      if (inputRef) {
        inputRef.current = input.current;
      }
    }

    function getTextboxProps() {
      return {
        id,
        name,
        disabled,
        readOnly,
        placeholder: placeholderOverride,
        leftChildren: mapValuesToPills,
        inputRef: assignInput,
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
        ...filterOutStyledSystemSpacingProps(textboxProps),
      };
    }

    const selectList = (
      <FilterableSelectList
        ref={listboxRef}
        aria-multiselectable
        id={selectListId.current}
        labelId={labelId.current}
        anchorElement={textboxRef && textboxRef.parentElement}
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
      >
        {children}
      </FilterableSelectList>
    );

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
        {...filterStyledSystemMarginProps(textboxProps)}
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
            hasTextCursor
            isOpen={isOpen}
            labelId={labelId.current}
            textboxRef={textboxRef}
            {...getTextboxProps()}
          />
        </div>
        {selectList}
      </StyledSelectMultiSelect>
    );
  }
);

MultiSelect.propTypes = {
  ...formInputPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal: PropTypes.bool,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: PropTypes.node.isRequired,
  /** A custom callback for when the input text changes */
  onFilterChange: PropTypes.func,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** If true the Component opens on focus */
  openOnFocus: PropTypes.bool,
  /** SelectList table header, should consist of multiple th elements.
  Works only in multiColumn mode */
  tableHeader: PropTypes.node,
  /** When true component will work in multi column mode.
  Children should consist of OptionRow components in this mode */
  multiColumn: PropTypes.bool,
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage: PropTypes.string,
  /** If true the loader animation is displayed in the option list */
  isLoading: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Maximum list height - defaults to 180 */
  listMaxHeight: PropTypes.number,
  /** Placement of the select list in relation to the input element */
  listPlacement: PropTypes.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "right",
    "right-start",
    "right-end",
    "left",
    "left-start",
    "left-end",
  ]),
  /** Use the opposite list placement if the set placement does not fit */
  flipEnabled: PropTypes.bool,
  /** Wraps the pill text when it would overflow the input width */
  wrapPillText: PropTypes.bool,
};

MultiSelect.defaultProps = {
  "data-component": "multiselect",
};

export default MultiSelect;
