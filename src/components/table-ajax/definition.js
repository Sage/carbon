import { TableAjax } from './';
import Definition from './../../../demo/utils/definition';
import ComponentActions from './../../../demo/actions/component';
import tableRowDefinition from './../table/table-row/definition';
import tableCellDefinition from './../table/table-cell/definition';
import tableHeaderDefinition from './../table/table-header/definition';
import tableSubheaderDefinition from './../table/table-subheader/definition';

let definition = new Definition('table-ajax', TableAjax, {
  associatedDefinitions: [
    tableRowDefinition, tableCellDefinition, tableHeaderDefinition, tableSubheaderDefinition
  ],
  dataVariable: 'tableAjaxData',
  propValues: {
    onChange: ComponentActions.updateTableAjax
  },
  propTypes: {
    path: "String"
  },
  propDescriptions: {
    path: "The path to make XHR requests to."
  },
  requiredProps: ['path'],
  hiddenProps: ['path']
});

definition.isATable();

export default definition;
