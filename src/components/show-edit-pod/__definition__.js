import ShowEditPod from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import formDefinition from './../form/__definition__';
import { assign } from 'lodash';

let definition = new Definition('show-edit-pod', ShowEditPod, {
  description: `Presents and edits a set of content that’s grouped together visually (in one pre-configured component).`,
  designerNotes: `
* Nest any Carbon input into this component.
* Configure Pod and Fieldset components to work together, or choose this pre-configured Show/Edit Pod component:
* The Show/Edit Pod Component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.
* But, configuring Pod and Fieldset components manually will give you more customization options.
* Choose whether the editable state has a disabled or enabled Save button, a Cancel button, or a Delete button, and their alignment.
* Choose from various visual options, including borders, and primary, secondary, or tertiary appearance.
* Set the pod to flex to the width of its content, or take up the full width of its container.
* Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.
* Create a single path to completion with your inputs, and between your inputs and the primary action Button.
* Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don’t collect information you don’t need! Try suffixing ‘(optional)’ after your field label.
* More guidance is available for each of the individual inputs you might place inside this component.
  `,
  relatedComponentsNotes: `
* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).
* Filling in a broad series of inputs? [Try Form](/components/form).
* Viewing content that’s grouped together visually? [Try Pod](/components/pod).
* Creating a new entity that is usually presented in a pod? [Try Create](/components/create).
 `,
  hiddenProps: ['children', 'editing', 'validateOnMount', 'transitionName'],
  toggleFunctions: ['onDelete'],
  propOptions: assign({}, formDefinition.propOptions, {
    as: OptionsHelper.themesFull
  }),
  defaultProps: assign({}, formDefinition.defaultProps, ShowEditPod.defaultProps),
  propTypes: assign({}, formDefinition.propTypes, {
    children: "Node",
    className: "String",
    editing: "Boolean",
    onEdit: "Function",
    onDelete: "Function",
    editFields: "Node",
    title: "String",
    transitionName: "String",
    border: "Boolean",
    as: "String",
    deleteText: "String"
  }),
  propValues: {
    children: `<Content title="First Name">Alan</Content>
  <Content title="Last Name">Smith</Content>
  <Content title="Telephone">000 000 0000</Content>`,
    title: "Person",
    editFields: `[
    <Textbox key='first_name' label="First Name" value="Alan" />,
    <Textbox key='second_name' label="Second Name" value="Smith" />,
    <Textbox key='telephone' label="Telephone" value="000 000 0000" />
  ]`
  },
  propDescriptions: assign({}, formDefinition.propDescriptions, {
    as: "Set a theme for the Pod.",
    border: "Enabled/disable the border on the Pod.",
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    deleteText: "Define custom text for the delete button.",
    editFields: "Define fields to be rendered in the edit state.",
    editing: "Allows developers to control the editing state manually.",
    onDelete: "Callback triggered when the delete action is clicked.",
    onEdit: "Callback triggered when the edit action is clicked.",
    title: "Define a title for the Pod.",
    transitionName: "Define a custom transition between show and edit states."
  })
});

export default definition;
