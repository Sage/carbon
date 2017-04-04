import Pod from './';
import OptionsHelper from 'utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('pod', Pod, {
  description: `A set of content that’s grouped together visually.`,
  designerNotes: `
* Presents content grouped visually together. This can be text, or other components. A good example is a ‘tile’ showing contact information for an individual.
* Configure Pod and Fieldset components to work together, or choose the pre-configured Show/Edit Pod component:
* The [Show/Edit Pod](/components/show-edit-pod) component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.
* But, configuring Pod and Fieldset components manually will give you more customization options, like the following.
* The On Edit property shows a standard edit icon, which can be used to show a fieldset. You can choose whether this icon appears inside or outside the pod, and whether it appears only on hover. You can also choose whether clicking only the icon triggers the On Edit property, or clicking anywhere on the pod.
* Choose from various visual options, including padding, borders, and primary, secondary, or tertiary appearance.
* Set the pod to flex to the width of its content, or take up the full width of its container.
  `,
  relatedComponentsNotes: `
* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).
* Filling in a broad series of inputs? [Try Form](/components/form).
* Using Fieldset and Pod components together? [Try Show/Edit Pod](/components/pod).
* Creating a new entity that is usually presented in a pod? [Try Create](/components/create).
 `,
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
