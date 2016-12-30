import Button from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Button,
  key: 'button',
  text: {
    bemClass: 'carbon-button',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: '[content needed] Padded and coloured basic button.',
    name: 'Button',
    type: 'action'
  },
  props: Button.propTypes,
  defaultProps: Button.defaultProps,
  propOptions: {
    as: OptionsHelper.themesBinary(),
    size: OptionsHelper.sizesRestricted(),
    theme: OptionsHelper.buttonColors()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
