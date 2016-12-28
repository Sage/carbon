import ButtonToggle from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: ButtonToggle,
  key: 'button-toggle',
  text: {
    bemClass: 'carbon-button-toggle',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: '[content needed] Padded and coloured basic button-toggle.',
    name: 'ButtonToggle',
    type: 'action'
  },
  defaultProps: ButtonToggle.defaultProps,
  props: ButtonToggle.propTypes,
  propOptions: {
    labelAlign: ['left', 'right'],
    icon: DefinitionHelper.icons(),
    iconSize: DefinitionHelper.sizesBinary()
  }
};

let demoProps = DefinitionHelper.inputDecoratorDemoProps();

demoProps.icon = 'tick';
demoProps.iconSize = 'large';

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, demoProps);

export default definition;
