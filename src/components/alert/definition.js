import Alert from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('alert', Alert, {
  description: `An important message interrupts my activity, but I can dismiss it when I choose.`,
  designerNotes: `
* Useful if a message is so important you’d like to prevent any other activity until the user resolves it.
* If the message isn’t so important, or you want to avoid disrupting the user’s activity, consider showing a static Message component in the underlying screen.
* Include a Message component within the Alert component, use plain text, or apply a standard Carbon Error or Warning icon.
* This component has the same options and properties as the Dialog component.

* __Simple positive or negative confirmation?__ Try Flash.
* __Longer message which stays on-screen?__ Try Message.
* __Longer, time sensitive message that must be dismissed?__ Try Toast.
* __Confirm or cancel an action I’ve initiated?__ Try Confirm.
* __Simple task in context?__ Try Dialog.
  `,
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
