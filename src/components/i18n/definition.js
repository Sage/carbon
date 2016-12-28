import I18n from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: I18n,
  key: 'i18n',
  text: {
    bemClass: 'carbon-i18n',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'I18n',
    type: 'misc'
  },
  defaultProps: I18n.defaultProps,
  props: I18n.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
