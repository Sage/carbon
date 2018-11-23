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
    state: ''
  },
  propOptions: {
    state: OptionsHelper.steps,
  },
  propTypes: {
    indicator: 'String',
    children: 'node',
    state: 'String'
  },
  propValues: {
    indicator: '1',
    children: 'Step Label',
    state: 'current'
  }
});

export default definition;
