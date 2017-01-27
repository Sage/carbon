import Portrait from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Portrait,
  key: 'portrait',
  text: {
    bemClass: 'carbon-portrait',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Portrait',
    type: 'misc'
  },
  defaultProps: Portrait.defaultProps,
  props: Portrait.propTypes,
  propOptions: {
    shapes: OptionsHelper.shapesVaried(),
    size: OptionsHelper.sizesPod()
  }
};

definition.demoProps = {
  children: 'test',
  darkBackground: true,
  shape: 'standard',
  size: 'medium',
  src: 'test'
};

export default definition;
