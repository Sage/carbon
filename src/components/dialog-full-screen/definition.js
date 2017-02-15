import DialogFullScreen from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('dialog-full-screen', DialogFullScreen, {
  propValues: {
    title: 'Example Title for a DialogFullScreen',
    children: 'This is an example of a dialog full screen.',
  }
});

definition.isAModal();

export default definition;
