import SplitButton from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import buttonDefinition from '../button/definition';

let definition = {
  component: SplitButton,
  key: 'split-button',
  text: {
    bemClass: 'carbon-split-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'SplitButton',
    type: 'action'
  },
  defaultProps: SplitButton.defaultProps,
  props: SplitButton.propTypes,
  propOptions: {
    as: OptionsHelper.themesBinary()
  }
};

definition.demoProps = {
  as: 'secondary',
  children: DemoHelper.elemArray(buttonDefinition, 2),
  disabled: false,
  text: 'Text'
};

export default definition;
