import { dlsRootNoIframe } from "../../locators";

Then("Preview children is set to {word}", (text) => {
  dlsRootNoIframe().should("have.text", text);
});
