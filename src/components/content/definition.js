import Content from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('content', Content, {
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
