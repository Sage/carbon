import OptionsHelper from 'utils/helpers/options-helper';
import Icon from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('icon', Icon, {
  description: 'An eye catching icon associated with a UI element or content item.',
  designerNotes: `
* Carbon comes with about 50 standard icons to choose from. See the Icons page in the Style section.
* A tooltip option is available within this component.
* Many other components allow you to specify one of the standard Carbon icons to associate with them, for example, the Link component.
  `,
  relatedComponentsNotes: `
* Tooltip hovering on any component? [Try Tooltip](/components/tooltip).
* Tooltip from a question mark icon? [Try Help](/components/help).
* Moving the user to another location? [Try Link](/components/link).
* After an image? [View Icons](/style/icons).
 `,
  propRequires: {
    bgShape: 'bgTheme',
    bgSize: 'bgTheme',
    tooltipAlign: 'tooltipMessage',
    tooltipPosition: 'tooltipMessage'
  },
  propValues: {
    type: 'tick'
  },
  propOptions: {
    bgShape: OptionsHelper.shapes,
    bgSize: OptionsHelper.sizesRestricted,
    bgTheme: OptionsHelper.colors,
    tooltipAlign: OptionsHelper.alignAroundEdges,
    tooltipPosition: OptionsHelper.positions,
    type: OptionsHelper.icons
  },
  propTypes: {
    bgShape: 'String',
    bgSize: 'String',
    bgTheme: 'String',
    className: 'String',
    tooltipAlign: 'String',
    tooltipMessage: 'String',
    tooltipPosition: 'String',
    type: 'String'
  },
  propDescriptions: {
    bgShape: 'The shape of the background.',
    bgSize: 'The size of the background.',
    bgTheme: 'The color/theme of the background.',
    className: 'Set custom classes on the component',
    tooltipAlign: 'The alignment of the tooltip.',
    tooltipMessage: 'A message to display as a tooltip to the icon.',
    tooltipPosition: 'The position of the tooltip.',
    type: 'The icon to render.'
  }
});

export default definition;
