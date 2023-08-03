import React from "react";
import { DateRangeProps } from "../../../src/components/date-range/date-range.component";
import {
  DateRangeCustom,
  DateRangeNewValidation,
} from "../../../src/components/date-range/date-range-test.stories";

import { cyRoot, getDataElementByValue, icon } from "../../locators";
import {
  dateRange,
  dateRangeComponentLabel,
  dateRangeComponentInput,
} from "../../locators/date-range/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  ERROR_ICON,
  ICON,
  INFO_ICON,
  WARNING_ICON,
} from "../../locators/locators";
import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";

const testCypressText = "test_cypress";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const START_DATE_RANGE_INDEX = 0;
const END_DATE_RANGE_INDEX = 1;

const checkInputColor = (index: number, color: string) => {
  dateRangeComponentInput(index)
    .parent()
    .and("have.css", "border-bottom-color", color)
    .and("have.css", "border-left-color", color)
    .and("have.css", "border-right-color", color)
    .and("have.css", "border-top-color", color);
};

const eventOutput = (formattedVal: string, rawVal: string) => {
  return {
    formattedValue: formattedVal,
    rawValue: rawVal,
  };
};

context("Test for DateRange component", () => {
  describe("check functionality for DateRange component", () => {
    it.each(testData as DateRangeProps["startLabel"][])(
      "should check the startLabel renders as %s",
      (startLabel) => {
        CypressMountWithProviders(<DateRangeCustom startLabel={startLabel} />);

        dateRangeComponentLabel(START_DATE_RANGE_INDEX).should(
          "have.text",
          startLabel
        );
      }
    );

    it.each(testData as DateRangeProps["endLabel"][])(
      "should check the endLabel renders as %s",
      (endLabel) => {
        CypressMountWithProviders(<DateRangeCustom endLabel={endLabel} />);

        dateRangeComponentLabel(END_DATE_RANGE_INDEX).should(
          "have.text",
          endLabel
        );
      }
    );

    it.each(testData as DateRangeProps["startError"][])(
      "should check the startError as string renders as %s",
      (startError) => {
        CypressMountWithProviders(<DateRangeCustom startError={startError} />);

        dateRangeComponentInput(START_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", startError);
        checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.ERROR);
      }
    );

    it.each(testData as DateRangeProps["endError"][])(
      "should check the endError as string renders as %s",
      (endError) => {
        CypressMountWithProviders(<DateRangeCustom endError={endError} />);

        dateRangeComponentInput(END_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", endError);
        checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.ERROR);
      }
    );

    it.each(testData as DateRangeProps["startWarning"][])(
      "should check the startWarning as string renders as %s",
      (startWarning) => {
        CypressMountWithProviders(
          <DateRangeCustom startWarning={startWarning} />
        );

        dateRangeComponentInput(START_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", startWarning);
        checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.WARNING);
      }
    );

    it.each(testData as DateRangeProps["endWarning"][])(
      "should check the endWarning as string renders as %s",
      (endWarning) => {
        CypressMountWithProviders(<DateRangeCustom endWarning={endWarning} />);

        dateRangeComponentInput(END_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", endWarning);
        checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.WARNING);
      }
    );

    it.each(testData as DateRangeProps["startInfo"][])(
      "should check the startInfo as string renders as %s",
      (startInfo) => {
        CypressMountWithProviders(<DateRangeCustom startInfo={startInfo} />);

        dateRangeComponentInput(START_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", startInfo);
        checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.INFO);
      }
    );

    it.each(testData as DateRangeProps["endInfo"][])(
      "should check the endInfo as string renders as %s",
      (endInfo) => {
        CypressMountWithProviders(<DateRangeCustom endInfo={endInfo} />);

        dateRangeComponentInput(END_DATE_RANGE_INDEX)
          .parent()
          .find(ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", endInfo);
        checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.INFO);
      }
    );

    it("should check the startError as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom startError />);

      checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.ERROR);
    });

    it("should check the endError as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom endError />);

      checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.ERROR);
    });

    it("should check the startWarning as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom startWarning />);

      checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.WARNING);
    });

    it("should check the endWarning as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom endWarning />);

      checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.WARNING);
    });

    it("should check the startInfo as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom startInfo />);

      checkInputColor(START_DATE_RANGE_INDEX, VALIDATION.INFO);
    });

    it("should check the endInfo as boolean", () => {
      CypressMountWithProviders(<DateRangeCustom endInfo />);

      checkInputColor(END_DATE_RANGE_INDEX, VALIDATION.INFO);
    });

    it.each(testData)(
      "should check the validationOnLabel with error state",
      (error) => {
        CypressMountWithProviders(
          <DateRangeCustom
            startError={error}
            endError={error}
            validationOnLabel
          />
        );

        dateRangeComponentLabel(START_DATE_RANGE_INDEX)
          .parent()
          .find(ERROR_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", error);
        dateRangeComponentLabel(END_DATE_RANGE_INDEX)
          .parent()
          .find(ERROR_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", error);
      }
    );

    it.each(testData)(
      "should check the validationOnLabel with warning state",
      (warning) => {
        CypressMountWithProviders(
          <DateRangeCustom
            startWarning={warning}
            endWarning={warning}
            validationOnLabel
          />
        );

        dateRangeComponentLabel(START_DATE_RANGE_INDEX)
          .parent()
          .find(WARNING_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", warning);

        dateRangeComponentLabel(END_DATE_RANGE_INDEX)
          .parent()
          .find(WARNING_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", warning);
      }
    );

    it.each(testData)(
      "should check the validationOnLabel with info state",
      (info) => {
        CypressMountWithProviders(
          <DateRangeCustom startInfo={info} endInfo={info} validationOnLabel />
        );

        dateRangeComponentLabel(START_DATE_RANGE_INDEX)
          .parent()
          .find(INFO_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", info);

        dateRangeComponentLabel(END_DATE_RANGE_INDEX)
          .parent()
          .find(INFO_ICON)
          .realHover();
        getDataElementByValue("tooltip").should("have.text", info);
      }
    );

    it.each([
      [true, "top", "flex"],
      [false, "bottom", "block"],
    ])(
      "should check the labelsInline prop is set to %s",
      (boolean, cssValue, displayValue) => {
        CypressMountWithProviders(<DateRangeCustom labelsInline={boolean} />);

        dateRange(START_DATE_RANGE_INDEX).should(
          "have.css",
          "vertical-align",
          cssValue
        );

        dateRangeComponentLabel(START_DATE_RANGE_INDEX)
          .parent()
          .parent()
          .should("have.css", "display", displayValue);

        dateRange(END_DATE_RANGE_INDEX).should(
          "have.css",
          "vertical-align",
          cssValue
        );

        dateRangeComponentLabel(END_DATE_RANGE_INDEX)
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it("should check the startDateProps prop", () => {
      CypressMountWithProviders(
        <DateRangeCustom
          startDateProps={{
            disabled: true,
          }}
        />
      );

      getDataElementByValue("input")
        .eq(START_DATE_RANGE_INDEX)
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should check the endDateProps prop", () => {
      CypressMountWithProviders(
        <DateRangeCustom
          endDateProps={{
            disabled: true,
          }}
        />
      );

      getDataElementByValue("input")
        .eq(END_DATE_RANGE_INDEX)
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as DateRangeProps["tooltipPosition"][])(
      "should check the tooltipPosition is set to %s",
      (position) => {
        CypressMountWithProviders(
          <DateRangeCustom
            m={9}
            tooltipPosition={position}
            startError={testCypressText}
          />
        );

        icon().realHover();
        getDataElementByValue("tooltip").should(
          "have.attr",
          "data-placement",
          position
        );

        cyRoot().realHover({ position: "topRight" });
      }
    );
  });

  describe("check events for DateRange component", () => {
    it.each([0, 1])(
      "should call onChange callback when a clear event is triggered on %s DateRange input",
      (inputIndex) => {
        const callback: DateRangeProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(<DateRangeCustom onChange={callback} />);

        getDataElementByValue("input").eq(inputIndex).clear();

        cy.get("@onChange").should("have.been.calledOnce");
      }
    );

    it.each([0, 1])(
      "should call onChange callback when a type event is triggered on %s DateRange input",
      (inputIndex) => {
        const callback: DateRangeProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(<DateRangeCustom onChange={callback} />);

        getDataElementByValue("input")
          .eq(inputIndex)
          .type("01/10/2022")
          .then(() => {
            cy.get("@onChange")
              .invoke("getCalls")
              .its("9")
              .its("args[0].target.value")
              .as("value");

            cy.get("@value")
              .its(`[${inputIndex}]`)
              .should("deep.equal", eventOutput("01/10/2022", "2022-10-01"));
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: DateRangeProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<DateRangeCustom onBlur={callback} />);

      getDataElementByValue("input").eq(0).tab();
      cy.get("@onBlur").should("not.have.been.called");

      cy.focused().tab();
      cy.get("@onBlur").should("have.been.called");
    });

    it("should check name and id props", () => {
      const callback: DateRangeProps["onChange"] = cy.stub().as("onChange");

      CypressMountWithProviders(
        <DateRangeCustom
          onChange={callback}
          name={testCypressText}
          id={testCypressText}
        />
      );

      getDataElementByValue("input").eq(0).type("1");
      cy.get("@onChange")
        .invoke("getCalls")
        .its("0")
        .its("args[0].target.name")
        .as("name");

      cy.get("@onChange")
        .invoke("getCalls")
        .its("0")
        .its("args[0].target.id")
        .as("id");

      cy.get("@name").should("equal", testCypressText);
      cy.get("@id").should("equal", testCypressText);
    });
  });

  describe("should check accessibility for the component", () => {
    it.each(testData)(
      "should check accessibility with the startLabel renders as %s",
      (startLabel) => {
        CypressMountWithProviders(<DateRangeCustom startLabel={startLabel} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the endLabel renders as %s",
      (endLabel) => {
        CypressMountWithProviders(<DateRangeCustom endLabel={endLabel} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the startError as string renders as %s",
      (startError) => {
        CypressMountWithProviders(<DateRangeCustom startError={startError} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the endError as string renders as %s",
      (endError) => {
        CypressMountWithProviders(<DateRangeCustom endError={endError} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the startWarning as string renders as %s",
      (startWarning) => {
        CypressMountWithProviders(
          <DateRangeCustom startWarning={startWarning} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the endWarning as string renders as %s",
      (endWarning) => {
        CypressMountWithProviders(<DateRangeCustom endWarning={endWarning} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the startInfo as string renders as %s",
      (startInfo) => {
        CypressMountWithProviders(<DateRangeCustom startInfo={startInfo} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the endInfo as string renders as %s",
      (endInfo) => {
        CypressMountWithProviders(<DateRangeCustom endInfo={endInfo} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the validationOnLabel with error state",
      (error) => {
        CypressMountWithProviders(
          <DateRangeCustom
            startError={error}
            endError={error}
            validationOnLabel
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the validationOnLabel with warning state",
      (warning) => {
        CypressMountWithProviders(
          <DateRangeCustom
            startWarning={warning}
            endWarning={warning}
            validationOnLabel
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the validationOnLabel with info state",
      (info) => {
        CypressMountWithProviders(
          <DateRangeCustom startInfo={info} endInfo={info} validationOnLabel />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as DateRangeProps["tooltipPosition"][])(
      "should check accessibility with the tooltipPosition is set to %s",
      (position) => {
        CypressMountWithProviders(
          <DateRangeCustom
            m={9}
            tooltipPosition={position}
            startError={testCypressText}
          />
        );

        icon().realHover();
        cy.checkAccessibility();
        cyRoot().realHover({ position: "topRight" });
      }
    );
  });

  it("should check accessibility with the startError as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom startError />);

    cy.checkAccessibility();
  });

  it("should check accessibility with the endError as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom endError />);

    cy.checkAccessibility();
  });

  it("should check accessibility with the startWarning as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom startWarning />);

    cy.checkAccessibility();
  });

  it("should check accessibility with the endWarning as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom endWarning />);

    cy.checkAccessibility();
  });

  it("should check accessibility with the startInfo as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom startInfo />);

    cy.checkAccessibility();
  });

  it("should check accessibility with the endInfo as boolean", () => {
    CypressMountWithProviders(<DateRangeCustom endInfo />);

    cy.checkAccessibility();
  });

  it.each([true, false])(
    "should check accessibility with the labelsInline prop is set to %s",
    (boolean) => {
      CypressMountWithProviders(<DateRangeCustom labelsInline={boolean} />);

      cy.checkAccessibility();
    }
  );

  it("should check accessibility with the startDateProps prop", () => {
    CypressMountWithProviders(
      <DateRangeCustom
        startDateProps={{
          disabled: true,
        }}
      />
    );

    cy.checkAccessibility();
  });

  it("should check accessibility with the endDateProps prop", () => {
    CypressMountWithProviders(
      <DateRangeCustom
        endDateProps={{
          disabled: true,
        }}
      />
    );

    cy.checkAccessibility();
  });

  it("should check accessibility with new validation", () => {
    CypressMountWithProviders(<DateRangeNewValidation />);

    cy.checkAccessibility();
  });
});
