import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StyledTableCell from './table-cell.style';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import './table-cell.scss';

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
 *
 * @class TableCell
 * @constructor
 */
class TableCell extends React.Component {
  /**
   * Returns classes to be used on the TD element.
   *
   * @method tableCellClasses
   * @return {String}
   */
  get tableCellClasses() {
    return classNames(
      'carbon-table-cell',
      this.props.className,
      // { [`carbon-table-cell--align-${this.props.align}`]: this.props.align },
      { 'carbon-table-cell--action': this.props.action }
    );
  }

  /**
   * Returns props to be used on the TD element.
   *
   * @method tableCellProps
   * @return {Object}
   */
  get tableCellProps() {
    const { ...props } = validProps(this);

    delete props.children;
    props.align = this.props.align;
    props.isSelectable = this.props.isSelectable;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
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
  /**
   * Defines the cell type to be an action - used for the delete cell.
   */
  action: PropTypes.bool,

  /**
   * Defines the alignment of the cell (eg "left", "center" or "right").
   */
  align: PropTypes.oneOf(['left', 'center', 'right', '']),

  /**
   * Children elements
   */
  children: PropTypes.node,

  /**
   * Custom className
   */
  className: PropTypes.string,

  isSelectable: PropTypes.bool
};

TableCell.defaultProps = {
  align: '',
  isSelectable: false
};

export default TableCell;
