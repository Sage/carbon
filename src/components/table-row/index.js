import React from 'react';
import Icon from 'utils/icon';

class TableRow extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.childPropsHaveChanged) {
      return true;
    }

    if (this.isImmutable()) {
      return (nextProps.data !== this.props.data);
    } else {
      // if not using immutable then return true
      return true;
    }
  }

  buildRow = () => {
    var row = [],
        rowID = this.props.row_id;

    if (!this.props.placeholder) {
      row.push(
        <td key={ rowID + 'actions' } className="ui-table-row__td">
          <button className="ui-table-row__delete" id={ rowID } onClick={this.deleteMethod}>
            <Icon type="delete" className="ui-table-row__delete-icon" />
          </button>
        </td>
      );
    } else {
      row.push(<td key={ rowID + 'actions' } className="ui-table-row__td"></td>);
    }

    for (var key in this.props.fields) {
      var field = this.props.fields[key];

      if (field) {
        var value = this.get(this.props.data, field.props.name) || "";
        row.push(this.buildCell(field, value));
      }
    }

    return row;
  }

  deleteMethod = (ev) => {
    ev.preventDefault();
    this.props.deleteRowHandler(ev, this.props);
  }

  buildCell = (field, value) => {
    var rowID = this.props.row_id,
        fieldProps = {
          value: value,
          label: false,
          key: rowID,
          row_id: rowID,
          namespace: this.props.name,
          onChange: this.props.updateRowHandler
        };

    if (this.props.placeholder) {
      fieldProps._placeholder = true
    }

    var fieldHTML = React.cloneElement(field, fieldProps);

    return <td key={ rowID + field.props.name } className="ui-table-row__td">{ fieldHTML }</td>;
  }

  isImmutable = () => {
    return typeof this.props.data.get === 'function';
  }

  get = (data, key) => {
    if (this.isImmutable()) {
      return data.get(key);
    } else {
      return data[key];
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <tr className="ui-table-row">
        { this.buildRow() }
      </tr>
    );
  }

};

export default TableRow;
