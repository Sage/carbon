import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { flip, offset } from "@floating-ui/dom";

import useScrollBlock from "../../../hooks/__internal__/useScrollBlock";
import {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledPopoverContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
  StyledSelectListTableBody,
} from "./select-list.style";
import Popover from "../../../__internal__/popover";
import OptionRow from "../option-row/option-row.component";
import updateListScrollTop from "./update-list-scroll";
import getNextChildByText from "../utils/get-next-child-by-text";
import getNextIndexByKey from "../utils/get-next-index-by-key";
import isNavigationKey from "../utils/is-navigation-key";
import ListActionButton from "../list-action-button/list-action-button.component";
import StyledSelectListContainer from "./select-list-container.style";
import Loader from "../../loader";
import Option from "../option/option.component";
import guid from "../../../__internal__/utils/helpers/guid";
import SelectListContext from "../__internal__/select-list-context";

const SelectList = React.forwardRef(
  (
    {
      listMaxHeight = 180,
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
      loaderDataRole,
      listPlacement = "bottom",
      flipEnabled = true,
      isOpen,
      multiselectValues,
      ...listProps
    },
    listContainerRef
  ) => {
    const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);
    const [listHeight, setListHeight] = useState(0);
    const [listWidth, setListWidth] = useState(null);
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    const lastFilter = useRef("");
    const listRef = useRef();
    const tableRef = useRef();
    const listActionButtonRef = useRef();
    const { blockScroll, allowScroll } = useScrollBlock();

    const updateListHeight = useCallback(() => {
      if (isOpen) {
        let newHeight = listRef.current.clientHeight;

        if (listActionButtonRef.current) {
          newHeight += listActionButtonRef.current.parentElement.clientHeight;
        }

        setListHeight(`${newHeight}px`);
      }
    }, [isOpen]);

    const listCallbackRef = useCallback(
      (element) => {
        listRef.current = element;
        if (element) {
          setTimeout(updateListHeight, 0);
        }
      },
      [updateListHeight]
    );

    useEffect(() => {
      if (isOpen) {
        blockScroll();
      }

      return () => {
        if (isOpen) {
          allowScroll();
        }
      };
    }, [allowScroll, blockScroll, isOpen]);

    useLayoutEffect(() => {
      if (multiColumn) {
        setScrollbarWidth(
          tableRef.current.offsetWidth - tableRef.current.clientWidth
        );
      }
    }, [multiColumn]);

    const anchorRef = useMemo(
      () => ({
        current: anchorElement,
      }),
      [anchorElement]
    );

    const optionRefList = useMemo(
      () =>
        React.Children.map(children, (child) => {
          if (child?.type === Option || child?.type === OptionRow) {
            return React.createRef();
          }
          return null;
        }).filter((child) => child),
      [children]
    );

    const handleSelect = useCallback(
      (optionData) => {
        onSelect({ ...optionData, selectionType: "click" });
      },
      [onSelect]
    );

    const childIds = useMemo(() => React.Children.map(children, () => guid()), [
      children,
    ]);

    const childrenWithListProps = useMemo(
      () =>
        React.Children.map(children, (child, index) => {
          if (!child || (child.type !== Option && child.type !== OptionRow)) {
            return child;
          }

          const newProps = {
            index,
            id: childIds[index],
            onSelect: handleSelect,
            hidden: isLoading && React.Children.count(children) === 1,
            ref: optionRefList[index],
          };

          return React.cloneElement(child, newProps);
        }),
      [children, handleSelect, isLoading, optionRefList, childIds]
    );

    const childrenList = useMemo(
      () => React.Children.toArray(childrenWithListProps),
      [childrenWithListProps]
    );

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

        const { text, value, id: itemId } = childrenList[nextIndex].props;

        onSelect({ text, value, selectionType: "navigationKey", id: itemId });
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
        if (!isOpen) {
          return;
        }

        const { key } = event;
        const isActionButtonFocused =
          document.activeElement === listActionButtonRef.current;

        if (key === "Tab" && listActionButton) {
          handleActionButtonTab(event, isActionButtonFocused);
        } else if (key === "Tab" || key === "Escape") {
          onSelectListClose();
        } else if (key === "Enter" && !isActionButtonFocused) {
          event.preventDefault();
          const currentOption = childrenList[currentOptionsListIndex];

          if (!currentOption) {
            onSelectListClose();

            return;
          }

          const { id: itemId, text, value } = currentOption.props;

          onSelect({ id: itemId, text, value, selectionType: "enterKey" });
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
        isOpen,
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

    const assignListWidth = useCallback(() => {
      if (anchorElement) {
        const inputBoundingRect = anchorElement.getBoundingClientRect();
        const width = `${inputBoundingRect.width}px`;
        setListWidth(width);
      }
    }, [anchorElement]);

    useLayoutEffect(() => {
      assignListWidth();
      window.addEventListener("resize", assignListWidth);
      return () => {
        window.removeEventListener("resize", assignListWidth);
      };
    }, [assignListWidth]);

    useLayoutEffect(updateListHeight, [children, updateListHeight]);

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

        updateListScrollTop(
          indexOfMatch,
          multiColumn ? tableRef.current : listRef.current,
          optionRefList
        );

        return indexOfMatch;
      });
    }, [
      childrenList,
      filterText,
      getIndexOfMatch,
      lastFilter,
      multiColumn,
      optionRefList,
    ]);

    useEffect(() => {
      if (!highlightedValue) {
        return;
      }
      const indexOfMatch = getIndexOfMatch(highlightedValue);

      setCurrentOptionsListIndex(indexOfMatch);
      updateListScrollTop(
        indexOfMatch,
        multiColumn ? tableRef.current : listRef.current,
        optionRefList
      );
    }, [
      childrenList,
      getIndexOfMatch,
      highlightedValue,
      multiColumn,
      optionRefList,
    ]);

    useEffect(() => {
      if (isLoading && currentOptionsListIndex === lastOptionIndex) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, [children, currentOptionsListIndex, isLoading, lastOptionIndex]);

    const popoverMiddleware = useMemo(
      () => [
        offset(3),
        ...(flipEnabled
          ? [
              flip({
                fallbackStrategy: "initialPlacement",
              }),
            ]
          : []),
      ],
      [flipEnabled]
    );

    const loader = () => (
      <StyledSelectLoaderContainer key="loader" as={multiColumn ? "div" : "li"}>
        <Loader data-role={loaderDataRole} />
      </StyledSelectLoaderContainer>
    );

    let selectListContent = childrenWithListProps;

    if (multiColumn) {
      selectListContent = (
        <StyledSelectListTable>
          <StyledSelectListTableHeader scrollbarWidth={scrollbarWidth}>
            {tableHeader}
          </StyledSelectListTableHeader>
          <StyledSelectListTableBody ref={tableRef}>
            {childrenWithListProps}
          </StyledSelectListTableBody>
        </StyledSelectListTable>
      );
    }

    return (
      <Popover
        placement={listPlacement}
        disablePortal={disablePortal}
        reference={anchorRef}
        middleware={popoverMiddleware}
        isOpen={isOpen}
        disableBackgroundUI
        animationFrame
      >
        <StyledPopoverContainer
          height={listHeight}
          width={listWidth}
          ref={listContainerRef}
        >
          <SelectListContext.Provider
            value={{
              currentOptionsListIndex,
              multiselectValues,
            }}
          >
            <StyledSelectListContainer
              data-element="select-list-wrapper"
              {...listProps}
            >
              <StyledSelectList
                id={id}
                as={multiColumn ? "div" : "ul"}
                aria-labelledby={labelId}
                data-element="select-list"
                role="listbox"
                aria-multiselectable={multiselectValues ? true : undefined}
                ref={listCallbackRef}
                tabIndex="-1"
                isLoading={isLoading}
                multiColumn={multiColumn}
                maxHeight={listMaxHeight}
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
          </SelectListContext.Provider>
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
  /** Child components (such as <Option>) */
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
  /** Maximum list height - defaults to 180 */
  listMaxHeight: PropTypes.number,
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
  /** Data role for loader component */
  loaderDataRole: PropTypes.string,
  /** Placement of the select list relative to the input element */
  listPlacement: PropTypes.oneOf(["top", "bottom", "right", "left"]),
  /** Use the opposite list placement if the set placement does not fit */
  flipEnabled: PropTypes.bool,
  /** @private @ignore
   * Hides the list (with CSS display: none) if not set
   */
  isOpen: PropTypes.bool,
  /** array of selected values, if rendered as part of a MultiSelect */
  multiselectValues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default SelectList;
