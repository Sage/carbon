import { icon } from "../../locators/index";
import { portraitPreview, portraitInitials } from "../../locators/portrait";

Then("Portrait alt on preview is set to {word}", (text) => {
  portraitPreview().children().children().should("have.attr", "alt", `${text}`);
  portraitInitials().children().should("have.attr", "alt", `${text}`);
});

Then("{word} icon component should be rendered", (iconType) => {
  icon().should("have.attr", "data-element", iconType).and("be.visible");
});
