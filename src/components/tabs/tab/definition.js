import Tab from './';
import DemoHelper from '../../../utils/helpers/demo-helper';

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

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  title: 'Test tab',
  children: 'test'
});

export default definition;
