import TableRow from './';
import DefinitionHelper from '../../../utils/helpers/definition-helper';

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

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [tableCell,tableCell,tableCell,tableCell,tableCell,tableCell],
  hideMultiSelect: false,
  highlightable: true,
  highlighted: false,
  selectable: true,
  selectAll: true,
  selected: false
});

export default definition;
