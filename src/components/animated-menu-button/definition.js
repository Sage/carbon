import AnimatedMenuButton from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: AnimatedMenuButton,
  key: 'animated-menu-button',
  text: {
    bemClass: 'carbon-animated-menu-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'AnimatedMenuButton',
    type: 'action'
  },
  props: AnimatedMenuButton.propTypes,
  defaultProps: AnimatedMenuButton.defaultProps,
  propOptions: {
    direction: ['left', 'right'],
    size: OptionsHelper.sizesFull()
  }
};

definition.demoProps = {
  direction: 'right',
  label: 'Test Label',
  size: 'medium'
};

export default definition;
