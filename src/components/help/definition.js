import Help from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import { uniq } from 'lodash';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('help', Help, {
  description: `I can get help or clarification by hovering on a question mark icon.`,
  designerNotes: `
* Presents a tooltip when the user hovers on a question mark icon.

* __Tooltip hovering on any Carbon icon?__ Try Icon.
* __Tooltip hovering on any component?__ Try Tooltip.
 `,
  hiddenProps: ['tooltipMessage'],
  propOptions: {
    tooltipPosition: OptionsHelper.positions,
    tooltipAlign: uniq(OptionsHelper.positions.concat(OptionsHelper.alignFull)),
  },
  propRequires: {
    tooltipAlign: 'children',
    tooltipPosition: 'children'
  },
  propTypes: {
    children: "Node",
    href: "String",
    tooltipAlign: "String",
    tooltipPosition: "String",
    tooltipMessage: "N/A"
  },
  propDescriptions: {
    children: "This component supports children.",
    href: "Set's a href to link this help icon to.",
    tooltipAlign: "Aligns the tooltip.",
    tooltipPosition: "Positions the tooltip with the icon.",
    tooltipMessage: "N/A"
  }
});

export default definition;
