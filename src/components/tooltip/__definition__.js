import Tooltip from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = new Definition('tooltip', Tooltip, {
  description: `Additional information presented by hovering on a component.`,
  designerNotes: `
* A short paragraph of plain-text information shown to the user in context when they hover on any component. For example, to define how a particular figure is calculated, or the definition of a difficult technical term.
  `,
  relatedComponentsNotes: `
* Tooltip hovering on any Carbon icon? [Try Icon](/components/icon).
* Tooltip from a question mark icon? [Try Help](/components/help).
* Need a visual? [View Icons](/style/icons).__
`,
  type: 'miscellaneous',
  hiddenProps: [
    'id'
  ],
  propValues: {
    isVisible: true,
    children: "I'm a helpful tooltip that can display more information to a user."
  },
  propOptions: {
    align: OptionsHelper.alignAroundEdges,
    position: OptionsHelper.positions
  },
  propTypes: {
    align: 'String',
    children: 'Node',
    className: 'String',
    id: 'String',
    isVisible: 'Boolean',
    position: 'String'
  },
  propDescriptions: {
    align: 'The alignment of the pointer on the tooltip.',
    children: 'Child content to render in the tooltip.',
    className: 'Classes to be applied to the component.',
    id: 'The id attribute to apply to the tooltip',
    isVisible: 'Whether to show or hide the tooltip. Use this with a handler to hide and show the tooltip',
    position: 'The position of the tooltip relative to its target element.'
  }
});

export default definition;