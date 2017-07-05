import { Carousel } from './';
import Definition from './../../../demo/utils/definition';
import slideDefinition from './slide/definition';

const definition = new Definition('carousel', Carousel, {
  description: 'Steps through a series of images.',
  designerNotes: `
* Presents a series of images which the user can step through one-by-one, or quickly jump to a particular step.
* Useful for showcasing a set of new features, for example.
 `,
  associatedDefinitions: [slideDefinition],
  propTypes: {
    children: 'Node',
    className: 'String',
    initialSlideIndex: 'Number',
    slideIndex: 'Number',
    enableSlideSelector: 'Boolean',
    enablePreviousButton: 'Boolean',
    enableNextButton: 'Boolean',
    onSlideChange: 'Function'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    initialSlideIndex: 'Which slide the component should initialize with.',
    slideIndex: 'Set this prop to change slide',
    enableSlideSelector: 'Set this prop to false to hide the slide selector.',
    enablePreviousButton: 'Set this prop to false to hide the previous button',
    enableNextButton: 'Set this prop to false to hide the next button',
    onSlideChange: 'Action to be called on slide change.' +
    ' It will receive the slide index and the transition direction as params.'
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

definition.addChildByDefinition(slideDefinition, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Four</h1>'
});

definition.addChildByDefinition(slideDefinition, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Five</h1>'
});

export default definition;
