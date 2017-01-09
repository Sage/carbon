import DateRange from './';
import DemoHelper from '../../utils/helpers/demo-helper';

let definition = {
  component: DateRange,
  key: 'date-range',
  text: {
    bemClass: 'carbon-date-range',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DateRange',
    type: 'form'
  },
  defaultProps: DateRange.defaultProps,
  props: DateRange.propTypes
};

definition.demoProps = {
  endLabel: 'Range End',
  endMessage: 'Range End Message',
  labelsInline: false,
  onChange: DemoHelper.stubbedFunction,
  startLabel: 'Range Start',
  startMessage: 'Range Start Message',
  value: ['2015-01-12', '2015-01-13']
};

export default definition;
