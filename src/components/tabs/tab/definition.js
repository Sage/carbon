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
    tabId: "A unique ID to identify this specific tab.",
    title: "The title for this tab and it's button."
  }
});

export default definition;
