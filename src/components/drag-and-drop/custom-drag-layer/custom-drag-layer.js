import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragLayer } from 'react-dnd';
import './custom-drag-layer.scss';

const collect = (monitor) => {
  const item = monitor.getItem();
  return {
    currentOffset: monitor.getSourceClientOffset(),
    item,
    draggableNode: item ? item.draggableNode() : null,
    isDragging: monitor.isDragging()
  };
};

class CustomDragLayer extends React.Component {
  static propTypes = {
    /**
     * The dom node being dragged.
     *
     * @property draggableNode
     * @type {Node|Object}
     */
    draggableNode: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node
    ]),

    /**
     * Determine if the component is being dragged or not.
     *
     * @property isDragging
     * @type {Boolean}
     */
    /* ESLint is not detecting that the prop is called via nextProps */
    /* eslint-disable react/no-unused-prop-types */
    isDragging: PropTypes.bool.isRequired
    /* eslint-enable react/no-unused-prop-types */
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isDragging && nextProps.draggableNode && (nextProps.draggableNode !== this.props.draggableNode)) {
      this.setClonedChildWidth(nextProps);
    }

    if (nextProps.draggableNode && nextProps.isDragging && !this.clonedChild) {
      this.createClonedChild(nextProps);
    } else if (!nextProps.draggableNode && this.clonedChild) {
      this.removeClonedChild();
    }
  }

  getItemStyles(props) {
    const { currentOffset } = props;
    if (!currentOffset) { return { display: 'none' }; }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      width: this.width
    };
  }

  getClassName = (props) => {
    return classNames('custom-drag-layer', props.className);
  }

  setClonedChildWidth(props) {
    this.width = props.draggableNode.getBoundingClientRect().width;
  }

  createClonedChild = (props) => {
    if (this._container) {
      this.width = props.draggableNode.getBoundingClientRect().width;
      this.clonedChild = props.draggableNode.cloneNode(true);
      this.clonedChild.style.pointerEvents = 'auto'; // allow the css to define the pointer style
      this._container.appendChild(this.clonedChild);
    }
  }

  removeClonedChild() {
    this._container.removeChild(this.clonedChild);
    this.clonedChild = null;
  }

  render() {
    return (
      <div className={ this.getClassName(this.props) }>
        <div
          className='custom-drag-layer__container'
          ref={ (node) => { this._container = node; } }
          style={ this.getItemStyles(this.props) }
        />
      </div>
    );
  }
}

const UndecoratedCustomDragLayer = CustomDragLayer;
export { UndecoratedCustomDragLayer, collect };
export default DragLayer(collect)(CustomDragLayer);
