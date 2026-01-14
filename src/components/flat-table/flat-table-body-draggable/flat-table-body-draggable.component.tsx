import React, { useEffect, useState, useRef } from "react";

import { TagProps } from "../../../__internal__/utils/helpers/tags";
import StyledIcon from "../../icon/icon.style";
import StyledFlatTableBodyDraggable from "./flat-table-body-draggable.style";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import { type FlatTableRowProps } from "../flat-table-row";
import invariant from "invariant";
import arrayMove from "../../../__internal__/utils/helpers/array-move";
import {
  DragDropProvider,
  DragDropProviderProps,
} from "../__internal__/sortable";

export interface FlatTableBodyDraggableProps extends TagProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** Callback fired when order is changed */
  getOrder?: (draggableItemIds?: (string | number | undefined)[]) => void;
}

function isFlatTableRow(
  node: unknown,
): node is React.ReactElement<FlatTableRowProps> {
  return (
    React.isValidElement(node) &&
    (node.type as React.FunctionComponent).displayName === "FlatTableRow"
  );
}

const FlatTableBodyDraggable = ({
  children,
  getOrder,
  ...rest
}: FlatTableBodyDraggableProps) => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children),
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(React.Children.toArray(children));
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

  const hasValidChildren = draggableItems.every(isFlatTableRow);

  invariant(
    hasValidChildren,
    "FlatTableBodyDraggable only accepts children of type FlatTableRow.",
  );

  const handleDrop: DragDropProviderProps["onDrop"] = ({ dragged, target }) => {
    if (target) {
      const childRowIds = draggableItems.map((row) => row.props.id);
      getOrder?.(childRowIds);
      return;
    }

    // Move dragged row back to original position
    setDraggableItems(
      arrayMove({
        array: draggableItems,
        startIndex: draggableItems.findIndex(
          (row) => String(row.props.id) === dragged.id,
        ),
        endIndex: dragged.initialIndex,
      }),
    );
  };

  const handleDropTargetChange: DragDropProviderProps["onDropTargetChange"] = ({
    dragged,
    target,
  }) => {
    if (!target) {
      return;
    }

    // Move dragged row to new position
    setDraggableItems(
      arrayMove({
        array: draggableItems,
        startIndex: draggableItems.findIndex(
          (row) => String(row.props.id) === dragged.id,
        ),
        endIndex: draggableItems.findIndex(
          (row) => String(row.props.id) === target.id,
        ),
      }),
    );
  };

  return (
    <StyledFlatTableBodyDraggable
      data-component="flat-table-body-draggable"
      data-role="flat-table-body-draggable"
      {...rest}
    >
      <DragDropProvider
        onDrop={handleDrop}
        onDropTargetChange={handleDropTargetChange}
      >
        {draggableItems.map((item, index) =>
          React.cloneElement(
            item,
            {
              id: `${item.props.id}`,
              draggableProps: {
                index,
              },
            },
            [
              <FlatTableCell key={item.props.id}>
                <StyledIcon type="drag" />
              </FlatTableCell>,
              item.props.children,
            ],
          ),
        )}
      </DragDropProvider>
    </StyledFlatTableBodyDraggable>
  );
};

export default FlatTableBodyDraggable;
