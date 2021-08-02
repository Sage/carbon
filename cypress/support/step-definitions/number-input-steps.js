import { commonDataElementInputPreviewNoIframe } from "../../locators";

When("I input {int} into NumberInput component", (number) => {
  commonDataElementInputPreviewNoIframe().clear().type(number);
});

When(
  "I press keyboard {string} keys into NumberInput input component",
  (key) => {
    commonDataElementInputPreviewNoIframe().clear().type(`{${key}}`);
  }
);
