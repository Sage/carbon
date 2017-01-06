import DropdownFilterAjax from './';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: DropdownFilterAjax,
  key: 'dropdown-filter-ajax',
  text: {
    bemClass: 'carbon-dropdown-filter-ajax',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DropdownFilterAjax',
    type: 'form'
  },
  defaultProps: DropdownFilterAjax.defaultProps,
  props: DropdownFilterAjax.propTypes
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.cacheVisibleValue = true;
demoProps.path = '/path/test';
demoProps.rowsPerRequest = 1;
demoProps.suggest = true;

definition.demoProps = demoProps;

export default definition;
