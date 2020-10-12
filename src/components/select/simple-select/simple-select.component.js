import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import propTypes from '@styled-system/prop-types';
import invariant from 'invariant';

import StyledSimpleSelect from './simple-select.style';
import SelectTextbox, { formInputPropTypes } from '../select-textbox/select-textbox.component';
import SelectList from '../select-list/select-list.component';
import guid from '../../../utils/helpers/guid';
import getNextChildByText from '../utils/get-next-child-by-text';
import { getNextChildByKey } from '../utils/get-next-child-by-key';

const SimpleSelect = React.forwardRef(({
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
  ...props
}, inputRef) => {
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
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const createCustomEvent = useCallback((newValue) => {
    const customEvent = {
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: newValue
      }
    };

    return customEvent;
  }, [name, id]);

  const setMatchingText = useCallback((newValue) => {
    const matchingOption = React.Children.toArray(children).find(option => (option.props.value === newValue));

    if (matchingOption) {
      setTextValue(matchingOption.props.text);
    }
  }, [children]);

  const selectValueStartingWithText = useCallback((newFilterText) => {
    setSelectedValue((previousValue) => {
      const previousIndex = React.Children.toArray(children).findIndex((child) => {
        return child.props.value === previousValue;
      });
      const match = getNextChildByText(newFilterText, children, previousIndex);

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
  }, [children, createCustomEvent, onChange]);

  const handleTextboxChange = useCallback((event) => {
    const newValue = event.target.value;
    const newCharacter = newValue.slice(-1);
    const isDeleteEvent = event.nativeEvent.inputType === 'deleteContentBackward'
    || event.nativeEvent.inputType === 'deleteContentForward'
    || event.nativeEvent.inputType === 'delete';

    if (isDeleteEvent) {
      return;
    }

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
      filterText.current = '';
    }, 500);
  }, [selectValueStartingWithText]);

  const handleTextboxKeydown = useCallback(((event) => {
    const { key } = event;

    if (onKeyDown) {
      onKeyDown(event);
    }

    if (!event.defaultPrevented && isNavigationKey(event.key)) {
      setSelectedValue((previousSelectedValue) => {
        const nextElement = getNextChildByKey(key, children, previousSelectedValue);

        setTextValue(nextElement.props.text);

        return nextElement.props.value;
      });
    }

    if (key === 'Enter' || key === ' ' || isNavigationKey(key)) {
      event.preventDefault();

      setOpenState((isAlreadyOpen) => {
        if (!isAlreadyOpen && onOpen) {
          onOpen();
        }

        return true;
      });
    }
  }), [children, onKeyDown, onOpen]);

  const handleGlobalClick = useCallback((event) => {
    const notInContainer = containerRef.current && !containerRef.current.contains(event.target);

    if (notInContainer && !isClickTriggeredBySelect.current) {
      setMatchingText(selectedValue);
      setOpenState(false);
      filterText.current = '';
    }

    isClickTriggeredBySelect.current = false;
  }, [setMatchingText, selectedValue]);

  useEffect(() => {
    const newValue = value || defaultValue;
    const modeSwitchedMessage = 'Input elements should not switch from uncontrolled to controlled (or vice versa). '
    + 'Decide between using a controlled or uncontrolled input element for the lifetime of the component';
    const onChageMissingMessage = 'onChange prop required when using a controlled input element';

    invariant(isControlled.current === (value !== undefined), modeSwitchedMessage);
    invariant(!isControlled.current || (isControlled.current && onChange), onChageMissingMessage);

    setSelectedValue(newValue);
    setMatchingText(newValue);
  }, [value, defaultValue, setMatchingText, onChange]);

  useEffect(() => {
    const clickEvent = 'click';

    document.addEventListener(clickEvent, handleGlobalClick);

    return function cleanup() {
      document.removeEventListener(clickEvent, handleGlobalClick);
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

  function handleMouseDown() {
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
    const { text, value: newValue, selectionType } = optionData;
    const isClickTriggered = selectionType === 'click';

    updateValue(newValue, text);

    if (selectionType !== 'navigationKey') {
      setOpenState(false);
      filterText.current = text;
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
    filterText.current = '';
    setMatchingText(selectedValue);
  }

  function isNavigationKey(key) {
    return key === 'ArrowDown' || key === 'ArrowUp'
    || key === 'Home' || key === 'End';
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
      onMouseDown: handleMouseDown,
      onFocus: handleTextboxFocus,
      onKeyDown: handleTextboxKeydown,
      onChange: handleTextboxChange,
      onBlur,
      ...props
    };
  }

  return (
    <StyledSimpleSelect
      data-component='simple-select'
      transparent={ transparent }
      disabled={ disabled }
      readOnly={ readOnly }
      aria-expanded={ isOpen }
      aria-haspopup='listbox'
      ref={ containerRef }
      { ...props }
    >
      <SelectTextbox
        aria-controls={ isOpen ? selectListId.current : '' }
        type='select'
        labelId={ labelId.current }
        { ...getTextboxProps() }
      />
      { isOpen && (
        <SelectList
          ref={ listboxRef }
          id={ selectListId.current }
          labelId={ labelId.current }
          anchorElement={ textboxRef.parentElement }
          onSelect={ onSelectOption }
          onSelectListClose={ onSelectListClose }
          highlightedValue={ selectedValue }
        >
          { children }
        </SelectList>
      ) }
    </StyledSimpleSelect>
  );
});

SimpleSelect.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  ...formInputPropTypes,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Child components (such as Option) for the SelectList */
  children: PropTypes.node.isRequired,
  /** If true the Component opens on focus */
  openOnFocus: PropTypes.bool,
  /** If true the component input has no border and a transparent background */
  transparent: PropTypes.bool,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func
};

export default SimpleSelect;
