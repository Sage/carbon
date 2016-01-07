import React from 'react';
import GridRow from './grid_row';
import _ from 'lodash';

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
 * @class Grid
 * @extends React.Component
 */
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
    onRowClick: React.PropTypes.func
  }

  /**
   * Builds the header columns for the grid
   *
   * @method columns
   * @return {Object} JSX
   */
  get columns() {
    return this.props.fields.map((column, index) => {
      let displayName = column.displayName || _.capitalize(column.name);

      return (
        <th key={ index } className={ cellClasses(column) }>{ displayName }</th>
      );
    });
  }

  /**
   * Builds the rows for the grid
   *
   * @method rows
   * @return {Object} JSX
   */
  get rows() {
    return this.props.data.map((row, index) => {
      return (
        <GridRow
          key={index}
          fields={ this.props.fields }
          row={ row }
          onRowClick={ this.props.onRowClick }
        />
      );
    });
  }

  /**
   * Sets the table class and consumes
   * any classes sent via props
   *
   * @method tableClasses
   * @return {String} table className
   */
  get tableClasses() {
    let className = 'ui-grid';
    if (this.props.className) {
      className += ' ' + this.props.className;
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
      <table className={ this.tableClasses }>
        <thead className='ui-grid__header'>
          <tr className='ui-grid__header__row'>
            { this.columns }
          </tr>
        </thead>
        <tbody>
          { this.rows }
        </tbody>
      </table>
    );
  }
}

/**
 * Defines the cell class based on column options
 *
 * @method cellClasses
 * @private
 * @return {String} classes for the cell
 */
function cellClasses(column) {
  let className = 'ui-grid__header__cell';

  if (column.className) {
    className += ' ' + column.className;
  }

  if (column.align) {
    className += ' ui-grid__header__cell__align--' + column.align;
  }

  return className;
}

export default Grid;
