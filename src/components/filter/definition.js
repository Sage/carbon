import Filter from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Filter,
  key: 'filter',
  text: {
    bemClass: 'carbon-filter',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Filter',
    type: 'form'
  },
  defaultProps: Filter.defaultProps,
  props: Filter.propTypes,
  propOptions: {
    align: DefinitionHelper.alignBinary()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
