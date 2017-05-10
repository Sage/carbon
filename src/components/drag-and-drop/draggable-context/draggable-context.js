import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTargetHelper from './../../../utils/helpers/dnd/item-target';

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
 *       onDrag={ onItemMoved }
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
     * Callback function for when an item has been dragged
     * e.g. to update data in a store
     */
    onDrag: React.PropTypes.func.isRequired,

    /**
     * Callback function called when dragging starts.
     *
     * Synonymous with React DnD's Drag Source Specification beginDrag
     * - see https://react-dnd.github.io/react-dnd/docs-drag-source.html
     */
    beginDrag: React.PropTypes.func,

    /**
     * Callback function called when an item is hovered over the component.
     *
     * Synonymous with React DnD's Drop Target Specification
     * - see https://react-dnd.github.io/react-dnd/docs-drop-target.html
     */
    hover: React.PropTypes.func
  }

  static defaultProps = {
    hover: ItemTargetHelper.onHoverUpDown,
    beginDrag: (props) => {
      return {
        index: props.index
      };
    }
  }

  /**
   * Defines a context object for child components of the draggable context component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  static childContextTypes = {
    dragAndDropOnDrag: React.PropTypes.func, // See propTypes.onDrag
    dragAndDropBeginDrag: React.PropTypes.func, // See propTypes.beginDrag
    dragAndDropEndDrag: React.PropTypes.func, // See propTypes.beginDrag
    dragAndDropHover: React.PropTypes.func, // See propTypes.hover
    dragAndDropActiveIndex: React.PropTypes.number
  }

  /**
   * Returns this draggable context object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      dragAndDropOnDrag: this.handleDrag,
      dragAndDropBeginDrag: this.props.beginDrag,
      dragAndDropEndDrag: this.handleEndDrag,
      dragAndDropHover: this.props.hover,
      dragAndDropActiveIndex: this.state.activeIndex
    };
  }

  state = {
    activeIndex: null
  }

  handleDrag = (originalIndex, hoverIndex) => {
    this.setState({ activeIndex: hoverIndex });

    if (this.props.onDrag && typeof originalIndex !== 'undefined') {
      this.props.onDrag(originalIndex, hoverIndex);
    }
  }

  handleEndDrag = () => {
    this.setState({ activeIndex: null });
  }

  /**
   * Renders the component
   */
  render() {
    return this.props.children;
  }
}

export default DragDropContext(HTML5Backend)(DraggableContext);
