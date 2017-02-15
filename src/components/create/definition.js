import Create from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('create', Create, {
  hiddenProps: ["linkProps"],
  propValues: {
    children: "Resource Name"
  },
  propTypes: {
    children: "Node",
    className: "String",
    linkProps: "Object"
  },
  propDescriptions: {
    children: "This component supports children",
    className: "Classes to apply to the component",
    linkProps: "An object of props to pass down to the link. See Link component for more details"
  }
});

export default definition;
