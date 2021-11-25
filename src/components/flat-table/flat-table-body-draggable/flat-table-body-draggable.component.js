import React, { useEffect, useState, useRef } from "react";
import { useDrop, DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import StyledIcon from "../../icon/icon.style";

import FlatTableBody from "../flat-table-body/flat-table-body.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";

const DropTarget = ({ children, getOrder, ...rest }) => {
  const [, drop] = useDrop({
    accept: "flatTableRow",
    drop() {
      getOrder();
    },
  });

  return (
    <FlatTableBody ref={drop} {...rest}>
      {children}
    </FlatTableBody>
  );
};

const FlatTableBodyDraggable = ({ children, getOrder }) => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children)
  );
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(React.Children.toArray(children));
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

  const findItem = (id) => {
    const draggableItem = draggableItems.filter(
      (item) => `${item.props.id}` === id
    )[0];

    return {
      draggableItem,
      index: draggableItems.indexOf(draggableItem),
    };
  };

  const moveItem = (id, atIndex) => {
    const { draggableItem, index } = findItem(id);
    const copyOfDraggableItems = [...draggableItems];

    copyOfDraggableItems.splice(index, 1);
    copyOfDraggableItems.splice(atIndex, 0, draggableItem);
    setDraggableItems(copyOfDraggableItems);
  };

  const getItemsId = () => {
    if (!getOrder) {
      return;
    }

    const draggableItemIds = draggableItems.map(
      (draggableItem) => draggableItem.props.id
    );

    getOrder(draggableItemIds);
  };

  return (
    <DndProvider backend={Backend}>
      <DropTarget getOrder={getItemsId}>
        {draggableItems.map((item) =>
          React.cloneElement(
            item,
            {
              id: `${item.props.id}`,
              moveItem,
              findItem,
              draggable: true,
              key: `${item.props.id}`,
            },
            [
              <FlatTableCell key={item.props.id}>
                <StyledIcon type="drag" />
              </FlatTableCell>,
              item.props.children,
            ]
          )
        )}
      </DropTarget>
    </DndProvider>
  );
};

FlatTableBodyDraggable.propTypes = {
  getOrder: PropTypes.func,
  children: PropTypes.node.isRequired,
};

DropTarget.propTypes = {
  children: PropTypes.node.isRequired,
  getOrder: PropTypes.func,
};

export default FlatTableBodyDraggable;
