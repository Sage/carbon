import * as React from "react";
import Badge from "./badge.component";
import Button from "../button/button.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { badge, badgeCounter } from "../../../cypress/locators/badge";

const BadgeComponent = ({ ...props }) => {
  return (
    <Badge {...props}>
      <Button
        style={{
          marginRight: 0,
        }}
        buttonType="tertiary"
      >
        Filter
      </Button>
    </Badge>
  );
};

context("Testing Badge component", () => {
  describe("Should render Badge component", () => {
    it.each([[1], [99]])("should check Badge counter is set to %s", (value) => {
      CypressMountWithProviders(<BadgeComponent counter={value} />);

      badgeCounter()
        .invoke("show")
        .should("be.visible")
        .invoke("text")
        .and("contain", value);
    });

    it.each([[100], [999]])(
      "should check Badge counter is set to 99",
      (value) => {
        CypressMountWithProviders(<BadgeComponent counter={value} />);

        badgeCounter()
          .invoke("show")
          .should("be.visible")
          .invoke("text")
          .and("contain", 99);
      }
    );

    it.each([[0], [-12], ["test"], ["!@#$%^*()_+-=~[];:.,?{}&\"'<>"]])(
      "should check Badge counter not visible",
      () => {
        CypressMountWithProviders(
          <Button buttonType="tertiary">Filter</Button>
        );

        badge().should("not.exist");
      }
    );

    it.each([[99]])(
      "Badge should display cross icon when hovered over",
      (value) => {
        CypressMountWithProviders(<BadgeComponent counter={value} />);

        badge().realHover();
        badge()
          .should("have.css", "background")
          .then(($el) => {
            expect($el).contains("rgb(0, 126, 69)");
          });
      }
    );

    it.each([[99]])("Badge should call click action when clicked", (value) => {
      CypressMountWithProviders(<BadgeComponent counter={value} />);

      badge().click();
      badge()
        .should("have.css", "background")
        .then(($el) => {
          expect($el).contains("rgb(0, 126, 69)");
        });
    });
  });
});
