import React, { useEffect, useState, useRef } from "react";
import { DndProvider, useDrop } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem from "./draggable-item.component";
import { StyledIcon, StyledDraggableContainer } from "./draggable-item.style";

const marginPropTypes = filterStyledSystemMarginProps(styledSystemPropTypes);

const DropTarget = ({ children, getOrder, ...rest }) => {
  const [, drop] = useDrop({
    accept: "draggableItem",
    drop() {
      getOrder();
    },
  });

  return (
    <StyledDraggableContainer ref={drop} {...rest}>
      {children}
    </StyledDraggableContainer>
  );
};

const DraggableContainer = ({ children, getOrder, ...rest }) => {
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
    const draggableItem = draggableItems.filter((item) => {
      return `${item.props.id}` === id;
    })[0];

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

  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <DndProvider backend={Backend}>
      <DropTarget getOrder={getItemsId} {...marginProps}>
        {draggableItems.map((item) =>
          React.cloneElement(
            item,
            {
              id: `${item.props.id}`,
              findItem,
              moveItem,
            },
            [
              item.props.children,
              <StyledIcon key={item.props.id} type="drag" />,
            ]
          )
        )}
      </DropTarget>
    </DndProvider>
  );
};

DraggableContainer.propTypes = {
  ...marginPropTypes,
  /** Callback fired when order is changed */
  getOrder: PropTypes.func,
  /**
   * The content of the component
   *
   *  `<DraggableItem />` is required to make `Draggable` works
   * */
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error;

    React.Children.forEach(prop, (child) => {
      if (!child) {
        return;
      }

      if (DraggableItem.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${DraggableItem.displayName}\`.`
        );
      }
    });

    return error;
  },
};

DropTarget.propTypes = {
  ...marginPropTypes,
  children: PropTypes.node.isRequired,
  getOrder: PropTypes.func,
};

export default DraggableContainer;
