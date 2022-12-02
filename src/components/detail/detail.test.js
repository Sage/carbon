import * as React from "react";
import Detail from "./detail.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  childrenPreview,
  footnotePreview,
} from "../../../cypress/locators/detail/index";

import { icon } from "../../../cypress/locators";

import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

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
});
