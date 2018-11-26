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
    ariaLabel: 'String',
    indicator: 'String',
    children: 'node',
    status: 'String'
  },
  propValues: {
    ariaLabel: 'Step 1 of 5',
    children: 'Step Label',
    indicator: '1',
    status: 'current'
  }
});

export default definition;
