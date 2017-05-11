import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';

class WithDrop extends React.Component {
  static propTypes = {
    identifier: PropTypes.string, // identifies an association between WithDrag and WithDrop
    index: PropTypes.number.isRequired, // identifies the index for this item
    hover: PropTypes.func, // an optional callback to trigger when the item is hovered
    onDrag: PropTypes.func, // an optional callback to trigger when dragging occurs
  }

  static contextTypes = {
    dragAndDropOnDrag: PropTypes.func,
    dragAndDropHover: PropTypes.func
  }

  render() {
    return this.props.connectDropTarget(this.props.children);
  }
}

const ItemTarget = {
  hover(props, monitor, component) {
    const hover = props.hover || component.context.dragAndDropHover;
    hover(props, monitor, component);
  }
};

WithDrop = DropTarget( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })
)(WithDrop);

export default WithDrop;
