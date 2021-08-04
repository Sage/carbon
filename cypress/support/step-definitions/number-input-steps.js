import { commonDataElementInputPreview } from "../../locators";

When("I input {int} into NumberInput component", (number) => {
  commonDataElementInputPreview().clear().type(number);
});

When(
  "I press keyboard {string} keys into NumberInput input component",
  (key) => {
    commonDataElementInputPreview().clear().type(`{${key}}`);
  }
);
