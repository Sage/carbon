import Button from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Button,
  key: 'button',
  text: {
    bemClass: 'carbon-button',
    details: '[content needed] Basic designs description for the component',
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
