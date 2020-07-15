import React, {
  useEffect,
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import StyledSelectList from './select-list.style';
import updateListScrollTop from './update-list-scroll';
import getNextChildByText from '../utils/get-next-child-by-text';
import Portal from '../../portal/portal';
import { getNextIndexByKey } from '../utils/get-next-child-by-key';

const overhang = 4;

const SelectList = React.forwardRef(({
  id,
  labelId,
  children,
  onSelect,
  onSelectListClose,
  filterText,
  anchorElement,
  highlightedValue
}, listRef) => {
  const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);

  const highlightItem = useCallback((newIndex, optionList) => {
    const { text, value } = optionList[newIndex].props;

    setCurrentOptionsListIndex(newIndex);
    updateListScrollTop(newIndex, listRef.current);
    onSelect({ text, value, selectionType: 'navigationKey' });
  }, [listRef, onSelect]);

  const handleGlobalKeydown = useCallback((event) => {
    const { key } = event;
    const optionList = React.Children.toArray(children);
    const lastIndex = optionList.length - 1;

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
      const nextIndex = getNextIndexByKey(key, currentOptionsListIndex, lastIndex);

      highlightItem(nextIndex, optionList);
    }
  }, [currentOptionsListIndex, children, onSelectListClose, onSelect, highlightItem]);

  const repositionList = useCallback(() => {
    if (anchorElement) {
      const inputBoundingRect = anchorElement.getBoundingClientRect();
      const top = `${window.pageYOffset + inputBoundingRect.top + inputBoundingRect.height}px`;
      const width = `${inputBoundingRect.width + 2 * overhang}px`;
      const left = `${window.pageXOffset + inputBoundingRect.left - overhang}px`;

      listRef.current.setAttribute('style', `top: ${top}; width: ${width}; left: ${left}`);
    }
  }, [anchorElement, listRef]);

  const getIndexOfMatch = useCallback((valueToMatch) => {
    return React.Children.toArray(children).findIndex(child => child.props.value === valueToMatch);
  }, [children]);

  useEffect(() => {
    const keyboardEvent = 'keydown';

    document.addEventListener(keyboardEvent, handleGlobalKeydown);

    return function cleanup() {
      document.removeEventListener(keyboardEvent, handleGlobalKeydown);
    };
  }, [handleGlobalKeydown]);

  useEffect(() => {
    if (!filterText) {
      return;
    }

    setCurrentOptionsListIndex((previousIndex) => {
      const match = getNextChildByText(filterText, children, previousIndex);

      if (!match) {
        return previousIndex;
      }

      const indexOfMatch = getIndexOfMatch(match.props.value);

      updateListScrollTop(indexOfMatch, listRef.current);

      return indexOfMatch;
    });
  }, [children, filterText, getIndexOfMatch, listRef]);

  useEffect(() => {
    repositionList();
  }, [repositionList]);

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
    <Portal onReposition={ repositionList }>
      <StyledSelectList
        id={ id }
        aria-labelledby={ labelId }
        data-element='select-list'
        role='listbox'
        ref={ listRef }
        tabIndex='0'
      >
        { getChildrenWithListProps() }
      </StyledSelectList>
    </Portal>
  );
});

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** The Id of the label */
  labelId: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** DOM element to position the dropdown menu list relative to */
  anchorElement: PropTypes.object,
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
