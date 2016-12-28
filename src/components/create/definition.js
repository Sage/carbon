import Create from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Create,
  key: 'create',
  text: {
    bemClass: 'carbon-create',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Create',
    type: 'action'
  },
  defaultProps: Create.defaultProps,
  props: Create.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
