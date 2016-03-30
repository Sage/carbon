import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import { TableAjax, TableHeader, TableRow, TableCell } from 'components/table-ajax';

import Row from 'components/row';
import Checkbox from 'components/checkbox';

class TableAjaxDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['table_ajax', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'table_ajax');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <TableAjax
        showPageSizeSelection={ this.value('show_page_size_selection') }
        pageSize={ this.value('page_size') }
        paginate={ this.value('paginate') }
        path="/countries"
        onChange={ AppActions.appTableUpdated.bind(this, "table_ajax") }
      >
        { this.tableRows }
      </TableAjax>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { TableAjax, TableHeader, TableRow, TableCell } from 'carbon/lib/components/table-ajax';\n\n";

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

    html += "<TableAjax\n";

    if (this.value('show_page_size_selection')) {
      html += "  showPageSizeSelection={true}\n";
    }

    if (!this.value('paginate')) {
      html += "  paginate={false}\n";
    }

    if (this.value('page_size') != "10") {
      html += `  pageSize='${this.value('page_size')}'\n`;
    }

    html += "  path='/countries'\n";
    html += "  onChange={Actions.tableUpdated}\n";
    html += ">\n";
    html += "  { tableRows }\n";
    html += "</TableAjax>";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
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
      </div>
    );
  }

  /**
   * @method tableRows
   */
  get tableRows() {
    let data = this.state.appStore.getIn(['table_ajax', 'data']),
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
        title="Table Ajax"
        readme="components/table-ajax"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TableAjaxDemo, AppStore);
