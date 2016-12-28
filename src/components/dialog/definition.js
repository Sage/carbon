import Dialog from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Dialog,
  key: 'dialog',
  text: {
    bemClass: 'carbon-dialog',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Dialog',
    type: 'modal'
  },
  defaultProps: Dialog.defaultProps,
  props: Dialog.propTypes,
  propOptions: {
    size: DefinitionHelper.sizesFull()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  enableBackgroundUI: true,
  open: false,
  showCloseIcon: true,
  size: DefinitionHelper.sizesFull()[2],
  title: 'Test'
});

export default definition;
