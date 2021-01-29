import { labelByPosition } from "../../locators";
import {
  radioButtonFieldset,
  radioButtonLegend,
  radioButtonGroup,
  radioButtonComponentByPosition,
  radioButtonInputByPosition,
  radioButtonFieldHelp,
} from "../../locators/radioButton/index";
import { positionOfElement } from "../helper";

Then("{string} radioButton on preview is {word}", (position, text) => {
  labelByPosition(positionOfElement(position)).should("have.text", text);
});

Then("{string} RadioButton has value {word}", (position, text) => {
  radioButtonInputByPosition(positionOfElement(position))
    .should("have.attr", "value")
    .should("contain", text);
});

Then("{string} RadioButton component is disabled", (position) => {
  labelByPosition(positionOfElement(position)).should("have.attr", "disabled");
});

Then("{string} RadioButton component is enabled", (position) => {
  labelByPosition(positionOfElement(position))
    .should("not.be.disabled")
    .and("not.have.attr", "disabled");
});

Then("{string} RadioButton is set to reverse", (position) => {
  radioButtonComponentByPosition(positionOfElement(position))
    .find("div:nth-child(2) input")
    .should("have.attr", "role", "radio");
});

Then("{string} RadioButton is not set to reverse", (position) => {
  radioButtonInputByPosition(positionOfElement(position)).should(
    "have.attr",
    "role",
    "radio"
  );
});

Then(
  "{string} RadioButton size on preview is set to {string}",
  (position, size) => {
    if (size === "small") {
      radioButtonInputByPosition(positionOfElement(position))
        .should("have.css", "width", "16px")
        .and("have.css", "height", "16px");
    } else {
      radioButtonInputByPosition(positionOfElement(position))
        .should("have.css", "width", "24px")
        .and("have.css", "height", "24px");
    }
  }
);

Then(
  "{string} field help is set to fieldHelpInline and has margin-left set to {string} and has margin-right {string}",
  (position, marginLeft, marginRight) => {
    radioButtonFieldHelp(positionOfElement(position))
      .should("have.css", "margin-left", marginLeft)
      .and("have.css", "margin-right", marginRight);
  }
);

Then(
  "{string} field help is not set to fieldHelpInline and has margin-left set to {string}",
  (position, marginLeft) => {
    radioButtonFieldHelp(positionOfElement(position)).should(
      "have.css",
      "margin-left",
      marginLeft
    );
  }
);

Then("RadioButtons are inline", () => {
  radioButtonGroup().should("have.css", "display", "flex");
  radioButtonComponentByPosition(positionOfElement("first")).should(
    "have.css",
    "margin-left",
    "0px"
  );
  radioButtonComponentByPosition(positionOfElement("second")).should(
    "have.css",
    "margin-left",
    "32px"
  );
  radioButtonComponentByPosition(positionOfElement("third")).should(
    "have.css",
    "margin-left",
    "32px"
  );
});

Then("RadioButtons are not inline", () => {
  radioButtonGroup().should("have.css", "display", "block");
  radioButtonComponentByPosition(positionOfElement("first")).should(
    "have.css",
    "margin-left",
    "0px"
  );
  radioButtonComponentByPosition(positionOfElement("second")).should(
    "have.css",
    "margin-left",
    "0px"
  );
  radioButtonComponentByPosition(positionOfElement("third")).should(
    "have.css",
    "margin-left",
    "0px"
  );
});

Then("legendInline is inline with RadioButton", () => {
  radioButtonFieldset().should("have.css", "display", "flex");
  radioButtonLegend()
    .should("have.css", "margin-right", "32px")
    .and("have.css", "height", "34px");
});

Then("legendInline is not inline with RadioButton", () => {
  radioButtonFieldset().should("have.css", "display", "block");
});

Then("legend on preview is {word} in NoIFrame", (text) => {
  radioButtonLegend().should("have.text", text);
});
