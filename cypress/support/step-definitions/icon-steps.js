const { icon } = require("../../locators");

Then("Icon component is focused", () => {
  icon().should("be.focused");
});
