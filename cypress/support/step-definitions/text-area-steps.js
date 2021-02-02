import {
  textarea,
  textareaChildren,
  characterLimitDefaultTextarea,
} from "../../locators/textarea";
import { getDataElementByValue } from "../../locators";

Then("Textarea component is expandable", () => {
  textareaChildren().should("have.css", "height", "85px");
});

Then("Textarea component is not expandable", () => {
  textareaChildren().should("not.have.css", "height", "85px");
});

Then("cols is set to {string}", (colsValue) => {
  textareaChildren().should("have.attr", "cols", colsValue);
});

Then("rows is set to {string}", (colsValue) => {
  textareaChildren().should("have.attr", "rows", colsValue);
});

Then("Textarea component is disabled", () => {
  textareaChildren()
    .should("be.disabled")
    .and("have.css", "color", "rgba(0, 0, 0, 0.55)")
    .and("have.css", "cursor", "not-allowed");
});

Then("Textarea component is not disabled", () => {
  textareaChildren()
    .should("not.be.disabled")
    .and("not.have.css", "color", "rgb(179, 194, 200)")
    .and("not.have.css", "cursor", "not-allowed");
});

Then("Textarea component is readOnly", () => {
  textareaChildren().should("have.attr", "readonly");
});

Then("Textarea component is not readOnly", () => {
  textareaChildren().should("not.have.attr", "readonly");
});

Then("placeholder is set to {word}", (text) => {
  textareaChildren().should("have.attr", "placeholder", text);
});

Then("characterLimit is set to {string}", (length) => {
  textareaChildren().should("have.attr", "maxlength", length);
});

Then("characterLimit for default Textarea is shown as {string}", (length) => {
  characterLimitDefaultTextarea().contains(length);
});

Then("characterLimit for default Textarea is not set to {word}", (length) => {
  textareaChildren().should("have.attr", "maxlength", length);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(length)) {
    characterLimitDefaultTextarea().contains("NaN");
  }
});

Then("Textarea inputWidth is set to {string}", (width) => {
  textarea().parent().should("have.css", "flex", `0 0 ${width}%`);
});

Then("Textarea component is labelInline", () => {
  getDataElementByValue("label")
    .parent()
    .should("have.css", "align-items", "flex-start");
});

Then("Textarea component is not labelInline", () => {
  getDataElementByValue("label")
    .parent()
    .should("have.css", "align-items", "center");
});

When("I input {word} into Textarea", (text) => {
  textareaChildren().clear().type(text);
});

Then(
  "Textarea component has warnOverLimit and used characters {int} of {int}",
  (overCharacterLimit, limit) => {
    characterLimitDefaultTextarea()
      .should("have.text", `${overCharacterLimit}/${limit}`)
      .and("have.css", "color", "rgb(199, 56, 79)");
  }
);

Then(
  "Textarea component has no warnOverLimit and used characters {int} of {int}",
  (charactersUsed, limit) => {
    characterLimitDefaultTextarea()
      .should("have.text", `${charactersUsed}/${limit}`)
      .and("have.css", "color", "rgba(0, 0, 0, 0.55)");
  }
);

Then(
  "Textarea component has enforceCharacterLimit enabled and used characters {int} are equal to limit {int}",
  (charactersUsed, limit) => {
    characterLimitDefaultTextarea()
      .should("have.text", `${charactersUsed}/${limit}`)
      .and("have.css", "color", "rgba(0, 0, 0, 0.55)");
  }
);

Then(
  "Textarea component has enforceCharacterLimit disabled and used characters {int} are more than limit {int}",
  (charactersUsed, limit) => {
    characterLimitDefaultTextarea()
      .should("have.text", `${charactersUsed}/${limit}`)
      .and("have.css", "color", "rgba(0, 0, 0, 0.55)");
  }
);

Then("Textarea input on preview is set to {word}", () => {
  textarea()
    .children()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(text);
    });
});
