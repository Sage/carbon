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
  description: `A table of relational data to view or interact with.`,
  designerNotes: `
* Shows relational data to the user.
* The content of rows and columns can be plain or styled text, Icons, or even inputs. Achieve this by nesting components inside a Table component.
* Don’t add too many columns for the user’s available viewport width. Aiming for a screen width of 1366 pixels is a good target, but also consider how your table may look for tablet or mobile devices. Avoid the need for horizontal scrolling, either on the page as a whole, or within a Table component.
* To save space, you could show multiple lines of data within a cell (e.g. the constituents of an address).
* If there is likely to be a large number of rows, you can specify how many rows to show, and whether to add a pagination control to the bottom of the table. Consider the data load on your application and infrastructure to decide this. Some applications apply this configuration as an application-wide setting.
* The Selectable configuration places a checkbox at the start of each row, and the ability for a user to select one or more rows. This is useful to allow the user to perform single or batch actions.
* The Highlightable configuration allows the user to click an option, and for the option to be marked visually. This could be useful if the user can select an option which then loads in a Sidebar, for example.
`,
  associatedDefinitions: [
    tableRowDefinition, tableCellDefinition, tableHeaderDefinition, tableSubheaderDefinition
  ],
  dataVariable: 'tableData',
  propValues: {
    caption: 'Country and Country Codes',
    onChange: ComponentActions.updateTable,
  }
});

definition.isATable();

export default definition;
