import DialogFullScreen from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('dialog-full-screen', DialogFullScreen, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'modal',
  propValues: {
    title: 'Example Title for a DialogFullScreen',
    children: 'This is an example of a dialog full screen.',
    open: false
  },
  hiddenProps: ['onCancel', 'enableBackgroundUI']
});

definition.stubAction('onCancel', 'open', false);

export default definition;
