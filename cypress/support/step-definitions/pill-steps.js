import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import { pillPreview, pillCloseIcon } from "../../locators/pill";

Then("Pill children on preview is set to {word}", (text) => {
  pillPreview().should("have.text", text);
});

When("I focus Pill close icon", () => {
  pillCloseIcon().focus();
});

Then("Pill close icon has golden border outline", () => {
  pillCloseIcon().should(
    "have.css",
    "box-shadow",
    "rgb(255, 181, 0) 0px 0px 0px 3px"
  );
});

Then("Pill close icon has {string} backgroundColor", (backgroundColor) => {
  pillCloseIcon().should("have.css", "background-color", backgroundColor);
});
