import Definition from './../../../../demo/utils/definition';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StepSequenceItem from './';

let definition = new Definition('step-sequence-item', StepSequenceItem, {
  description: ``,
  designerNotes: ``,
  relatedComponentsNotes: ``,
  propDescriptions: {
    indicator: '',
    children: '',
    status: ''
  },
  propOptions: {
    status: OptionsHelper.steps,
  },
  propTypes: {
    indicator: 'String',
    children: 'node',
    status: 'String',
    stepNumber: 'Number',
    totalSteps: 'Number'
  },
  propValues: {
    indicator: '1',
    children: 'Step Label',
    status: 'current',
    stepNumber: 1,
    totalSteps: 5
  }
});

export default definition;
