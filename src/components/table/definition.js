import { Table } from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
  props: Table.propTypes
};

import React from 'react';
let tr = React.createElement('tr',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [tr, tr, tr, tr, tr, tr]
});

export default definition;
