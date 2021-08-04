import {
  simpleColorPickerDiv,
  simpleColorPickerLegend,
} from "../../locators/simple-color-picker";
import {
  experimentalSimpleColorPickerInput,
  simpleColorPicker,
} from "../../locators/advanced-color-picker/index";
import { commonDataElementInputPreview } from "../../locators";
import { keyCode } from "../helper";

Then("Simple Color Picker {int} element was picked up", (index) => {
  cy.wait(500);
  for (let i = 1; i < index; ++i) {
    simpleColorPickerDiv(i)
      .should("have.attr", "data-element", "tick")
      .and("have.attr", "data-component", "icon");
  }
});

When("I pick {int} simple color input", (index) => {
  for (let i = 0; i < index; ++i) {
    experimentalSimpleColorPickerInput(i + 1).click();
  }
});

Then(
  "Experimental Simple Color Picker {int} element was picked up",
  (index) => {
    simpleColorPicker(index).should("have.attr", "aria-checked", "true");
  }
);

When("I select {int} color", (index) => {
  experimentalSimpleColorPickerInput(index).click();
});

When("I press {word} on the {int} color", (key, index) => {
  simpleColorPicker(index).trigger("keydown", keyCode(key));
});

When("I press {word} on the {int} color", (key, index) => {
  experimentalSimpleColorPickerInput(index).trigger("keydown", keyCode(key));
});

Then("It renders with all colors with {string} json", (json) => {
  cy.fixture(`designSystem/${json}.json`).then(($json) => {
    for (let i = 0; i < $json.length; ++i) {
      experimentalSimpleColorPickerInput(i)
        .should("have.value", $json[i].color)
        .and("have.attr", "aria-label", $json[i].label);
    }
  });
});

When("simple color picker legend on preview is {word}", (text) => {
  simpleColorPickerLegend().should("have.text", text);
});

When("simple color picker name {word}", (name) => {
  commonDataElementInputPreview().should("have.attr", "name", name);
});
