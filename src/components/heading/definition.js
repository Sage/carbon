import Heading from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('heading', Heading, {
  type: 'layout',
  propTypes: {
    title: "String",
    subheader: "String",
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
