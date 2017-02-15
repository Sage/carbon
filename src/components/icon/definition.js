import Icon from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import { uniq } from 'lodash';

let definition = new Definition('icon', Icon, {
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
    tooltipAlign: uniq(OptionsHelper.positions.concat(OptionsHelper.alignFull)),
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
