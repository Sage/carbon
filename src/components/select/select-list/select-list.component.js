import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledPopoverContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
} from "./select-list.style";
import Popover from "../../../__internal__/popover";
import OptionRow from "../option-row/option-row.component";
import updateListScrollTop from "./update-list-scroll";
import getNextChildByText from "../utils/get-next-child-by-text";
import getNextIndexByKey from "../utils/get-next-index-by-key";
import ListActionButton from "../list-action-button/list-action-button.component";
import StyledSelectListContainer from "./select-list-container.style";
import Loader from "../../loader";
import Option from "../option/option.component";

const overhang = 4;

const popoverModifiers = [
  {
    name: "offset",
    options: {
      offset: [-overhang, 0],
    },
  },
  {
    name: "preventOverflow",
    options: {
      mainAxis: false,
    },
  },
];

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
      disablePortal,
      onListAction,
      isLoading,
      onListScrollBottom,
      multiColumn,
      tableHeader,
      ...listProps
    },
    listContainerRef
  ) => {
    const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);
    const [listHeight, setListHeight] = useState(0);
    const [listWidth, setListWidth] = useState(null);
    const [placement, setPlacement] = useState("bottom");
    const lastFilter = useRef("");
    const listRef = useRef();
    const listActionButtonRef = useRef();

    const optionRefs = useRef(
      React.Children.map(children, (child) => {
        if (child?.type === Option || child?.type === OptionRow) {
          return React.createRef();
        }
        return null;
      }).filter((child) => child)
    );

    const setPlacementCallback = useCallback((popper) => {
      setPlacement(popper.placement);
    }, []);

    const anchorRef = useMemo(
      () => ({
        current: anchorElement,
      }),
      [anchorElement]
    );

    const childrenList = useMemo(() => React.Children.toArray(children), [
      children,
    ]);

    const lastOptionIndex = useMemo(() => {
      let lastIndex = 0;

      childrenList.forEach((element, index) => {
        if (element.type === Option || element.type === OptionRow) {
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

        if (
          nextElement &&
          nextElement.type !== Option &&
          nextElement.type !== OptionRow
        ) {
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

    const childrenWithListProps = useMemo(
      () =>
        React.Children.map(children, (child, index) => {
          if (!child || (child.type !== Option && child.type !== OptionRow)) {
            return child;
          }

          const newProps = {
            onSelect: handleSelect,
            isHighlighted: currentOptionsListIndex === index,
            hidden: isLoading && React.Children.count(children) === 1,
            ref: optionRefs.current[index],
          };

          return React.cloneElement(child, newProps);
        }),

      [children, currentOptionsListIndex, handleSelect, isLoading]
    );

    useLayoutEffect(() => {
      if (!disablePortal && anchorElement) {
        const inputBoundingRect = anchorElement.getBoundingClientRect();
        const width = `${inputBoundingRect.width + 2 * overhang}px`;
        setListWidth(width);
      }
    }, [disablePortal, anchorElement]);

    useLayoutEffect(() => {
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

      window.addEventListener(keyboardEvent, handleGlobalKeydown);
      listElement.addEventListener("scroll", handleListScroll);

      return function cleanup() {
        window.removeEventListener(keyboardEvent, handleGlobalKeydown);
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

        updateListScrollTop(indexOfMatch, listRef.current, optionRefs.current);

        return indexOfMatch;
      });
    }, [childrenList, filterText, getIndexOfMatch, lastFilter]);

    useEffect(() => {
      if (!highlightedValue) {
        return;
      }
      const indexOfMatch = getIndexOfMatch(highlightedValue);

      setCurrentOptionsListIndex(indexOfMatch);
      updateListScrollTop(indexOfMatch, listRef.current, optionRefs.current);
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

    const loader = () => (
      <StyledSelectLoaderContainer key="loader" as={multiColumn ? "div" : "li"}>
        <Loader />
      </StyledSelectLoaderContainer>
    );

    let selectListContent = childrenWithListProps;

    if (multiColumn) {
      selectListContent = (
        <StyledSelectListTable>
          <StyledSelectListTableHeader>
            {tableHeader}
          </StyledSelectListTableHeader>
          <tbody>{childrenWithListProps}</tbody>
        </StyledSelectListTable>
      );
    }

    return (
      <Popover
        placement="bottom-start"
        disablePortal={disablePortal}
        reference={anchorRef}
        onFirstUpdate={setPlacementCallback}
        modifiers={popoverModifiers}
      >
        <StyledPopoverContainer
          height={listHeight}
          width={listWidth}
          ref={listContainerRef}
        >
          <StyledSelectListContainer
            data-element="select-list-wrapper"
            height={listHeight}
            placement={placement}
            {...listProps}
          >
            <StyledSelectList
              id={id}
              as={multiColumn ? "div" : "ul"}
              aria-labelledby={labelId}
              data-element="select-list"
              role="listbox"
              ref={listRef}
              tabIndex="0"
              isLoading={isLoading}
            >
              {selectListContent}
              {isLoading && loader()}
            </StyledSelectList>
            {listActionButton && (
              <ListActionButton
                ref={listActionButtonRef}
                listActionButton={listActionButton}
                onListAction={onListAction}
              />
            )}
          </StyledSelectListContainer>
        </StyledPopoverContainer>
      </Popover>
    );
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
  /** True for default text button or a Button Component to be rendered */
  listActionButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** A callback for when the Action Button is triggered */
  onListAction: PropTypes.func,
  /** If true the loader animation is displayed below the last option */
  isLoading: PropTypes.bool,
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom: PropTypes.func,
  /** SelectList table header, should consist of multiple th elements. Works only in multiColumn mode */
  tableHeader: PropTypes.node,
  /** When true component will work in multi column mode, children should consist of OptionRow components in this mode */
  multiColumn: PropTypes.bool,
};

export default SelectList;
