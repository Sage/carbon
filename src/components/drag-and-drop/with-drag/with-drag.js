import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';

class WithDrag extends React.Component {
  static propTypes = {
    dndIdentifier: React.PropTypes.string,
    canDrag: React.PropTypes.func.isRequired,
    beginDrag: React.PropTypes.func.isRequired,
    endDrag: React.PropTypes.func.isRequired
  }

  render() {
    return this.props.connectDragSource(this.props.children, {
      dropEffect: 'copy'
    });
  }
}

const ItemSource = {
  canDrag(props, monitor) {
    return props.canDrag && props.canDrag(props, monitor);
  },

  beginDrag(props, monitor, component) {
    return props.beginDrag(props, monitor, component);
  },

  endDrag(props, monitor, component) {
    return props.endDrag(props, monitor, component);
  }
};

WithDrag = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })
)(WithDrag);

export default WithDrag;
