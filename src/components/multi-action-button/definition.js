import MultiActionButton from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: MultiActionButton,
  key: 'multi-action-button',
  text: {
    bemClass: 'carbon-multi-action-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'MultiActionButton',
    type: 'action'
  },
  defaultProps: MultiActionButton.defaultProps,
  props: MultiActionButton.propTypes,
  propOptions: {
    align: DefinitionHelper.alignBinary(),
    as: DefinitionHelper.themesBinary()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test',
  text: 'Multi action button'
});

export default definition;
