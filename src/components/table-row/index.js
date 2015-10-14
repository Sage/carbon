import React from 'react';

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
        id = this.get(this.props.data, 'id');

    if (!this.props.placeholder) {
      row.push(<td key={ id + 'actions' }><button id={ id } onClick={this.props.deleteRowHandler}>X</button></td>);
    } else {
      row.push(<td key={ id + 'actions' }></td>);
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

  buildCell = (field, value) => {
    var id = this.get(this.props.data, 'id'),
        fieldProps = {
      value: value,
      label: false,
      key: id,
      row_id: id,
      namespace: this.props.name
    };

    if (this.props.placeholder) {
      fieldProps._placeholder = true
      fieldProps.onChange = this.props.addRowHandler;
    }

    var fieldHTML = React.cloneElement(field, fieldProps);

    return <td key={ id + field.props.name }>{ fieldHTML }</td>;
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
