import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import DraggableContext from './draggable-context';
import ItemTypes from './item-types';
import ItemSource from './item-source';
import ItemTarget from './item-target';

class WithDragAndDrop extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(this.props.children));
  }
}

WithDragAndDrop = DropTarget( // eslint-disable-line no-class-assign
  ItemTypes.TABLE_ROW, ItemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(WithDragAndDrop);

WithDragAndDrop = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.TABLE_ROW, ItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(WithDragAndDrop);

export {
  WithDragAndDrop,
  DraggableContext
};
