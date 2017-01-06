import Tab from './';
import DemoHelper from '../../../utils/helpers/demo-helper';
import podDefinition from '../../pod/definition';

let definition = {
  component: Tab,
  key: 'tab',
  text: {
    bemClass: 'carbon-tab',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Tab',
    type: 'layout'
  },
  defaultProps: Tab.defaultProps,
  props: Tab.propTypes
};

podDefinition.demoProps.onEdit = () => {};
definition.demoProps = {
  children: DemoHelper.elemArray(podDefinition, 3, 'title'),
  title: 'Test tab'
};

export default definition;
