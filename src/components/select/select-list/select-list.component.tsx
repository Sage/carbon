import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import { flip, offset, size, Side } from "@floating-ui/dom";
import {
  useVirtualizer,
  defaultRangeExtractor,
  ScrollToOptions,
  Range,
  VirtualItem,
} from "@tanstack/react-virtual";
import findLastIndex from "lodash/findLastIndex";

import usePrevious from "../../../hooks/__internal__/usePrevious";
import useScrollBlock from "../../../hooks/__internal__/useScrollBlock";
import useModalManager from "../../../hooks/__internal__/useModalManager";
import {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
  StyledSelectListTableBody,
  StyledSelectListContainer,
  StyledScrollableContainer,
} from "./select-list.style";
import Popover from "../../../__internal__/popover";
import OptionRow from "../option-row/option-row.component";
import getNextChildByText from "../utils/get-next-child-by-text";
import getNextIndexByKey from "../utils/get-next-index-by-key";
import isNavigationKey from "../utils/is-navigation-key";
import ListActionButton from "../list-action-button";
import Loader from "../../loader";
import Option, { OptionProps } from "../option";
import SelectListContext from "../__internal__/select-list-context";

export interface SelectListProps {
  /** The ID for the parent <div> */
  id?: string;
  /** The Id of the label */
  labelId?: string;
  /** Child components (such as <Option>) */
  children?: React.ReactNode;
  /** DOM element to position the dropdown menu list relative to */
  anchorElement?: HTMLElement;
  /** A callback for when a child is selected */
  onSelect: (target: {
    text?: string;
    value?: string | Record<string, unknown>;
    id?: string;
    selectionType: string;
    selectionConfirmed: boolean;
  }) => void;
  /** A callback for when the list should be closed */
  onSelectListClose: () => void;
  /** Text value to highlight an option */
  filterText?: string;
  /** Value of option to be highlighted on component render */
  highlightedValue?: string | Record<string, unknown>;
  /** True for default text button or a Button Component to be rendered */
  listActionButton?: boolean | React.ReactNode;
  /** Maximum list height - defaults to 180 */
  listMaxHeight?: number;
  /** A callback for when the Action Button is triggered */
  onListAction?: (
    ev?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  /** If true the loader animation is displayed below the last option */
  isLoading?: boolean;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** SelectList table header, should consist of multiple th elements. Works only in multiColumn mode */
  tableHeader?: React.ReactNode;
  /** When true component will work in multi column mode, children should consist of OptionRow components in this mode */
  multiColumn?: boolean;
  /** Data role for loader component */
  loaderDataRole?: string;
  /** Placement of the select list relative to the input element */
  listPlacement?: Side;
  /** Use the opposite list placement if the set placement does not fit */
  flipEnabled?: boolean;
  /** @private @ignore
   * Hides the list (with CSS display: none) if not set
   */
  isOpen?: boolean;
  /** array of selected values, if rendered as part of a MultiSelect */
  multiselectValues?: string[] | Record<string, unknown>[];
  /** Set this prop to enable a virtualised list of options. If it is not used then all options will be in the
   * DOM at all times, which may cause performance problems on very large lists */
  enableVirtualScroll?: boolean;
  /** The number of options to render into the DOM at once, either side of the currently-visible ones.
   * Higher values make for smoother scrolling but may impact performance.
   * Only used if the `enableVirtualScroll` prop is set. */
  virtualScrollOverscan?: number;
  /** @private @ignore A callback for when a mouseDown event occurs on the component */
  onMouseDown?: () => void;
}

const TABLE_HEADER_HEIGHT = 48;
const SCROLL_OPTIONS: ScrollToOptions = { behavior: "auto", align: "end" };

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
      enableVirtualScroll,
      virtualScrollOverscan = 5,
      ...listProps
    }: SelectListProps,
    listContainerRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [currentOptionsListIndex, setCurrentOptionsListIndex] = useState(-1);
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    const lastFilter = useRef("");
    const listRef = useRef(null);
    const tableRef = useRef<HTMLTableSectionElement>(null);
    const listActionButtonRef = useRef<HTMLButtonElement>(null);
    const { blockScroll, allowScroll } = useScrollBlock();
    const actionButtonHeight = useRef(0);
    const wasOpen = usePrevious(isOpen);

    // ensure scroll-position goes back to the top whenever the list is (re)-opened. (On Safari, without this it remains at the bottom if it had been scrolled
    // to the bottom before closing.)
    useEffect(() => {
      if (isOpen && !wasOpen) {
        (listContainerRef as React.RefObject<HTMLDivElement>).current?.scrollTo(
          0,
          0
        );
      }
    });

    const overscan = enableVirtualScroll
      ? virtualScrollOverscan
      : React.Children.count(children);

    // need to use a custom rangeExtractor that ensure the currently-selected option, if any, always appears as an option returned from the virtualiser.
    // This ensures that the aria-activedescendant value is always valid even when the currently-selected item is out of the visible range.
    const rangeExtractor = (range: Range) => {
      const toRender = defaultRangeExtractor(range);
      if (
        currentOptionsListIndex !== -1 &&
        !toRender.includes(currentOptionsListIndex)
      ) {
        toRender.push(currentOptionsListIndex);
      }
      return toRender;
    };

    const virtualizer = useVirtualizer({
      count: React.Children.count(children),
      getScrollElement: () =>
        (listContainerRef as React.RefObject<HTMLDivElement>).current,
      estimateSize: () => 40, // value doesn't really seem to matter since we're dynamically measuring, but 40px is the height of a single-line option
      overscan,
      paddingStart: multiColumn ? TABLE_HEADER_HEIGHT : 0,
      scrollPaddingEnd: actionButtonHeight.current,
      rangeExtractor,
    });

    const items = virtualizer.getVirtualItems();

    const childrenList = useMemo(() => React.Children.toArray(children), [
      children,
    ]) as React.ReactElement<OptionProps>[];

    const getIndexOfMatch = useCallback(
      (valueToMatch) => {
        return childrenList.findIndex(
          (child) =>
            React.isValidElement(child) && child.props.value === valueToMatch
        );
      },
      [childrenList]
    );

    // getVirtualItems returns an empty array of items if the select list is currently closed - which is correct visually but
    // we need to ensure that any currently-selected option is still in the DOM to avoid any accessibility issues.
    // The isOpen prop will ensure that no options are visible regardless of what is in the items array.
    if (items.length === 0) {
      const currentIndex = highlightedValue
        ? getIndexOfMatch(highlightedValue)
        : currentOptionsListIndex;
      if (currentIndex > -1) {
        // only index property is required with the item not visible so the following type assertion, even though incorrect,
        // should be OK
        items.push({ index: currentIndex } as VirtualItem);
      }
    }

    const listHeight = virtualizer.getTotalSize();

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
          tableRef.current
            ? tableRef.current.offsetWidth - tableRef.current.clientWidth
            : /* istanbul ignore next */ 0
        );
      }
    }, [multiColumn]);

    const anchorRef = useMemo(
      () => ({
        current: anchorElement || null,
      }),
      [anchorElement]
    );

    const handleSelect = useCallback(
      (optionData) => {
        onSelect({
          ...optionData,
          selectionType: "click",
          selectionConfirmed: true,
        });
      },
      [onSelect]
    );

    const childElementRefs = useRef<HTMLElement[]>(
      Array.from({ length: React.Children.count(children) })
    );

    const optionChildrenList = useMemo(
      () =>
        childrenList.filter(
          (child) =>
            React.isValidElement(child) &&
            (child.type === Option || child.type === OptionRow)
        ),
      [childrenList]
    );

    const { measureElement } = virtualizer;

    const measureCallback = (element: HTMLElement) => {
      // need a guard to prevent crash with too many rerenders when closing the list
      if (isOpen) {
        measureElement(element);
      }
    };

    // the rangeExtractor above can cause an undefined value to be appended to the return items.
    // Easiest way to stop that crashing is just to filter it out.
    const renderedChildren = items
      .filter((item) => item !== undefined)
      .map(({ index, start }) => {
        const child = childrenList[index];

        if (!React.isValidElement(child)) {
          return child;
        }

        const optionChildIndex = optionChildrenList.indexOf(child);
        const isOption = optionChildIndex > -1;

        const newProps = {
          index,
          onSelect: handleSelect,
          hidden: isLoading && childrenList.length === 1,
          // these need to be inline styles rather than implemented in styled-components to avoid it generating thousands of classes
          style: {
            transform: `translateY(${start}px)`,
          },
          "aria-setsize": isOption ? optionChildrenList.length : undefined,
          "aria-posinset": isOption ? optionChildIndex + 1 : undefined,
          ref: (optionElement: HTMLElement) => {
            // needed to dynamically compute the size
            measureCallback(optionElement);
            // add the DOM element to the array of refs
            childElementRefs.current[index] = optionElement;
          },
          "data-index": index,
        };

        return React.cloneElement(child, newProps);
      });

    const lastOptionIndex = findLastIndex(
      childrenList,
      (child) =>
        React.isValidElement(child) &&
        (child.type === Option || child.type === OptionRow)
    );

    const getNextHighlightableItemIndex = useCallback(
      (key, indexOfHighlighted) => {
        const lastIndex = lastOptionIndex;

        if (lastIndex === -1) {
          return -1;
        }

        let nextIndex = getNextIndexByKey(
          key,
          indexOfHighlighted,
          lastIndex,
          isLoading
        );
        const nextElement = childrenList[nextIndex];

        if (
          (React.isValidElement(nextElement) &&
            nextElement.type !== Option &&
            nextElement.type !== OptionRow) ||
          nextElement.props.disabled
        ) {
          nextIndex = getNextHighlightableItemIndex(key, nextIndex);
        }

        return nextIndex;
      },
      [childrenList, lastOptionIndex, isLoading]
    );

    const highlightNextItem = useCallback(
      (key) => {
        let currentIndex = currentOptionsListIndex;

        if (highlightedValue) {
          const indexOfHighlighted = getIndexOfMatch(highlightedValue);

          currentIndex = indexOfHighlighted;
        }

        const nextIndex = getNextHighlightableItemIndex(key, currentIndex);

        if (nextIndex === -1 || currentIndex === nextIndex) {
          return;
        }

        const { text, value } = (childrenList[
          nextIndex
        ] as React.ReactElement).props;

        onSelect({
          text,
          value,
          selectionType: "navigationKey",
          id: childElementRefs.current[nextIndex]?.id,
          selectionConfirmed: false,
        });
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
          onSelect({ selectionType: "tab", selectionConfirmed: false });
        } else {
          event.preventDefault();
          listActionButtonRef.current?.focus();
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
        } else if (key === "Tab") {
          onSelectListClose();
        } else if (key === "Enter" && !isActionButtonFocused) {
          event.preventDefault();

          const currentOption = childrenList[currentOptionsListIndex];

          if (!React.isValidElement(currentOption)) {
            onSelectListClose();

            // need to call onSelect here with empty text/value to clear the input when
            // no matches found in FilterableSelect
            onSelect({
              id: undefined,
              text: "",
              value: "",
              selectionType: "enterKey",
              selectionConfirmed: false,
            });

            return;
          }

          if (currentOption.props.disabled) {
            return;
          }

          const { text, value } = currentOption.props;

          onSelect({
            id: childElementRefs.current[currentOptionsListIndex]?.id,
            text,
            value,
            selectionType: "enterKey",
            selectionConfirmed: true,
          });
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

    const handleEscapeKey = useCallback(
      (event) => {
        if (event.key === "Escape") {
          onSelectListClose();
        }
      },
      [onSelectListClose]
    );

    useModalManager({
      open: !!isOpen,
      closeModal: handleEscapeKey,
      modalRef: listRef,
      triggerRefocusOnClose: false,
    });

    const handleListScroll = useCallback(
      (event) => {
        const element = event.target;

        /* istanbul ignore else */
        if (
          isOpen &&
          onListScrollBottom &&
          element.scrollHeight - element.scrollTop === element.clientHeight
        ) {
          onListScrollBottom();
        }
      },
      [onListScrollBottom, isOpen]
    );

    useEffect(() => {
      const keyboardEvent = "keydown";
      const listElement = (listContainerRef as React.RefObject<HTMLDivElement>)
        .current;

      window.addEventListener(keyboardEvent, handleGlobalKeydown);
      listElement?.addEventListener("scroll", handleListScroll);

      return function cleanup() {
        window.removeEventListener(keyboardEvent, handleGlobalKeydown);
        listElement?.removeEventListener("scroll", handleListScroll);
      };
    }, [handleGlobalKeydown, handleListScroll, listContainerRef]);

    useEffect(() => {
      if (!filterText || filterText === lastFilter.current) {
        lastFilter.current = filterText || "";

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
          return -1;
        }

        const indexOfMatch = getIndexOfMatch(match.props.value);

        virtualizer.scrollToIndex(indexOfMatch, SCROLL_OPTIONS);
        return indexOfMatch;
      });
    }, [childrenList, filterText, getIndexOfMatch, virtualizer]);

    useEffect(() => {
      if (!highlightedValue) {
        return;
      }
      const indexOfMatch = getIndexOfMatch(highlightedValue);

      if (indexOfMatch === -1) {
        return;
      }

      setCurrentOptionsListIndex(indexOfMatch);
    }, [getIndexOfMatch, highlightedValue]);

    // ensure that the currently-selected option is always visible immediately after
    // it has been changed
    useEffect(() => {
      if (currentOptionsListIndex > -1) {
        virtualizer.scrollToIndex(currentOptionsListIndex, SCROLL_OPTIONS);
      }
    }, [currentOptionsListIndex, virtualizer]);

    useEffect(() => {
      if (
        isLoading &&
        currentOptionsListIndex === lastOptionIndex &&
        lastOptionIndex > -1
      ) {
        virtualizer.scrollToIndex(lastOptionIndex, {
          ...SCROLL_OPTIONS,
          align: "start",
        });
      }
    }, [
      children,
      currentOptionsListIndex,
      isLoading,
      lastOptionIndex,
      listContainerRef,
      virtualizer,
    ]);

    const popoverMiddleware = useMemo(
      () => [
        offset(3),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
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

    const loader = isLoading ? (
      <StyledSelectLoaderContainer key="loader">
        <Loader data-role={loaderDataRole} />
      </StyledSelectLoaderContainer>
    ) : undefined;

    let selectListContent: React.ReactNode = renderedChildren;

    const listBoxProps = {
      role: "listbox",
      id,
      "aria-labelledby": labelId,
      "aria-multiselectable": multiselectValues ? true : undefined,
    };

    useLayoutEffect(() => {
      if (listActionButton && isOpen) {
        actionButtonHeight.current =
          listActionButtonRef.current?.parentElement?.offsetHeight || 0;
      }
    }, [listActionButton, isOpen]);

    if (multiColumn) {
      selectListContent = (
        <StyledSelectListTable>
          <StyledSelectListTableHeader scrollbarWidth={scrollbarWidth}>
            {tableHeader}
          </StyledSelectListTableHeader>
          <StyledSelectListTableBody
            {...listBoxProps}
            aria-labelledby={labelId}
            ref={tableRef}
            listHeight={listHeight - TABLE_HEADER_HEIGHT}
          >
            {renderedChildren}
          </StyledSelectListTableBody>
        </StyledSelectListTable>
      );
    }

    return (
      <SelectListContext.Provider
        value={{
          currentOptionsListIndex,
          multiselectValues,
        }}
      >
        <Popover
          placement={listPlacement}
          disablePortal
          reference={anchorRef}
          middleware={popoverMiddleware}
          isOpen={isOpen}
          disableBackgroundUI
          animationFrame
        >
          <StyledSelectListContainer
            data-element="select-list-wrapper"
            isLoading={isLoading}
            {...listProps}
          >
            <StyledScrollableContainer
              ref={listContainerRef}
              maxHeight={listMaxHeight}
              data-component="select-list-scrollable-container"
              hasActionButton={!!listActionButton}
            >
              <StyledSelectList
                as={multiColumn ? "div" : "ul"}
                data-element="select-list"
                {...(multiColumn ? {} : listBoxProps)}
                ref={listRef}
                tabIndex={-1}
                listHeight={multiColumn ? undefined : listHeight}
              >
                {selectListContent}
              </StyledSelectList>
              {loader}
            </StyledScrollableContainer>
            {listActionButton && (
              <ListActionButton
                ref={listActionButtonRef}
                listActionButton={listActionButton}
                onListAction={onListAction}
              />
            )}
          </StyledSelectListContainer>
        </Popover>
      </SelectListContext.Provider>
    );
  }
);

export default SelectList;
