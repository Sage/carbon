import ShowEditPod from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import formDefinition from './../form/definition';
import { assign } from 'lodash';

let definition = new Definition('show-edit-pod', ShowEditPod, {
  hiddenProps: ['editing', 'validateOnMount', 'transitionName'],
  toggleFunctions: ['onDelete'],
  propOptions: assign({}, formDefinition.propOptions, {
    as: OptionsHelper.themesFull
  }),
  defaultProps: assign({}, formDefinition.defaultProps, ShowEditPod.defaultProps),
  propTypes: assign({}, formDefinition.propTypes, {
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
    <Textbox label="First Name" value="Alan" />,
    <Textbox label="Second Name" value="Smith" />,
    <Textbox label="Telephone" value="000 000 0000" />
  ]`
  },
  propDescriptions: assign({}, formDefinition.propDescriptions, {
    as: "Set a theme for the Pod.",
    border: "Enabled/disable the border on the Pod.",
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
