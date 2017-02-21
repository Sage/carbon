import Alert from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('alert', Alert, {
  propOptions: {
    size: OptionsHelper.sizesFull
  },
  propValues: {
    title: 'Attention!',
    children: 'This is an example of a alert.'
  },
  propTypes: {
    title: "String",
    size: "String",
    showCloseIcon: "Boolean",
  },
  propDescriptions: {
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + OptionsHelper.sizesFull.join(", "),
    title: "Controls the main title of the dialog."
  }
});

definition.isAModal();

export default definition;
