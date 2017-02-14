import Pager from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('pager', Pager, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'form',
  hiddenProps: ['pageSizeSelectionOptions'],
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
    onPagination: () => {}
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
