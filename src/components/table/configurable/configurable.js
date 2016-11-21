import React from 'react';
import Dialog from './../../dialog';
import { Table, TableHeader, TableCell, TableRow } from './../table';
import Form from './../../form';
import Checkbox from './../../checkbox';
import { includes, pull } from 'lodash';

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

  toggleCheckedColumn(column, checked) {
    let newColumns;
    if (checked) {
      newColumns= pull(this.state.columns, column);
    } else {
      newColumns = this.state.columns.push(column);
    }
    this.setState({ columns: newColumns });
  }

  reloadState() {
    this.state = {
      availableColumns: this.props.availableColumns,
      columns: this.props.columns,
      lockedColumns: this.props.lockedColumns
    }
  }

  render() {
    return (
      <Dialog
        open={ this.props.open }
        onCancel={ this.props.onCancel }
        title='Configurable'
      >
        <Form>
          <Table>
            { this.rows() }
          </Table>
        </Form>
      </Dialog>
    )
  }

  rows() {
    return this.state.availableColumns.map((column, index) => {
      let checked = includes(this.state.columns, column);
      return (
        <TableRow key={ index }>
          <TableCell>
            <Checkbox
              checked={ checked }
              onClick={ this.toggleCheckedColumn.bind(this, column, checked) }
              disabled={ includes(this.state.lockedColumns, column) }
            />
          </TableCell>
          <TableCell>
            { column }
          </TableCell>
        </TableRow>
      );
    });
  }
}

export default Configurable;
