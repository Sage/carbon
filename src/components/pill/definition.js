import Pill from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Pill,
  key: 'pill',
  text: {
    bemClass: 'carbon-pill',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pill',
    type: 'misc'
  },
  defaultProps: Pill.defaultProps,
  props: Pill.propTypes,
  propOptions: {
    as: DefinitionHelper.colors()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
