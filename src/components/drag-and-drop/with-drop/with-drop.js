import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';
import Text from './../../../utils/helpers/text';

class WithDrop extends React.Component {
  static propTypes = {
    /**
     * The component that will have drop enabled
     *
     * @property children
     * @type {Object}
     */
    children: PropTypes.node.isRequired,

    // The following prop types are required by react-dnd,
    // and aren't used in this component directly. Therefore
    // disable the ESLint rule react/no-unused-prop-types
    /* eslint-disable react/no-unused-prop-types */
    identifier: PropTypes.string, // identifies an association between WithDrag and WithDrop
    index: PropTypes.number.isRequired, // identifies the index for this item
    hover: PropTypes.func, // an optional callback to trigger when the item is hovered
    onDrag: PropTypes.func // an optional callback to trigger when dragging occurs
    /* eslint-enable react/no-unused-prop-types */
  }

  static contextTypes = {
    dragAndDropOnDrag: PropTypes.func,
    dragAndDropHover: PropTypes.func
  }

  render() {
    // this.props.connectDragSource comes from react-dnd DragSource higher
    // order component, so disable the react/prop-types ESLint rule on the line
    // below
    return this.props.connectDropTarget(this.props.children); // eslint-disable-line react/prop-types
  }
}

const ItemTarget = {
  hover(props, monitor, component) {
    Text.clearSelection();
    const hover = props.hover || component.context.dragAndDropHover;
    hover(props, monitor, component);
  }
};

WithDrop = DropTarget( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(WithDrop);

export default WithDrop;
