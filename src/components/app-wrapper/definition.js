import AppWrapper from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: AppWrapper,
  key: 'app-wrapper',
  text: {
    bemClass: 'carbon-app-wrapper',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'AppWrapper',
    type: 'layout'
  },
  defaultProps: AppWrapper.defaultProps,
  props: AppWrapper.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
