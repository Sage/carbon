import Portrait from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Portrait,
  key: 'portrait',
  text: {
    bemClass: 'carbon-portrait',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Portrait',
    type: 'misc'
  },
  defaultProps: Portrait.defaultProps,
  props: Portrait.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
