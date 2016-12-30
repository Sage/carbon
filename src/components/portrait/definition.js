import Portrait from './';
import DemoHelper from '../../utils/helpers/demo-helper';

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
  props: Portrait.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test',
  darkBackground: true,
  src: 'test'
});

export default definition;
