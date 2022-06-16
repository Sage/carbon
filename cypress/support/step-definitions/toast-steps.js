import { toastComponent, toastTogglePreview } from "../../locators/toast";
import { closeIconButton } from "../../locators";

When("I click on {string} Toggle Preview", (e) => {
  toastTogglePreview(e).scrollIntoView();
  toastTogglePreview(e).click();
});

Then("Toast children is set to {word}", (text) => {
  toastComponent().children().should("have.text", text);
});

Then("Toast component is not visible", () => {
  toastComponent().should("not.exist");
});

Then("Toast is centred", () => {
  toastComponent().should("have.css", "margin-right", "0px");
});

Then("Toast is not centred", () => {
  toastComponent().should("have.css", "margin-right", "30px");
});

When("I scroll down the page", () => {
  cy.scrollTo("0", "500");
});

Then("Toast is still visible", () => {
  toastComponent().should("be.visible");
});

Then("close icon is not focused", () => {
  closeIconButton().should("not.be.focused");
});
