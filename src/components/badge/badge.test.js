import React from "react";
import Badge from "./badge.component";
import Button from "../button/button.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  badge,
  badgeCounter,
  badgeCrossIcon,
} from "../../../cypress/locators/badge";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

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
  describe("should render Badge component", () => {
    it.each([[1], [99]])("should check Badge counter is set to %s", (value) => {
      CypressMountWithProviders(<BadgeComponent counter={value} />);

      badgeCounter()
        .invoke("show")
        .should("be.visible")
        .invoke("text")
        .and("contain", value);
    });

    it.each([[100], [999]])(
      "should check Badge counter is set to 99 using %s as input",
      (value) => {
        CypressMountWithProviders(<BadgeComponent counter={value} />);

        badgeCounter()
          .invoke("show")
          .should("be.visible")
          .invoke("text")
          .and("equals", "99");
      }
    );

    it.each([[0], [-12], ["test"], [CHARACTERS.SPECIALCHARACTERS]])(
      "should check Badge counter is not visible when using %s param",
      (incorrectValue) => {
        CypressMountWithProviders(<BadgeComponent counter={incorrectValue} />);

        badge().should("not.exist");
      }
    );

    it("badge should display cross icon when hovered over", () => {
      CypressMountWithProviders(
        <BadgeComponent onClick={() => {}} counter="99" />
      );

      badge()
        .realHover()
        .should("have.css", "background")
        .then(($el) => {
          expect($el).contains("rgb(0, 126, 69)");
        });
      badgeCrossIcon().should("be.visible");
    });

    it("badge should not display cross icon when hovered over with no onClick function passed to component", () => {
      CypressMountWithProviders(<BadgeComponent counter="99" />);

      badge()
        .realHover()
        .should("have.css", "background")
        .then(($el) => {
          expect($el).contains("rgb(255, 255, 255)");
        });
      badgeCrossIcon().should("not.exist");
    });

    it("should call onClick callback when a click event is triggered", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <BadgeComponent counter="5" onClick={callback} />
      );

      badge()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should check ariaLabel for Badge component", () => {
      CypressMountWithProviders(
        <BadgeComponent counter={9} aria-label="cypress-aria" />
      );
      badge().should("exist");
      badge().should("have.attr", "aria-label", "cypress-aria");
    });
  });

  describe("Accessibility tests for Badge component", () => {
    // FE-5596
    it.skip("should pass accessibility tests for Badge default story", () => {
      CypressMountWithProviders(<BadgeComponent counter={9} />);
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for click event", () => {
      CypressMountWithProviders(<BadgeComponent onClick={() => {}} />);
      cy.checkAccessibility();
    });
  });
});
