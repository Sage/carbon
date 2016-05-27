import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './item-types';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classNames';

const itemSource = {
  // initial state - before dragging
  beginDrag(props) {
    return {
      id: props.id,
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
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

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

class DndItem extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveItem: PropTypes.func.isRequired
  };

  get mainClasses() {
    return classNames(
      'ui-dnd-item',
      {
        [`ui-dnd-item--dragging`]: this.props.isDragging
      }
    );
  }

  render() {
    const { text, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <div className={ this.mainClasses }>
        { this.props.child }
      </div>
    ));
  }
}

DndItem = DropTarget(
    ItemTypes.ITEM, itemTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
)(DndItem)

export default
DragSource(
  ItemTypes.ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(DndItem)
