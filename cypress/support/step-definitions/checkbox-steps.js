import { checkbox, checkboxRole } from "../../locators/checkbox";
import { label } from "../../locators";
import { positionOfElement } from "../helper";

Given("I check {string} checkbox", (position) => {
  checkbox(positionOfElement(position)).click();
});

Then("checkbox label on preview is {word}", (text) => {
  label().should("have.text", `${text} (default)`);
});

When("I mark checkbox on preview", () => {
  checkboxRole().check();
});

Then("Checkbox tick has color {string}", (color) => {
  checkboxRole()
    .parent()
    .find("div > svg > path")
    .should("have.css", "fill", color);
});
