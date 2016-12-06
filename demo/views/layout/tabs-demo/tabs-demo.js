import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import { Tabs, Tab } from 'components/tabs';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';
import Button from 'components/button';
import Row from 'components/row';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class TabsDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['tabs', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'tabs');
  }

  get tabs() {
    return this.value('tabData').map((data, index) => {
      let title = data.get('title') || `Title ${index + 1}`,
          id = `tab${index + 1}`,
          content = `This is the content for tab ${index + 1}`;

      return (
        <Tab title={ title } key={ id } tabId={ id } >
          { content }
        </Tab>
      );
    }).toJS();
  }


  get align() {
    return this.value('align') ? 'right' : 'left';
  }

  get position() {
    return this.value('position') || 'top';
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Tabs align={ this.align } position={ this.position }>
        { this.tabs }
      </Tabs>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { Tabs, Tab } from 'carbon/lib/components/tabs';\n\n";

    html += '<Tabs';

    if (this.value('align')) {
      html += ` align='right'`
    }

    if (this.value('position')) {
      html += ` position='${this.value('position')}'`
    }

    html += ' >\n\n'

    this.value('tabData').map((data, index) => {
      let title = data.get('title') || `Title ${index + 1}`,
          id = `tab${index + 1}`,
          content = `    This is the content for tab ${index + 1}`;

      html += `  <Tab title='${title}' tabId='${id}'>`;

      html += `\n`;
      html += content;
      html += `\n`;
      html += `  </Tab>`;
      html += `\n\n`;
    });

    html += '</Tabs>'

    return html;
  }

  /**
   * @method positionOptions
  */
  get positionOptions() {
    return Immutable.fromJS([{
      id: "top",
      name: "Top"
    }, {
      id: "left",
      name: "Left"
    }]);
  }

  /**
   * @method controls
   */
  get controls() {
    let tableRows = Immutable.List(),
        length = this.value('tabData').count();

    // table rows:
    tableRows = this.value('tabData').map((data, index) => {
      let deleteCell = length == 1 ?
        null : <Icon type="delete" onClick={ AppActions.appDeleteRow.bind(this, ['tabs', 'tabData', index]) } />;

      return (
        <TableRow key={ index }>

          <TableCell action={ true }>
            { deleteCell }
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('title') }
              onChange={ this.action.bind(this, ['tabData', index, 'title']) }
              placeholder={ `Enter Tab Title` }
            />
          </TableCell>

        </TableRow>
      );
    });

    // table header:
    tableRows = tableRows.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Title</TableHeader>
      </TableRow>
    );

    // create row:
    tableRows = tableRows.push(
      <TableRow key={ length }>
        <TableCell />
        <TableCell>
          <Button onClick={ this.action.bind(this, ['tabData', length, 'foo']) } disabled={ length == 8 }>Add Column</Button>
        </TableCell>
        <TableCell />
      </TableRow>
    );

    return (
      <div>
        <Row>
          <Checkbox
            label="Align Right"
            value={ this.value('align') }
            reverse={ true }
            onChange={ this.action.bind(this, 'align') }
          />
        </Row>
        <Row>
          <Dropdown
            label="Position"
            labelInline={ true }
            value={ this.value('position') }
            onChange={ this.action.bind(this, 'position') }
            options={ this.positionOptions }
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
        title='Tabs'
        readme='components/tabs'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }

}

export default connect(TabsDemo, AppStore);
