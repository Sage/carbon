import React from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import WithDrag from "../../drag-and-drop/with-drag";
import Icon from "../../icon";
import { isClassic } from "../../../utils/helpers/style-helper";
import StyledDraggableTableCell from "./draggable-table-cell.style";

/**
 * Creates a draggable table cell using WithDrag.
 *
 */
const DraggableTableCell = (props) => {
  const canDrag = props.canDrag !== false;
  const theme = React.useContext(ThemeContext) || props.theme;

  /**
   * Note: the <div> wrapper is required, otherwise ReactDnD throws an error:
   * "Only native element nodes can now be passed to ReactDnD connectors."
   */
  const icon = (
    <div>
      <Icon type={isClassic(theme) ? "drag_vertical" : "drag"} />
    </div>
  );

  const iconWithDrag = (
    <WithDrag
      identifier={props.identifier}
      draggableNode={props.draggableNode}
      canDrag={() => {
        return canDrag;
      }}
    >
      {canDrag ? icon : <span />}
    </WithDrag>
  );

  return (
    <StyledDraggableTableCell className="draggable-table-cell">
      {iconWithDrag}
    </StyledDraggableTableCell>
  );
};

DraggableTableCell.propTypes = {
  /** Theme to use when rendering the DraggableTableCell */
  theme: PropTypes.object,

  /** used to associate WithDrags and WithDrops */
  identifier: PropTypes.string,

  /** A function that returns the dom node used as the ghost layer when dragging */
  draggableNode: PropTypes.func,

  /** used to specify whether the dragging is currently allowed */
  canDrag: PropTypes.bool,
};

export default DraggableTableCell;
