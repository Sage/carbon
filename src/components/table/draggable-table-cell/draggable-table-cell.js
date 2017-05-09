import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';

class DraggableTableCell extends React.Component {
  static PropTypes = {
    dndIdentifier: PropTypes.string
  }

  static contextTypes = {
    canDrag: PropTypes.func, // a callback function to specify whether dragging is allowed
    beginDrag: PropTypes.func, // a callback function called when dragging starts
    endDrag: PropTypes.func, // a callback function called when dragging ends
  }

  render() {
    return (
      <TableCell className="draggable-table-cell">
        <WithDrag
          beginDrag={ this.context.beginDrag }
          canDrag={ this.context.canDrag }
          endDrag={ this.context.endDrag }
          dndIdentifier={ this.props.dndIdentifier }
        >
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
