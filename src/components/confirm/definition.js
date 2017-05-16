import Confirm from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('confirm', Confirm, {
  description: `Confirms or cancels an action.`,
  designerNotes: `
* Shows a static message in a dialog which asks the user to confirm or cancel an action they’ve initiated.
* Useful to confirm actions which may be difficult to undo, or potentially harmful.
* Include a Message component within the Alert component (a warning Message component may be particularly useful for a potentially harmful choice), use plain text, or apply a standard Carbon Error or Warning icon.
* This component has the same options and properties as the Dialog component.
* A good example could be confirming deletion of a large number of records.
  `,
  relatedComponentsNotes: `
* Simple positive or negative confirmation? [Try Flash](/components/flash).
* Longer message which stays on-screen? [Try Message](/components/message).
* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).
* Error or warning message that interrupts activity? [Try Alert](/components/alert).
* Simple task in context? [Try Dialog](/components/dialog).
 `,
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
