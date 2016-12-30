import Toast from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Toast,
  key: 'toast',
  text: {
    bemClass: 'carbon-toast',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Toast',
    type: 'notification'
  },
  defaultProps: Toast.defaultProps,
  props: Toast.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
