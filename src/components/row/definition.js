import Row from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import podDefinition from '../pod/definition';

let definition = {
  component: Row,
  key: 'row',
  text: {
    bemClass: 'carbon-row',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Row',
    type: 'layout'
  },
  defaultProps: Row.defaultProps,
  props: Row.propTypes,
  propOptions: {
    gutter: OptionsHelper.sizesFull()
  }
};

podDefinition.demoProps.onEdit = false;
definition.demoProps = {
  children: DemoHelper.elemArray(podDefinition, 3, 'title'),
  columnDivide: false,
  gutter: 'medium'
};

export default definition;
