import i18nPreview from "../../locators/i18n";

Then("preview text is {string}", (text) => {
  i18nPreview().should("contain", text);
});

Then(
  "preview text is {string} with {string} tag and {string} id",
  (text, tag, id) => {
    i18nPreview().children(`${tag}[id=${id}]`).should("have.text", text);
  }
);
