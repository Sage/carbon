import Definition from './../../../../demo/utils/definition';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StepSequenceItem from './';

let definition = new Definition('step-sequence-item', StepSequenceItem, {
  description: ``,
  designerNotes: ``,
  relatedComponentsNotes: ``,
  propDescriptions: {
    indicator: '',
    label: '',
    state: ''
  },
  propOptions: {
    state: OptionsHelper.steps,
  },
  propTypes: {
    indicator: 'String',
    label: 'String',
    state: 'String'
  },
  propValues: {
    indicator: '1',
    label: 'Step Label',
    state: 'current'
  }
});

export default definition;
