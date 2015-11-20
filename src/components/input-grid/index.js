import React from 'react';
import TableRow from './../table-row';
import _ from 'lodash';

/**
 * InputGrid is a component to display and edit a collection of data or line items.
 *
 * The component expects data to be provided to it as an Immutable object
 * (https://facebook.github.io/immutable-js/). It also requires each line item
 * to have a property of `_row_id`. To easily add row IDs to your data, run your
 * JSON through the ImmutableHelper `parseJSON` method.
 *
 * == How to use an InputGrid in a component:
 *
 * In your file:
 *
 *   import InputGrid from 'carbon/lib/components/input-grid';
 *
 * To render the InputGrid:
 *
 *   // Define which fields the grid should render. The name of the input should
 *   // match the key in the data structure.
 *   let lineItemFields = [
 *     <Textbox name='name' />,
 *     <Textbox name='description' />
 *   ];
 *
 *   <InputGrid
 *     name="line_items"
 *     data={ data.get('line_items') }
 *     fields={ lineItemFields }
 *     updateRowHandler={ Action.lineItemUpdated }
 *     deleteRowHandler={ Action.lineItemDeleted } />
 *
 * You can optionally pass additional HTML classes for each column:
 *
 *   // the key should match the input name for the relevant column
 *   let columnClasses = {
 *     description: 'custom-class'
 *   };
 *
 *   <InputGrid
 *     ...
 *     columnClasses={ columnClasses } />
 *
 * You can optionally pass fields to render in a gutter along the bottom of the
 * grid:
 *
 *   // the key should match the input name for the relevant column
 *   let gutterFields = {
 *     description: <Textbox name='description_gutter' />
 *   };
 *
 *   <InputGrid
 *     ...
 *     gutter={ gutterFields } />
 *
 * @class InputGrid
 * @constructor
 * @extends React.Component
 */
class InputGrid extends React.Component {

  static propTypes = {
    /**
     * The name should match the key in your data in which the grid's data is stored.
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string.isRequired,

    /**
     * The data to display in the table. This should be an Immutable object.
     *
     * @property data
     * @type {Object}
     */
    data: React.PropTypes.object.isRequired,

    /**
     * A callback for when a data change action is triggered.
     *
     * @property updateRowHandler
     * @type {Function}
     */
    updateRowHandler: React.PropTypes.func.isRequired,

    /**
     * A callback for when a row delete action is triggered.
     *
     * @property deleteRowHandler
     * @type {Function}
     */
    deleteRowHandler: React.PropTypes.func.isRequired,

    /**
     * The fields to display in the table.
     *
     * @property fields
     * @type {Array}
     */
    fields: React.PropTypes.array.isRequired,

    /**
     * Any fields to display in a gutter along the bottom of the table.
     *
     * @property gutter
     * @type {Object}
     */
    gutter: React.PropTypes.object,

    /**
     * An object mapping additional classes to display on columns.
     *
     * @property columnClasses
     * @type {Object}
     */
    columnClasses: React.PropTypes.object
  }

  static contextTypes = {
    /**
     * Provides methods/properties from the form to the component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property form
     * @type {Object}
     */
    form: React.PropTypes.object
  }

  state = {
    /**
     * Determines if the placeholder should be rendered or not.
     *
     * @property placeholder
     * @type {Boolean}
     */
    placeholder: true
  }

  /**
   * Stores the ID currently used for the placeholder row.
   *
   * @property placeholderID
   * @type {Integer}
   * @default new Date().getTime()
   */
  placeholderID = new Date().getTime()

  /**
   * Stores a flag for whether the children have changed within the grid.
   *
   * @property childrenHaveChanged
   * @type {Boolean}
   * @default false
   */
  childrenHaveChanged = false

  /**
   * Always returns true, but determines if any children have updated to force
   * update any child row components (this allows for easier diff checking within
   * the TableRow component).
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    this.childrenHaveChanged = false;

    // Detect if either the number of child fields has changed or if any props
    // on the child fields have changed.
    if (hasNumOfChildrenChanged(this.props, nextProps) ||
        hasPropsOfChildrenChanged(this.props, nextProps)) {
      this.childrenHaveChanged = true;
    }

    return true;
  }

  /**
   * Ensures the form has knowledge of the InputGrid, to handle validation.
   *
   * @method componentWillMount
   */
  componentWillMount() {
    this.context.form.attachToForm(this);
  }

  /**
   * Ensures the form no longer knows about the InputGrid if it is removed.
   *
   * @method componentWillUnmount
   */
  componentWillUnmount() {
    this.context.form.detachFromForm(this);
  }

