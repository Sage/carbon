import Rainbow from './';
import Immutable from 'immutable';


let rainbowData = Immutable.fromJS([
  {
    y: 30,
    name: 'First Bit',
    label: 'label for first bit',
    tooltip: 'more info about this bit',
    color: '#ED1C5F'
  }, {
    y: 45,
    name: 'Second Bit',
    label: 'label for second bit',
    tooltip: 'more info about this bit',
    color: '#FFAB00'
  }, {
    y: 25,
    name: 'Second Bit',
    label: 'label for second bit',
    tooltip: 'more info about this bit',
    color: '#255BC7'
  }
]);
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Rainbow,
  key: 'rainbow',
  text: {
    bemClass: 'carbon-rainbow',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Rainbow',
    type: 'layout'
  },
  defaultProps: Rainbow.defaultProps,
  props: Rainbow.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test',
  data: rainbowData
});

export default definition;
