import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd-legacy";
import ItemTypes from "../../../utils/helpers/dnd/item-types";
import Text from "../../../utils/helpers/text";

class WithDrop extends React.Component {
  static propTypes = {
    /**
     * The component that will have drop enabled
     */
    children: PropTypes.node.isRequired,

    // The following prop types are required by react-dnd,
    // and aren't used in this component directly. Therefore
    // disable the ESLint rule react/no-unused-prop-types
    /* eslint-disable react/no-unused-prop-types */
    /**
     * @private
     * @ignore
     */
    identifier: PropTypes.string, // identifies an association between WithDrag and WithDrop
    /**
     * @private
     * @ignore
     */
    index: PropTypes.number.isRequired, // identifies the index for this item
    /**
     * @private
     * @ignore
     */
    hover: PropTypes.func, // an optional callback to trigger when the item is hovered
    /**
     * @private
     * @ignore
     */
    onDrag: PropTypes.func, // an optional callback to trigger when dragging occurs
    /**
     * @private
     * @ignore
     */
    canDrop: PropTypes.func, // an optional callback to determine if this item can be dropped on
    /* eslint-enable react/no-unused-prop-types */
    /**
     * @private
     * @ignore
     */
    didDrop: PropTypes.func,
  };

  static contextTypes = {
    dragAndDropOnDrag: PropTypes.func,
    dragAndDropHover: PropTypes.func,
  };

  state = {
    isDraggedElementOver: false,
    inDeadZone: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    if (!this.props.isOver && nextProps.isOver) {
      // Equivalent of `mouseover` / `mouseenter`
      this.setState({ isDraggedElementOver: true });
    }

    // eslint-disable-next-line react/prop-types
    if (this.props.isOver && !nextProps.isOver) {
      // Equivalent of `mouseout` / `mouseleave`
      this.setState({ isDraggedElementOver: false });
    }

    if (this.props.didDrop) {
      this.setState({ inDeadZone: false });
    }
  }

  render() {
    // this.props.connectDragSource comes from react-dnd DragSource higher
    // order component, so disable the react/prop-types ESLint rule on the line
    // below
    const { children, connectDropTarget, droppableNode } = this.props; // eslint-disable-line react/prop-types

    const childrenWithProps = React.cloneElement(children, {
      isDraggedElementOver: this.state.isDraggedElementOver,
      inDeadZone: this.state.inDeadZone,
    });

    if (droppableNode) {
      connectDropTarget(droppableNode());
      return childrenWithProps;
    }

    return connectDropTarget(childrenWithProps);
  }
}

const ItemTarget = {
  canDrop(props, monitor) {
    return props.canDrop ? props.canDrop(props, monitor) : true;
  },

  hover(props, monitor, component) {
    if (!monitor.canDrop()) return false;

    Text.clearSelection();
    const hover = props.hover || component.context.dragAndDropHover;
    return hover(props, monitor, component);
  },
};

// eslint-disable-next-line no-class-assign
WithDrop = DropTarget(
  ItemTypes.getItemType,
  ItemTarget,
  (connect, monitor) => ({
    isOver: monitor.isOver(),
    connectDropTarget: connect.dropTarget(),
    didDrop: monitor.didDrop(),
  })
)(WithDrop);

export default WithDrop;
