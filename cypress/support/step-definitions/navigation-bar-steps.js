import { Then } from "@badeball/cypress-cucumber-preprocessor";
import navigationBar from "../../locators/navigation-bar";

Then("Navigation Bar children on preview is set to {word}", (text) => {
  navigationBar().should("have.text", text);
});
