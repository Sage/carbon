import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import { Table, TableHeader, TableRow, TableCell } from 'components/table';
var Immutable = require('immutable');

import Row from 'components/row';
import Message from 'components/message';
import Filter from 'components/filter';
import Textbox from 'components/textbox';
import Dropdown from 'components/dropdown';
import ShouldComponentUpdate from 'utils/decorators/should-component-update';
import PresenceValidator from 'utils/validations/presence';
import EmailValidator from 'utils/validations/email';

const TableFormRow = ShouldComponentUpdate(
class TableFormRow extends React.Component {

  get cellAction() {
    return AppActions.appTableCellUpdated;
  }

  render() {
    console.log('render TableFormRow')
    let index = this.props.index;
    let row_data = this.props.row_data;
    return (
      <TableRow key={ index }>
        <TableCell>
          <Textbox
            value={ row_data.get('column_1') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_1', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_2') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_2', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_3') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_3', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_4') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_4', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_5') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_5', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_6') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_6', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_7') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_7', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_8') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_8', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Textbox
            value={ row_data.get('column_9') }
            validations={ [ new PresenceValidator() ] }
            onChange={ this.cellAction.bind(this, index, 'column_9', 'table_form') }
          />
        </TableCell>
        <TableCell>
          <Dropdown
            value={ row_data.get('column_10') }
            options={ this.props.cell_options }
            onChange={ this.cellAction.bind(this, index, 'column_10', 'table_form') }
          />
        </TableCell>
      </TableRow>
    );
  }
});

export default TableFormRow;
