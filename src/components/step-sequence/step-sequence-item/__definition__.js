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
    status: 'String'
  },
  propValues: {
    indicator: '1',
    children: 'Step Label',
    status: 'current'
  }
});

export default definition;
