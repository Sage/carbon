import helpHref from "../../locators/help";
import icon from "../../locators";

Then("Help href on preview is set to {word}", (href) => {
  helpHref().should("have.attr", "href", href);
});

Then("Help component is focused", () => {
  icon().should("be.focused");
});
