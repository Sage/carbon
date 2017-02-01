import { Tabs } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import tabDefinition from './tab/definition';

let definition = {
  component: Tabs,
  key: 'tabs',
  text: {
    bemClass: 'carbon-tabs',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Tabs',
    type: 'layout'
  },
  defaultProps: Tabs.defaultProps,
  props: Tabs.propTypes,
  propOptions: {
    align: OptionsHelper.alignBinary(),
    position: OptionsHelper.positions()
  }
};

definition.demoProps = {
  align: 'left',
  children: [{
    definition: tabDefinition,
    demoProps: {
      title: "Tab 1",
      children: "Content for tab 1"
    }
  }, {
    definition: tabDefinition,
    demoProps: {
      title: "Tab 2",
      children: "Content for tab 2"
    }
  }],
  position: 'top',
  renderHiddenTabs: false
};

export default definition;
