import Icon from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('icon', Icon, {
  description: `Allows the user to see a UI element or some content represented with an eye catching icon.`,
  designerNotes: `
* Carbon comes with about 50 standard icons to choose from. See the Icons page in the Style section.
* A tooltip option is available within this component.
* Many other components allow you to specify one of the standard Carbon icons to associate with them, for example, the Link component.

* __Tooltip hovering on any component?__ Try Tooltip.
* __Tooltip from a question mark icon?__ Try Help.
* __Moving the user to another location?__ Try Link.
* __Icons__
 `,
  propRequires: {
    bgShape: "bgTheme",
    bgSize: "bgTheme",
    tooltipPosition: "tooltipMessage",
    tooltipAlign: "tooltipMessage",
  },
  propValues: {
    type: "tick"
  },
  propOptions: {
    type: OptionsHelper.icons,
    bgSize: OptionsHelper.sizesRestricted,
    bgShape: OptionsHelper.shapes,
    bgTheme: OptionsHelper.colors,
    tooltipAlign: OptionsHelper.alignAroundEdges,
    tooltipPosition: OptionsHelper.positions,
  },
  propTypes: {
    type: "String",
    bgSize: "String",
    bgShape: "String",
    bgTheme: "String",
    tooltipMessage: "String",
    tooltipPosition: "String",
    tooltipAlign: "String"
  },
  propDescriptions: {
    type: "The icon to render.",
    bgSize: "The size of the background.",
    bgShape: "The shape of the background.",
    bgTheme: "The color/theme of the background.",
    tooltipMessage: "A message to display as a tooltip to the icon.",
    tooltipPosition: "The position of the tooltip.",
    tooltipAlign: "The alignment of the tooltip."
  }
});

export default definition;
