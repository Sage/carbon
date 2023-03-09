import React from "react";
import Detail from "../../../src/components/detail";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import { childrenPreview, footnotePreview } from "../../locators/detail/index";

import { icon } from "../../locators";

import { CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Detail component", () => {
  describe("check Detail component text input", () => {
    it.each(testData)(
      "check Detail children on preview is %s children value",
      (childrenValue) => {
        CypressMountWithProviders(<Detail>{childrenValue}</Detail>);

        childrenPreview().should("have.text", childrenValue);
      }
    );

    it.each(testData)(
      "check Detail footnote on preview is %s footnote value",
      (footnoteValue) => {
        CypressMountWithProviders(<Detail footnote={footnoteValue} />);

        footnotePreview().should("have.text", footnoteValue);
      }
    );
  });

  describe("check icon in Detail component is chevron_up", () => {
    it("should set Detail icon on preview to chevron_up", () => {
      CypressMountWithProviders(<Detail icon="chevron_up" />);

      icon().should("have.attr", "type", "chevron_up").and("be.visible");
    });
  });

  describe("Accessibility tests for Detail component", () => {
    it("should pass accessibility tests for Detail default story", () => {
      CypressMountWithProviders(<Detail />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Detail component with footnote", () => {
      CypressMountWithProviders(<Detail footnote="footnote"> "detail"</Detail>);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Detail component with icon on preview set to chevron_up", () => {
      CypressMountWithProviders(<Detail icon="chevron_up" />);

      cy.checkAccessibility();
    });
  });
});
