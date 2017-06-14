import DropdownFilterAjax from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import DropdownFilterDefintion from './../dropdown-filter/definition';
import { assign, omit } from 'lodash';

let definition = new Definition('dropdown-filter-ajax', DropdownFilterAjax, {
  description: `Ajax control: Selects one option from a very long list, with the ability to filter and create new items.`,
  designerNotes: `
* This control is the same as [Dropdown Filter](/components/dropdown-filter), but uses Ajax.
* Ajax loads data from a specified source as needed, rather than data in the page markup.
 `,
  hiddenProps: ['path', 'value', 'additionalRequestParams'],
  toggleFunctions: ['create'],
  propTypes: assign({},
    omit(DropdownFilterDefintion.propTypes, ['options']), {
      path: "String",
      rowsPerRequest: "String",
      visibleValue: "String",
      additionalRequestParams: "Object"
    }
  ),
  propValues: {
    path: '/countries'
  },
  propDescriptions: assign({},
    omit(DropdownFilterDefintion.propDescriptions, ['options']), {
      path: "The path to make ajax requests to.",
      rowsPerRequest: "How many items to get per request.",
      visibleValue: "The visible value to display in the input.",
      additionalRequestParams: "Add additional params to the server request"
    }
  )
});

definition.isAnInput();

export default definition;
