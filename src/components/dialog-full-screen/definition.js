import DialogFullScreen from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: DialogFullScreen,
  key: 'dialog-full-screen',
  text: {
    bemClass: 'carbon-dialog-full-screen',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DialogFullScreen',
    type: 'modal'
  },
  defaultProps: DialogFullScreen.defaultProps,
  props: DialogFullScreen.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
