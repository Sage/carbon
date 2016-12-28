import Button from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
    as: DefinitionHelper.themesBinary(),
    size: DefinitionHelper.sizesRestricted(),
    theme: DefinitionHelper.buttonColors()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
