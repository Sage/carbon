import Page from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('page', Page, {
  props: [ 'children', 'title' ],
  propTypes: {
    title: 'Node',
    children: 'Node'
  },
  propDescriptions: {
    title: 'The title for the page, normally a Heading component.',
    children: 'This component supports children.'
  }
});

export default definition;
