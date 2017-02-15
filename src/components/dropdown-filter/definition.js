import DropdownFilter from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('dropdown-filter', DropdownFilter, {
  hiddenProps: ['options'],
  toggleFunctions: ['create'],
  js: `function getOptions() {
  return ImmutableHelper.parseJSON([{
    id: "1", name: "Orange"
  }, {
    id: "2", name: "Blue"
  }, {
    id: "3", name: "Green"
  }, {
    id: "4", name: "Black"
  }, {
    id: "5", name: "Yellow"
  }, {
    id: "6", name: "White"
  }, {
    id: "7", name: "Magenta"
  }, {
    id: "8", name: "Cyan"
  }, {
    id: "9", name: "Red"
  }, {
    id: "10", name: "Grey"
  }, {
    id: "11", name: "Purple"
  }]);
};`,
  propTypes: {
    options: "Object",
    cacheVisibleValue: "Boolean",
    value: "String",
    create: "Function",
    freetext: "Boolean",
    suggest: "Boolean"
  },
  propValues: {
    options: `getOptions()`
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input.",
    create: "When defined will show a create button, which on click will trigger this callback with currently typed value.",
    freetext: "When enabled will allow the user to type freely into the field, without their filter having to match a result.",
    suggest: "When enabled will enforce that the user needs to type something before they will see any results."
  }
});

definition.isAnInput();

export default definition;
