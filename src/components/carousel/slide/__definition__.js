import Slide from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('slide', Slide, {
  props: [ 'children' ],
  propTypes: {
    children: 'Node'
  },
  propDescriptions: {
    children: 'This component supports children.'
  }
});

export default definition;
