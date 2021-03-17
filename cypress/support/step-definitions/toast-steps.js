import {
  toastComponent,
  toastTogglePreview,
  toastComponentIFrame,
} from "../../locators/toast";

When("I click on {string} Toggle Preview", (e) => {
  toastTogglePreview(e).scrollIntoView();
  toastTogglePreview(e).click();
});

Then("Toast children is set to {string}", (text) => {
  toastComponent().children().should("have.text", text);
});

Then("Toast component is not visible", () => {
  toastComponentIFrame().should("not.exist");
});

Then("Toast is centred", () => {
  toastComponent().should("have.css", "margin-right", "0px");
});

Then("Toast is not centred", () => {
  toastComponent().should("have.css", "margin-right", "30px");
});
