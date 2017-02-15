import MountInApp from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('mount-in-app', MountInApp, {
  hiddenProps: ['children', 'targetId'],
  propValues: {
    children: "<div>Content!</div>",
    targetId: "carbon-demo"
  },
  propTypes: {
    targetId: "String"
  },
  propDescriptions: {
    targetId: "The HTML ID in which to render the component."
  }
});

export default definition;
