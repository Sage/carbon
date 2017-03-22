import { Table } from './';
import Definition from './../../../demo/utils/definition';
import ComponentActions from './../../../demo/actions/component';
import tableRowDefinition from './table-row/definition';
import tableCellDefinition from './table-cell/definition';
import tableHeaderDefinition from './table-header/definition';
import tableSubheaderDefinition from './table-subheader/definition';

// TODO: see if we can remove the need for this - this populates the data by
// fetching it from the mock service
setTimeout(() => {
  // trigger action to init table with data
  ComponentActions.updateTable();
  // we currently delay this update incase the xhr mock is disabled (ie on a doc page)
}, 1000);

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
