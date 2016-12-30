import Filter from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Filter,
  key: 'filter',
  text: {
    bemClass: 'carbon-filter',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Filter',
    type: 'form'
  },
  defaultProps: Filter.defaultProps,
  props: Filter.propTypes,
  propOptions: {
    align: OptionsHelper.alignBinary()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
