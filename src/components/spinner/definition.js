import Spinner from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Spinner,
  key: 'spinner',
  text: {
    bemClass: 'carbon-spinner',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Spinner',
    type: 'misc'
  },
  defaultProps: Spinner.defaultProps,
  props: Spinner.propTypes,
  propOptions: {
    size: DefinitionHelper.sizesRestricted(),
    as: DefinitionHelper.colors()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
