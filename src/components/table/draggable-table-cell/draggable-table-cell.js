import React from 'react';
import PropTypes from 'prop-types';
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
      {
          props.connectDragSource(
            <div>
              <Icon
                className='draggable-table-cell__icon'
                draggable
                type='drag_vertical'
              />
            </div>
          )
        }
    </TableCell>
  );
};

DraggableTableCell.propTypes = {
  connectDragSource: PropTypes.func.isRequired // Provided by DragSource
};

export default DraggableTableCell;
