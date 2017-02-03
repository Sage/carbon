import { Tabs } from './';
import Definition from './../../../demo2/utils/definition';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import tabDefinition from './tab/definition';

let definition = new Definition('tabs', Tabs, {
  text: {
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    type: 'layout',
  },
  propOptions: {
    align: OptionsHelper.alignBinary(),
    position: OptionsHelper.positions()
  },
  demoProps: {
    align: 'left',
    children: [{
      definition: tabDefinition,
      demoProps: {
        tabId: "tab-1",
        title: "Tab 1",
        children: "Content for tab 1"
      }
    }, {
      definition: tabDefinition,
      demoProps: {
        tabId: "tab-2",
        title: "Tab 2",
        children: "Content for tab 2"
      }
    }],
    position: 'top',
    renderHiddenTabs: false
  }
});

export default definition.data;
