import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from '../../drag-and-drop/with-drag/with-drag';
import Icon from '../../icon/icon';
import TableCell from '../table-cell';
import './draggable-table-cell.scss';

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
 * @constructor
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
  identifier: PropTypes.string, // used to associate WithDrags and WithDrops
  draggableNode: PropTypes.func, // A function that returns the dom node used as the ghost layer when dragging
  canDrag: PropTypes.bool // used to specify whether the dragging is currently allowed
};

export default DraggableTableCell;
