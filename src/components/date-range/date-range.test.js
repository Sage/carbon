/* eslint-disable react/prop-types */
import React from "react";
import DateRange from "./date-range.component";
import CarbonProvider from "../carbon-provider";

import { cyRoot, getDataElementByValue, icon } from "../../../cypress/locators";
import {
  dateRange,
  dateRangeComponentLabel,
  dateRangeComponentInput,
} from "../../../cypress/locators/date-range/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  ERROR_ICON,
  ICON,
  INFO_ICON,
  WARNING_ICON,
} from "../../../cypress/locators/locators";
import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testCypressText = "test_cypress";

const DateRangeCustom = ({ onChange, onBlur, ...props }) => {
  const [state, setState] = React.useState(["01/10/2016", "30/10/2016"]);

  const handleChange = (evt) => {
    const newValue = [
      evt.target.value[0].formattedValue,
      evt.target.value[1].formattedValue,
    ];

    if (onChange) {
      onChange(evt);
    }

    setState(newValue);
  };

  const handleOnBlur = (evt) => {
    if (onBlur) {
      onBlur(evt);
    }
  };

  return (
    <DateRange
      startLabel="start label"
      endLabel="end label"
      onChange={handleChange}
      onBlur={handleOnBlur}
      value={state}
      name={testCypressText}
      id={testCypressText}
      {...props}
    />
  );
};

const DateRangeNewValidation = () => {
  const [state, setState] = React.useState(["01/10/2016", "30/10/2016"]);

  const handleChange = ({ target }) => {
    const newValue = [
      target.value[0].formattedValue,
      target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      {[
        {
          startError: "Start error with long text string",
          endError: "End error",
        },
        {
          startWarning: "Start warning",
          endWarning: "End warning with long text string",
        },
      ].map((validation) => (
        <DateRange
          key={`${Object.keys(validation)[0]}-string-component`}
          startLabel="Start"
          endLabel="End"
          onChange={handleChange}
          value={state}
          {...validation}
          m={4}
        />
      ))}
    </CarbonProvider>
  );
};

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const START_DATE_RANGE_INDEX = 0;
const END_DATE_RANGE_INDEX = 1;

const checkInputColor = (index, color) => {
  dateRangeComponentInput(index)
    .parent()
    .and("have.css", "border-bottom-color", color)
    .and("have.css", "border-left-color", color)
    .and("have.css", "border-right-color", color)
    .and("have.css", "border-top-color", color);
};

context("Test for DateRange component", () => {
  describe("check functionality for DateRange component", () => {
    it.each(testData)(
      "should check the startLabel renders as %s",
      (startLabel) => {
        CypressMountWithProviders(<DateRangeCustom startLabel={startLabel} />);

        dateRangeComponentLabel(START_DATE_RANGE_INDEX).should(
          "have.text",
          startLabel
        );
      }
    );

    it.each(testData)("should check the endLabel renders as %s", (endLabel) => {
      CypressMountWithProviders(<DateRangeCustom endLabel={endLabel} />);

      dateRangeComponentLabel(END_DATE_RANGE_INDEX).should(
        "have.text",
        endLabel
      );
    });

    it.each(testData)(
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

    it.each(testData)(
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

    it.each(testData)(
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

    it.each(testData)(
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

    it.each(testData)(
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

    it.each(testData)(
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

    it.each([["top"], ["bottom"], ["left"], ["right"]])(
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
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it.each([[0], [1]])(
      "should call onChange callback when a clear event is triggered on %s DateRange input",
      (inputIndex) => {
        CypressMountWithProviders(<DateRangeCustom onChange={callback} />);

        getDataElementByValue("input")
          .eq(inputIndex)
          .clear()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[0], [1]])(
      "should call onChange callback when a type event is triggered on %s DateRange input",
      (inputIndex) => {
        CypressMountWithProviders(<DateRangeCustom onChange={callback} />);

        getDataElementByValue("input")
          .eq(inputIndex)
          .type("01/10/2022")
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(
              callback.getCalls()[9].args[0].target.value[inputIndex].rawValue
            ).to.equal("2022-10-01");
            expect(
              callback.getCalls()[9].args[0].target.value[inputIndex]
                .formattedValue
            ).to.equal("01/10/2022");
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<DateRangeCustom onBlur={callback} />);

      getDataElementByValue("input")
        .eq(0)
        .tab()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.not.have.been.called;
        })
        .tab()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should check name and id props", () => {
      CypressMountWithProviders(<DateRangeCustom onChange={callback} />);

      getDataElementByValue("input")
        .eq(0)
        .type("1")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback.getCalls()[0].args[0].target.name).to.equal(
            testCypressText
          );
          expect(callback.getCalls()[0].args[0].target.id).to.equal(
            testCypressText
          );
        });
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

    // FE-5382
    describe.skip("skip", () => {
      it.each(testData)(
        "should check accessibility with the startError as string renders as %s",
        (startError) => {
          CypressMountWithProviders(
            <DateRangeCustom startError={startError} />
          );

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
          CypressMountWithProviders(
            <DateRangeCustom endWarning={endWarning} />
          );

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
            <DateRangeCustom
              startInfo={info}
              endInfo={info}
              validationOnLabel
            />
          );

          cy.checkAccessibility();
        }
      );

      it.each([["top"], ["bottom"], ["left"], ["right"]])(
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
});
