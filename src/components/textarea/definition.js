import Textarea from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Textarea,
  key: 'textarea',
  text: {
    bemClass: 'carbon-textarea',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Textarea',
    type: 'form'
  },
  defaultProps: Textarea.defaultProps,
  props: Textarea.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

definition.demoProps = OptionsHelper.inputDecoratorDemoProps();

export default definition;
