import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';

class WithDrag extends React.Component {
  static propTypes = {
    dndIdentifier: React.PropTypes.string,
    canDrag: React.PropTypes.func,
    beginDrag: React.PropTypes.func,
    endDrag: React.PropTypes.func
  }

  static contextTypes = {
    beginDrag: React.PropTypes.func, // a callback function called when dragging starts
    endDrag: React.PropTypes.func, // a callback function called when dragging ends
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
    const beginDrag = props.beginDrag || component.context.beginDrag;
    return beginDrag(props, monitor, component);
  },

  endDrag(props, monitor, component) {
    const endDrag = props.endDrag || component.context.endDrag;
    return endDrag(props, monitor, component);
  }
};

WithDrag = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })
)(WithDrag);

export default WithDrag;
