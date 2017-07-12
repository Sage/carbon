import DropdownFilterAjax from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('dropdown-filter-ajax', DropdownFilterAjax, {
  description: `Ajax control: Selects one option from a very long list, with the ability to filter and create new items.`,
  designerNotes: `
* This control is the same as [Dropdown Filter](/components/dropdown-filter), but uses Ajax.
* Ajax loads data from a specified source as needed, rather than data in the page markup.
 `,
  hiddenProps: ['path', 'additionalRequestParams'],
  toggleFunctions: ['create'],
  propTypes: {
    options: "Object",
    cacheVisibleValue: "Boolean",
    value: "String",
    create: "Function",
    freetext: "Boolean",
    suggest: "Boolean",
    path: "String",
    rowsPerRequest: "String",
    visibleValue: "String",
    additionalRequestParams: "Object"
  },
  propValues: {
    path: '/countries'
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input.",
    create: "When defined will show a create button, which on click will trigger this callback with currently typed value.",
    freetext: "When enabled will allow the user to type freely into the field, without their filter having to match a result.",
    suggest: "When enabled will enforce that the user needs to type something before they will see any results.",
    path: "The path to make ajax requests to.",
    rowsPerRequest: "How many items to get per request.",
    visibleValue: "The visible value to display in the input.",
    additionalRequestParams: "Add additional params to the server request"
  }
});

definition.isAnInput();

export default definition;
