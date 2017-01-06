import Button from './';

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

definition.demoProps = {
  as: 'primary',
  children: 'Click me!',
  disabled: false,
  size: 'medium',
  theme: 'blue'
};

export default definition;
