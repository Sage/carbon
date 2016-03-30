import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import { Table, TableHeader, TableRow, TableCell } from 'components/table';

import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Message from 'components/message';

class TableDemo extends React.Component {
  /**
   * @method componentWillMount
   */
  componentWillMount() {
    AppActions.appTableManuallyUpdated('table');
  }

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['table', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'table');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Table
        currentPage={ this.value('current_page') }
        onChange={ AppActions.appTableManuallyUpdated.bind(this, 'table') }
        pageSize={ this.value('page_size') }
        paginate={ this.value('paginate') }
        showPageSizeSelection={ this.value('show_page_size_selection') }
        totalRecords={ this.value('total_records') }
      >
        { this.tableRows }
      </Table>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { Table, TableHeader, TableRow, TableCell } from 'carbon/lib/components/table';\n\n";

    html += "let tableRows = [],\n";
    html += "    countries = this.state.store.get('countries');\n\n";

    html += "tableRows.push(\n";
    html += "  <TableRow>\n";
    html += "    <TableHeader>Code</TableHeader>\n";
    html += "    <TableHeader>Country</TableHeader>\n";
    html += "  </TableRow>\n";
    html += ");\n\n";

    html += "tableRows = tableRows.concat(countries.map((country) => {\n";
    html += "  <TableRow>\n";
    html += "    <TableCell>{ country.get('code') }</TableCell>\n";
    html += "    <TableCell>{ country.get('name') }</TableCell>\n";
    html += "  </TableRow>\n";
    html += "}));\n\n";

    html += "<Table";

    if (this.value('paginate')) {
      html += "\n  paginate={true}\n";
      html += `  currentPage='${this.value('current_page')}'\n`;
      html += "  onChange={Actions.tableUpdated}\n";
      html += `  pageSize='${this.value('page_size')}'\n`;
      html += `  showPageSizeSelection={${this.value('show_page_size_selection')}}\n`;
      html += `  totalRecords='${this.value('total_records')}'\n`;
    }

    html += ">\n";
    html += "  { tableRows }\n";
    html += "</Table>";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let warning = null;

    if (this.value('paginate')) {
      warning = (
        <Row>
          <Message as="warning">If you want to use pagination, we recommend you use TableAjax instead as it will do a lot of the work for you.</Message>
        </Row>
      );
    }

    return (
      <div>
        <Row>
          <Checkbox
            label="Paginate"
            value={ this.value('paginate') }
            onChange={ this.action.bind(this, 'paginate') }
          />
          <Checkbox
            label="Show Page Size Selection"
            value={ this.value('show_page_size_selection') }
            onChange={ this.action.bind(this, 'show_page_size_selection') }
            disabled={ !this.value('paginate') }
          />
        </Row>
        { warning }
      </div>
    );
  }

  /**
   * @method tableRows
   */
  get tableRows() {
    let data = this.state.appStore.getIn(['table', 'data']),
        rows = [];

    rows.push(
      <TableRow key="header">
        <TableHeader style={{ width: "75px" }}>
          Code
        </TableHeader>
        <TableHeader>
          Country
        </TableHeader>
      </TableRow>
    );

    return rows.concat(data.map((row, index) => {
      return (
        <TableRow key={ index }>
          <TableCell>{ row.get('value') }</TableCell>
          <TableCell>{ row.get('name') }</TableCell>
        </TableRow>
      );
    }));
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Table"
        readme="components/table"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TableDemo, AppStore);
