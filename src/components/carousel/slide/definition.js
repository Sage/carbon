import Slide from './';
import DemoHelper from '../../../utils/helpers/demo-helper';
import detailDefinition from '../../detail/definition';

let definition = {
  component: Slide,
  key: 'slide',
  text: {
    bemClass: 'carbon-slide',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Slide',
    type: 'layout'
  },
  props: {
    children: DemoHelper.elemArray(detailDefinition, 8),
    className: 'test'
  }
};

definition.demoProps = definition.props;

export default definition;
