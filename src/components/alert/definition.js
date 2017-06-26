import Alert from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('alert', Alert, {
  description: `An important message that interrupts user activity, but can be dismissed.`,
  designerNotes: `
* Useful if a message is so important you’d like to prevent any other activity until the user resolves it.
* If the message isn’t so important, or you want to avoid disrupting the user’s activity, consider showing a static Message component in the underlying screen.
* Include a Message component within the Alert component, use plain text, or apply a standard Carbon Error or Warning icon.
* This component has the same options and properties as the Dialog component.
  `,
  relatedComponentsNotes: `
* Simple positive or negative confirmation? [Try Flash](/components/flash).
* Longer message which stays on-screen? [Try Message](/components/message).
* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).
* Confirm or cancel an action I’ve initiated? [Try Confirm](/components/confirm).
* Simple task in context? [Try Dialog](/components/dialog).
  `,
  propOptions: {
    size: OptionsHelper.sizesFull
  },
  propValues: {
    ariaRole: 'alertdialog',
    title: 'Attention!',
    children: 'This is an example of a alert.'
  },
  propTypes: {
    title: "String",
    size: "String",
    showCloseIcon: "Boolean",
    subtitle: "String"
  },
  propDescriptions: {
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + OptionsHelper.sizesFull.join(", "),
    subtitle: "Controls the subtitle of the dialog.",
    title: "Controls the main title of the dialog."
  }
});

definition.isAModal();

export default definition;
