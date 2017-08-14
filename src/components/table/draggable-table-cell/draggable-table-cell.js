import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';
import TableCell from './../table-cell';

/**
 * Creates a draggable table cell using WithDrag.
 *
 * @constructor
 */
const DraggableTableCell = (props) => {
  return (
    <TableCell className='draggable-table-cell'>
      <WithDrag identifier={ props.identifier }>
        <div>
          <Icon
            className='draggable-table-cell__icon'
            type='drag_vertical'
          />
        </div>
      </WithDrag>
    </TableCell>
  );
};

DraggableTableCell.propTypes = {
  identifier: PropTypes.string // used to associate WithDrags and WithDrops
};

export default DraggableTableCell;
