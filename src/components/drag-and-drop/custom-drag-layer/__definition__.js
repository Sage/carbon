import CustomDragLayer from './';
import Definition from './../../../../demo/utils/definition';

const definition = new Definition('custom-drag-layer', CustomDragLayer, {
  props: ['className'],
  propTypes: {
    className: 'String'
  },
  propDescriptions: {
    className: 'Custom classes to apply to the component'
  }
});

export default definition;
