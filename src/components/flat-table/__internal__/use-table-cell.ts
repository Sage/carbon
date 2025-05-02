import { useContext, useEffect, useState } from "react";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row.context";
import { useStrictFlatTableContext } from "./strict-flat-table.context";

export default (id: string) => {
  const { getTabStopElementId } = useStrictFlatTableContext();
  const [tabIndex, setTabIndex] = useState(-1);
  const {
    expandable,
    firstCellId,
    firstColumnExpandable,
    leftPositions,
    rightPositions,
    onClick,
    onKeyDown,
    highlighted,
    selected,
  } = useContext(FlatTableRowContext);

  const leftPosition = leftPositions[id];
  const rightPosition = rightPositions[id];
  const makeCellSticky =
    leftPosition !== undefined || rightPosition !== undefined;
  const isFirstCell = id === firstCellId;
  const isExpandableCell = expandable && isFirstCell && firstColumnExpandable;

  const bringToFront = (
    ev:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.FocusEvent<HTMLElement>,
    tagName: "TD" | "TH",
  ) => {
    /* istanbul ignore if */
    if (
      !ev ||
      !ev.nativeEvent ||
      typeof ev.nativeEvent.composedPath !== "function"
    ) {
      return;
    }

    const { nativeEvent } = ev;

    // get the entire path of the event
    const path = nativeEvent.composedPath();

    // get the table from the path
    const tableBody = path.find((el) => {
      return el instanceof HTMLElement && el.tagName === "TBODY";
    });

    // if there is no table in the path we don't do anything
    if (!tableBody) {
      return;
    }

    // get all the th and td elements that are sticky
    const stickyCells = Array.from(
      (tableBody as HTMLElement).querySelectorAll("th, td"),
    ).filter((el) => {
      return (
        el.getAttribute("data-sticky-align") === "left" ||
        el.getAttribute("data-sticky-align") === "right" ||
        el.classList.contains("isSticky")
      );
    });

    // reset the z-index to the default value for all the sticky cells, in case other cells were clicked before
    stickyCells.map((el) => {
      (el as HTMLElement).classList.remove("bringToFront");
      return el;
    });

    // find the current cell in the path
    const cell = path.find(
      (el) => el instanceof HTMLElement && el.tagName === tagName,
    );

    // if the current cell is sticky, increase the z-index value
    const cellIndex = stickyCells.indexOf(cell as HTMLTableCellElement);
    if (cellIndex !== -1) {
      (stickyCells[cellIndex] as HTMLTableCellElement).classList.add(
        "bringToFront",
      );
    }
  };

  useEffect(() => {
    const tabstopTimer = setTimeout(() => {
      setTabIndex(isExpandableCell && getTabStopElementId() === id ? 0 : -1);
    }, 0);

    return () => {
      clearTimeout(tabstopTimer);
    };
  }, [getTabStopElementId, isExpandableCell, id]);

  return {
    expandable,
    leftPosition,
    rightPosition,
    makeCellSticky,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
    tabIndex,
    isInHighlightedRow: highlighted,
    isInSelectedRow: selected,
    bringToFront,
  };
};
