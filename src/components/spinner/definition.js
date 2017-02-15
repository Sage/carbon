import Spinner from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('spinner', Spinner, {
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors,
    size: OptionsHelper.sizesFull
  },
  propTypes: {
    as: "String",
    size: "String",
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    size: "Name of size to pass to the spinner. Possible values include: " + OptionsHelper.sizesFull.join(", ")
  },
});

export default definition;
