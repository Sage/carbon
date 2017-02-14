import Confirm from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('confirm', Confirm, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  propOptions: {
    size: OptionsHelper.sizesFull
  },
  propValues: {
    title: 'Are you sure?',
    children: 'This is an example of a confirm.'
  },
  propTypes: {
    title: "String",
    size: "String",
    showCloseIcon: "Boolean",
    onConfirm: "Function",
    cancelLabel: "String",
    confirmLabel: "String"
  },
  propDescriptions: {
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + OptionsHelper.sizesFull.join(", "),
    title: "Controls the main title of the dialog.",
    onConfirm: "A callback when the user selects confirm.",
    cancelLabel: "Define custom text for the cancel button.",
    confirmLabel: "Define custom text for the confirm button."
  }
});

definition.stubAction('onConfirm', 'open', 'false');

definition.isAModal();

export default definition;
