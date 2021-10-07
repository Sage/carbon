const ItemTargetHelper = {
  /**
   * Helper method for when drag and drop is enabled for
   * items grouped together vertically e.g. a list, or
   * a table.
   */
  onHoverUpDown(props, monitor, component) {
    const item = monitor.getItem();
    const dragIndex = item.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const newOffsetDiff = monitor.getDifferenceFromInitialOffset();

    // prevents flickering
    if (item.offsetDiffY && Math.abs(item.offsetDiffY - newOffsetDiff.y) <= 1) {
      component.setState({ inDeadZone: true });
      return;
    }

    // Time to actually perform the action
    const onDrag = props.onDrag || component.context.dragAndDropOnDrag;
    onDrag(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    item.index = hoverIndex;
    item.offsetDiffY = newOffsetDiff.y;
  },
};

export default ItemTargetHelper;
