import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/**
 * A draggable context component
 *
 * == How to use a draggable context in a component:
 *
 * In your file
 *
 *   import DraggableContext from 'carbon/lib/components/drag-and-drop'
 *
 * A draggable context is used to define an area in the page
 * where drag and drop can be used on one or more elements:
 *
 *   <ol>
 *     <DraggableContext
 *       moveItem={ onItemMoved }
 *       canDrag={ itemCanDrag }
 *       beginDrag={ onBeginDrag }
 *       hover={ onHover }
 *     >
 *       <li>Spring roll</li>
 *       <li>Prawn toast</li>
 *       <li>Hot and sour soup</li>
 *       <li>Spare ribs</li>
 *     </DraggableContext>
 *   </ol>
 *
 * @class DraggableContext
 * @constructor
 */
class DraggableContext extends React.Component {

  static propTypes = {
    /**
     * Callback function for when an item has been dragged and dropped
     * e.g. to update data in a store
     *
     * @property moveItem
     * @type {Function}
     */
    moveItem: React.PropTypes.func,

    /**
     * Callback function that determines whether the item can be
     * dragged.
     *
     * Synonymous with React DnD's Drag Source Specification canDrag
     * - see https://react-dnd.github.io/react-dnd/docs-drag-source.html
     *
     * @property canDrag
     * @type {Function}
     */
    canDrag: React.PropTypes.func,

    /**
     * Callback function called when dragging starts.
     *
     * Synonymous with React DnD's Drag Source Specification beginDrag
     * - see https://react-dnd.github.io/react-dnd/docs-drag-source.html
     *
     * @property beginDrag
     * @type {Function}
     */
    beginDrag: React.PropTypes.func,

    /**
     * Callback function called when an item is hovered over the
     * component.
     *
     * Synonymous with React DnD's Drop Target Specification
     * - see https://react-dnd.github.io/react-dnd/docs-drop-target.html
     *
     * @property hover
     * @type {Function}
     */
    hover: React.PropTypes.func
  }

  /**
   * Defines a context object for child components of the draggable context component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  static childContextTypes = {
    moveItem: React.PropTypes.func, // See propTypes.moveItem
    canDrag: React.PropTypes.func, // See propTypes.canDrag
    beginDrag: React.PropTypes.func, // See propTypes.beginDrag
    hover: React.PropTypes.func // See propTypes.hover
  }

  /**
   * Returns this draggable context object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      moveItem: this.props.moveItem,
      canDrag: this.props.canDrag,
      beginDrag: this.props.beginDrag,
      hover: this.props.hover
    };
  }

  /**
   * Renders the component
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return this.props.children;
  }
}

export default DragDropContext(HTML5Backend)(DraggableContext);
