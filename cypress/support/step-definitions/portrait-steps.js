import { portraitPreview, portraitInitials } from "../../locators/portrait";

Then("Portrait alt on preview is set to {word}", (text) => {
  portraitPreview().children().should("have.attr", "alt", `${text}`);
  portraitInitials().children().should("have.attr", "alt", `${text}`);
});
