import Detail from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('detail', Detail, {
  propOptions: {
    icon: OptionsHelper.icons
  },
  propValues: {
    children: "An example of a detail.",
    footnote: "This detail may require a footnote."
  },
  propTypes: {
    footnote: "String",
    icon: "String",
    children: "Node"
  },
  propDescriptions: {
    footnote: "Some additional notes for this detail.",
    icon: "Render a specific icon alongside your detail.",
    children: "This component supports children."
  }
});

export default definition;
