import GroupedCharacter from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('grouped-character', GroupedCharacter, {
  hiddenProps: ["groups"],
  propTypes: {
    className: "String",
    groups: "Array",
    separator: "String",
    inputWidth: "String",
    value: "String"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    groups: "Determine groups of characters e.g. [1, 2, 3] would create the following text in the input 'A-BC-DEF'",
    separator: "Separator to split the character groups. Defaulted to a dash '-'. Must be a non alpha-numeric character",
    inputWidth: "Inline style to set the width of the component. Used if you want the width to match the character length",
    value: "The value of the input"
  },
  propValues: {
    groups: '[2,4,4]'
  }
});

definition.isAnInput();

export default definition;
