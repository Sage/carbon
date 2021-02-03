import {
  podContent,
  podSubTitle,
  podDescription,
  podEditIframe,
  podEdit,
  podFooter,
  podPreview,
} from "../../locators/pod";
import { getDataElementByValue } from "../../locators";

Then("Pod children on preview is set to {word}", (text) => {
  podContent().should("have.text", text);
});

Then("Pod title on preview is set to {word}", (text) => {
  getDataElementByValue("title").should("have.text", text);
});

Then("Pod subtitle on preview is set to {word}", (text) => {
  podSubTitle().should("have.text", text);
});

Then("Pod description on preview is set to {word}", (text) => {
  podDescription().should("have.text", text);
});

Then("Pod footer on preview is set to {word}", (text) => {
  podFooter().should("have.text", text);
});

Then("I click onEdit icon in Iframe", () => {
  podEditIframe().first().click();
});

Then("Pod component has triggerEditOnContent property", () => {
  podPreview().should("have.css", "cursor", "pointer");
});

When("I check that onEdit icon is not visible", () => {
  podEdit().should("not.be.visible");
});

When("I hover mouse onto pod", () => {
  podPreview().first().trigger("mouseover");
});

Then("The onEdit icon is visible", () => {
  podEdit().should("be.visible");
});
