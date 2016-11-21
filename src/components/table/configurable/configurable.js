import React from 'react';
import Dialog from './../../dialog';
import { Table, TableHeader, TableCell, TableRow } from './../table';
import Form from './../../form';
import Checkbox from './../../checkbox';
import { includes, capitalize, pull, trim, snakeCase } from 'lodash';

class Configurable extends React.Component {

  // static propTypes = {
  //   // Columns currenly selected
  //   columns: React.PropTypes.object,
  //   // All Posibile columns
  //   availableColumns: React.PropTypes.object,
  //   // Columns selected that can't be unselected
  //   lockedColumns: React.PropTypes.object
  //
  // }

  constructor(...args) {
    super(...args);

    this.rows = this.rows.bind(this);
    this.reloadState = this.reloadState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.reloadState();
  }

  static defaultProps = {
    availableColumns: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) { // If opening
      this.reloadState();
    }
  }

  // TODO don't pass boolean, separate to two methods
  toggleCheckedColumn(column, checked) {
    let newColumns;
    if (checked) {
      newColumns = this.state.columns.filter(col => col !== column );
    } else {
      newColumns = this.state.columns.push(column);
    }
    this.setState({ columns: newColumns });
  }

  onSubmit(ev) {
    ev.preventDefault();
    if (this.props.updateColumns) {
      this.props.updateColumns(this.state);
    }
  }

  render() {
    return (
      <Dialog
        open={ this.props.open }
        onCancel={ this.props.onCancel }
        title='Configurable'
      >
        <Form
          onCancel={ this.props.onCancel }
          onSubmit={ this.onSubmit }
        >
          <Table>
            { this.rows() }
          </Table>
        </Form>
      </Dialog>
    )
  }

  rows() {
    return this.state.availableColumns.map((column, index) => {
      let checked = this.state.columns.includes(column);
      return (
        <TableRow key={ index }>
          <TableCell>
            <Checkbox
              checked={ checked }
              onClick={ this.toggleCheckedColumn.bind(this, column, checked) }
              disabled={ this.state.lockedColumns.includes(column) }
            />
          </TableCell>
          <TableCell>
            { this.humanize(column) }
          </TableCell>
        </TableRow>
      );
    });
  }

  reloadState() {
    this.state = {
      availableColumns: this.props.availableColumns,
      columns: this.props.columns,
      lockedColumns: this.props.lockedColumns
    }
  }

  // TODO: Move to helper
  humanize(str) {
    return capitalize(trim(snakeCase(str).replace(/_id$/, '').replace(/_/g, ' ')));
  }
}

export default Configurable;
