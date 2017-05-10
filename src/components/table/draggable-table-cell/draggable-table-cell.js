import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';

class DraggableTableCell extends React.Component {
  static PropTypes = {
    identifier: PropTypes.string
  }

  render() {
    return (
      <TableCell className="draggable-table-cell">
        <WithDrag identifier={ this.props.identifier }>
          <div>
            <Icon
              className="draggable-table-cell__icon"
              type="drag_vertical"
            />
          </div>
        </WithDrag>
      </TableCell>
    );
  }
}

export default DraggableTableCell;
