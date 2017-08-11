import Detail from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('detail', Detail, {
  description: `Prominent text callout with optional icon and footnote.`,
  designerNotes: `
* Useful to present some important text with prominence, for example, a quote, instruction, or callout.
* Optional icon and footnote.
* Make sure that the colour of all text has a contrast ratio of at least 4.5.1, to meet the [WCAG 2.0 AA standard](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) for text less than 19px in size. Webaim have a good online [Contrast Checker](http://webaim.org/resources/contrastchecker/).
  `,
  relatedComponentsNotes: `
* Simple text content? [Try Content](/components/content).
* Headings and sections? [Try Heading](/components/heading).
  `,
  propOptions: {
    icon: OptionsHelper.icons
  },
  propValues: {
    children: "An example of a detail.",
    footnote: "This detail may require a footnote."
  },
  propTypes: {
    className: "String",
    footnote: "String",
    icon: "String",
    children: "Node"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    footnote: "Some additional notes for this detail.",
    icon: "Render a specific icon alongside your detail.",
    children: "This component supports children."
  }
});

export default definition;
