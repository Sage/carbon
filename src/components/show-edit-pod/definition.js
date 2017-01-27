import ShowEditPod from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

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
    as: OptionsHelper.themesFull()
  }
};

import React from 'react';
import textboxDefinition from '../textbox/definition';
let textbox = React.createElement(textboxDefinition.component, textboxDefinition.demoProps);
definition.demoProps = {
  as: 'primary',
  border: true,
  children: 'Pod contents',
  description: 'Test description',
  editFields: [textbox, textbox, textbox, textbox],
  subtitle: 'Test subtitle',
  title: 'Test title',
  transitionName: 'carbon-show-edit-pod__transition'
};

export default definition;
