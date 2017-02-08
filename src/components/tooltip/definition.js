import Tooltip from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = new Definition('tooltip', Tooltip, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'layout',
  hiddenProps: ['isVisible'],
  propValues: {
    isVisible: true,
    children: 'I\'m a helpful tip'
  },
  propOptions: {
    align: ['top', 'bottom', 'center', 'right', 'left'],
    position: ['top', 'bottom', 'right', 'left']
  },
  propTypes: {
    align: 'String',
    children: 'Node',
    className: 'String',
    position: 'String',
    isVisible: Boolean
  },
  propDescriptions: {
    align: 'The alignment of the pointer on the tooltip.',
    children: 'Child content to render in the tooltip.',
    className: 'A custom class name for the component',
    isVisible: 'Whether to show or hide the tooltip. Use this with a handler to hide and show the tooltip',
    position: 'The position of the tooltip relative to its target element.'
  }
});

export default definition;
