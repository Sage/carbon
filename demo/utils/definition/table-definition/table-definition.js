import { assign } from 'lodash';
import OptionsHelper from '../../../../src/utils/helpers/options-helper';

export default (definition) => {
  definition.type = 'grids';
  definition.propValues = assign({}, definition.propValues, {
    actions: "{ delete: { icon: 'bin' }, settings: { icon: 'settings' }}",
    actionToolbarChildren: `(context) => {
      return [
        <Button disabled={ context.disabled } key='single-action'>
          Test Action
        </Button>,
        <MultiActionButton text='Actions' disabled={ context.disabled } key='multi-actions'>
          <Button>foo</Button>
          <Button>bar</Button>
          <Button>qux</Button>
        </MultiActionButton>
      ];
    }`,
    path: '/countries',
    children: '{ buildRows() }'
  });
  definition.hiddenProps = definition.hiddenProps.concat([
    'actions',
    'aria-describedby',
    'children',
    'currentPage',
    'customEmptyRow',
    'filter',
    'totalRecords',
    'pageSizeSelectionOptions'
  ]);
  definition.propRequires = {
    showPageSizeSelection: 'paginate'
  };

  definition.js = `
function buildRows() {
  // create rows array with header row:
  let rows = [
    <TableRow key='header' as='header'>
      <TableHeader sortable={ true } name='name' scope='col'>
        Country
      </TableHeader>

      <TableHeader scope='col'>Code</TableHeader>
    </TableRow>
  ];

  // iterate over data to add additional rows:
  ${definition.dataVariable}.forEach((row) => {
    rows.push(
      <TableRow key={ row.get('id') } uniqueID={ row.get('id') }>
        <TableCell>{ row.get('name') }</TableCell>
        <TableCell>{ row.get('value') }</TableCell>
      </TableRow>
    );
  });

  return rows;
}`;

  definition.propTypes = assign({}, definition.propTypes, {
    actions: 'Object',
    actionToolbarChildren: 'Function',
    'aria-describedby': 'String',
    caption: 'String',
    currentPage: 'String',
    children: 'Node',
    className: 'String',
    customEmptyRow: 'Node',
    filter: 'Object',
    highlightable: 'Boolean',
    onChange: 'Function',
    onConfigure: 'Function',
    onHighlight: 'Function',
    onPageSizeChange: 'Function',
    onSelect: 'Function',
    pageSize: 'String',
    pageSizeSelectionOptions: 'Object',
    paginate: 'Boolean',
    selectable: 'Boolean',
    showPageSizeSelection: 'Boolean',
    shrink: 'Boolean',
    sortOrder: 'String',
    sortedColumn: 'String',
    tbody: 'Node',
    thead: 'Node',
    theme: 'String',
    totalRecords: 'String'
  });
  definition.propDescriptions = assign({}, definition.propDescriptions, {
    actions: 'Specify actions to be used by the ActionToolbar component.',
    actionToolbarChildren: 'This is used to add ActionToolbarMultiActionButton and ActionToolbarButton to ActionToolbar',
    'aria-describedby': 'The HTML id attribute of the element that contains a description of the table',
    caption: 'Specify a visually hidden title for the table',
    currentPage: 'Controls the current page number of a paginated data set.',
    customEmptyRow: 'Provides the ability to override the default empty row component.',
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    filter: "An object of filtered data. Each key in the object should match with the key of one of the table's columns.",
    highlightable: 'Makes each row clickable/highlightable. Works well with the onHighlight callback.',
    onChange: "Triggered whenever any of the table's display is updated - for example if sort order changes, pagination changes or the filter changes. It will trigger your callback with all of the information required to manually filter/sort your data in your external data source.",
    onConfigure: 'Enable configure icon that triggers this callback on click',
    onHighlight: 'Triggered when a row is highlighted via the highlightable prop. It will provide you with the row index.',
    onPageSizeChange: 'Triggered when the page size is changed.',
    onSelect: 'Triggered when a row is selected via the selectable prop. It will provide you with an array of all of the currently selected rows.',
    pageSize: 'Controls the current page size of a paginated data set.',
    pageSizeSelectionOptions: 'Defines the page size selection options. By default this is defined as 10, 25 and 50.',
    paginate: 'Turns pagination on/off.',
    selectable: 'Makes each row selectable using a checkbox. It will also turn on a select all checkbox if you have a header.',
    showPageSizeSelection: 'Will show the page size selection options if turned on.',
    shrink: 'If you move from one page with 10 results to a second page with only 5 results, the table will not shrink to maintain a consistent height. Turn this on if you want your table to shrink in these circumstances.',
    sortOrder: 'The current sort order applied.',
    sortedColumn: 'The currently sorted column.',
    tbody: 'Instead of passing children, define your tbody as a prop.',
    thead: 'Instead of passing children, define your thead as a prop. Using this prop will put your header inside an HTML thead element.',
    theme: 'Allows the table to be set to primary or secondary. Primary is darker and more bold, while secondary is lighter and doesn\'t use tiger stripes',
    totalRecords: 'Tracks the total number of records of a paginated data set.'
  });
  definition.propOptions = {
    theme: OptionsHelper.themesBinary
  };
};
