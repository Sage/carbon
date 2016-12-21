import React from 'react';

import { Tabs } from './';

import { _ } from 'lodash';
import tabDefinition from './tab/definition';

let tab = React.createElement(tabDefinition.component, tabDefinition.props);

let definition = {
  component: Tabs,
  key: 'tabs',
  text: {
    bemClass: 'carbon-tabs',
    details: '',
    description: '',
    name: 'Tabs',
    type: 'layout'
  },
  defaultProps: Tabs.defaultProps,
  demoProps: _.assign({ children: [tab,tab,tab] }, Tabs.defaultProps),
  props: Tabs.propTypes
}
export default definition;
