import NavigationBar from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: NavigationBar,
  key: 'navigation-bar',
  text: {
    bemClass: 'carbon-navigation-bar',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'NavigationBar',
    type: 'layout'
  },
  defaultProps: NavigationBar.defaultProps,
  props: NavigationBar.propTypes,
  propOptions: {
    as: DefinitionHelper.themesBinary()
  }
};

import React from 'react';
let contentElement = React.createElement('li',
  { className: 'demo-stubbed-element',
    children: 'Test menu' });

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [contentElement,contentElement,contentElement,contentElement,contentElement,contentElement]
});

export default definition;
