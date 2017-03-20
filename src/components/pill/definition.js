import Pill from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('pill', Pill, {
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors
  },
  propTypes: {
    fill: "Boolean",
    as: "String",
    children: "Node"
  },
  propValues: {
    children: "Pill"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    fill: "Fills the pill background with colour. When fill is false only the border is coloured.",
    children: "This component supports children."
  },
});

export default definition;
