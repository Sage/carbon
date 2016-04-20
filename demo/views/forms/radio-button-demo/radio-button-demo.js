import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';
import Immutable from 'immutable'

import RadioButton from 'components/radio-button';
import Checkbox from 'components/checkbox';
import Textbox from 'components/textbox';
import Row from 'components/row';
import Icon from 'components/icon';
import Button from 'components/button';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class RadiButtonDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['radio_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'radio_button');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        {
          this.value('columnData').map((data, index) => {
            return(
              <RadioButton
                key={ index }
                name={ data.get('name') }
                value={ data.get('value') }
                label={ data.get('label') }
                labelHelp={ data.get('labelHelp') }
                helpMessage={ this.value('helpMessage')}
              />
            );
          }).toJS()
        }
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import RadioButton from 'carbon/lib/components/radio-button';\n\n";


    this.value('columnData').forEach((data, index) => {
      html += "<RadioButton";
      html += `\n  name='${ data.get('name') || '' }'`
      html += `\n  value='${ data.get('value') || '' }'`
      html += `\n  label='${ data.get('label') || '' }'`
      html += `\n  labelHelp='${ data.get('labelHelp') || '' }'`
      html += '\n/>\n\n';
    });

    return html;
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
        null : <Icon type="delete" onClick={ AppActions.appDeleteRow.bind(this, ['radio_button', 'columnData', index]) } />;

      return (
        <TableRow key={ index }>
          <TableCell action={ true }>
            { deleteCell }
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('name') }
              onChange={ this.action.bind(this, ['columnData', index, 'name']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('value') }
              onChange={ this.action.bind(this, ['columnData', index, 'value']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('label') }
              onChange={ this.action.bind(this, ['columnData', index, 'label']) }
            />
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('labelHelp') }
              onChange={ this.action.bind(this, ['columnData', index, 'labelHelp']) }
            />
          </TableCell>
        </TableRow>
      );
    });

    // table header:
    tableRows = tableRows.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Name</TableHeader>
        <TableHeader>Value</TableHeader>
        <TableHeader>Label</TableHeader>
        <TableHeader>LabelHelp</TableHeader>
      </TableRow>
    );

    tableRows = tableRows.push(
      <TableRow key={ length }>
        <TableCell />
        <TableCell>
          <Button onClick={ this.action.bind(this, ['columnData', length, 'foo']) } disabled={ length == 12 }>Add Radio Button</Button>
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    );

    return (
      <div>
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
        title="Radio Button"
        readme="components/radio-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(RadiButtonDemo, AppStore);
