import React from 'react';
import GridRow from './grid_row';

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
 *   let fields = ['description', 'debit', 'credit']
 *
 *   <Grid
 *     fields={ fields }
 *     data={ data.get('line_items' } />
 *
 * You can optionally pass a row click handler which will be emitted whenever
 * one of the data rows is clicked.
 * This will be emitted with the event and row props which contains the row id
 * to indentify which row has been clicked.
 *
 *   <Grid
 *     fields={ fields }
 *     data={ data.get('line_items' } 
 *     onRowClick={ this.handleRowClick } />
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
      return (
        <th key={ index} className='ui-grid__header-cell'>{ column }</th>
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
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <table className='ui-grid'>
        <thead>
          <tr className='ui-grid__header'>
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

export default Grid;
