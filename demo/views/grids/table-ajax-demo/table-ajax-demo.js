import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import { TableAjax, TableHeader, TableRow, TableCell } from 'components/table-ajax';

import Row from 'components/row';
import Filter from 'components/filter';
import Textbox from 'components/textbox';
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
    let filter, filterHtml;

    if (this.value('enable_filter')) {
      let align = this.value('filter_align_right') ? "right" : "left";
      filter = this.value('filter');
      filterHtml = (
        <Filter align={ align }>
          <Textbox
            value={ filter.get('name') }
            onChange={ this.action.bind(this, ['filter', 'name']) }
            label="Country"
            labelInline={ true }
          />
        </Filter>
      );
    }

    let actions = [{
      text: "Add Subscriptions",
      icon: "basket"
    }, {
      text: "Delete",
      icon: "bin"
    }];

    return (
      <div>
        { filterHtml }

        <TableAjax
          actions={ actions }
          filter={ filter }
          onChange={ AppActions.appTableUpdated.bind(this, "table_ajax") }
          pageSize={ this.value('page_size') }
          paginate={ this.value('paginate') }
          path="/countries"
          selectable={ this.value('selectable') }
          highlightable={ this.value('highlightable') }
          showPageSizeSelection={ this.value('show_page_size_selection') }
          shrink={ this.value('shrink') }
          thead={ this.tableHeaderRow }
        >
          { this.tableRows }
        </TableAjax>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { TableAjax, TableHeader, TableRow, TableCell } from 'carbon/lib/components/table-ajax';\n";

    if (this.value('enable_filter')) {
      html += "import Filter from 'carbon/lib/components/filter';\n";
    }

    html += "\n";

    html += "let tableRows = [],\n";
    html += "    countries = this.state.store.get('countries');\n\n";

    html += "tableRows.push(\n";
    html += "  <TableRow>\n";
    html += "    <TableHeader";

    if (this.value('sortable')) {
      html += " sortable={true} name='name'";
    }

    html += ">Country</TableHeader>\n";
    html += "    <TableHeader";

    if (this.value('sortable')) {
      html += " sortable={true} name='value'";
    }

    html += ">Code</TableHeader>\n";
    html += "  </TableRow>\n";
    html += ");\n\n";

    html += "tableRows = tableRows.concat(countries.map((country) => {\n";
    html += "  <TableRow>\n";
    html += "    <TableCell>{ country.get('name') }</TableCell>\n";
    html += "    <TableCell>{ country.get('code') }</TableCell>\n";
    html += "  </TableRow>\n";
    html += "}));\n\n";

    if (this.value('enable_filter')) {
      html += "<Filter";

      if (this.value('filter_align_right')) {
        html += " align='right'";
      }

      html += ">\n";
      html += "  <Textbox\n";
      html += "    value={this.state.store.getIn(['filter', 'name'])}\n";
      html += "    onChange={Actions.filterUpdated}\n";
      html += "    label='Country'\n";
      html += "    labelInline={true}\n";
      html += "  />\n";
      html += "</Filter>\n\n";
    }

    html += "<TableAjax\n";

    if (this.value('shrink')) {
      html += '  shrink={ true }\n';
    }

    if (this.value('enable_filter')) {
      html += "  filter={this.state.store.get('filter')}\n";
    }

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
            label="Filter"
            value={ this.value('enable_filter') }
            onChange={ this.action.bind(this, 'enable_filter') }
          />
          <Checkbox
            label="Filter Align Right"
            value={ this.value('filter_align_right') }
            onChange={ this.action.bind(this, 'filter_align_right') }
            disabled={ !this.value('enable_filter') }
          />
        </Row>
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
        <Row>
          <Checkbox
            label="Sortable (when active, interact with the any table header)"
            value={ this.value('sortable') }
            onChange={ this.action.bind(this, 'sortable') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Shrink (allow table to shrink with few results)"
            value={ this.value('shrink') }
            onChange={ this.action.bind(this, 'shrink') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Highlightable"
            value={ this.value('highlightable') }
            onChange={ this.action.bind(this, 'highlightable') }
          />
          <Checkbox
            label="Selectable"
            value={ this.value('selectable') }
            onChange={ this.action.bind(this, 'selectable') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method tableHeaderRow
   */
  get tableHeaderRow() {
    return(
      <TableRow key="header" uniqueID='header' as='header' selectAll={ this.value('selectable') }>
        <TableHeader sortable={ this.value('sortable') } name="name" style={{ width: "200px" }}>
          Country
        </TableHeader>
        <TableHeader sortable={ this.value('sortable') } name="value">
          Code
        </TableHeader>
      </TableRow>
    );
  }

  /**
   * @method tableRows
   */
  get tableRows() {
    let data = this.state.appStore.getIn(['table_ajax', 'data']);

    return data.map((row, index) => {
      return (
        <TableRow key={ index } uniqueID={ row.get('name') }>
          <TableCell>{ row.get('name') }</TableCell>
          <TableCell>{ row.get('value') }</TableCell>
        </TableRow>
      );
    });
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
