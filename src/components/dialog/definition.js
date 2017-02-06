import Dialog from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('dialog', Dialog, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'modal',
  propOptions: {
    size: OptionsHelper.sizesFull()
  },
  propValues: {
    title: 'Example Title for a Dialog',
    children: 'This is an example of a dialog.',
    open: false
  },
  hiddenProps: ['onCancel'],
  requiredProps: ['open']
});

definition.stubAction('onCancel', 'open', false);

export default definition;
