import React from 'react';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import TouchBackend from 'react-dnd-touch-backend';
import ItemTargetHelper from '../../../utils/helpers/dnd/item-target';
import CustomDragLayer from '../custom-drag-layer';
import Browser from '../../../utils/helpers/browser';

/**
 * A draggable context component
 *
 * == How to use a draggable context in a component:
 *
 * In your file
 *
 *   import { DraggableContext, WithDrop, WithDrag } from 'carbon/lib/components/drag-and-drop'
 *
 * A draggable context is used to define an area in the page where drag and drop can be used on
 * one or more elements (you also need to use WithDrop and WithDrag):
 *
 *   <DraggableContext onDrag={ onItemMoved }>
 *     <ol>
 *       {
 *         items.map((item, index) => {
 *           return (
 *             <WithDrop index={ index }>
 *               <li>
 *                 <WithDrag><span>{ item.content }</span></WithDrag>
 *               </li>
 *             </WithDrop>
 *           );
 *         })
 *       }
 *     </ol>
 *   </DraggableContext>
 *
 * @class DraggableContext
 * @constructor
 */
class DraggableContext extends React.Component {

  static propTypes = {
    /**
     * The element(s) where you want to apply drag
     * and drop functionality
     *
     * @property children
     * @type {Object}
     */
    children: PropTypes.node.isRequired,

    /**
     * Optional CustomDragLayer to use for the ghost row when dragging & dropping
     *
     * @property customDragLayer
     * @type {Object}
     */
    customDragLayer: PropTypes.node,

    /**
     * Callback function for when an item has been dragged
     * e.g. to update data in a store
     */
    onDrag: PropTypes.func.isRequired
  }

  /**
   * Defines a context object for child components of the draggable context component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  static childContextTypes = {
    dragAndDropActiveIndex: PropTypes.number, // Tracks the currently dragged index
    dragAndDropBeginDrag: PropTypes.func, // Callback for when dragging begins
    dragAndDropEndDrag: PropTypes.func, // Callback for when dragging ends
    dragAndDropHover: PropTypes.func, // Callback for when a hover is triggered
    dragAndDropOnDrag: PropTypes.func // Callback for when order is changed
  }

  static defaultProps = {
    customDragLayer: <CustomDragLayer />
  }

  state = {
    activeIndex: null, // {Number} tracks the currently dragged index
    intervalId: null 
  }

  /**
   * Returns this draggable context properties to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      dragAndDropActiveIndex: this.state.activeIndex,
      dragAndDropBeginDrag: this.handleBeginDrag,
      dragAndDropEndDrag: this.handleEndDrag,
      dragAndDropHover: this.handleHover,
      dragAndDropOnDrag: this.handleDrag
    };
  }

  /**
   * A callback for when hover is triggered
   *
   * @method handleHover
   * @return {Void}
   */
  handleHover = ItemTargetHelper.onHoverUpDown

  /**
   * Triggers the custom close event handler on Esc
   *
   * @method closeModal
   * @param {Object} ev event
   * @return {void}
   */
  autoScroll = (ev) => {
    const { screenY } = ev;
    const { innerHeight } = Browser.getWindow();
    if (screenY < innerHeight / 7.0) {
      const intervalId = setInterval(() => {Browser.getWindow().scrollBy(0,-3)}, 400);
      this.setState({ intervalId });
      return;
    }
    if (screenY > 6 * innerHeight / 7.0) {
      const intervalId = setInterval(() => {Browser.getWindow().scrollBy(0,3)}, 400);
      this.setState({ intervalId });
      return;
    }
    if(this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  }

  /**
   * A callback for when a drag is triggered.
   *
   * Stores the hoverIndex in state as activeIndex,
   * and calls this.props.onDrag only if originalIndex
   * is not undefined.
   *
   * @method handleDrag
   * @param {Number} originalIndex (the active item's original index)
   * @param {Number} hoverIndex (the active item's new index
   * @return {Void}
   */
  handleDrag = (originalIndex, hoverIndex) => {
    this.setState({ activeIndex: hoverIndex });

    if (typeof originalIndex !== 'undefined') {
      this.props.onDrag(originalIndex, hoverIndex);
    }
  }

  /**
   * A callback for when dragging begins.
   *
   * @method handleBeginDrag
   * @param {Object} props
   * @return {Void}
   */
  handleBeginDrag = (props) => {
    return {
      index: props.index,
      ...props
    };
  }

  /**
   * A callback for when a drag ends triggered.
   *
   * @method handleEndDrag
   * @return {Void}
   */
  handleEndDrag = () => {
    // dragging has ended so remove the active index
    this.setState({ activeIndex: null });
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <div className='carbon-draggable-context' onClick={ this.autoScroll }>
        { this.props.children }
        { this.props.customDragLayer }
      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(DraggableContext);
