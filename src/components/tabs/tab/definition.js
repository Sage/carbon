import Tab from './';
import Definition from './../../../../demo2/utils/definition';
import DemoHelper from '../../../utils/helpers/demo-helper';
import podDefinition from '../../pod/definition';

let definition = new Definition('tab', Tab, {
  text: {
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    type: 'layout'
  }
});

export default definition.data;
