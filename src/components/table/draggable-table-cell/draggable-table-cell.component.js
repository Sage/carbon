import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from '../../drag-and-drop/with-drag';
import Icon from '../../icon';
import TableCell from '../table-cell';

const iconHTML = (
  <div>
    <Icon
      className='draggable-table-cell__icon'
      type='drag_vertical'
    />
  </div>
);

/**
 * Creates a draggable table cell using WithDrag.
 *
 */
const DraggableTableCell = (props) => {
  const canDrag = props.canDrag !== false;

  const icon = (
    <WithDrag
      identifier={ props.identifier }
      draggableNode={ props.draggableNode }
      canDrag={ () => { return canDrag; } }
    >
      { canDrag ? iconHTML : <span /> }
    </WithDrag>
  );

  return (
    <TableCell className='draggable-table-cell'>
      { icon }
    </TableCell>
  );
};

DraggableTableCell.propTypes = {
  /** used to associate WithDrags and WithDrops */
  identifier: PropTypes.string,

  /** A function that returns the dom node used as the ghost layer when dragging */
  draggableNode: PropTypes.func,

  /** used to specify whether the dragging is currently allowed */
  canDrag: PropTypes.bool
};

export default DraggableTableCell;
