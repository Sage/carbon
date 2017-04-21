import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './../item-types';
import ItemSource from './../item-source';
import ItemTarget from './../item-target';

class WithDragAndDrop extends React.Component {
  static propTypes = {
    /**
     * A required prop. This is what you want to
     * drag and drop.
     *
     * @property children
     * @type {Multiple}
     */
    children: React.PropTypes.element.isRequired
  }

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

export default WithDragAndDrop;
