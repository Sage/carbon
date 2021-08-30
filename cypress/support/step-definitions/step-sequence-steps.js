import {
  stepSequenceItemIndicator,
  stepSequenceDataComponent,
} from "../../locators/step-sequence";

const INDICATOR = "1";

Then("indicator is set to {word}", (indicator) => {
  stepSequenceItemIndicator().should("have.text", indicator);
});

Then("hidden label is set to {word}", (hiddenLabel) => {
  stepSequenceDataComponent().children().should("have.text", hiddenLabel);
});

Then("ariaLabel is set to {word}", (label) => {
  stepSequenceDataComponent().should("have.attr", "aria-label", label);
});

Then("children is set {word}", (children) => {
  stepSequenceDataComponent()
    .children()
    .should("have.text", `${INDICATOR}${children}`);
});
