import Tooltip from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import { uniq } from 'lodash';

let definition = new Definition('tooltip', Tooltip, {
  description: `I can see additional information by hovering on a component.`,
  designerNotes: `
* A short paragraph of plain-text information shown to the user in context when they hover on any component. For example, to define how a particular figure is calculated, or the definition of a difficult technical term.

* __Tooltip hovering on any Carbon icon?__ Try Icon.
* __Tooltip from a question mark icon?__ Try Help.
* __Icons__
`,
  type: 'miscellaneous',
  propValues: {
    isVisible: true,
    children: "I'm a helpful tooltip that can display more information to a user."
  },
  propOptions: {
    align: uniq(OptionsHelper.positions.concat(OptionsHelper.alignFull)),
    position: OptionsHelper.positions
  },
  propTypes: {
    align: 'String',
    children: 'Node',
    position: 'String',
    isVisible: 'Boolean'
  },
  propDescriptions: {
    align: 'The alignment of the pointer on the tooltip.',
    children: 'Child content to render in the tooltip.',
    isVisible: 'Whether to show or hide the tooltip. Use this with a handler to hide and show the tooltip',
    position: 'The position of the tooltip relative to its target element.'
  }
});

export default definition;
