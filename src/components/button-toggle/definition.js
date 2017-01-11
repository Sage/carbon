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
  className: '',
  fieldHelp: 'Test help',
  fieldHelpInline: true,
  icon: 'tick',
  iconSize: 'large',
  inputWidth: '70',
  label: 'Test Label',
  labelAlign: 'left',
  labelHelp: 'Test label help',
  labelInline: false,
  labelWidth: '25'
};

export default definition;
