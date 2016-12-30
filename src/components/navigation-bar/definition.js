import NavigationBar from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from '../link/definition';

let definition = {
  component: NavigationBar,
  key: 'navigation-bar',
  text: {
    bemClass: 'carbon-navigation-bar',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'NavigationBar',
    type: 'layout'
  },
  defaultProps: NavigationBar.defaultProps,
  props: NavigationBar.propTypes,
  propOptions: {
    as: OptionsHelper.themesBinary()
  }
};

linkDefinition.demoProps.icon = null;
definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: DemoHelper.elemArray(linkDefinition, 7)
});

export default definition;
