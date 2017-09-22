import Tab from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('tab', Tab, {
  type: 'layout',
  requiredProps: ["tabId", "title"],
  propTypes: {
    tabId: "String",
    title: "String"
  },
  propDescriptions: {
    'aria-labelledby': 'The id of the corresponding control that must be activated to show the tab.',
    role: 'The ARIA role of the component.',
    tabId: "A unique ID to identify this specific tab.",
    tabIndex: "Determines if the tab is tabbable using the keyboard.",
    title: "The title for this tab and it's button."
  }
});

export default definition;
