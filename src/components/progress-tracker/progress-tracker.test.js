import React from "react";
import ProgressTracker from ".";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";

import {
  progressTrackerComponent,
  progressTrackerLine,
  progressTrackerMinVal,
  progressTrackerMaxVal,
} from "../../../cypress/locators/progress-tracker";

const ProgressTrackerComponent = ({ ...props }) => {
  return <ProgressTracker progress={50} showDefaultLabels {...props} />;
};

context("Tests for ProgressTracker component", () => {
  describe("check props for ProgressTracker component", () => {
    describe.each([
      "aria-label",
      "aria-describedby",
      "aria-valuenow",
      "aria-valuemin",
      "aria-valuemax",
      "aria-valuetext",
    ])("when %s prop is passed", (propName) => {
      it(`verify that the ${propName} is set to cypress-standard`, () => {
        const props = { [propName]: CHARACTERS.STANDARD };

        CypressMountWithProviders(<ProgressTrackerComponent {...props} />);

        progressTrackerComponent().should(
          "have.attr",
          propName,
          CHARACTERS.STANDARD
        );
      });
    });

    it.each([
      [PROGRESS_TRACKER_SIZES[0], 4],
      [PROGRESS_TRACKER_SIZES[1], 8],
      [PROGRESS_TRACKER_SIZES[2], 16],
    ])("render component with %s size", (size, value) => {
      CypressMountWithProviders(<ProgressTrackerComponent size={size} />);

      progressTrackerLine().then(($el) => {
        const number = parseInt($el.css("height"));
        expect(number).to.be.within(value - 1, value + 1);
      });
    });

    it.each([150, 350, 550])("render component with %s px length", (length) => {
      CypressMountWithProviders(
        <ProgressTrackerComponent length={`${length}px`} />
      );

      progressTrackerComponent().then(($el) => {
        const number = parseInt($el.css("width"));
        expect(number).to.be.within(length - 1, length + 1);
      });
    });

    it.each([
      [12, "rgb(51, 91, 112)"],
      [47, "rgb(51, 91, 112)"],
      [100, "rgb(0, 138, 33)"],
    ])("render component with %s% of progress", (progress, color) => {
      CypressMountWithProviders(
        <ProgressTrackerComponent progress={progress} />
      );

      progressTrackerComponent()
        .should("have.attr", "aria-valuenow", progress)
        .and("be.visible");

      progressTrackerLine().should("have.css", "background-color", color);
    });

    it.each([[12], [47], [100]])(
      "render component with custom color, regardless of its progress value (%s%)",
      (progress) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent progress={progress} color="#123456" />
        );

        progressTrackerComponent()
          .should("have.attr", "aria-valuenow", progress)
          .and("be.visible");

        progressTrackerLine().should("have.css", "background-color", "#123456");
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "render component with showDefaultLabels is set to %s",
      (boolean, assertion) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent showDefaultLabels={boolean} />
        );

        cy.contains("50%").should(assertion);
        cy.contains("100%").should(assertion);
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "render component with currentProgressLabel is set to %s",
      (currentProgressLabel) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            currentProgressLabel={currentProgressLabel}
          />
        );

        progressTrackerMinVal().should("have.text", currentProgressLabel);
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "render component with maxProgressLabel is set to %s",
      (maxProgressLabel) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent maxProgressLabel={maxProgressLabel} />
        );

        progressTrackerMaxVal().should("have.text", maxProgressLabel);
      }
    );

    it.each([
      ["horizontal", "width", 150, "block"],
      ["vertical", "height", 50, "flex"],
    ])(
      "render component with orientation is set to %s",
      (orientation, css, cssVal, displayVal) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent orientation={orientation} />
        );

        progressTrackerComponent().then(($el) => {
          const val = parseInt($el.css(css));

          expect(val).to.be.within(val - 1, val + 1);
          expect($el.css("display")).to.equals(displayVal);
        });
      }
    );

    it.each([
      ["up", "flex-end"],
      ["down", "normal"],
    ])(
      "render component with direction is set to %s",
      (direction, assertion) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            orientation="vertical"
            labelsPosition="left"
            direction={direction}
          />
        );

        progressTrackerLine()
          .parent()
          .should("have.attr", "direction", direction)
          .and("have.css", "align-items", assertion);
      }
    );

    it.each([
      ["top", 0],
      ["bottom", 1],
    ])(
      "render component with labelsPosition is set to %s when orientation is horizontal",
      (labelsPosition, index) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            orientation="horizontal"
            labelsPosition={labelsPosition}
          />
        );

        progressTrackerMinVal(index).should("have.text", "50%");
        progressTrackerMaxVal(index).should("have.text", "100%");
      }
    );

    it.each([
      ["left", 0],
      ["right", 1],
    ])(
      "render component with labelsPosition is set to %s when orientation is vertical",
      (labelsPosition, index) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            orientation="vertical"
            labelsPosition={labelsPosition}
          />
        );

        progressTrackerMinVal(index).should("have.text", "100%");
        progressTrackerMaxVal(index).should("have.text", "50%");
      }
    );
  });
});
