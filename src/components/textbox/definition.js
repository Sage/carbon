import Textbox from './';
import DemoHelper from '../../utils/helpers/demo-helper';
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
  props: Textbox.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, OptionsHelper.inputDecoratorDemoProps());

export default definition;
