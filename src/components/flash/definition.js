import Flash from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Flash,
  key: 'flash',
  text: {
    bemClass: 'carbon-flash',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Flash',
    type: 'notification'
  },
  defaultProps: Flash.defaultProps,
  props: Flash.propTypes,
  propOptions: {
    as: DefinitionHelper.colors()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  as: 'help',
  message: 'Test flash message',
  open: true
});

export default definition;
