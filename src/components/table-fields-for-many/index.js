import React from 'react';
import _ from 'lodash';
import TableRow from './../table-row';
import  _string from 'string';

class TableFieldsForMany extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    updateRowHandler: React.PropTypes.func.isRequired,
    deleteRowHandler: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    form: React.PropTypes.object
  }

  state = {
    placeholder: true
  }

  i18n = (value) => {
    return  _string(value).humanize().titleCase().s;
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

  componentWillMount = () => {
    this.context.form.attachToForm(this);
  }

  componentWillUnmount = () => {
    this.context.form.detachFromForm(this);
  }

  buildRows = () => {
    var rows = [];

    this.props.data.forEach((rowData) => {
      rows.push(this.newRow(rowData));
    });

    if (this.state.placeholder) {
      rows.push(this.placeholderRow());
    }

    if (this.props.gutter) {
      rows.push(this.gutterRow());
    }

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

  gutterRow = () => {
    return(<TableRow
      key="gutter"
      fields={ this.props.fields }
      gutterFields={ this.props.gutter }
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

  buildHeader = () => {
    var headings = [];

    headings.push(<th key='delete-action' className="ui-table-fields-for-many__header-cell"></th>);

    this.props.fields.forEach((field) => {
      var columnClasses = "ui-table-fields-for-many__header-cell";

      if (this.props.columnClasses[field.props.name]) {
        columnClasses += " ui-table-fields-for-many__header-cell--" + this.props.columnClasses[field.props.name];
      }

      headings.push(
        <th className={ columnClasses } key={ field.props.name }>
          { this.i18n(field.props.name) }
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
      <table className="ui-table-fields-for-many">
        <thead>
          <tr className="ui-table-fields-for-many__header">
            { this.buildHeader() }
          </tr>
        </thead>
        <tbody>
          { this.buildRows() }
        </tbody>
      </table>
    );
  }
};

export default TableFieldsForMany;
