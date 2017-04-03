import Create from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('create', Create, {
  description: `Creates a new set of content that's grouped together.`,
  designerNotes: `
* Creates an item of data usually presented in a Pod or Fieldset, for example, an address.
  `,
  relatedComponentsNotes: `
* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).
* Filling in a broad series of inputs? [Try Form](/components/form).
* Viewing content that’s grouped together visually? [Try Pod](/components/pod).
* Using Fieldset and Pod components together? [Try Show/Edit Pod](/components/show-edit-pod).
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
