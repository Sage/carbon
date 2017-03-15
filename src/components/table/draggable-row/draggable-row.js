import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from './../table-row';
import { DragSource, DropTarget } from 'react-dnd';
import Link from 'components/Link';

const ItemTypes = {
  TABLE_ROW: 'TableRow'
};

const itemSource = {
  canDrag(props) {
    return document.activeElement.getAttribute('icon') === "list_view";
  },

  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.onDrop()
    }
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

class DraggableRow extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <tr {...this.props}>
        {this.props.children}
      </tr>
    ));
  }
}

DraggableRow = DropTarget(
    ItemTypes.TABLE_ROW, itemTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
)(DraggableRow);

export default DragSource(
  ItemTypes.TABLE_ROW, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(DraggableRow);

