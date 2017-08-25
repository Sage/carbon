import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './../../../utils/helpers/dnd/item-types';
import BrowserHelper from './../../../utils/helpers/browser';

class WithDrag extends React.Component {
  static propTypes = {
    /**
     * The component that will have drag enabled
     *
     * @property children
     * @type {Object}
     */
    children: PropTypes.node.isRequired,

    /**
     * A function that returns the dom node being dragged.
     * It not used in this compnent but is passed to CustomDragLayer via the DragLayer higher order component
     * You cannot pass a ref directly as the prop because it is undefined until mounted.
     *
     * @property draggableNode
     * @type {Function}
     */
    /* eslint-disable react/no-unused-prop-types */
    draggableNode: PropTypes.func,
    /* eslint-enable react/no-unused-prop-types */

    // The following prop types are required by react-dnd,
    // and aren't used in this component directly. Therefore
    // disable the ESLint rule react/no-unused-prop-types
    /* eslint-disable react/no-unused-prop-types */
    identifier: PropTypes.string, // identifies an association between WithDrag and WithDrop
    canDrag: PropTypes.func, // an optional callback to determine if this item can be dragged
    beginDrag: PropTypes.func, // an optional callback to trigger when dragging begins
    endDrag: PropTypes.func // an optional callback to trigger when dragging ends
    /* eslint-enable react/no-unused-prop-types */
  }

  static contextTypes = {
    dragAndDropBeginDrag: PropTypes.func,
    dragAndDropEndDrag: PropTypes.func
  }

  componentDidMount() {
    BrowserHelper.getWindow().addEventListener('selectstart', this.allowTextSelection);
  }

  componentWillUnmount() {
    BrowserHelper.getWindow().removeEventListener('selectstart', this.allowTextSelection);
  }

  // In Safari it changes the mouse cursor when dragging because it thinks text is being selected
  // We test if the target is an html element (not text) or if we already know the user is dragging
  allowTextSelection = (event) => {
    if ((event.target instanceof HTMLElement) || this.dragging) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  render() {
    // this.props.connectDragSource comes from react-dnd DragSource higher
    // order component, so disable the react/prop-types ESLint rule on the line
    // below
    return this.props.connectDragSource(this.props.children, { // eslint-disable-line react/prop-types
      dropEffect: 'copy'
    });
  }
}

const ItemSource = {
  canDrag(props, monitor) {
    return (props.canDrag) ? props.canDrag(props, monitor) : true;
  },

  beginDrag(props, monitor, component) {
    component.dragging = true;
    const beginDrag = props.beginDrag || component.context.dragAndDropBeginDrag;
    return beginDrag(props, monitor, component);
  },

  endDrag(props, monitor, component) {
    component.dragging = false;
    const endDrag = props.endDrag || component.context.dragAndDropEndDrag;
    return endDrag(props, monitor, component);
  }
};

WithDrag = DragSource( // eslint-disable-line no-class-assign
  ItemTypes.getItemType, ItemSource, connect => ({
    connectDragSource: connect.dragSource()
  })
)(WithDrag);

export default WithDrag;
