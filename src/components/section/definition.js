import Section from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('section', Section, {
  type: 'misc',
  propValues: {
    title: 'This is my title',
    children: "This is where some content would live"
  },
  requiredProps: ['children'],
  propTypes: {
    title: "String",
    children: "Array or Object",
  },
  propDescriptions: {
    title: "A title to render at the top of the section",
    children: "The child content to render in the section"
  }
});

export default definition;
