import Pill from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Pill,
  key: 'pill',
  text: {
    bemClass: 'carbon-pill',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pill',
    type: 'misc'
  },
  defaultProps: Pill.defaultProps,
  props: Pill.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
