import {
  textEditorInput,
  textEditorCounter,
  textEditorToolbar,
  innerText,
  innerTextList,
  innerTextLink,
} from "../../locators/text-editor";
import { positionOfElement } from "../helper";

When("I type {string} in Text Editor", (text) => {
  textEditorInput().clear().type(text);
});

When("I focus the Text Editor", () => {
  textEditorInput().focus();
});

Then("Text Editor counter shows {string} characters left", (charactersLeft) => {
  textEditorCounter().should("have.text", charactersLeft);
});

When("I click onto {string} in Text Editor Toolbar", (buttonType) => {
  textEditorToolbar(buttonType).click();
});

Then("text has {string} css property", (buttonType) => {
  if (buttonType === "bold") {
    innerText().should("have.css", "font-weight", "700");
  } else if (buttonType === "italic") {
    innerText().should("have.css", "font-style", "italic");
  }
});

Then("text is rendered in {string} type", (buttonType) => {
  if (buttonType === "bullet-list") {
    innerTextList("ul", positionOfElement("second")).should(
      "have.text",
      "Testing"
    );
    innerTextList("ul", positionOfElement("third")).should("have.text", "is");
    innerTextList("ul", positionOfElement("fourth")).should(
      "have.text",
      "awesome"
    );
  } else if (buttonType === "bullet-list-numbers") {
    innerTextList("ol", positionOfElement("second")).should(
      "have.text",
      "Testing"
    );
    innerTextList("ol", positionOfElement("third")).should("have.text", "is");
    innerTextList("ol", positionOfElement("fourth")).should(
      "have.text",
      "awesome"
    );
  }
});

Then("button {string} is clicked and active", (buttonType) => {
  textEditorToolbar(buttonType).should(
    "have.css",
    "background-color",
    "rgb(204, 214, 219)"
  );
});

Then("button {string} is focused", (buttonType) => {
  textEditorToolbar(buttonType).should("be.focused");
});

Then("Text Editor shows the link {string} inside the input", (text) => {
  innerTextLink()
    .should("have.attr", "target", "_blank")
    .and("have.attr", "href", text);
  innerText().should("have.text", text);
});

Then("input contains {string} value", (text) => {
  innerText().should("have.text", text);
});
