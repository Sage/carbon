/**
 * Helper class used when calling React DnD's DropTarget function.
 *
 * Defines one function from React DnD's Drop Target Specification:
 *  hover
 */
const ItemTarget = {
  /**
   * If props.hover is defined it calls props.hover, and passes
   * props, monitor, and component as arguments.
   */
  hover(props, monitor, component) {
    props.hover && props.hover(props, monitor, component);
  }
};

export default ItemTarget;
