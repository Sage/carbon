import Heading from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Heading,
  key: 'heading',
  text: {
    bemClass: 'carbon-heading',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Heading',
    type: 'layout'
  },
  defaultProps: Heading.defaultProps,
  props: Heading.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  backLink: '/test',
  children: 'description area',
  divider: true,
  help: 'Test help link',
  helpLink: '/test',
  separator: true,
  subheader: 'This is a sub heading',
  title: 'Test'
});

export default definition;
