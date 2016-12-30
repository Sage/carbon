import Fieldset from './';
import DemoHelper from '../../utils/helpers/demo-helper';

import textboxDefinition from '../textbox/definition';

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

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: DemoHelper.elemArray(textboxDefinition, 4),
  legend: 'Test set of fields'
});

export default definition;
