import Dialog from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('dialog', Dialog, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  propOptions: {
    size: OptionsHelper.sizesFull()
  },
  propValues: {
    title: 'Example Title for a Dialog',
    children: 'This is an example of a dialog.'
  },
  propTypes: {
    title: "String",
    size: "String",
    showCloseIcon: "Boolean",
  },
  propDescriptions: {
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + OptionsHelper.sizesFull().join(", "),
    title: "Controls the main title of the dialog."
  }
});

definition.isAModal();

export default definition;
