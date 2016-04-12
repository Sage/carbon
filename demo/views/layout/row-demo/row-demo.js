import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Icon from 'components/icon';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Number from 'components/number';
import Dropdown from 'components/dropdown';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class RowDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['row', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'row');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Row columns={ this.value('columns') }>
        {
          this.value('columnData').map((data, index) => {
            return (
              <div
                key={ index }
                columnOffset={ data.get('columnOffset') }
                columnSpan={ data.get('columnSpan') }
                columnAlign={ data.get('columnAlign') }
              >Foobar</div>
            );
          }).toJS()
        }
      </Row>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Row from 'carbon/lib/components/row';\n\n";

    html += "<Row";

    if (this.value('columns')) {
      html += `\n  columns='${this.value('columns')}'\n`;
    }

    html += ">\n";

    this.value('columnData').forEach((data, index) => {
      html += "  <Textbox";

      if (data.get('columnOffset')) {
        html += `\n    columnOffset='${data.get('columnOffset')}'`;
      }

      if (data.get('columnSpan')) {
        html += `\n    columnSpan='${data.get('columnSpan')}'`;
      }

      if (data.get('columnSpan') || data.get('columnOffset')) {
        html += "\n ";
      }

      html += " />\n";
    });

    html += "</Row>\n\n";

    return html;
  }

  /**
   * @method alignOptions
   * @return {Object}
   */
  get alignOptions() {
    return Immutable.fromJS([{
      id: 'left',
      name: 'Left'
    }, {
      id: 'center',
      name: 'Center'
    }, {
      id: 'right',
      name: 'Right'
    }]);
  }

  /**
   * @method controls
   */
  get controls() {
    let tableRows = Immutable.List(),
        length = this.value('columnData').count();

    // table rows:
    tableRows = this.value('columnData').map((data, index) => {
      let deleteCell = length == 1 ?
        null : <Icon type="delete" onClick={ AppActions.appDeleteRow.bind(this, ['row', 'columnData', index]) } />;

      return (
        <TableRow key={ index }>
          <TableCell action={ true }>
            { deleteCell }
          </TableCell>

          <TableCell>
            <Number
              label={ false }
              value={ data.get('columnOffset') }
              onChange={ this.action.bind(this, ['columnData', index, 'columnOffset']) }
              placeholder={ `Enter 1-${length - 1}` }
            />
          </TableCell>

          <TableCell>
            <Number
              label={ false }
              value={ data.get('columnSpan') }
              onChange={ this.action.bind(this, ['columnData', index, 'columnSpan']) }
              placeholder={ `Enter 2-${length - 1}` }
            />
          </TableCell>

          <TableCell>
            <Dropdown
              label={ false }
              value={ data.get('columnAlign') }
              onChange={ this.action.bind(this, ['columnData', index, 'columnAlign']) }
              options={ this.alignOptions }
            />
          </TableCell>
        </TableRow>
      );
    });

    // table header:
    tableRows = tableRows.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Column Offset</TableHeader>
        <TableHeader>Column Span</TableHeader>
        <TableHeader>Column Align</TableHeader>
      </TableRow>
    );

    // create row:
    tableRows = tableRows.push(
      <TableRow key={ length }>
        <TableCell />
        <TableCell>
          <Button onClick={ this.action.bind(this, ['columnData', length, 'foo']) } disabled={ length == 12 }>Add Column</Button>
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    );

    return (
      <div>
        <Row>
          <Number
            label="Columns"
            value={ this.value('columns') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'columns') }
            placeholder="Enter a fixed number of columns"
          />
        </Row>

        <Row>
          <Table>{ tableRows }</Table>
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Row"
        readme="components/row"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(RowDemo, AppStore);
