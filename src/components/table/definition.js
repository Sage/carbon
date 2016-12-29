import { Table } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

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

import React from 'react';
import trDefinition from './table-row/definition';
let i = 0,
    trs = [];

for (; i <= 28; i++) {
  let rowKey = `row-${i}`;
  trDefinition.demoProps.uniqueID = rowKey;
  trDefinition.demoProps.key = rowKey;
  trs[i] = React.createElement(trDefinition.component, trDefinition.demoProps);
}

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: trs,
  currentPage: 1,
  filter: {},
  highlightable: true,
  paginate: true,
  selectable: true,
  showPageSizeSelection: false,
  shrink: false
});

export default definition;
