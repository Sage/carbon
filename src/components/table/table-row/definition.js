import TableRow from './';
import DemoHelper from '../../../utils/helpers/demo-helper';
import tableCellDefinition from '../table-cell/definition';

let definition = {
  component: TableRow,
  key: 'table-row',
  text: {
    bemClass: 'carbon-table-row',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'TableRow',
    type: 'grid'
  },
  defaultProps: TableRow.defaultProps,
  props: TableRow.propTypes
};

definition.demoProps = {
  children: DemoHelper.elemArray(tableCellDefinition, 12),
  hideMultiSelect: false,
  highlightable: true,
  highlighted: false,
  selectable: true,
  selectAll: true,
  selected: false
};

export default definition;
