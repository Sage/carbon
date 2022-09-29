import * as React from "react";
import BatchSelection from "./batch-selection.component";
import IconButton from "../icon-button/icon-button.component";
import { positionOfElement } from "../../../cypress/support/helper";
import Icon from "../icon/icon.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { checkGoldenOutline } from "../../../cypress/support/component-helper/common-steps";

import {
  batchSelectionCounter,
  batchSelectionComponent,
  batchSelectionButtonsByPosition,
} from "../../../cypress/locators/batch-selection/index";

context("Tests for BatchSelection component", () => {
  describe("should check BatchSelection component properties", () => {
    it.each(["0", "10", "100"])(
      "check BatchSelection component %s selected Count",
      (selectedCount) => {
        CypressMountWithProviders(
          <BatchSelection selectedCount={selectedCount} />
        );
        batchSelectionCounter().should(
          "have.text",
          `${selectedCount} selected`
        );
      }
    );

    it("should check hidden BatchSelection", () => {
      CypressMountWithProviders(<BatchSelection hidden />);
      batchSelectionComponent().should("have.attr", "hidden");
      batchSelectionComponent().should("not.be.visible");
    });

    it("should check disabled BatchSelection", () => {
      CypressMountWithProviders(<BatchSelection disabled />);
      batchSelectionComponent().should("have.attr", "disabled");
    });

    it.each([
      ["dark", "rgb(0, 50, 76)"],
      ["light", "rgb(179, 194, 201)"],
      ["white", "rgb(255, 255, 255)"],
      ["transparent", ""],
    ])(
      "check BatchSelection component %s colorTheme and it uses %s as a background color",
      (colorTheme, backgroundColor) => {
        CypressMountWithProviders(<BatchSelection colorTheme={colorTheme} />);

        if (colorTheme === "transparent") {
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
          <BatchSelection selectedCount={1} colorTheme="dark">
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
  });
});
