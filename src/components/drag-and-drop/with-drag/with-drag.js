import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';

class WithDrag extends React.Component {
  static propTypes = {
    identifier: PropTypes.string, // identifies an association between WithDrag and WithDrop
    canDrag: PropTypes.func, // an optional callback to determine if this item can be dragged
    beginDrag: PropTypes.func, // an optional callback to trigger when dragging begins
    endDrag: PropTypes.func // an optional callback to trigger when dragging ends
  }

  static contextTypes = {
    dragAndDropBeginDrag: PropTypes.func,
    dragAndDropEndDrag: PropTypes.func
  }

  render() {
    return this.props.connectDragSource(this.props.children, {
      dropEffect: 'copy'
    });
  }
}

const ItemSource = {
  canDrag(props, monitor) {
    if (props.canDrag) {
      return props.canDrag(props, monitor);
    } else {
      return true;
    }
  },

  beginDrag(props, monitor, component) {
    const beginDrag = props.beginDrag || component.context.dragAndDropBeginDrag;
    return beginDrag(props, monitor, component);
  },

  endDrag(props, monitor, component) {
    const endDrag = props.endDrag || component.context.dragAndDropEndDrag;
    return endDrag(props, monitor, component);
  }
};

WithDrag = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })
)(WithDrag);

export default WithDrag;
