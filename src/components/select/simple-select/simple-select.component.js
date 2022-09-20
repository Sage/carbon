import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import invariant from "invariant";

import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../../style/utils";
import StyledSelect from "../select.style";
import SelectTextbox, {
  formInputPropTypes,
} from "../select-textbox/select-textbox.component";
import SelectList from "../select-list/select-list.component";
import guid from "../../../__internal__/utils/helpers/guid";
import getNextChildByText from "../utils/get-next-child-by-text";
import isExpectedOption from "../utils/is-expected-option";
import isNavigationKey from "../utils/is-navigation-key";

const SimpleSelect = React.forwardRef(
  (
    {
      value,
      defaultValue,
      id,
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
      disablePortal,
      isLoading,
      listMaxHeight,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      tooltipPosition,
      "data-component": dataComponent,
      "data-element": dataElement,
      "data-role": dataRole,
      listPlacement = "bottom-start",
      flipEnabled = true,
      ...props
    },
    inputRef
  ) => {
    const selectListId = useRef(guid());
    const labelId = useRef(guid());
    const containerRef = useRef();
    const listboxRef = useRef();
    const filterTimer = useRef();
    const isMouseDownReported = useRef();
    const isControlled = useRef(value !== undefined);
    const isTimerCounting = useRef();
    const isClickTriggeredBySelect = useRef();
    const filterText = useRef();
    const [textboxRef, setTextboxRef] = useState();
    const [isOpen, setOpenState] = useState(false);
    const [activeDescendantId, setActiveDescendantId] = useState();
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ""
    );

    const childOptions = useMemo(() => React.Children.toArray(children), [
      children,
    ]);

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

    const selectValueStartingWithText = useCallback(
      (newFilterText) => {
        setSelectedValue((previousValue) => {
          const previousIndex = childOptions.findIndex((child) =>
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
          clearTimeout(filterTimer.current);
        } else {
          filterText.current = newCharacter;
          selectValueStartingWithText(newCharacter);
        }

        isTimerCounting.current = true;
        clearTimeout(filterTimer.current);

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

        if (key === "Enter" || key === " " || isNavigationKey(key)) {
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
        clearTimeout(filterTimer.current);
      };
    }, []);

    function handleDropdownIconClick(event) {
      handleTextboxClick(event);
    }

    function handleListMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxBlur(event) {
      if (isMouseDownReported.current) {
        return;
      }

      if (onBlur) {
        onBlur(event);
      }
    }

    function handleTextboxClick(event) {
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

    function handleTextboxMouseDown() {
      isMouseDownReported.current = true;
    }

    function handleTextboxFocus(event) {
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
        setOpenState((isAlreadyOpen) => {
          if (isAlreadyOpen) {
            return true;
          }

          if (onOpen) {
            onOpen();
          }

          return true;
        });
      }
    }

    function onSelectOption(optionData) {
      const {
        text,
        value: newValue,
        selectionType,
        id: selectedOptionId,
      } = optionData;
      const isClickTriggered = selectionType === "click";

      updateValue(newValue, text);
      setActiveDescendantId(selectedOptionId);

      if (selectionType !== "navigationKey") {
        setOpenState(false);
      }

      if (isClickTriggered) {
        isClickTriggeredBySelect.current = true;
        textboxRef.focus();
      }
    }

    function updateValue(newValue, text) {
      if (!isControlled.current) {
        setSelectedValue(newValue);
        setTextValue(text);
      }

      if (onChange) {
        onChange(createCustomEvent(newValue));
      }
    }

    function onSelectListClose() {
      setOpenState(false);
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
        inputRef: assignInput,
        selectedValue,
        formattedValue: textValue,
        onClick: handleTextboxClick,
        iconOnClick: handleDropdownIconClick,
        onMouseDown: handleTextboxMouseDown,
        onFocus: handleTextboxFocus,
        onKeyDown: handleTextboxKeydown,
        onBlur: handleTextboxBlur,
        tooltipPosition,
        transparent,
        ...filterOutStyledSystemSpacingProps(props),
      };
    }
    const selectList = (
      <SelectList
        ref={listboxRef}
        id={selectListId.current}
        labelId={labelId.current}
        anchorElement={textboxRef && textboxRef.parentElement}
        onSelect={onSelectOption}
        onMouseDown={handleListMouseDown}
        onSelectListClose={onSelectListClose}
        highlightedValue={selectedValue}
        disablePortal={disablePortal}
        listMaxHeight={listMaxHeight}
        isLoading={isLoading}
        onListScrollBottom={onListScrollBottom}
        tableHeader={tableHeader}
        multiColumn={multiColumn}
        loaderDataRole="simple-select-list-loader"
        listPlacement={listPlacement}
        flipEnabled={flipEnabled}
        isOpen={isOpen}
      >
        {children}
      </SelectList>
    );

    return (
      <StyledSelect
        transparent={transparent}
        disabled={disabled}
        readOnly={readOnly}
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        isOpen={isOpen}
        {...filterStyledSystemMarginProps(props)}
      >
        <div ref={containerRef}>
          <SelectTextbox
            aria-controls={selectListId.current}
            activeDescendantId={activeDescendantId}
            labelId={labelId.current}
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

SimpleSelect.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  ...formInputPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal: PropTypes.bool,
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: PropTypes.node.isRequired,
  /** If true the Component opens on focus */
  openOnFocus: PropTypes.bool,
  /** If true the component input has no border and a transparent background */
  transparent: PropTypes.bool,
  /** SelectList table header, should consist of multiple th elements.
  Works only in multiColumn mode */
  tableHeader: PropTypes.node,
  /** When true component will work in multi column mode.
  Children should consist of OptionRow components in this mode */
  multiColumn: PropTypes.bool,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** If true the loader animation is displayed below the last option */
  isLoading: PropTypes.bool,
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom: PropTypes.func,
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
};

SimpleSelect.defaultProps = {
  disablePortal: false,
  "data-component": "simple-select",
};

export default SimpleSelect;
