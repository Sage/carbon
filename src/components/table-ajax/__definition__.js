import { TableAjax } from './';
import Definition from './../../../demo/utils/definition';
import ComponentActions from './../../../demo/actions/component';
import tableRowDefinition from './../table/table-row/__definition__';
import tableCellDefinition from './../table/table-cell/__definition__';
import tableHeaderDefinition from './../table/table-header/__definition__';
import tableSubheaderDefinition from './../table/table-subheader/__definition__';

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
    formatResponse: 'Function',
    formatRequest: 'Function',
    onAjaxError: 'Function',
    path: 'String'
  },
  propDescriptions: {
    formatResponse: 'Callback function for formatting the data received via Ajax requests into the format required by the table',
    formatRequest: 'Callback function for formatting the query data to be sent via Ajax to the defined path',
    onAjaxError: 'Callback function to handle XHR request errors',
    path: 'The path to make XHR requests to.'
  },
  requiredProps: ['path'],
  hiddenProps: [
    'formatResponse',
    'formatRequest',
    'onAjaxError',
    'path'
  ]
});

definition.isATable();

export default definition;
