import React, {
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import StyledSelectList from './select-list.style';
import updateListScrollTop from './update-list-scroll';
import getNextChildByText from '../utils/get-next-child-by-text';
import { getNextIndexByKey } from '../utils/get-next-child-by-key';

const SelectList = React.forwardRef(({
  id,
  labelId,
  children,
  onSelect,
  onSelectListClose,
  filterText,
  highlightedValue,
  ...listProps
}, listRef) => {
  const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);
  const lastFilter = useRef('');

  const getIndexOfMatch = useCallback((valueToMatch) => {
    return React.Children.toArray(children).findIndex(child => child.props.value === valueToMatch);
  }, [children]);

  const highlightNextItem = useCallback((key, optionList) => {
    const lastIndex = optionList.length - 1;
    let nextIndex;

    if (highlightedValue) {
      const indexOfHighlighted = getIndexOfMatch(highlightedValue);

      nextIndex = getNextIndexByKey(key, indexOfHighlighted, lastIndex);
    } else {
      nextIndex = getNextIndexByKey(key, currentOptionsListIndex, lastIndex);
    }
    const { text, value } = optionList[nextIndex].props;

    setCurrentOptionsListIndex(nextIndex);
    updateListScrollTop(nextIndex, listRef.current);
    onSelect({ text, value, selectionType: 'navigationKey' });
  }, [currentOptionsListIndex, getIndexOfMatch, highlightedValue, listRef, onSelect]);

  const handleGlobalKeydown = useCallback((event) => {
    const { key } = event;
    const optionList = React.Children.toArray(children);

    if (key === 'Tab' || key === 'Escape') {
      onSelectListClose();
    } else if (key === 'Enter') {
      const currentOption = optionList[currentOptionsListIndex];

      if (!currentOption) {
        onSelectListClose();

        return;
      }

      const { text, value } = currentOption.props;

      onSelect({ text, value, selectionType: 'enterKey' });
    } else if (isNavigationKey(key)) {
      highlightNextItem(key, optionList);
    }
  }, [children, onSelectListClose, currentOptionsListIndex, onSelect, highlightNextItem]);

  useEffect(() => {
    const keyboardEvent = 'keydown';

    document.addEventListener(keyboardEvent, handleGlobalKeydown);

    return function cleanup() {
      document.removeEventListener(keyboardEvent, handleGlobalKeydown);
    };
  }, [handleGlobalKeydown]);

  useEffect(() => {
    if (!filterText || filterText === lastFilter.current) {
      lastFilter.current = filterText;

      return;
    }

    lastFilter.current = filterText;

    setCurrentOptionsListIndex((previousIndex) => {
      const match = getNextChildByText(filterText, children, previousIndex);

      if (!match) {
        return previousIndex;
      }

      const indexOfMatch = getIndexOfMatch(match.props.value);

      updateListScrollTop(indexOfMatch, listRef.current);

      return indexOfMatch;
    });
  }, [children, filterText, getIndexOfMatch, lastFilter, listRef]);

  useEffect(() => {
    if (!highlightedValue) {
      return;
    }

    const indexOfMatch = getIndexOfMatch(highlightedValue);

    setCurrentOptionsListIndex(indexOfMatch);
    updateListScrollTop(indexOfMatch, listRef.current);
  }, [getIndexOfMatch, highlightedValue, listRef]);

  function getChildrenWithListProps() {
    return React.Children.map(children, (child, index) => {
      const newProps = {
        onSelect: handleSelect,
        isHighlighted: currentOptionsListIndex === index
      };

      return React.cloneElement(child, newProps);
    });
  }

  function handleSelect(optionData) {
    onSelect({ ...optionData, selectionType: 'click' });
  }

  function isNavigationKey(keyEvent) {
    return keyEvent === 'ArrowDown' || keyEvent === 'ArrowUp'
    || keyEvent === 'Home' || keyEvent === 'End';
  }

  return (
    <StyledSelectList
      id={ id }
      aria-labelledby={ labelId }
      data-element='select-list'
      role='listbox'
      ref={ listRef }
      tabIndex='0'
      { ...listProps }
    >
      { getChildrenWithListProps() }
    </StyledSelectList>
  );
});

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** The Id of the label */
  labelId: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** A callback for when a child is selected */
  onSelect: PropTypes.func.isRequired,
  /** A callback for when the list should be closed */
  onSelectListClose: PropTypes.func.isRequired,
  /** Text value to highlight an option */
  filterText: PropTypes.string,
  /** Value of option to be highlighted on component render */
  highlightedValue: PropTypes.string
};

export default SelectList;
