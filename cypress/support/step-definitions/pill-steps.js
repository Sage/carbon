import {
  pillPreview,
  pillCloseIcon,
  pillCloseIconIframe,
} from "../../locators/pill";

Then("Pill children on preview is set to {word}", (text) => {
  pillPreview().should("have.text", text);
});

When("I click cross icon in Iframe", () => {
  pillCloseIconIframe().click();
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
