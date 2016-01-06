import React from 'react';

/**
 * Grid Row for the Grid component
 * 
 * == How to use a Grid Row Widget in a component:
 *   See Grid component
 *
 * @class GridRow
 * @extends React.Component
 */
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
        <th key={index}>
          { this.props.row.get(column) }
        </th>
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
      <tr key={ this.props.row.get('_row_id') }
        onClick={ this.handleRowClick }
        className='ui-grid__row'>

        { this.cells }
      </tr>
    );
  }
}

export default GridRow;
