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
  label: 'Name',
  indicator: '1',
  state: 'complete'
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  label: 'Delivery Address',
  indicator: '2',
  state: 'complete'
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  label: 'Delivery Details',
  indicator: '3',
  state: 'current'
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  label: 'Payment',
  indicator: '4',
  state: 'incomplete'
});
definition.addChildByDefinition(StepSequenceItemDefinition, {
  label: 'Confirm',
  indicator: '5',
  state: 'incomplete'
});
