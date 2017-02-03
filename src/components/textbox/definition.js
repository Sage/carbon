import Textbox from './';
import Definition from './../../../demo2/utils/definition';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = new Definition('textbox', Textbox, {
  text: {
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    type: 'form'
  },
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  },
  demoProps: OptionsHelper.inputDecoratorDemoProps()
});

export default definition.data;
