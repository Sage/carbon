import { action } from "@storybook/addon-actions";

function partialAction(actionName) {
  return (eventObj, ...args) => {
    action(actionName)({ ...eventObj, view: undefined }, ...args);
  };
}

export default partialAction;
