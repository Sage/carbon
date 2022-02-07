import { badge, badgeCounter } from "../../locators/badge";

Then("Badge component counter is set to {int}", (value) => {
  badgeCounter()
    .invoke("show")
    .should("be.visible")
    .invoke("text")
    .and("contain", value);
});

Then("Badge component counter does not exist", () => {
  badge().should("not.exist");
});

When("I focus onto Badge component", () => {
  badge().focus();
});

When("I click onto Badge component", () => {
  badge().click();
});

Then("Badge component cross icon has proper color", () => {
  badge()
    .should("have.css", "background")
    .then(($el) => {
      expect($el).contains("rgb(0, 126, 69)");
    });
});
