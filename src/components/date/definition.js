import DateComponent from './';
import DemoHelper from '../../utils/helpers/demo-helper';
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
  props: DateComponent.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, OptionsHelper.inputDecoratorDemoProps());

export default definition;