  /**
   * Builds the rows required for the grid, based on the fields supplied to the
   * grid and it's data.
   *
   * @method buildRows
   * @return {Array} The rows to render in the grid
   */
  buildRows = () => {
    let rows = [];

    // iterate through each line item in data
    this.props.data.forEach((rowData) => {
      // create a regular row for each line item
      rows.push(this.regularRow(rowData));
    });

    // create a placeholder depending on the placeholder state
    if (this.state.placeholder) { rows.push(this.placeholderRow()); }
    // if gutter fields have been defined, create a gutter row
    if (this.props.gutter) { rows.push(this.gutterRow()); }

    return rows;
  }

  /**
   * Builds a regular row based on a line item of data.
   *
   * @method regularRow
   * @param {Object} rowData The data to supply to the row's fields
   * @return {Object} The constructed row
   */
  regularRow = (rowData) => {
    // the the _row_id (all line items should have a _row_id defined)
    let rowID = rowData.get('_row_id');

    // determine if the placeholder has now been converted to a regular row, if
    // it has then generate a new ID to use for the placeholder row.
    if (this.placeholderID == rowID) {
      this.placeholderID = new Date().getTime();
    }

    return(<TableRow
      name={ this.props.name }
      key={ rowID }
      row_id={ rowID }
      data={ rowData }
      fields={ this.props.fields }
      forceUpdate={ this.childrenHaveChanged }
      deleteRowHandler={ this.props.deleteRowHandler }
      updateRowHandler={ this.props.updateRowHandler }
    />);
  }

  /**
   * Build a row to be rendered along the bottom of the grid.
   *
   * @method gutterRow
   * @return {Object} The constructed gutter row
   */
  gutterRow = () => {
    return(<TableRow
      key="gutter"
      fields={ this.props.fields }
      gutterFields={ this.props.gutter }
    />);
  }

  /**
   * Build a row to be used as a placeholder in the grid.
   *
   * @method placeholderRow
   * @return {Object} The constructed placeholder row
   */
  placeholderRow = () => {
    return(<TableRow
      name={ this.props.name }
      key={ this.placeholderID }
      placeholder="true"
      row_id={ this.placeholderID }
      fields={ this.props.fields }
      updateRowHandler={ this.props.updateRowHandler }
    />);
  }

  /**
   * Builds a header to run across the top of the grid.
   *
   * @method buildHeader
   * @return {Object} The constructed header
   */
  buildHeader = () => {
    let headings = [];

    // add an empty header for the actions column
    headings.push(<th key='actions' className="ui-input-grid__header-cell"></th>);

    // iterate through each field to build a header for it
    this.props.fields.forEach((field) => {
      let columnClasses = "ui-input-grid__header-cell";

      // add any additional classes for this column
      if (this.props.columnClasses) {
        if (this.props.columnClasses[field.props.name]) {
          columnClasses += ` ${this.props.columnClasses[field.props.name]}`;
        }
      }

      // add the header for this column
      headings.push(
        <th hidden={field.props.hidden} className={ columnClasses } key={ field.props.name }>
          { tableHeaderName(field.props.name) }
        </th>
      );
    });

    return headings;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <table className="ui-input-grid">
        <thead>
          <tr className="ui-input-grid__header">
            { this.buildHeader() }
          </tr>
        </thead>
        <tbody>
          { this.buildRows() }
        </tbody>
      </table>
    );
  }
}

/**
 * Converts a string into a title case string.
 *
 * @method tableHeaderName
 * @param {String} value
 * @private
 * @return {String} The converted value
 */
function tableHeaderName(value) {
  return _.startCase(value);
}

/**
 * Determines if the number of child fields have changed.
 *
 * @method hasNumOfChildrenChanged
 * @param {Object} prevProps
 * @param {Object} nextProps
 * @private
 * @return {Boolean} Whether the number of children has changed
 */
function hasNumOfChildrenChanged(prevProps, nextProps) {
  let prevNumOfChildren = prevProps.fields.length,
      nextNumOfChildren = nextProps.fields.length;

  if (prevNumOfChildren != nextNumOfChildren) {
    return true;
  }

  return false;
}

/**
 * Determines if any props have changed on the fields.
 *
 * @method hasPropsOfChildrenChanged
 * @param {Object} prevProps
 * @param {Object} nextProps
 * @private
 * @return {Boolean} Whether the props have changed on the fields
 */
function hasPropsOfChildrenChanged(prevProps, nextProps) {
  for (let key in nextProps.fields) {
    let prevField = prevProps.fields[key],
        nextField = nextProps.fields[key];

    // compare the two fields properties
    if (!_.isEqual(prevField.props, nextField.props)) {
      return true;
    }
  }

  return false;
}

export default InputGrid;
