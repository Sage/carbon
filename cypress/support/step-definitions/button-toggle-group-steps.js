import labelPreviewByText from "../../locators/button-toggle-group";

When("I click on Button Toggle Group {string}", (buttonName) => {
  labelPreviewByText().contains(buttonName).click();
});
