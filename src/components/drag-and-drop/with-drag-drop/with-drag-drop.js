import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from './../../../utils/helpers/dnd/item-types';
import Text from './../../../utils/helpers/text';

class WithDragDrop extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * Provided by DragSource
     *
     * @property connectDragPreview
     * @type {Func}
     */
    connectDragPreview: PropTypes.func,

    /**
     * Provided by DragSource
     *
     * @property connectDragPreview
     * @type {Func}
     */
    connectDragSource: PropTypes.func,

    /**
     * Provided by DropTarget
     *
     * @property connectDropTarget
     * @type {Func}
     */
    connectDropTarget: PropTypes.func
  }

  static contextTypes = {
    dragDropManager: PropTypes.object, // the React DND DragDropManager
    dragAndDropActiveIndex: PropTypes.number, // tracks the currently active index
    dragAndDropBeginDrag: PropTypes.func,
    dragAndDropEndDrag: PropTypes.func,
    dragAndDropOnDrag: PropTypes.func,
    dragAndDropHover: PropTypes.func
  }

  render() {
    return (
      React.cloneElement(
        this.props.children,
        {
          connectDragSource: this.props.connectDragSource,
          connectDragPreview: this.props.connectDragPreview,
          ref: (instance) => {
            const node = findDOMNode(instance);
            this.props.connectDropTarget(node);
          }
        }
      )
    );
  }
}

const ItemTarget = {
  hover(props, monitor, component) {
    const decoratedComponent = component.getDecoratedComponentInstance();
    Text.clearSelection();
    const hover = props.hover || decoratedComponent.context.dragAndDropHover;
    hover(decoratedComponent.props, monitor, decoratedComponent);
  }
};

const ItemSource = {
  canDrag(props, monitor) {
    return (props.canDrag) ? props.canDrag(props, monitor) : true;
  },

  beginDrag: (props, monitor, component) => {
    const beginDrag = props.beginDrag || component.context.dragAndDropBeginDrag;
    return beginDrag(props, monitor, component);
  },

  endDrag: (props, monitor, component) => {
    const endDrag = props.endDrag || component.context.dragAndDropEndDrag;
    return endDrag(props, monitor, component);
  }
};

export default DropTarget(
  ItemTypes.getItemType,
  ItemTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.getItemType,
    ItemSource,
    connect => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview()
    })
  )(WithDragDrop)
);
