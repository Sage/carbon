import React from 'react';
import CommonGrid from './../../../utils/decorators/common_grid';
import Icon from './../../icon';

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
    data: React.PropTypes.object,

    /**
     * GUID for the row
     *
     * @property row_id
     * @type {String|Number}
     */
    row_id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),

    /**
     * A callback for when a row delete action is triggered.
     *
     * @property onRowDelete
     * @type {Function}
     */
    onRowDelete: React.PropTypes.func
  }

  /**
   * Emits the row click event with the
   * row props which includes row_id
   *
   * @method handleRowClick
   * @param {Event} ev click event
   * @return {void}
   */
  handleRowClick = (ev) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(ev, this.props);
    }
  }

  /**
   * Emits the row delete event with the
   * row props which includes row_id
   *
   * @method handleRowDelete
   * @param {Event} ev click event
   * @return {void}
   */
  handleRowDelete = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.onRowDelete(ev, this.props);
  }

  /**
   * Builds the deleting cell
   *
   * @method deleting action cell
   * @return {Object} JSX
   */
  get deletingCell() {
    let tdClass = this.gridRowCellClasses + ' common-grid__row__cell--actions ui-grid-row__cell--actions';

    return (
      <td key={ this.props.row_id + 'actions' } className={ tdClass }>
        <button type="button" className="ui-grid-row__delete common-grid__delete" id={ this.props.row_id } onClick={this.handleRowDelete}>
          <Icon type="delete" className="ui-grid-row__delete-icon common-grid__delete-icon" />
        </button>
      </td>
    );
  }

  /**
   * Builds the cells for the row
   *
   * @method cells
   * @return {Object} JSX
   */
  get cells() {
    let cells = [];

    if (this.props.onRowDelete) { cells.push(this.deletingCell); }

    this.props.fields.forEach((column, index) => {
      cells.push(
        <td className={ this.cellClasses(column)  } key={index}>
          { this.props.data.get(column.name) }
        </td>
      );
    });

    return cells;
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
      className += ' ui-grid__row__cell--align-' + column.align;
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
      <tr key={ this.props.row_id }
        onClick={ this.handleRowClick }
        className={ this.gridRowClasses }>
        { this.cells }
      </tr>
    );
  }
});

export default GridRow;
