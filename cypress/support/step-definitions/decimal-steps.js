import { commonDataElementInputPreviewNoIframe } from "../../locators";

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
