import ShowEditPod from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: ShowEditPod,
  key: 'show-edit-pod',
  text: {
    bemClass: 'carbon-show-edit-pod',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'ShowEditPod',
    type: 'layout'
  },
  defaultProps: ShowEditPod.defaultProps,
  props: ShowEditPod.propTypes,
  propOptions: {
    as: DefinitionHelper.themesFull()
  }
};

import React from 'react';
import textboxDefinition from '../textbox/definition';
let textbox = React.createElement(textboxDefinition.component, textboxDefinition.props);
definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  as: 'primary',
  border: true,
  children: 'Pod contents',
  description: 'Test description',
  editFields: [textbox, textbox, textbox, textbox],
  subtitle: 'Test subtitle',
  title: 'Test title'
});

export default definition;
