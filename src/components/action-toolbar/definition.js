import ActionToolbar from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from './../link/definition';
import tooltipDefinition from './../tooltip/definition';

let definition = new Definition('action-toolbar', ActionToolbar, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'layout',
  associatedDefinitions: [linkDefinition, tooltipDefinition],
  requiredProps: ['actions'],
  propTypes: {
    actions: 'Array'
  },
  propDescriptions: {
    actions: 'An array of objects containing Link and Tooltip props.'
  }
});

export default definition;
