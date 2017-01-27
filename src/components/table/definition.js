import { Table } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import trDefinition from './table-row/definition';

let definition = {
  component: Table,
  key: 'table',
  text: {
    bemClass: 'carbon-table',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Table',
    type: 'grid'
  },
  defaultProps: Table.defaultProps,
  props: Table.propTypes,
  propOptions: {
    pageSizeSelectionOptions: OptionsHelper.pageSizes()
  }
};

definition.demoProps = {
  children: DemoHelper.elemArray(trDefinition, 28, 'uniqueID'),
  currentPage: 1,
  filter: {},
  highlightable: true,
  pageSizeSelectionOptions: OptionsHelper.pageSizes(),
  paginate: true,
  selectable: true,
  showPageSizeSelection: true,
  shrink: false
};

export default definition;
