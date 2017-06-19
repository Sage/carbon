import Heading from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('heading', Heading, {
  description: `The titles of a page and its sections.`,
  designerNotes: `
* A standard page or section header, with a range of options, such as a help link presented as an icon, a sub-heading, a ‘Back’ icon, and visual dividers and separators.
* Make sure that the colour of all text has a contrast ratio of at least 4.5.1, to meet the [WCAG 2.0 AA standard](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) for text less than 19px in size. Webaim have a good online [Contrast Checker](http://webaim.org/resources/contrastchecker/).
  `,
  relatedComponentsNotes: `
* Simple text content? [Try Content](/components/content).
* Prominent text callout? [Try Detail](/components/detail).
 `,
  type: 'layout',
  propTypes: {
    children: "Node",
    className: "String",
    title: "String",
    subheader: "String",
    help: "String",
    helpLink: "String",
    backLink: "String",
    divider: "Boolean",
    separator: "Boolean"
  },
  propDescriptions: {
    children: "This component supports children.",
    className: "Classes to apply to the component.",
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
