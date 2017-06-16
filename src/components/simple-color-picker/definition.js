import SimpleColorPicker from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import ComponentActions from './../../../demo/actions/component';

let definition = new Definition('simple-color-picker', SimpleColorPicker, {
  description: `A small number of pre-set colour options to select from.`,
  designerNotes: `
* Choose from a small palette of pre-set colours, with indication of a currently selected colour.
  `,
  relatedComponentsNotes: `
* [Colors](/style/colors).
 `,
  hiddenProps: ['availableColors'],
  propTypes: {
    availableColors: "Array",
    selectedColor: "String",
    name: "String",
    onChange: "Function"
  },
  propValues: {
    availableColors: "['#00DC00', '#255BC7', '#ED1C5F']",
    name: "color",
    onChange: ComponentActions.updateSimpleColorPickerSelected,
    selectedColor: "#00DC00"
  },
  propDescriptions: {
    availableColors: "An array of color choices to display.",
    selectedColor: "The currently selected color.",
    name: "The name to apply to the input.",
    onChange: "A callback triggered when a color is selected."
  }
});

export default definition;
