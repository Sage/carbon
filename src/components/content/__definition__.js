import Content from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('content', Content, {
  description: `Text content with simple styles.`,
  designerNotes: `
* Useful to show simple text content in a common arrangement.
* Shows a title in bold, with plain text content children.
* Make sure that the colour of all text has a contrast ratio of at least 4.5.1, to meet the [WCAG 2.0 AA standard](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) for text less than 19px in size. Webaim have a good online [Contrast Checker](http://webaim.org/resources/contrastchecker/).
  `,
  relatedComponentsNotes: `
* Prominent text callout? [Try Detail](/components/detail).
* Headings and sections? [Try Heading](/components/heading).
 `,
  propValues: {
    title: "Content Component",
    children: "An example of some content."
  },
  propOptions: {
    align: OptionsHelper.alignFull,
    as: OptionsHelper.themesBinary
  },
  propRequires: {
    titleWidth: 'inline'
  },
  propTypes: {
    align: "String",
    as: "String",
    bodyFullWidth: "Boolean",
    children: "Node",
    className: "String",
    inline: "Boolean",
    title: "String",
    titleWidth: "String"
  },
  propDescriptions: {
    align: "Set the alignment of the content.",
    as: "Set the content to a particular theme.",
    bodyFullWidth: "Check if the content body should stretch full width, or collapse to the content's width",
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    inline: "Check to display the content inline with it's title.",
    title: "Define a title for the component.",
    titleWidth: "Set the width of the title based on a percentage value."
  }
});

export default definition;
