import {
  enableOnChangeDeferredAction,
  enableKeyDownAction,
} from "../../locators/number-input";
import { commonDataElementInputPreview } from "../../locators";

When("I check Enable onChangeDeferred Action property", () => {
  enableOnChangeDeferredAction().click();
});

When("I check Enable onKeyDown Action property", () => {
  enableKeyDownAction().click();
});

When("I input {int} into NumberInput component", (number) => {
  commonDataElementInputPreview().clear().type(number);
});

When(
  "I press keyboard {string} keys into NumberInput input component",
  (key) => {
    commonDataElementInputPreview().clear().type(`{${key}}`);
  }
);
