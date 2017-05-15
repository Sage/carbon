const ItemSourceHelper = {

  /**
   * Helper function that returns an object with a single index property.
   * The index property is set to the value of props.index.
   */
  onBeginDrag(props) {
    return {
      index: props.index
    };
  }

};

export default ItemSourceHelper;
