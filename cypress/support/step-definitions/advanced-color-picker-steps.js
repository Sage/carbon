import {
  experimentalSimpleColorPickerInputInIframe,
  experimentalSimpleColorPickerInput,
  advancedColorPickerCell,
} from "../../locators/advanced-color-picker";
import { keyCode, positionOfElement } from "../helper";

When("I open Advanced Color Picker", () => {
  advancedColorPickerCell().first().click();
});

When("I open Advanced Color Picker in noIFrame", () => {
  advancedColorPickerCell().first().click();
});

When("I pick simple {int} color", (index) => {
  if (index === 1) {
    experimentalSimpleColorPickerInput(positionOfElement("third")).click();
    experimentalSimpleColorPickerInput(positionOfElement("second")).click();
  }
  for (let i = 0; i < index; ++i) {
    experimentalSimpleColorPickerInput(i + 1).click();
  }
});

Then("Simple Color {int} has focus", (index) => {
  experimentalSimpleColorPickerInput(index).should("have.focus");
});

Then("Simple Color {int} element was picked up", (index) => {
  experimentalSimpleColorPickerInputInIframe(index).should(
    "have.attr",
    "aria-checked",
    "true"
  );
});

Then("Simple Color {int} element was picked up in noIframe", (index) => {
  experimentalSimpleColorPickerInput(index).should(
    "have.attr",
    "aria-checked",
    "true"
  );
});

When("I press {word} on {int} element", (key, index) => {
  experimentalSimpleColorPickerInput(index).trigger("keydown", keyCode(key));
});
