import ActionToolbar from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from './../link/definition';
import tooltipDefinition from './../tooltip/definition';

let definition = new Definition('action-toolbar', ActionToolbar, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component \n' +
  'This component is designed to be used with a form. To render in a Carbon form,\n' +
  'simply pass the actions to Table or TableAjax as the `actions` prop.',
  type: 'action',
  requiredProps: ['actions'],
  hiddenProps: ['disabled', 'actions'],
  propValues: {
    actions: `[{
      text: 'Print',
      icon: 'print',
      href: '#',
      tooltipMessage: 'Print',
      disabled: false
    }]`
  },
  propTypes: {
    actions: 'Array'
  },
  propDescriptions: {
    actions: 'An array of objects containing Link and Tooltip props.'
  }
});

export default definition;
