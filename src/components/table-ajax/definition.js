import { TableAjax } from './';
import Definition from './../../../demo/utils/definition';
import ComponentActions from './../../../demo/actions/component';
import tableRowDefinition from './../table/table-row/definition';
import tableCellDefinition from './../table/table-cell/definition';
import tableHeaderDefinition from './../table/table-header/definition';
import tableSubheaderDefinition from './../table/table-subheader/definition';

const definition = new Definition('table-ajax', TableAjax, {
  description: 'Ajax control: A table of relational data to view or interact with.',
  designerNotes: `
* This control is the same as [Table](/components/table), but uses Ajax.
* Ajax loads data from a specified source as needed, rather than data in the page markup.
 `,
  associatedDefinitions: [
    tableRowDefinition, tableCellDefinition, tableHeaderDefinition, tableSubheaderDefinition
  ],
  dataVariable: 'tableAjaxData',
  propValues: {
    onChange: ComponentActions.updateTableAjax
  },
  propTypes: {
    formatData: 'Function',
    path: 'String'
  },
  propDescriptions: {
    formatData: 'Callback function for formatting the data received via Ajax requests into the format required by the table',
    path: 'The path to make XHR requests to.'
  },
  requiredProps: ['path'],
  hiddenProps: [
    'formatData',
    'path'
  ]
});

definition.isATable();

export default definition;
