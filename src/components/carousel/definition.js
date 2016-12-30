import { Carousel } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import slideDefinition from './slide/definition';

let definition = {
  component: Carousel,
  key: 'carousel',
  text: {
    bemClass: 'carbon-carousel',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: '[content needed] Padded and coloured basic carousel.',
    name: 'Carousel',
    type: 'layout'
  },
  props: Carousel.propTypes,
  defaultProps: Carousel.defaultProps,
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: DemoHelper.elemArray(slideDefinition, 4),
  initialSlideIndex: 1
});

export default definition;
