import { Carousel } from './';
import Definition from './../../../demo/utils/definition';
import slideDefinition from './slide/definition';

let definition = new Definition('carousel', Carousel, {
  description: `Steps through a series of images.`,
  designerNotes: `
* Presents a series of images which the user can step through one-by-one, or quickly jump to a particular step.
* Useful for showcasing a set of new features, for example.
 `,
  associatedDefinitions: [slideDefinition],
  propTypes: {
    children: 'Node',
    className: 'String',
    initialSlideIndex: 'Number || String',
    slideIndex: 'Number || String',
    enableSlideSelector: 'Boolean',
    enablePreviousButton: 'Boolean',
    enableNextButton: 'Boolean'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    initialSlideIndex: 'Which slide the component should initialize with.',
    slideIndex: 'Set this prop to change slide',
    enableSlideSelector: 'Set this prop to false to hide the slide selector.',
    enablePreviousButton: 'Set this prop to false to hide the previous button',
    enableNextButton: 'Set this prop to false to hide the next button'
  }
});

definition.addChildByDefinition(slideDefinition, {
  children: '<h1 style={{ textAlign: "center" }}>Slide One</h1>'
});

definition.addChildByDefinition(slideDefinition, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Two</h1>'
});

definition.addChildByDefinition(slideDefinition, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Three</h1>'
});

export default definition;
