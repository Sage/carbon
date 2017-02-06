import { Table } from './';
import Definition from './../../../demo2/utils/definition';
import ComponentActions from './../../../demo2/actions/component';
import tableRowDefinition from './table-row/definition';
import tableCellDefinition from './table-cell/definition';
import tableHeaderDefinition from './table-header/definition';
import tableSubheaderDefinition from './table-subheader/definition';

setTimeout(() => {
  // trigger action to init table with data
  ComponentActions.updateTable();
});

let definition = new Definition('table', Table, {
  associatedDefinitions: [
    tableRowDefinition, tableHeaderDefinition, tableCellDefinition, tableSubheaderDefinition
  ],
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'grids',
  js: "" +
"function buildRows() {\n" +
"  // create rows array with header row:\n" +
"  let rows = [\n" +
"    <TableRow key='header' as='header'>\n" +
"      <TableHeader sortable={ true } name='name'>\n" +
"        Country\n" +
"      </TableHeader>\n" +
"\n" +
"      <TableHeader>Code</TableHeader>\n" +
"    </TableRow>\n" +
"  ];\n" +
"\n" +
"  // iterate over data to add additional rows:\n" +
"  tableData.forEach((row) => {\n" +
"    rows.push(\n" +
"      <TableRow key={ row.get('id') } uniqueID={ row.get('id') }>\n" +
"        <TableCell>{ row.get('name') }</TableCell>\n" +
"        <TableCell>{ row.get('value') }</TableCell>\n" +
"      </TableRow>\n" +
"    );\n" +
"  });\n" +
"\n" +
"  return rows;\n" +
"}",
  propValues: {
    onChange: ComponentActions.updateTable,
    children: "{ buildRows() }"
  },
  hiddenProps: ['filter', 'totalRecords', 'pageSizeSelectionOptions'],
  propRequires: {
    showPageSizeSelection: "paginate"
  },
  propTypes: {
    currentPage: "Number",
    filter: "Object",
    highlightable: "Boolean",
    onChange: "Function",
    onHighlight: "Function",
    onPageSizeChange: "Function",
    onSelect: "Function",
    pageSize: "Number",
    pageSizeSelectionOptions: "Object",
    paginate: "Boolean",
    selectable: "Boolean",
    showPageSizeSelection: "Boolean",
    shrink: "Boolean",
    tbody: "Node",
    thead: "Node",
    totalRecords: "Number"
  }
});

export default definition;
