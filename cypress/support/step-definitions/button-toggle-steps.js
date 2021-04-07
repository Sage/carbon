import {
  buttonToggleLabelPreview,
  buttonTogglePreviewIFrame,
} from "../../locators/button-toggle";
import { positionOfElement } from "../helper";

Then("Button Toggle label on preview is {word}", (label) => {
  buttonToggleLabelPreview(positionOfElement("first")).should(
    "have.text",
    label
  );
  buttonToggleLabelPreview(positionOfElement("second")).should(
    "have.text",
    label
  );
  buttonToggleLabelPreview(positionOfElement("third")).should(
    "have.text",
    label
  );
});

When("I click on Button Toggle {int}", (index) => {
  buttonTogglePreviewIFrame().eq(index).click();
});
