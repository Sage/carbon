import React from "react";
import BatchSelection from "../../../src/components/batch-selection";
import { BatchSelectionComponent } from "../../../src/components/batch-selection/batch-selection-test.stories";
import IconButton from "../../../src/components/icon-button";
import { positionOfElement } from "../../support/helper";
import Icon from "../../../src/components/icon";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";

import {
  batchSelectionCounter,
  batchSelectionComponent,
  batchSelectionButtonsByPosition,
} from "../../locators/batch-selection/index";

type BATCH_SELECTION_COLOR_SCHEME_TYPE =
  | "dark"
  | "light"
  | "white"
  | "transparent";

const BATCH_SELECTION_COLOR = [
  "dark",
  "light",
  "white",
  "transparent",
] as const;

context("Tests for BatchSelection component", () => {
  describe("should check BatchSelection component properties", () => {
    it.each([0, 10, 100])(
      "check BatchSelection component %s selected Count",
      (selectedCount) => {
        CypressMountWithProviders(
          <BatchSelectionComponent selectedCount={selectedCount} />
        );
        batchSelectionCounter().should(
          "have.text",
          `${selectedCount} selected`
        );
      }
    );

    it("should check hidden BatchSelection", () => {
      CypressMountWithProviders(<BatchSelectionComponent hidden />);
      batchSelectionComponent().should("have.attr", "hidden");
      batchSelectionComponent().should("not.be.visible");
    });

    it("should check disabled BatchSelection", () => {
      CypressMountWithProviders(<BatchSelectionComponent disabled />);
      batchSelectionComponent().should("have.attr", "disabled");
    });

    it.each([
      [
        BATCH_SELECTION_COLOR[0] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
        "rgb(0, 50, 76)",
      ],
      [
        BATCH_SELECTION_COLOR[1] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
        "rgb(179, 194, 201)",
      ],
      [
        BATCH_SELECTION_COLOR[2] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
        "rgb(255, 255, 255)",
      ],
      [BATCH_SELECTION_COLOR[3] as BATCH_SELECTION_COLOR_SCHEME_TYPE, ""],
    ])(
      "check BatchSelection component %s colorTheme and it uses %s as a background color",
      (colorTheme, backgroundColor) => {
        CypressMountWithProviders(
          <BatchSelectionComponent colorTheme={colorTheme} selectedCount={0} />
        );

        if (String(colorTheme) === "transparent") {
          batchSelectionComponent().should(
            "not.have.css",
            "background-color",
            backgroundColor
          );
        } else {
          batchSelectionComponent().should(
            "have.css",
            "background-color",
            backgroundColor
          );
        }
      }
    );
  });

  describe("should check BatchSelection buttons are focused", () => {
    it.each(["first", "second", "third"])(
      "should check BatchSelection %s button is focused",
      (index) => {
        CypressMountWithProviders(
          <BatchSelection selectedCount={1}>
            <IconButton>
              <Icon type="csv" />
            </IconButton>
            <IconButton>
              <Icon type="bin" />
            </IconButton>
            <IconButton>
              <Icon type="pdf" />
            </IconButton>
          </BatchSelection>
        );
        batchSelectionButtonsByPosition(positionOfElement(index))
          .parent()
          .focus()
          .then(($el) => {
            checkGoldenOutline($el);
          });
      }
    );

    it.each([
      BATCH_SELECTION_COLOR[0] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[1] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[2] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[3] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
    ])(
      "should render with expected border radius styling when colorTheme is %s",
      (colorTheme) => {
        CypressMountWithProviders(
          <BatchSelectionComponent colorTheme={colorTheme} />
        );
        batchSelectionComponent().should("have.css", "border-radius", "8px");
      }
    );
  });

  describe("should check accessibility for Batch Selection", () => {
    it.each([
      BATCH_SELECTION_COLOR[0] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[1] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[2] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
      BATCH_SELECTION_COLOR[3] as BATCH_SELECTION_COLOR_SCHEME_TYPE,
    ])(
      "check accessibility for BatchSelection component with %s colorTheme",
      (colorTheme) => {
        CypressMountWithProviders(
          <BatchSelectionComponent colorTheme={colorTheme} selectedCount={3} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for hidden BatchSelection", () => {
      CypressMountWithProviders(
        <BatchSelectionComponent hidden selectedCount={3} />
      );

      cy.checkAccessibility();
    });

    // FE-4609
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("should check accessibility for disabled BatchSelection", () => {
      CypressMountWithProviders(
        <BatchSelectionComponent disabled selectedCount={3} />
      );

      cy.checkAccessibility();
    });
  });
});
