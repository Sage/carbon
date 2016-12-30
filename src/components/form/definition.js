import Form from './';
import DemoHelper from '../../utils/helpers/demo-helper';

let definition = {
  component: Form,
  key: 'form',
  text: {
    bemClass: 'carbon-form',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Form',
    type: 'form'
  },
  defaultProps: Form.defaultProps,
  props: Form.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
