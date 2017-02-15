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
    tableRowDefinition, tableCellDefinition, tableHeaderDefinition, tableSubheaderDefinition
  ],
  dataVariable: 'tableData',
  propValues: {
    onChange: ComponentActions.updateTable,
  }
});

definition.isATable();

export default definition;
