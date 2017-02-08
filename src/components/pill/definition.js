import Pill from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('pill', Pill, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors
  },
  propTypes: {
    fill: "Boolean",
    as: "String",
  },
  propValues: {
    children: "Pill"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    fill: "Fills the pill components background with colour. When fill is false only the border is coloured"
  },
});

export default definition;
