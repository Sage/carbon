import Pod from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Pod,
  key: 'pod',
  text: {
    bemClass: 'carbon-pod',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pod',
    type: 'layout'
  },
  defaultProps: Pod.defaultProps,
  props: Pod.propTypes,
  propOptions: {
    alignTitle: DefinitionHelper.alignPlusCenter(),
    as: DefinitionHelper.themesFull(),
    padding: DefinitionHelper.sizesPod()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'Pod contents',
  description: 'Test description',
  footer: 'Test footer',
  subtitle: 'Test subtitle',
  title: 'Test title'
});

export default definition;
