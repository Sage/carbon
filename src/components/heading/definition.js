import Heading from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('heading', Heading, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'layout',
  propTypes: {
    title: "String || Object",
    subheader: "String || Object",
    help: "String",
    helpLink: "String",
    backLink: "String",
    divider: "Boolean",
    separator: "Boolean"
  },
  propDescriptions: {
    title: "Sets the title for the heading.",
    subheader: "Sets the subheader for the heading.",
    help: "Sets the help text for the heading.",
    helpLink: "Sets the help url for the heading.",
    backLink: "Defines the back button link and toggles its visibility if set.",
    divider: "Adds a divider below the heading and the content.",
    separator: "Adds a separator between the title and subheader."
  },
  propValues: {
    title: 'Heading Component',
    subheader: 'Subheading'
  }
});

export default definition;
