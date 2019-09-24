import ReactDOM from 'react-dom';

const ItemTargetHelper = {

  /**
   * Helper method for when drag and drop is enabled for
   * items grouped together vertically e.g. a list, or
   * a table.
   */
  onHoverUpDown(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    const onDrag = props.onDrag || component.context.dragAndDropOnDrag;
    onDrag(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }

};

export default ItemTargetHelper;
