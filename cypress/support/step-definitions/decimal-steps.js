import { commonDataElementInputPreviewNoIframe } from "../../locators";

When("I set Decimal input to the {word}", (input) => {
  commonDataElementInputPreviewNoIframe().clear().type(input).blur();
});

Then("Decimal Input is set to {word}", (input) => {
  commonDataElementInputPreviewNoIframe()
    .should("have.attr", "value", input)
    .wait(50);
});

When("I set Decimal input to a string with only white-space", () => {
  commonDataElementInputPreviewNoIframe().clear().type("     ").blur();
});

Then("Decimal Input is set to white-space only", () => {
  commonDataElementInputPreviewNoIframe().should("have.attr", "value", "     ");
});
