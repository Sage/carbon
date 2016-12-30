import Spinner from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Spinner,
  key: 'spinner',
  text: {
    bemClass: 'carbon-spinner',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Spinner',
    type: 'misc'
  },
  defaultProps: Spinner.defaultProps,
  props: Spinner.propTypes,
  propOptions: {
    size: OptionsHelper.sizesRestricted(),
    as: OptionsHelper.colors()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
