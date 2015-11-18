import React from 'react';
import Icon from './../icon';

/**
 * A table row widget for use in an input grid. This is virtually a subcomponent of InputGrid.
 * Using it outside of InputGrid would require extending TableRow.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  /**
   * Only renders component if data has changed, or if the row has
   * forceUpdate set to true or is a gutter row
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps
   */
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.forceUpdate) { return true; }

    if (nextProps.gutterFields) { return true; }

    return (nextProps.data !== this.props.data);
  }

  /**
   * Builds row inlcuding buttons, classnames & optional gutterfields.
   *
   * @method buildRpw
   */
  buildRow = () => {
    let row = [],
        rowID = this.props.row_id;

    // If row is not a placeholder or gutterfield add delete button.
    if (!this.props.placeholder && !this.props.gutterFields) {
      row.push(
        <td key={ rowID + 'actions' } className="ui-table-row__td ui-table-row__td--actions">
          <button type="button" className="ui-table-row__delete" id={ rowID } onClick={this.deleteMethod}>
            <Icon type="delete" className="ui-table-row__delete-icon" />
          </button>
        </td>
      );
    }
    else {
      let tdClass = "ui-table-row__td ui-table-row__td--actions";

      if (this.props.gutterFields) { tdClass += " ui-table-row__td--gutter"; }

      row.push(<td key={ rowID + 'actions' } className={ tdClass }></td>);
    }

    // Builds fields for row
    for (let key in this.props.fields) {
      let field = this.props.fields[key];

      // Adds gutterfields if present
      if (this.props.gutterFields) {
        let gutterField = this.props.gutterFields[field.props.name];
        row.push(<td hidden={ field.props.hidden } key={ key + "gutter" } className="ui-table-row__td ui-table-row__td--gutter">{ gutterField }</td>);
      }

      // Uses buildCell to build cell with appropriate values
      else {
        let value = (this.props.data) ? this.props.data.get(field.props.name) : null;
        row.push(this.buildCell(field, value));
      }
    }

    return row;
  }

  /**
   * Calls delete row handler
   *
   * @method buildRpw
   * @param {Object}
   */
  deleteMethod = (ev) => {
    ev.preventDefault();
    this.props.deleteRowHandler(ev, this.props);
  }

  /**
   * Build each cell with appropriate values and attributes.
   *
   * @method buildCell
   * @param {Object} field
   * @param {String | Number | Boolean} value
   */
  buildCell = (field, value) => {
    let rowID = this.props.row_id,
        fieldProps = {
          label: false,
          key: rowID,
          name: `[${this.props.name}_attributes][${rowID}][${field.props.name}]`,
          row_id: rowID,
          namespace: this.props.name,
          onChange: this.props.updateRowHandler
        };

    if (typeof value !== 'undefined') {
      fieldProps.value = value;
    }

    if (this.props.placeholder) { fieldProps._placeholder = true; }

    let fieldHTML = React.cloneElement(field, fieldProps);

    return <td hidden={ field.props.hidden } key={ rowID + field.props.name } className="ui-table-row__td">{ fieldHTML }</td>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let mainClasses = "ui-table-row";

    if (this.props.gutterFields) { mainClasses += " ui-table-row--gutter"; }

    return (
      <tr className={ mainClasses }>
        { this.buildRow() }
      </tr>
    );
  }
}

export default TableRow;
