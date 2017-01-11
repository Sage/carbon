import { Carousel } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import slideDefinition from './slide/definition';

let definition = {
  component: Carousel,
  key: 'carousel',
  text: {
    bemClass: 'carbon-carousel',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Padded and coloured basic carousel.',
    name: 'Carousel',
    type: 'layout'
  },
  props: Carousel.propTypes,
  defaultProps: Carousel.defaultProps,
};

definition.demoProps = {
  children: DemoHelper.elemArray(slideDefinition, 4),
  initialSlideIndex: 0
};

export default definition;
