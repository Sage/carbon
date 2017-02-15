import SimpleColorPicker from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('simple-color-picker', SimpleColorPicker, {
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
