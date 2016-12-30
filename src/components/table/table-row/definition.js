import TableRow from './';
import DemoHelper from '../../../utils/helpers/demo-helper';

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

import React from 'react';
import tableCellDefinition from '../table-cell/definition';
let tableCell = React.createElement(tableCellDefinition.component, tableCellDefinition.demoProps);

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: [tableCell,tableCell,tableCell,tableCell,tableCell,tableCell],
  hideMultiSelect: false,
  highlightable: true,
  highlighted: false,
  selectable: true,
  selectAll: true,
  selected: false
});

export default definition;
