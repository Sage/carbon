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
    addRowHandler: React.PropTypes.func.isRequired,
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

    if (this.isImmutable()) {
      // iterate through immutable object
      this.props.data.forEach((rowData) => {
        rows.push(this.newRow(rowData));
      });
    } else {
      // iterate through standard object
      for (var key in this.props.data) {
        var rowData = this.props.data[key];
        rows.push(this.newRow(rowData));
      };
    }

    rows.push(this.placeholderRow());

    return rows;
  }

  newRow = (rowData) => {
    if (this.placeholderID == this.get(rowData, 'id')) {
      this.placeholderID = new Date().getTime()
    }
    return(<TableRow
      name={ this.props.name }
      key={ this.get(rowData, 'id') }
      data={ rowData }
      fields={ this.props.fields }
      childPropsHaveChanged={ this.childPropsHaveChanged }
      deleteRowHandler={ this.props.deleteRowHandler }
    />);
  }

  placeholderRow = () => {
    var placeholderData = {
      id: this.placeholderID
    };

    return(<TableRow 
      name={ this.props.name }
      key={ placeholderData.id }
      placeholder="true"
      data={ placeholderData }
      fields={ this.props.fields }
      addRowHandler={ this.props.addRowHandler }
    />);
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
      <table className="ui-table-fields-for-many">
        <tbody>
          { this.buildRows() }
        </tbody>
      </table>
    );
  }

};

export default TableFieldsForMany;
