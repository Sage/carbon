import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import StepSequence from './';
import StepSequenceItemDefinition from './step-sequence-item/__definition__';

let definition = new Definition('step-sequence', StepSequence, {
  description: ``,
  designerNotes: ``,
  relatedComponentsNotes: ``,
  propDescriptions: {
    orientation: ''
  },
  propOptions: {
    orientation: OptionsHelper.orientation,
  },
  propTypes: {
    orientation: 'String'
  },
  propValues: {
    orientation: 'horizontal'
  }
});

export default definition;

definition.addChildByDefinition(StepSequenceItemDefinition, {
  children: 'Name',
  indicator: '1',
  status: 'complete',
  stepNumber: 1,
  totalSteps: 5
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  children: 'Delivery Address',
  indicator: '2',
  status: 'complete',
  stepNumber: 2,
  totalSteps: 5
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  children: 'Delivery Details',
  indicator: '3',
  status: 'current',
  stepNumber: 3,
  totalSteps: 5
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  children: 'Payment',
  indicator: '4',
  status: 'incomplete',
  stepNumber: 4,
  totalSteps: 5
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  children: 'Confirm',
  indicator: '5',
  status: 'incomplete',
  stepNumber: 5,
  totalSteps: 5
});
