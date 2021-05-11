import {
  headingPreview,
  subheaderPreview,
  headingTitle,
} from "../../locators/heading";
import { helpIcon, link, getDataElementByValue } from "../../locators";

Then("heading children on preview is {word}", (children) => {
  headingPreview().invoke("text").should("contain", children);
});

Then("heading title is set to {word}", (title) => {
  getDataElementByValue("title").should("have.text", title);
});

Then("subheader on preview is {word}", (subheader) => {
  subheaderPreview().should("have.text", subheader);
});

Then("link on preview is {word}", (helpLink) => {
  helpIcon().should("have.attr", "href", helpLink);
});

Then("backLink on preview is {word}", (backLink) => {
  link().children().should("have.attr", "href", backLink);
});

Then("Heading title has h1 HTML tag", () => {
  headingTitle().contains("This is a Title");
});
