import { Carousel } from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';
import slideDefinition from './slide/definition';

let definition = new Definition('carousel', Carousel, {
  associatedDefinitions: [slideDefinition],
  propTypes: {
    children: 'Node',
    className: 'String',
    initialSlideIndex: 'Number || String'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    initialSlideIndex: 'Which slide the component should initialize with.'
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
