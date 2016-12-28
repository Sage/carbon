import Toast from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Toast,
  key: 'toast',
  text: {
    bemClass: 'carbon-toast',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Toast',
    type: 'notification'
  },
  defaultProps: Toast.defaultProps,
  props: Toast.propTypes,
  propOptions: {
    as: DefinitionHelper.colors()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
