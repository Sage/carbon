import Pod from './';
import OptionsHelper from 'utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('pod', Pod, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'form',
  toggleFunctions: ['onEdit'],
  propRequires: {
    collapsed: "title",
    alignTitle: "title",
    editContentFullWidth: "onEdit",
    displayEditButtonOnHover: "onEdit",
    triggerEditOnContent: "onEdit",
    internalEditButton: "onEdit"
  },
  propOptions: {
    padding: OptionsHelper.sizesPod,
    as: OptionsHelper.themesFull,
    alignTitle: OptionsHelper.alignFull,
  },
  propTypes: {
    border: "Boolean",
    padding: "String",
    as: "String",
    collapsed: "Boolean",
    title: "String",
    subtitle: "String",
    alignTitle: "String",
    description: "String",
    footer: "String",
    onEdit: "Function",
    editContentFullWidth: "Boolean",
    displayEditButtonOnHover: "Boolean",
    triggerEditOnContent: "Boolean",
    internalEditButton: "Boolean"
  },
  propDescriptions: {
    border: "Shows/hides the border of the Pod.",
    padding: "Controls the size of the padding on the Pod.",
    as: "Controls what theme the Pod should use.",
    collapsed: "Enables and controls the collapsed state of the Pod. This needs to be defined on initialise to work.",
    title: "Defines the title for the Pod.",
    subtitle: "Defines the subtitle for the Pod.",
    alignTitle: "Aligns the title within the Pod.",
    description: "Defines a description for the Pod.",
    footer: "Defines footer content for the Pod.",
    onEdit: "A callback triggered when a user clicks the edit action.",
    editContentFullWidth: "Displays the Pod at full width with the edit button.",
    displayEditButtonOnHover: "Only displays the edit button on hover.",
    triggerEditOnContent: "Makes the entire Pod clickable to trigger the onEdit callback.",
    internalEditButton: "Positions the edit button inside the Pod."
  },
  propValues: {
    children: "This is some example content for a Pod."
  }
});

export default definition;
