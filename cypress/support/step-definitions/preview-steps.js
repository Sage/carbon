const { dlsRoot } = require("../../locators");

Then("Preview children is set to {word}", (text) => {
  dlsRoot().should("have.text", text);
});
