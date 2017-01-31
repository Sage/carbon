import Form from './';

import textboxDefinition from 'components/textbox/definition';

let definition = {
  component: Form,
  key: 'form',
  text: {
    bemClass: 'carbon-form',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Form',
    type: 'form'
  },
  defaultProps: Form.defaultProps,
  props: Form.propTypes
};

import React from 'react';
definition.demoProps = {
  activeInput: React.createElement(textboxDefinition.component, textboxDefinition.demoProps),
  buttonAlign: 'right',
  cancel: true,
  children: 'test',
  save: true,
  saving: false,
  validateOnMount: false
};

export default definition;
