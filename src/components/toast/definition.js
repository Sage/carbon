import Toast from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('toast', Toast, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'notification',
  propOptions: {
    as: OptionsHelper.colors()
  },
  propValues: {
    children: 'test',
    open: true
  },
  hiddenProps: ['onDismiss']
});

definition.stubAction('onDismiss', 'open', false);

export default definition;
