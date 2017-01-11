import Textbox from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Textbox,
  key: 'textbox',
  text: {
    bemClass: 'carbon-textbox',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Textbox',
    type: 'form'
  },
  defaultProps: Textbox.defaultProps,
  props: Textbox.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

definition.demoProps = OptionsHelper.inputDecoratorDemoProps();

export default definition;
