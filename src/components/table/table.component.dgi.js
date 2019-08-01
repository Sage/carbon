import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';

class Table extends React.component {
static propTypes = {
/**  The actions to display in the toolbar  */
  actions: PropTypes.object,

  /** The extra actions to display in the toolbar */
  actionToolbarChildren: PropTypes.func,

  /** Children elements */
  children: PropTypes.node,

  /** Custom className */
  className: PropTypes.string,

  /**  Custom empty row */
  customEmptyRow: PropTypes.node,

  /** Data used to filter the data */
  filter: PropTypes.object,

  /** Emitted when table component changes e.g. Pager, sorting, filter */
  onChange: PropTypes.func,

  /** Enable configure icon that triggers this callback on click */
  onConfigure: PropTypes.func,

  /** Show the pagination footer */
  paginate: PropTypes.bool,

  /** Pagination Current Visible Page */
  currentPage: PropTypes.string,

  /** Pagination Page Size of grid (number of visible records) */
  pageSize: PropTypes.string,

  /** Pagination Options for pageSize default - 10, 25, 50 */
  pageSizeSelectionOptions: PropTypes.object,

  /** Pagination Is the page size dropdown visible  */
  showPageSizeSelection: PropTypes.bool,

  /** Enables multi-selectable table rows. */
  selectable: PropTypes.bool,

  /** Enables highlightable table rows. */
  highlightable: PropTypes.bool,

  /** A callback for when a row is selected. */
  onSelect: PropTypes.func,

  /** A callback for when a row is highlighted. */
  onHighlight: PropTypes.func,

  /** A callback for when the page size changes. */
  onPageSizeChange: PropTypes.func,

  /** Pagination Total number of records in the grid */
  totalRecords: PropTypes.number,

  /** Allow table to shrink in size. */
  shrink: PropTypes.bool,

  /** The currently sorted column. */
  sortedColumn: PropTypes.string,

  /** The current sort order applied. */
  sortOrder: PropTypes.string,

  /** TableRows to be wrapped in <thead> */
  thead: PropTypes.object,

  /** Determines if you want the table to automatically render a tbody. */
  tbody: PropTypes.bool,

  /** A string to render as the table's caption */
  caption: PropTypes.string,

  /** The HTML id of the element that contains a description of this table. */
  'aria-describedby': PropTypes.string,

  /** Renders as 'primary' / 'dark', 'secondary' / 'light', 'tertiary' / 'transparent' */
  theme: PropTypes.oneOf(OptionsHelper.tableThemes),

  /** Used to define the tables size Renders as:  'compact', 'small', 'medium' and 'large' */
  size: PropTypes.oneOf(OptionsHelper.tableSizes),

  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool
}

render() {
  return (<></>);
}
}
export default Table;
