import { commonDataElementInputPreviewNoIframe } from "../../locators";

When("I set Decimal input to the {string}", (input) => {
  commonDataElementInputPreviewNoIframe().clear().type(input).blur();
});

Then("Decimal Input is set to {string}", (input) => {
  commonDataElementInputPreviewNoIframe()
    .invoke("val")
    .then(($el) => {
      for (let number = 0; number < $el.length; number++) {
        expect(
          $el.replace(/(\s)|(&nbsp;)|(\u00a0)/g, " ").charCodeAt(number)
        ).to.equals(input.charCodeAt(number));
      }
    })
    .wait(50);
});

When("I set Decimal input to a string with only white-space", () => {
  commonDataElementInputPreviewNoIframe().clear().type("     ").blur();
});

Then("Decimal Input is set to white-space only", () => {
  commonDataElementInputPreviewNoIframe().should("have.attr", "value", "     ");
});
