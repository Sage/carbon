import React from 'react';
import CommonGrid from './../../../utils/decorators/common_grid';

/**
 * Grid Row for the Grid component
 *
 * == How to use a Grid Row Widget in a component:
 *   See Grid component
 *
 * @class GridRow
 * @extends React.Component
 */
const GridRow = CommonGrid(
class GridRow extends React.Component {

  static propTypes = {

    /**
     * The columns to display in the table.
     *
     * @property fields
     * @type {Array}
     */
    fields: React.PropTypes.array.isRequired,

    /**
     * A callback for when a row is clicked.
     *
     * @property onRowClick
     * @type {Function}
     */
    onRowClick: React.PropTypes.func,

    /**
     * The data to display in the row.
     * This should be an Immutable object.
     *
     * @property data
     * @type {Object}
     */
    row: React.PropTypes.object
  }

  /**
   * Emits the row click event with the
   * row props which includes _row_id
   *
   * @method handleRowClick
   * @param {Event} ev click event
   * @return {void}
   */
  handleRowClick = (ev) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(ev, this.props.row);
    }
  }

  /**
   * Builds the cells for the row
   *
   * @method cells
   * @return {Object} JSX
   */
  get cells() {
    return this.props.fields.map((column, index) => {
      return (
        <td className={ this.cellClasses(column)  } key={index}>
          { this.props.row.get(column.name) }
        </td>
      );
    });
  }

  /**
   * Sets the grid row class and extends from decorator
   *
   * @method gridRowClasses
   * @return {String} grid row className
   */
  get gridRowClasses() {
    return 'ui-grid__row';
  }

  /**
   * Defines the cell class based on column options
   *
   * @method cellClasses
   * @return {String} classes for the cell
   */
  cellClasses = (column) => {
    let className = this.gridRowCellClasses + 'ui-grid__row__cell';

    if (column.className) {
      className += ' ' + column.className;
    }

    if (column.align) {
      className += ' ui-grid__row__cell__align--' + column.align;
    }

    return className;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <tr key={ this.props.row.get('_row_id') }
        onClick={ this.handleRowClick }
        className={ this.gridRowClasses }>

        { this.cells }
      </tr>
    );
  }
});

export default GridRow;
