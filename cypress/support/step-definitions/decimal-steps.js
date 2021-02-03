import { commonDataElementInputPreviewNoIframe } from "../../locators";

Then("Decimal component is disabled", () => {
  commonDataElementInputPreviewNoIframe().should("have.attr", "disabled");
  commonDataElementInputPreviewNoIframe()
    .parent()
    .should("have.attr", "disabled");
});

Then("Decimal component is enabled", () => {
  commonDataElementInputPreviewNoIframe().should("not.have.attr", "disabled");
  commonDataElementInputPreviewNoIframe()
    .parent()
    .should("not.have.attr", "disabled");
});

Then("Decimal component is readOnly", () => {
  commonDataElementInputPreviewNoIframe().should("have.attr", "readonly");
  commonDataElementInputPreviewNoIframe()
    .parent()
    .should("have.attr", "readonly");
});

Then("Decimal component is not readOnly", () => {
  commonDataElementInputPreviewNoIframe().should("not.have.attr", "readonly");
  commonDataElementInputPreviewNoIframe()
    .parent()
    .should("not.have.attr", "readonly");
});

When("I set Decimal input to {word}", (input) => {
  commonDataElementInputPreviewNoIframe().clear().type(input);
});

Then("Decimal Input is set to {word}", (input) => {
  commonDataElementInputPreviewNoIframe()
    .should("have.attr", "value")
    .should("contain", input);
});

Then("Decimal input is not set to {word}", (input) => {
  commonDataElementInputPreviewNoIframe()
    .should("have.attr", "value")
    .should("not.contain", input);
});
