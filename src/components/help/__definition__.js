import Help from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('help', Help, {
  description: `User assistance or clarification presented by hovering on a question mark icon.`,
  designerNotes: `
  `,
  relatedComponentsNotes: `
* Tooltip hovering on any Carbon icon? [Try Icon](/components/icon).
* Tooltip hovering on any component? [Try Tooltip](/components/tooltip).
 `,
  hiddenProps: ['tooltipMessage'],
  propOptions: {
    tooltipPosition: OptionsHelper.positions,
    tooltipAlign: OptionsHelper.alignAroundEdges
  },
  propRequires: {
    tooltipAlign: 'children',
    tooltipPosition: 'children'
  },
  propValues: {
    children: 'This is an example of help.'
  },
  propTypes: {
    children: "Node",
    className: "String",
    href: "String",
    tooltipAlign: "String",
    tooltipPosition: "String",
    tooltipMessage: "N/A"
  },
  propDescriptions: {
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    href: "Set's a href to link this help icon to.",
    tooltipAlign: "Aligns the tooltip.",
    tooltipPosition: "Positions the tooltip with the icon.",
    tooltipMessage: "N/A"
  }
});

export default definition;
