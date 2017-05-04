import MountInApp from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('mount-in-app', MountInApp, {
  description: `Mounts a component at a specific target in the DOM.`,
  designerNotes: `
* Useful to mount any Carbon component at a specific target in the DOM.
 `,
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
