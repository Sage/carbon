import React from "react";
import ProgressTracker from "../../../src/components/progress-tracker";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { checkOutlineCss } from "../../support/component-helper/common-steps";
import { CHARACTERS } from "../../support/component-helper/constants";
import { PROGRESS_TRACKER_SIZES } from "../../../src/components/progress-tracker/progress-tracker.config";

import {
  progressTrackerComponent,
  progressTrackerLine,
  progressTrackerMinVal,
  progressTrackerMaxVal,
  progressTrackerCustomValuePreposition,
  progressTrackerDescription,
} from "../../locators/progress-tracker";

const ProgressTrackerComponent = ({ ...props }) => {
  return <ProgressTracker progress={50} showDefaultLabels {...props} />;
};

const DEFAULT_PROP_VALUE = 50;

const checkPropName = (propName) =>
  propName.endsWith("now") &&
  propName.endsWith("min") &&
  propName.endsWith("max");

const getProps = (propName, shouldBeDefault) => {
  if (!shouldBeDefault) {
    return { [propName]: DEFAULT_PROP_VALUE };
  }
  return { [propName]: CHARACTERS.STANDARD };
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
        const isNowMinOrMax = checkPropName(propName);
        const props = getProps(propName, isNowMinOrMax);
        const assertion = !isNowMinOrMax
          ? DEFAULT_PROP_VALUE
          : CHARACTERS.STANDARD;

        CypressMountWithProviders(<ProgressTrackerComponent {...props} />);

        progressTrackerComponent().should("have.attr", propName, assertion);
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

    it("render component with error prop", () => {
      CypressMountWithProviders(
        <ProgressTrackerComponent error showDefaultLabels progress={35} />
      );

      progressTrackerLine().should(
        "have.css",
        "background-color",
        "rgb(203, 55, 74)"
      );

      progressTrackerLine()
        .parent()
        .then(($el) => {
          checkOutlineCss($el, 1, "border", "solid", "rgb(203, 55, 74)");
        });
    });

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

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "render component with customValuePreposition is set to %s",
      (customValuePreposition) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            customValuePreposition={customValuePreposition}
            showDefaultLabels
          />
        );

        progressTrackerCustomValuePreposition().should(
          "have.text",
          customValuePreposition
        );
      }
    );

    it.each([
      ["top", 0],
      ["bottom", 1],
    ])(
      "render component with labelsPosition is set to %s",
      (labelsPosition, index) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent labelsPosition={labelsPosition} />
        );

        progressTrackerMinVal(index).should("have.text", "50%");
        progressTrackerMaxVal(index).should("have.text", "100%");
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "render component with description prop set to %s",
      (description) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            showDefaultLabels
            description={description}
          />
        );

        progressTrackerDescription().should("have.text", description);
      }
    );
  });

  describe("should check accessibility tests for progress tracker component", () => {
    describe.each([
      "aria-label",
      "aria-describedby",
      "aria-valuenow",
      "aria-valuemin",
      "aria-valuemax",
      "aria-valuetext",
    ])("when %s prop is passed", (propName) => {
      it(`check the accessibility when the ${propName} is set to cypress-standard`, () => {
        const isNowMinOrMax = checkPropName(propName);
        const props = getProps(propName, isNowMinOrMax);

        CypressMountWithProviders(<ProgressTrackerComponent {...props} />);

        cy.checkAccessibility();
      });
    });

    it.each([
      PROGRESS_TRACKER_SIZES[0],
      PROGRESS_TRACKER_SIZES[1],
      PROGRESS_TRACKER_SIZES[2],
    ])(
      "should check the accessibility when component is rendered with %s size",
      (size) => {
        CypressMountWithProviders(<ProgressTrackerComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each(["150px", "350px", "550px"])(
      "should check the accessibility when component is rendered %s length",
      (length) => {
        CypressMountWithProviders(<ProgressTrackerComponent length={length} />);

        cy.checkAccessibility();
      }
    );

    it.each([12, 47, 100])(
      "should check the accessibility when component is rendered with %s% of progress",
      (progress) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent progress={progress} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check the accessibility when component is rendered with error prop", () => {
      CypressMountWithProviders(
        <ProgressTrackerComponent error showDefaultLabels progress={35} />
      );

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "should check the accessibility when component is rendered with showDefaultLabels is set to %s",
      (boolean) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent showDefaultLabels={boolean} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check the accessibility when component is rendered with currentProgressLabel is set to %s",
      (currentProgressLabel) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            currentProgressLabel={currentProgressLabel}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check the accessibility when component is rendered with maxProgressLabel is set to %s",
      (maxProgressLabel) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent maxProgressLabel={maxProgressLabel} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check the accessibility when component is rendered with customValuePreposition is set to %s",
      (customValuePreposition) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent
            customValuePreposition={customValuePreposition}
            showDefaultLabels
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["top", "bottom"])(
      "should check the accessibility when component is rendered with labelsPosition is set to %s",
      (labelsPosition) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent labelsPosition={labelsPosition} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check the accessibility when component is rendered with description prop set to %s",
      (description) => {
        CypressMountWithProviders(
          <ProgressTrackerComponent description={description} />
        );

        cy.checkAccessibility();
      }
    );
  });

  it("has the expected border radius styling", () => {
    CypressMountWithProviders(<ProgressTrackerComponent progress={35} />);
    progressTrackerLine().parent().should("have.css", "border-radius", "32px");
    progressTrackerLine().should("have.css", "border-radius", "32px");
  });
});
