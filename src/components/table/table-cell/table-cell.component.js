import React from 'react';
import PropTypes from 'prop-types';
import StyledTableCell from './table-cell.style';
import Date from '../../../__experimental__/components/date';
import TextArea from '../../../__experimental__/components/textarea';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import OptionsHelper from '../../../utils/helpers/options-helper';

/**
 * A TableCell widget.
 *
 * == How to use a TableCell in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left", "center" or "right".
 *
 * You can set a property of 'action' which should be a boolean. This will
 * set styling options for the cell used for action such as delete.
 */
class TableCell extends React.Component {
  /**
   * Returns the child's name if there is one.
   */
  childName(child) {
    return (child && child.type) ? child.type.name : null;
  }

  /**
   * Returns if child element is Textarea.
   */
  get checkChildrenInputType() {
    const { children } = this.props;
    const TYPES = { isTextArea: 'isTextArea', isDate: 'isDate' };

    if (!Array.isArray(children)) {
      if (this.childName(children) === TextArea.name) {
        return TYPES.isTextArea;
      }
      if (this.childName(children) === Date.name) {
        return TYPES.isDate;
      }
      return null;
    }

    let result = null;
    children.forEach((child) => {
      if (this.childName(child) === Date.name) {
        result = result !== TYPES.isTextArea ? TYPES.isDate : result;
      }
      if (this.childName(child) === TextArea.name) {
        result = TYPES.isTextArea;
      }
    });
    return result;
  }

  /**
   * Returns props to be used on the TD element.
   */
  get tableCellProps() {
    const { children, ...props } = validProps(this, ['align', 'size']);
    const inputType = this.checkChildrenInputType;

    if (inputType) props[inputType] = true;

    return props;
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <StyledTableCell { ...this.tableCellProps } { ...tagComponent('table-cell', this.props) }>
        { this.props.children }
      </StyledTableCell>
    );
  }
}

TableCell.propTypes = {
  /** Defines the cell type to be an action - used for the delete cell. */
  action: PropTypes.bool,

  /** Defines the alignment of the cell (eg "left", "center" or "right"). */
  align: PropTypes.oneOf(OptionsHelper.alignFull),

  /** Children elements */
  children: PropTypes.node,

  /** Defines the height of a cell used to size an input for example */
  size: PropTypes.oneOf(OptionsHelper.tableSizes)
};

TableCell.defaultProps = {
  align: 'left'
};

export default TableCell;
