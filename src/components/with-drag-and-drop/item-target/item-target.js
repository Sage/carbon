
const ItemTarget = {
  hover(props, monitor, component) {
    props.hover && props.hover(props, monitor, component);
  }
};

export default ItemTarget;
