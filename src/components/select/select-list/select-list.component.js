import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import {
  StyledSelectList,
  StyledSelectLoaderContainer,
} from "./select-list.style";
import updateListScrollTop from "./update-list-scroll";
import getNextChildByText from "../utils/get-next-child-by-text";
import Portal from "../../portal/portal";
import getNextIndexByKey from "../utils/get-next-index-by-key";
import ListActionButton from "../list-action-button/list-action-button.component";
import StyledSelectListContainer from "./select-list-container.style";
import Loader from "../../loader";
import Option from "../option/option.component";

const overhang = 4;

const SelectList = React.forwardRef(
  (
    {
      listActionButton,
      id,
      labelId,
      children,
      onSelect,
      onSelectListClose,
      filterText,
      anchorElement,
      highlightedValue,
      repositionTrigger,
      disablePortal,
      onListAction,
      isLoading,
      onListScrollBottom,
      ...listProps
    },
    listContainerRef
  ) => {
    const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);
    const [listHeight, setListHeight] = useState(0);
    const lastFilter = useRef("");
    const listRef = useRef();
    const listActionButtonRef = useRef();

    const childrenList = useMemo(() => React.Children.toArray(children), [
      children,
    ]);

    const lastOptionIndex = useMemo(() => {
      let lastIndex = 0;

      childrenList.forEach((element, index) => {
        if (element.type === Option) {
          lastIndex = index;
        }
      });

      return lastIndex;
    }, [childrenList]);

    const getNextHighlightableItemIndex = useCallback(
      (key, indexOfHighlighted) => {
        const lastIndex = lastOptionIndex;
        let nextIndex = getNextIndexByKey(
          key,
          indexOfHighlighted,
          lastIndex,
          isLoading
        );
        const nextElement = childrenList[nextIndex];

        if (nextElement && nextElement.type !== Option) {
          nextIndex = getNextHighlightableItemIndex(key, nextIndex, lastIndex);
        }

        return nextIndex;
      },
      [childrenList, lastOptionIndex, isLoading]
    );

    const getIndexOfMatch = useCallback(
      (valueToMatch) => {
        return childrenList.findIndex(
          (child) => child.props.value === valueToMatch
        );
      },
      [childrenList]
    );

    const highlightNextItem = useCallback(
      (key) => {
        let currentIndex = currentOptionsListIndex;

        if (highlightedValue) {
          const indexOfHighlighted = getIndexOfMatch(highlightedValue);

          currentIndex = indexOfHighlighted;
        }

        const nextIndex = getNextHighlightableItemIndex(key, currentIndex);

        if (currentIndex === nextIndex) {
          return;
        }

        const { text, value } = childrenList[nextIndex].props;

        onSelect({ text, value, selectionType: "navigationKey" });
      },
      [
        childrenList,
        currentOptionsListIndex,
        getIndexOfMatch,
        getNextHighlightableItemIndex,
        highlightedValue,
        onSelect,
      ]
    );

    const handleActionButtonTab = useCallback(
      (event, isActionButtonFocused) => {
        if (isActionButtonFocused) {
          onSelect({ selectionType: "tab" });
        } else {
          event.preventDefault();
          listActionButtonRef.current.focus();
        }
      },
      [onSelect]
    );

    const focusOnAnchor = useCallback(() => {
      if (anchorElement) {
        anchorElement.getElementsByTagName("input")[0].focus();
      }
    }, [anchorElement]);

    const handleGlobalKeydown = useCallback(
      (event) => {
        const { key } = event;
        const isActionButtonFocused =
          document.activeElement === listActionButtonRef.current;

        if (key === "Tab" && listActionButton) {
          handleActionButtonTab(event, isActionButtonFocused);
        } else if (key === "Tab" || key === "Escape") {
          onSelectListClose();
        } else if (key === "Enter" && !isActionButtonFocused) {
          const currentOption = childrenList[currentOptionsListIndex];

          if (!currentOption) {
            onSelectListClose();

            return;
          }

          const { text, value } = currentOption.props;

          onSelect({ text, value, selectionType: "enterKey" });
        } else if (isNavigationKey(key)) {
          focusOnAnchor();
          highlightNextItem(key);
        }
      },
      [
        childrenList,
        listActionButton,
        handleActionButtonTab,
        onSelectListClose,
        currentOptionsListIndex,
        onSelect,
        highlightNextItem,
        focusOnAnchor,
      ]
    );

    const repositionList = useCallback(() => {
      if (anchorElement) {
        const inputBoundingRect = anchorElement.getBoundingClientRect();

        const top = `${
          window.pageYOffset + inputBoundingRect.top + inputBoundingRect.height
        }px`;
        const width = `${inputBoundingRect.width + 2 * overhang}px`;
        const left = `${
          window.pageXOffset + inputBoundingRect.left - overhang
        }px`;

        listContainerRef.current.setAttribute(
          "style",
          `top: ${top}; width: ${width}; left: ${left}`
        );
      }
    }, [anchorElement, listContainerRef]);

    const handleListScroll = useCallback(
      (event) => {
        const element = event.target;

        if (
          onListScrollBottom &&
          element.scrollHeight - element.scrollTop === element.clientHeight
        ) {
          onListScrollBottom();
        }
      },
      [onListScrollBottom]
    );

    const handleSelect = useCallback(
      (optionData) => {
        onSelect({ ...optionData, selectionType: "click" });
      },
      [onSelect]
    );

    const childrenWithListProps = useMemo(() => {
      const optionsList = React.Children.map(children, (child, index) => {
        if (child.type !== Option) {
          return child;
        }

        const newProps = {
          onSelect: handleSelect,
          isHighlighted: currentOptionsListIndex === index,
          hidden: isLoading && React.Children.count(children) === 1,
        };

        return React.cloneElement(child, newProps);
      });

      if (isLoading) {
        optionsList.push(
          <StyledSelectLoaderContainer key="loader">
            <Loader />
          </StyledSelectLoaderContainer>
        );
      }

      return optionsList;
    }, [children, currentOptionsListIndex, handleSelect, isLoading]);

    useEffect(() => {
      let newHeight;

      newHeight = listRef.current.clientHeight;

      if (listActionButtonRef.current) {
        newHeight += listActionButtonRef.current.parentElement.clientHeight;
      }

      setListHeight(`${newHeight}px`);
    }, [children]);

    useEffect(() => {
      const keyboardEvent = "keydown";
      const listElement = listRef.current;

      document.addEventListener(keyboardEvent, handleGlobalKeydown);
      listElement.addEventListener("scroll", handleListScroll);

      return function cleanup() {
        document.removeEventListener(keyboardEvent, handleGlobalKeydown);
        listElement.removeEventListener("scroll", handleListScroll);
      };
    }, [handleGlobalKeydown, handleListScroll]);

    useEffect(() => {
      if (!filterText || filterText === lastFilter.current) {
        lastFilter.current = filterText;

        return;
      }

      lastFilter.current = filterText;

      setCurrentOptionsListIndex((previousIndex) => {
        const match = getNextChildByText(
          filterText,
          childrenList,
          previousIndex
        );

        if (!match) {
          return previousIndex;
        }

        const indexOfMatch = getIndexOfMatch(match.props.value);

        updateListScrollTop(indexOfMatch, listRef.current);

        return indexOfMatch;
      });
    }, [childrenList, filterText, getIndexOfMatch, lastFilter]);

    useEffect(() => {
      if (!disablePortal) {
        repositionList();
      }
    }, [disablePortal, repositionList, repositionTrigger]);

    useEffect(() => {
      if (!highlightedValue) {
        return;
      }
      const indexOfMatch = getIndexOfMatch(highlightedValue);

      setCurrentOptionsListIndex(indexOfMatch);
      updateListScrollTop(indexOfMatch, listRef.current);
    }, [childrenList, getIndexOfMatch, highlightedValue]);

    useEffect(() => {
      if (isLoading && currentOptionsListIndex === lastOptionIndex) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, [children, currentOptionsListIndex, isLoading, lastOptionIndex]);

    function isNavigationKey(keyEvent) {
      return (
        keyEvent === "ArrowDown" ||
        keyEvent === "ArrowUp" ||
        keyEvent === "Home" ||
        keyEvent === "End"
      );
    }

    const selectList = (
      <StyledSelectListContainer
        data-element="select-list-wrapper"
        ref={listContainerRef}
        height={listHeight}
        {...listProps}
      >
        <StyledSelectList
          id={id}
          aria-labelledby={labelId}
          data-element="select-list"
          role="listbox"
          ref={listRef}
          tabIndex="0"
          isLoading={isLoading}
        >
          {childrenWithListProps}
        </StyledSelectList>
        {listActionButton && (
          <ListActionButton
            ref={listActionButtonRef}
            listActionButton={listActionButton}
            onListAction={onListAction}
          />
        )}
      </StyledSelectListContainer>
    );

    if (disablePortal) {
      return selectList;
    }

    return <Portal onReposition={repositionList}>{selectList}</Portal>;
  }
);

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** The Id of the label */
  labelId: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /** DOM element to position the dropdown menu list relative to */
  anchorElement: PropTypes.object,
  /** A callback for when a child is selected */
  onSelect: PropTypes.func.isRequired,
  /** A callback for when the list should be closed */
  onSelectListClose: PropTypes.func.isRequired,
  /** Text value to highlight an option */
  filterText: PropTypes.string,
  /** Value of option to be highlighted on component render */
  highlightedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** A trigger to manually reposition the list */
  repositionTrigger: PropTypes.bool,
  /** True for default text button or a Button Component to be rendered */
  listActionButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** A callback for when the Action Button is triggered */
  onListAction: PropTypes.func,
  /** If true the loader animation is displayed below the last option */
  isLoading: PropTypes.bool,
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom: PropTypes.func,
};

export default SelectList;
