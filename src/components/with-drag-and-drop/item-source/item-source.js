// item-source.js

const ItemSource = {
  canDrag(props, monitor) {
    return props.canDrag && props.canDrag(props, monitor);
  },

  beginDrag(props, monitor, component) {
    return props.beginDrag(props, monitor, component);
  }
};

export default ItemSource;
