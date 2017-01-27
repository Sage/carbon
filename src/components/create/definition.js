import Create from './';
import DemoHelper from '../../utils/helpers/demo-helper';

let definition = {
  component: Create,
  key: 'create',
  text: {
    bemClass: 'carbon-create',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Create',
    type: 'action'
  },
  defaultProps: Create.defaultProps,
  props: Create.propTypes
};

definition.demoProps = {
  children: 'test'
};

export default definition;
