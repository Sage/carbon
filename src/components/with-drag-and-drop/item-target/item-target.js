
const ItemTarget = {
  hover(props, monitor, component) {
    if (props.hover) {
      props.hover(props, monitor, component);
    }
  }
};

export default ItemTarget;
