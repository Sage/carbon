import {
  textbox,
  textboxByPosition,
  textboxIcon,
  textboxInput,
  textboxInIFrame,
  textboxPrefixByPosition,
} from "../../locators/textbox";
import {
  tooltipPreviewByPositionNoIFrame,
  labelByPosition,
  fieldHelpPreviewByPositionNoIFrame,
} from "../../locators";
import { positionOfElement } from "../helper";

Then("Textbox placeholder is set to {word}", (text) => {
  textbox().children().should("have.attr", "placeholder", text);
});

Then("Multiple Textbox placeholder is set to {word}", (text) => {
  textbox(positionOfElement("first"))
    .children()
    .should("have.attr", "placeholder", text);
  textbox(positionOfElement("second"))
    .children()
    .should("have.attr", "placeholder", text);
});

Then("Multiple fieldHelp on preview is set to {word}", (text) => {
  fieldHelpPreviewByPositionNoIFrame(positionOfElement("first")).should(
    "have.text",
    text
  );
  fieldHelpPreviewByPositionNoIFrame(positionOfElement("second")).should(
    "have.text",
    text
  );
});

Then("Multiple label is set to {word}", (text) => {
  labelByPosition(positionOfElement("first")).should("have.text", text);
  labelByPosition(positionOfElement("second")).should("have.text", text);
});

Then("Multiple tooltipPreview on preview is set to {word}", (text) => {
  tooltipPreviewByPositionNoIFrame(positionOfElement("first"))
    .wait(250)
    .should("have.text", text);
  tooltipPreviewByPositionNoIFrame(positionOfElement("second"))
    .wait(250)
    .should("have.text", text);
});

When("I type {word} into Textbox", (text) => {
  textbox().children().clear().type(text);
});

When("I type {word} into {string} Textbox", (text, position) => {
  textboxByPosition(positionOfElement(position)).children().clear().type(text);
});

Then("Textbox input on preview is set to {word}", () => {
  textbox()
    .children()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(text);
    });
});

Then("Multiple textbox input on preview is set to {word}", () => {
  textbox(positionOfElement("first"))
    .children()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(text);
    });
  textbox(positionOfElement("second"))
    .children()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(text);
    });
});

Then("I click on icon inside of Textbox", () => {
  textboxIcon().click();
});

Then("icon on preview is {string} and is visible", (iconName) => {
  textboxIcon().should("have.attr", "data-element", iconName).and("be.visible");
});

When("I click on Textbox", () => {
  textboxInput().click();
});

Then("Textbox input has golden border on focus", () => {
  textboxInIFrame().should("have.css", "outline", "rgb(255, 181, 0) solid 3px");
});

Then("Prefix is set to {word}", (prefix) => {
  textboxPrefixByPosition(positionOfElement("first"))
    .should("have.text", prefix)
    .and("have.css", "font-size", "14px")
    .and("have.css", "font-weight", "900")
    .and("have.css", "margin-right", "8px");
});

Then("Multiple textbox prefix is set to {word}", (prefix) => {
  textboxPrefixByPosition(positionOfElement("first"))
    .should("have.text", prefix)
    .and("have.css", "font-size", "14px")
    .and("have.css", "font-weight", "900")
    .and("have.css", "margin-right", "8px");
  textboxPrefixByPosition(positionOfElement("second"))
    .should("have.text", prefix)
    .and("have.css", "font-size", "14px")
    .and("have.css", "font-weight", "900")
    .and("have.css", "margin-right", "8px");
});
