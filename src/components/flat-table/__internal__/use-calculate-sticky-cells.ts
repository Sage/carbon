import { useContext } from "react";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row-context";

export default (id: string) => {
  const {
    expandable,
    firstCellId,
    firstColumnExpandable,
    leftPositions,
    rightPositions,
    onClick,
    onKeyDown,
  } = useContext(FlatTableRowContext);

  const leftPosition = leftPositions[id];
  const rightPosition = rightPositions[id];
  const makeCellSticky =
    leftPosition !== undefined || rightPosition !== undefined;
  const isFirstCell = id === firstCellId;
  const isExpandableCell = expandable && isFirstCell && firstColumnExpandable;

  return {
    expandable,
    leftPosition,
    rightPosition,
    makeCellSticky,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
  };
};
