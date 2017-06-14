import Dropdown from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('dropdown', Dropdown, {
  description: `Selects one option from a very long list.`,
  designerNotes: `
* Behaves like a simple browser menu control - the user can select an item using the mouse or keyboard.
* Useful to show more than about 5 options.
* Use placeholder content like ‘Please select…’ to make it clear to the user that the Dropdown is unset.
* Consider a ‘smart default’ selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
  `,
  relatedComponentsNotes: `
* Filtering menu options to find the right one? [Try Dropdown Filter](/components/dropdown-filter).
* Adding a new option within the menu? [Try Dropdown Filter](/components/dropdown-filter).
* Choosing one option from a shorter list? [Try Radio Button](/components/radio-button).
* Choosing more than one option? [Try Checkbox](/components/checkbox).
* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).
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
    autoFocus: "Boolean",
    cacheVisibleValue: "Boolean",
    disabled: "Boolean",
    name: "String",
    onBlur: "Function",
    options: "Object",
    readOnly: "Boolean",
    value: "String"
  },
  propValues: {
    options: `getOptions()`
  },
  propDescriptions: {
    autoFocus: "Automatically focus the input.",
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    disabled: "Disable all user interaction.",
    name: "Set the name of the corresponding hidden input.",
    onBlur: "A custom onBlur handler",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    readOnly: "Display the currently selected value without displaying the dropdown.",
    value: "The currently selected value of the input."
  }
});

definition.isAnInput();

export default definition;
