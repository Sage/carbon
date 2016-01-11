import React from 'react';
import GridRow from './grid_row';
import CommonGrid from './../../utils/decorators/common_grid';
import { capitalize }  from 'lodash';

/**
 * Grid is a component to display a collection of data or line items.
 *
 * The component expects data to be provided to it as an Immutable object
 * (https://facebook.github.io/immutable-js/). It also requires each line item
 * to have a property of `_row_id`. To easily add row IDs to your data, run your
 * JSON through the ImmutableHelper `parseJSON` method.
 *
 * == How to use an Grid in a component:
 *
 * In your file:
 *
 *   import Grid from 'carbon/lib/components/grid';
 *
 * To render the Grid:
 *
 *   Define which fields of columns your grid should render. The name
 *   of the field should match the key in the data structure.
 *
 *   let fields = [{name: 'description'}, {name: 'debit'}, {name: 'credit'}]
 *
 *   <Grid
 *     fields={ fields }
 *     data={ data.get('line_items') } />
 *
 * You can optionally pass a row click handler which will be emitted whenever
 * one of the data rows is clicked.
 * This will be emitted with the event and row props which contains the row id
 * to indentify which row has been clicked.
 *
 *   <Grid
 *     fields={ fields }
 *     data={ data.get('line_items') }
 *     onRowClick={ this.handleRowClick } />
 *
 * You can pass extra options to each field object:
 *
 *    className - add extra classes to a column.
 *    displayName - change the displayName of the column.
 *    align: 'right' - align column header and row cells to the right
 *
 *    Example:
 *      let fields = [{name: 'description', displayName: 'DESCRIPTION'},
 *                    {name: 'debit', className: 'customeClass', align: 'right'},
 *                    {name: 'credit', align: 'right'},
 *                    {name: 'total', align: 'right'}];
 *
 * To add a deleting action to the grid pass you can pass an additional callback prop
 *
 *    deleteRowHandler - callback when delete action is triggered
 *
 *    <Grid
 *      fields={ fields }
 *      data={ data.get('line_items') }
 *      onRowClick={ this.handleRowClick }
 *      deleteRowHandler={ this.handleRowDelete } />
 *
 * @class Grid
 * @extends React.Component
 */
const Grid = CommonGrid(
class Grid extends React.Component {

  static propTypes = {

    /**
     * The columns to display in the table.
     *
     * @property fields
     * @type {Array}
     */
    fields: React.PropTypes.array.isRequired,

    /**
     * The data to display in the table.
     *  This should be an Immutable object.
     *
     * @property data
     * @type {Object}
     */
    data: React.PropTypes.object.isRequired,

    /**
     * A callback for when a row is clicked.
     *
     * @property onRowClick
     * @type {Function}
     */
    onRowClick: React.PropTypes.func,

    /**
     * A callback for when a row delete action is triggered.
     *
     * @property deleteRowHandler
     * @type {Function}
     */
    deleteRowHandler: React.PropTypes.func
  }

  /**
   * Builds a placeholder column for the delete action
   *
   * @method deletingColumn
   * @return {Object} JSX
   */
  get deletingColumn() {
    let className = this.cellClasses({}) + 'ui-grid__header__cell--delete';
    return ( <th key='delete' className={ className }></th> );
  }

  /**
   * Builds the header columns for the grid
   *
   * @method columns
   * @return {Object} JSX
   */
  get columns() {
    let columns = [];

    if (this.props.deleteRowHandler) {
      columns.push(this.deletingColumn);
    }

    this.props.fields.forEach((column, index) => {
      let displayName = column.displayName || capitalize(column.name);

      columns.push(
        <th key={ index } className={ this.cellClasses(column) }>{ displayName }</th>
      );
    });

    return columns;
  }

  /**
   * Builds the rows for the grid
   *
   * @method rows
   * @return {Object} JSX
   */
  get rows() {
    return this.props.data.map((row) => {
      let row_id = row.get('_row_id');

      return (
        <GridRow
          key={ row_id }
          fields={ this.props.fields }
          data={ row }
          row_id={ row_id }
          onRowClick={ this.props.onRowClick }
          deleteRowHandler={ this.props.deleteRowHandler }
        />
      );
    });
  }

  /**
   * Sets the grid class and consumes any classes sent via props
   * Extends from grid decorator
   *
   * @method gridClasses
   * @return {String} grid className
   */
  get gridClasses() {
    let className = 'ui-grid';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return className;
  }

  /**
   * Sets the grid header class and extends from decorator
   *
   * @method gridHeaderClasses
   * @return {String} grid header className
   */
  get gridHeaderClasses() {
    return 'ui-grid__header';
  }

  /**
   * Sets the grid header row class and extends from decorator
   *
   * @method gridHeaderRowClasses
   * @return {String} grid header className
   */
  get gridHeaderRowClasses() {
    return 'ui-grid__header__row';
  }

  /**
   * Defines the cell class based on column options
   *
   * @method cellClasses
   * @return {String} classes for the cell
   */
  cellClasses = (column) => {
    let className = this.gridHeaderCellClasses +
                    'ui-grid__header__cell';

    if (column.className) {
      className += ' ' + column.className;
    }

    if (column.align) {
      className += ' ui-grid__header__cell--align-' + column.align;
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
      <table className={ this.gridClasses }>
        <thead className={ this.gridHeaderClasses }>
          <tr className={ this.gridHeaderRowClasses }>
            { this.columns }
          </tr>
        </thead>
        <tbody>
          { this.rows }
        </tbody>
      </table>
    );
  }
});

export default Grid;
