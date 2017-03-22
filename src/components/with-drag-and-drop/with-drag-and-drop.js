import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import DraggableContext from './draggable-context';

// TODO move to constants file?
const ItemTypes = {
  TABLE_ROW: 'TableRow'
};

const itemSource = {
  canDrag(props) { // eslint-disable-line no-unused-vars
    return document.activeElement.getAttribute('icon') === "list_view";
  },

  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class WithDragAndDrop extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(this.props.children));
  }
}


WithDragAndDrop = DropTarget( // eslint-disable-line no-class-assign
  ItemTypes.TABLE_ROW, itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(WithDragAndDrop);

WithDragAndDrop = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.TABLE_ROW, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(WithDragAndDrop);

export {
  WithDragAndDrop,
  DraggableContext
};
