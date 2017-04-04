import Dialog from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('dialog', Dialog, {
  description: `A dialog box overlaid on top of any page.`,
  designerNotes: `
* Useful to perform an action in context without navigating the user to a separate page.
* Several pre-set widths are available - the height of the dialog will flex to fit the content. It’s best to avoid dialogs that are taller than the user’s viewport height. Typical user viewport heights can be as little as 650 pixels.
* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the dialog.
* A configuration shows a close icon at the top right of the Dialog. Sometimes users are more likely to click this than a traditional ‘Cancel’ button.
  `,
  relatedComponentsNotes: `
* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).
* Need to refer back to the underlying page? [Try Sidebar](/components/sidebar).
 `,
  propOptions: {
    size: OptionsHelper.sizesFull
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
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + OptionsHelper.sizesFull.join(", "),
    title: "Controls the main title of the dialog."
  }
});

definition.isAModal();

export default definition;
