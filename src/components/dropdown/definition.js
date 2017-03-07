import Dropdown from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('dropdown', Dropdown, {
  description: `I can choose one option from a very long list.`,
  designerNotes: `
* Behaves like a simple browser menu control - the user can select an item using the mouse or keyboard.
* Use placeholder content like ‘Please select…’ to make it clear to the user that the Dropdown is unset.
* Consider a ‘smart default’ selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.

* __Filtering menu options to find the right one?__ Try Dropdown Filter.
* __Adding a new option within the menu?__ Try Dropdown Filter.
* __Choosing one option from a shorter list?__ Try Radio Button.
* __Choosing more than one option?__ Try Checkbox.
* __Choosing one option from a highly visible range?__ Try Button Toggle.
 `,
  hiddenProps: ['options'],
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
    value: "String"
  },
  propValues: {
    options: `getOptions()`
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input."
  }
});

definition.isAnInput();

export default definition;
