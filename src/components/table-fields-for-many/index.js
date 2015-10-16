import React from 'react';
import _ from 'lodash';
import TableRow from './../table-row';

class TableFieldsForMany extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    updateRowHandler: React.PropTypes.func.isRequired,
    deleteRowHandler: React.PropTypes.func.isRequired
  }

  placeholderID = new Date().getTime()

  shouldComponentUpdate = (nextProps) => {
    // check if children have changed
    this.childPropsHaveChanged = false;

    if (this.hasNumOfChildrenChanged(this.props, nextProps) ||
        this.hasPropsOfChildrenChanged(this.props, nextProps)) {
      this.childPropsHaveChanged = true;
    }

    return true;
  }

  hasNumOfChildrenChanged = (prevProps, nextProps) => {
    var prevNumOfChildren = prevProps.fields.length,
        nextNumOfChildren = nextProps.fields.length;

    if (prevNumOfChildren != nextNumOfChildren) {
      return true;
    }

    return false;
  }

  hasPropsOfChildrenChanged = (prevProps, nextProps) => {
    for (var key in nextProps.fields) {
      var prevField = prevProps.fields[key],
          nextField = nextProps.fields[key];

      if (prevField && nextField) {
        if (!_.isEqual(prevField.props, nextField.props)) {
          return true;
          break;
        }
      }
    }

    return false;
  }

  childPropsHaveChanged = false

  buildRows = () => {
    var rows = [];

    this.props.data.forEach((rowData) => {
      rows.push(this.newRow(rowData));
    });

    rows.push(this.placeholderRow());

    return rows;
  }

  newRow = (rowData) => {
    var rowID = rowData.get('_row_id');

    if (this.placeholderID == rowID) {
      this.placeholderID = new Date().getTime()
    }
    return(<TableRow
      name={ this.props.name }
      key={ rowID }
      row_id={ rowID }
      data={ rowData }
      fields={ this.props.fields }
      childPropsHaveChanged={ this.childPropsHaveChanged }
      deleteRowHandler={ this.props.deleteRowHandler }
      updateRowHandler={ this.props.updateRowHandler }
    />);
  }

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
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <table className="ui-table-fields-for-many">
        <tbody>
          { this.buildRows() }
        </tbody>
      </table>
    );
  }

};

export default TableFieldsForMany;
