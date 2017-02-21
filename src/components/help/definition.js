import Help from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import { uniq } from 'lodash';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('help', Help, {
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
