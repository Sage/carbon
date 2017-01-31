import DateComponent from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: DateComponent,
  key: 'date',
  text: {
    bemClass: 'carbon-date',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DateComponent',
    type: 'form'
  },
  defaultProps: DateComponent.defaultProps,
  props: DateComponent.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.defaultValue = '2015-01-01';

definition.demoProps = demoProps;

export default definition;
