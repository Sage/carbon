import Create from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('create', Create, {
  description: `Allows the user to create a new set of content that’s grouped together visually.`,
  designerNotes: `
* Creates an item of data usually presented in a Pod or Fieldset, for example, an address.

* __Editing a number of closely related inputs?__ Try Fieldset.
* __Filling in a broad series of inputs?__ Try Form.
* __Viewing content that’s grouped together visually?__ Try Pod.
* __Using Fieldset and Pod components together?__ Try Show/Edit Pod.
 `,
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
