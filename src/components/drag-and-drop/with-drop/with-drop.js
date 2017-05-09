import React from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';

class WithDrop extends React.Component {
  static propTypes = {
    dndIdentifier: React.PropTypes.string,
    onDrag: React.PropTypes.func.isRequired,
    hover: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired
  }

  render() {
    return this.props.connectDropTarget(this.props.children);
  }
}

const ItemTarget = {
  hover(props, monitor, component) {
    props.hover && props.hover(props, monitor, component);
  }
};

WithDrop = DropTarget( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })
)(WithDrop);

export default WithDrop;
