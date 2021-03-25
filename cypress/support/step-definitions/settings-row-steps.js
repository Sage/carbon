import {
  settingsRowChildren,
  settingsRowDescription,
  settingsRowPreview,
} from "../../locators/settings-row";
import { getDataElementByValue } from "../../locators";

Then("Settings Row title on preview is set to {word}", (text) => {
  getDataElementByValue("title").should("have.text", `${text}`);
});

Then("Settings Row children on preview is set to {word}", (text) => {
  settingsRowChildren().should("have.text", `${text}`);
});

Then("Settings Row description on preview is set to {word}", (text) => {
  settingsRowDescription().should("have.text", `${text}`);
});

Then("Settings Row component has no divider property", () => {
  settingsRowPreview()
    .should("not.have.css", "border-bottom", "1px solid rgb(230, 235, 237)")
    .and("not.have.css", "padding-bottom", "30px");
});
