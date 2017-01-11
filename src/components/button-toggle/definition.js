import ButtonToggle from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: ButtonToggle,
  key: 'button-toggle',
  text: {
    bemClass: 'carbon-button-toggle',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Padded and coloured basic button-toggle.',
    name: 'ButtonToggle',
    type: 'action'
  },
  defaultProps: ButtonToggle.defaultProps,
  props: ButtonToggle.propTypes,
  propOptions: {
    labelAlign: ['left', 'right'],
    icon: OptionsHelper.icons(),
    iconSize: OptionsHelper.sizesBinary()
  }
};

definition.demoProps = {
  children: 'Toggle Button',
  icon: '',
  iconSize: 'large',
  name: 'required-to-group'
};
definition.demoRenderCount = 4;

export default definition;
