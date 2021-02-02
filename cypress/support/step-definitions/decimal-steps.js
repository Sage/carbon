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

When("I set Decimal input to {word}", (labelInput) => {
  commonDataElementInputPreviewNoIframe().clear().type(labelInput);
});

Then("Decimal Input is set to {word}", (labelInput) => {
  commonDataElementInputPreviewNoIframe()
    .should("have.attr", "value")
    .should("contain", `${labelInput}`);
});

Then("Decimal input is not set to {word}", (labelInput) => {
  commonDataElementInputPreviewNoIframe()
    .should("have.attr", "value")
    .should("not.contain", `${labelInput}`);
});
