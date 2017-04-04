import Pager from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import ComponentActions from './../../../demo/actions/component';

let definition = new Definition('pager', Pager, {
  description: `Steps through a series of pages within a table.`,
  designerNotes: `
* Useful to handle larger tables of data - clicking the forward or back arrows will step the user sequentially through the data loaded into the table.
* The 'Show Page Size Selection' configuration shows 10, 25, or 50 records on each page.
  `,
  relatedComponentsNotes: `
* Table of relational data? [Try Table](/components/table).
* Table with Ajax? [Try Table](/components/table-ajax).
 `,
  type: 'form',
  hiddenProps: ['currentPage', 'pageSizeSelectionOptions'],
  propOptions: {
    pageSize: OptionsHelper.pageSizes,
  },
  propTypes: {
    currentPage: "String",
    totalRecords: "String",
    onPagination: "Function",
    pageSize: "String",
    showPageSizeSelection: "Boolean",
    pageSizeSelectionOptions: "Object"
  },
  propValues: {
    currentPage: 1,
    totalRecords: 100,
    onPagination: ComponentActions.updatePagerCurrentPage
  },
  defaultProps: {
    pageSizeSelectionOptions: OptionsHelper.pageSizes.join(", ")
  },
  propDescriptions: {
    currentPage: "The currently displayed page.",
    totalRecords: "The total number of records to paginate.",
    onPagination: "Callback triggered when the user changes page, use this to update the currentPage prop.",
    pageSize: "Number of records per page.",
    showPageSizeSelection: "Show/hide the options so a user can choose how many records to display per page.",
    pageSizeSelectionOptions: "Define custom options to display in page size selection. This has to be an immutable object."
  }
});

export default definition;
