import Pod from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Pod,
  key: 'pod',
  text: {
    bemClass: 'carbon-pod',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pod',
    type: 'layout'
  },
  defaultProps: Pod.defaultProps,
  props: Pod.propTypes,
  propOptions: {
    alignTitle: OptionsHelper.alignFull(),
    as: OptionsHelper.themesFull(),
    padding: OptionsHelper.sizesPod()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'Pod contents',
  description: 'Test description',
  footer: 'Test footer',
  subtitle: 'Test subtitle',
  title: 'Test title'
});

export default definition;
