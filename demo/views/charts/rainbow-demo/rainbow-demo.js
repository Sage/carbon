import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Rainbow from 'components/rainbow';
import Row from 'components/row';
import Textbox from 'components/textbox';
import NumberInput from 'components/number';
import Icon from 'components/icon';
import Button from 'components/button';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class RainbowDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['rainbow', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'rainbow');
  }

  /**
   * @method demo
   */
  get demo() {
    // highcharts requires y value to be a number
    let chartData = this.value('data').map((slice) => {
      return slice.set('y', Number(slice.get('y')));
    });

    return (
      <Rainbow
        title={ this.value('title') }
        data={ chartData }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Rainbow from 'carbon/lib/components/rainbow';\n\n";

    html += "<Rainbow";

    if (this.value('title')) {
      html += `\n  title='${this.value('title')}'`;
    }

    html += "\n/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let tableRows = Immutable.List(),
        length = this.value('data').count();

    // table rows:
    tableRows = this.value('data').map((data, index) => {
      let deleteCell = length == 2 ?
        null : <Icon type="delete" onClick={ AppActions.appDeleteRow.bind(this, ['rainbow', 'data', index]) } />;

      return (
        <TableRow key={ index }>
          <TableCell action={ true }>
            { deleteCell }
          </TableCell>

          <TableCell>
            <NumberInput
              label={ false }
              value={ data.get('y') }
              onChange={ this.action.bind(this, ['data', index, 'y']) }
              placeholder="Enter a percentage"
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('name') }
              onChange={ this.action.bind(this, ['data', index, 'name']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('label') }
              onChange={ this.action.bind(this, ['data', index, 'label']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('tooltip') }
              onChange={ this.action.bind(this, ['data', index, 'tooltip']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('color') }
              onChange={ this.action.bind(this, ['data', index, 'color']) }
            />
          </TableCell>
        </TableRow>
      );
    });

    // table header:
    tableRows = tableRows.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Percent</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Label</TableHeader>
        <TableHeader>Tooltip</TableHeader>
        <TableHeader>Color</TableHeader>
      </TableRow>
    );

    // create row:
    tableRows = tableRows.push(
      <TableRow key={ length }>
        <TableCell />
        <TableCell>
          <Button onClick={ this.action.bind(this, ['data', length, 'y'], { target: { value: '0' } }) } disabled={ length == 12 }>Add Slice</Button>
        </TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    );

    return (
      <div>
        <Row columns="3">
          <Textbox
            label="Title"
            value={ this.value('title') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'title') }
            columnSpan="2"
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
        title="Rainbow"
        readme="components/rainbow"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(RainbowDemo, AppStore);
