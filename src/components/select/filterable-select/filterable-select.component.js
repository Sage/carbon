import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import SelectTextbox, {
  formInputPropTypes,
} from "../select-textbox/select-textbox.component";
import guid from "../../../utils/helpers/guid";
import withFilter from "../utils/with-filter.hoc";
import StyledSelect from "../select.style";
import SelectList from "../select-list/select-list.component";
import isExpectedOption from "../utils/is-expected-option";

const FilterableSelectList = withFilter(SelectList);

const FilterableSelect = React.forwardRef(
  (
    {
      value,
      defaultValue,
      id,
      name,
      children,
      onOpen,
      onChange,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      openOnFocus,
      noResultsMessage,
      disablePortal,
      listActionButton,
      onListAction,
      isLoading,
      disabled,
      readOnly,
      onListScrollBottom,
      tableHeader,
      multiColumn,
      ...textboxProps
    },
    inputRef
  ) => {
    const selectListId = useRef(guid());
    const labelId = useRef(guid());
    const containerRef = useRef();
    const listboxRef = useRef();
    const isControlled = useRef(value !== undefined);
    const isMouseDownReported = useRef(false);
    const isInputFocused = useRef(false);
    const isMouseDownOnInput = useRef(false);
    const [textboxRef, setTextboxRef] = useState();
    const [isOpen, setOpen] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [highlightedValue, setHighlightedValue] = useState("");
    const [filterText, setFilterText] = useState("");

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

    const updateValues = useCallback(
      (newFilterText, isDeleteEvent) => {
        setSelectedValue((previousValue) => {
          const match = findElementWithMatchingText(newFilterText, children);
          const isFilterCleared = isDeleteEvent && newFilterText === "";

          if (!match || isFilterCleared) {
            setTextValue(newFilterText);

            return "";
          }

          if (isDeleteEvent) {
            setTextValue(newFilterText);

            return match.props.value;
          }

          if (onChange) {
            onChange(createCustomEvent(match.props.value));
          }

          if (
            match.props.text
              .toLowerCase()
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
      [children, createCustomEvent, onChange]
    );

    const setMatchingText = useCallback(
      (newValue, isClosing) => {
        const matchingOption = React.Children.toArray(children).find((child) =>
          isExpectedOption(child, newValue)
        );

        if (!matchingOption || matchingOption.props.text === undefined) {
          setTextValue("");
        } else if (
          isClosing ||
          matchingOption.props.text
            .toLowerCase()
            .startsWith(filterText.toLowerCase())
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
            previousFilterText.length === textValue.length - 1 &&
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

    const handleGlobalClick = useCallback(
      (event) => {
        const notInContainer =
          containerRef.current && !containerRef.current.contains(event.target);
        const notInList =
          listboxRef.current && !listboxRef.current.contains(event.target);

        isMouseDownReported.current = false;

        if (notInContainer && notInList) {
          setMatchingText(selectedValue, true);
          setOpen(false);
        }
      },
      [setMatchingText, selectedValue]
    );

    useEffect(() => {
      const newValue = value || defaultValue;
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

      setSelectedValue((prevValue) => {
        if (isControlled.current && prevValue !== newValue) {
          setMatchingText(newValue);
        }

        return newValue;
      });

      setHighlightedValue(newValue);
      // prevent value update on filter change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, defaultValue, onChange, children]);

    useEffect(() => {
      if (!isOpen) {
        setFilterText("");
      } else if (onOpen) {
        onOpen();
      }
    }, [isOpen, onOpen]);

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
      setMatchingText(value || defaultValue);
      // update text value only when children are changing
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, children]);

    useEffect(() => {
      const clickEvent = "click";

      window.addEventListener(clickEvent, handleGlobalClick);

      return function cleanup() {
        window.removeEventListener(clickEvent, handleGlobalClick);
      };
    }, [handleGlobalClick]);

    useEffect(() => {
      const textStartsWithFilter = textValue
        .toLowerCase()
        .startsWith(filterText.toLowerCase());
      const isTextboxActive = !disabled && !readOnly;

      if (
        isTextboxActive &&
        textboxRef &&
        textValue.length > filterText.length &&
        textStartsWithFilter
      ) {
        textboxRef.selectionStart = filterText.length;
      }
    }, [textValue, filterText, textboxRef, disabled, readOnly]);

    const onSelectOption = useCallback(
      (optionData) => {
        const { text, value: newValue, selectionType } = optionData;

        if (selectionType === "tab") {
          setOpen(false);
          textboxRef.focus();

          return;
        }

        if (!isControlled.current) {
          setSelectedValue(newValue);
          setHighlightedValue(newValue);
        }

        setTextValue(text);

        if (onChange) {
          onChange(createCustomEvent(newValue));
        }

        if (selectionType !== "navigationKey") {
          setOpen(false);
          textboxRef.focus();
          textboxRef.select();
        }
      },
      [createCustomEvent, onChange, textboxRef]
    );

    const onSelectListClose = useCallback(() => {
      setOpen(false);
      setMatchingText(selectedValue, true);
    }, [selectedValue, setMatchingText]);

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

      setOpen((isAlreadyOpen) => {
        return !isAlreadyOpen;
      });
    }

    function handleTextboxFocus(event) {
      const triggerFocus = () => onFocus(event);

      if (openOnFocus) {
        setOpen((isAlreadyOpen) => {
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

    function handleTextboxBlur(event) {
      isMouseDownOnInput.current = false;

      if (isMouseDownReported.current) {
        return;
      }

      isInputFocused.current = false;
      setOpen(false);

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

    function findElementWithMatchingText(textToMatch, list) {
      return list.find((child) => {
        const { text } = child.props;

        return (
          text && text.toLowerCase().indexOf(textToMatch.toLowerCase()) !== -1
        );
      });
    }

    function handleOnListAction() {
      setOpen(false);
      onListAction();
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
        onFocus: handleTextboxFocus,
        onBlur: handleTextboxBlur,
        onKeyDown: handleTextboxKeydown,
        onChange: handleTextboxChange,
        onMouseDown: handleTextboxMouseDown,
        ...textboxProps,
      };
    }

    function isNavigationKey(key) {
      return (
        key === "ArrowDown" ||
        key === "ArrowUp" ||
        key === "Home" ||
        key === "End"
      );
    }
    const selectList = (
      <FilterableSelectList
        ref={listboxRef}
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
        listActionButton={listActionButton}
        onListAction={handleOnListAction}
        isLoading={isLoading}
        readOnly={readOnly}
        onListScrollBottom={onListScrollBottom}
        tableHeader={tableHeader}
        multiColumn={multiColumn}
      >
        {children}
      </FilterableSelectList>
    );

    return (
      <StyledSelect
        data-component="filterable-select"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        ref={containerRef}
        hasTextCursor
        readOnly={readOnly}
        disabled={disabled}
        {...textboxProps}
      >
        <SelectTextbox
          aria-controls={isOpen ? selectListId.current : ""}
          type="text"
          labelId={labelId.current}
          positionedChildren={disablePortal && isOpen && selectList}
          {...getTextboxProps()}
        />
        {!disablePortal && isOpen && selectList}
      </StyledSelect>
    );
  }
);

FilterableSelect.propTypes = {
  ...formInputPropTypes,
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal: PropTypes.bool,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: PropTypes.node.isRequired,
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
  /** True for default text button or a Button Component to be rendered */
  listActionButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** A callback for when the Action Button is triggered */
  onListAction: PropTypes.func,
  /** If true the loader animation is displayed in the option list */
  isLoading: PropTypes.bool,
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom: PropTypes.func,
};

export default FilterableSelect;
