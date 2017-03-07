import DialogFullScreen from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('dialog-full-screen', DialogFullScreen, {
  description: `I can perform a more complex task that needs more space, in a full-width and full-height dialog overlaid on the top of any page, so I don’t lose my context.`,
  designerNotes: `
* Useful to perform an action in context without navigating the user to a separate page.
* Whilst a standard Dialog component’s width might constrain what you can do, the full screen dialog uses the full width and height available.
* Full screen dialogs have a ‘sticky footer’ meaning any Button components are always easily accessible, even if the dialog scrolls.
* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the dialog.
* A good example could be importing a large volume of data, and checking for errors, in the context of an underlying Table of data.

* __Simple task in context?__ Try Dialog.
* __Need to refer back to the underlying page?__ Try Sidebar.

 `,
  propValues: {
    title: 'Example Title for a DialogFullScreen',
    children: 'This is an example of a dialog full screen.',
  }
});

definition.isAModal();

export default definition;
