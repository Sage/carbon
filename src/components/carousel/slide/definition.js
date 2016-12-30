import Slide from './';

import React from 'react';
let contentElement = React.createElement('div',
  { className: 'demo-stubbed-element',
    children: 'Test element' });

let definition = {
  component: Slide,
  key: 'slide',
  text: {
    bemClass: 'carbon-slide',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Slide',
    type: 'layout'
  },
  props: {
    children: [
      contentElement,
      contentElement,
      contentElement,
      contentElement,
      contentElement,
      contentElement,
      contentElement,
      contentElement
    ],
    className: 'test'
  }
};

definition.demoProps = definition.props;

export default definition;
