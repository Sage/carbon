import AnimatedMenuButton from './';

import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: AnimatedMenuButton,
  key: 'animated-menu-button',
  text: {
    bemClass: 'carbon-animated-menu-button',
    details: '',
    description: '',
    name: 'AnimatedMenuButton',
    type: 'layout'
  },
  props: AnimatedMenuButton.propTypes,
  defaultProps: AnimatedMenuButton.defaultProps,
  propOptions: {
    direction: ['left', 'right'],
    size: DefinitionHelper.baseSizes()
  }
}

definition.demoProps = DefinitionHelper.prepareDemoProps(
  definition,
  '',
  { direction: 'right' }
);

export default definition;
