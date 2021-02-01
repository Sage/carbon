import labelPreviewByTextIFrame from "../../locators/button-toggle-group";

When("I click on Button Toggle Group {string}", (buttonName) => {
  labelPreviewByTextIFrame().contains(buttonName).click();
});
