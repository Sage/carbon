/**
 * Helper object used when calling React DnD's DragSource.
 *
 * Defines two functions from React DnD's Drag Source Specification:
 *  canDrag
 *  beginDrag
 */
const ItemSource = {
  /**
   * If props.canDrag is defined it calls props.canDrag and
   * passes props and monitor as arguments.
   */
  canDrag(props, monitor) {
    return props.canDrag && props.canDrag(props, monitor);
  },

  /**
   * Calls props.beginDrag, and passes props, monitor, and component
   * as arguments
   */
  beginDrag(props, monitor, component) {
    return props.beginDrag(props, monitor, component);
  }
};

export default ItemSource;
