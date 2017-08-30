import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';
import TableCell from './../table-cell';

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
  const icon = (
    <WithDrag
      identifier={ props.identifier }
      draggableNode={ props.draggableNode }
    >
      { iconHTML }
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
  draggableNode: PropTypes.func // A function that returns the dom node used as the ghost layer when dragging
};

export default DraggableTableCell;
