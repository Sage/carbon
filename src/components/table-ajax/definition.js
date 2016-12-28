import { TableAjax } from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: TableAjax,
  key: 'table-ajax',
  text: {
    bemClass: 'carbon-table-ajax',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'TableAjax',
    type: 'grid'
  },
  defaultProps: TableAjax.defaultProps,
  props: TableAjax.propTypes,
  propOptions: {
    pageSize: DefinitionHelper.pageSizes()
  }
};

import React from 'react';
let tr = React.createElement('tr',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [
    tr, tr, tr, tr, tr, tr, tr, tr, tr, tr,
    tr, tr, tr, tr, tr, tr, tr, tr, tr, tr,
    tr, tr, tr, tr, tr
  ],
  pageSize: 10
});

export default definition;
