import Fieldset from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Fieldset,
  key: 'fieldset',
  text: {
    bemClass: 'carbon-fieldset',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Fieldset',
    type: 'form'
  },
  defaultProps: Fieldset.defaultProps,
  props: Fieldset.propTypes
};

import React from 'react';
import textboxDefinition from '../textbox/definition';
let textbox = React.createElement(textboxDefinition.component, textboxDefinition.demoProps);
definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: [textbox, textbox, textbox, textbox],
  legend: 'Test set of fields'
});

export default definition;
