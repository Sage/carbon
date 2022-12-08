/* eslint-disable react/prop-types */
import React from "react";
import Confirm from "../confirm";
import DateInput from "./date.component";
import {
  enUS,
  zhCN,
  de,
  hu,
  bg,
  enCA,
  enZA,
  zhHK,
  fi,
  es,
  fr,
  frCA,
  pl,
  hi,
  deAT,
  ko,
  arEG,
  sl,
  lv,
} from "../../locales/date-fns-locales";
import sageTheme from "../../style/themes/sage/index";

import {
  dateInput,
  dayPickerDay,
  dayPickerWrapper,
  dateIcon,
  dateInputParent,
  dayPickerParent,
  dayPickerHeading,
  dayPickerByText,
} from "../../../cypress/locators/date-input";

import {
  getDataElementByValue,
  fieldHelpPreview,
} from "../../../cypress/locators";
import { keyCode } from "../../../cypress/support/helper";
import { verifyRequiredAsteriskForLabel } from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const DAY_PICKER_PREFIX = "DayPicker-Day--";
const TODAY = Cypress.dayjs().format("ddd D MMM YYYY");
const DATE_INPUT = Cypress.dayjs("2022-05-01").format("DD/MM/YYYY");
const TODAY_DATE_INPUT = Cypress.dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = Cypress.dayjs("2022-05-01")
  .add(1, "months")
  .format("MMMM YYYY");
const ACTUAL_MONTH = Cypress.dayjs("2022-05-01").format("MMMM YYYY");
const PREVIOUS_MONTH = Cypress.dayjs("2022-05-01")
  .subtract(1, "months")
  .format("MMMM YYYY");
const MIN_DATE = "04/04/2030";
const DAY_BEFORE_MIN_DATE = "Wed 3 Apr 2030";
const DAY_AFTER_MIN_DATE = "Fri 5 Apr 2030";
const DDMMYYY_DATE_TO_ENTER = "27,05,2022";
const MMDDYYYY_DATE_TO_ENTER = "05,27,2022";
const YYYYMMDD_DATE_TO_ENTER = "2022,05,27";
const DDMMYYY_DATE_TO_ENTER_SHORT = "1,7,22";
const MMDDYYYY_DATE_TO_ENTER_SHORT = "7,1,22";
const YYYYMMDD_DATE_TO_ENTER_SHORT = "22,7,1";
const DATE_TO_VERIFY = "2022-05-12";

const DateInputCustom = ({ onChange, onBlur, ...props }) => {
  const [state, setState] = React.useState("01/05/2022");

  const handleOnChange = (ev) => {
    if (onChange) {
      onChange(ev.target.value);
    }

    setState(ev.target.value.formattedValue);
  };

  const handleOnBlur = (ev) => {
    if (onBlur) {
      onBlur(ev.target.value);
    }
  };

  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      {...props}
    />
  );
};

context("Test for DateInput component", () => {
  describe("check functionality for DateInput component", () => {
    it.each(testData)("should check the fieldHelp renders %s", (fieldHelp) => {
      CypressMountWithProviders(<DateInputCustom fieldHelp={fieldHelp} />);

      fieldHelpPreview().should("have.text", fieldHelp);
    });

    it.each(testData)("should check the label renders %s", (label) => {
      CypressMountWithProviders(<DateInputCustom label={label} />);

      getDataElementByValue("label").should("have.text", label);
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])("should check the label align is set to %s", (labelAlign, cssValue) => {
      CypressMountWithProviders(
        <DateInputCustom
          labelAlign={labelAlign}
          labelHelp="labelHelp"
          labelInline
        />
      );

      getDataElementByValue("label")
        .parent()
        .should(($element) =>
          expect($element).to.have.css("justify-content", `flex-${cssValue}`)
        );
    });

    it("should check the minDate prop", () => {
      CypressMountWithProviders(<DateInputCustom minDate="2030-04-04" />);

      dateInput().clear().type(MIN_DATE);

      dayPickerDay(DAY_BEFORE_MIN_DATE)
        .should("have.attr", "aria-disabled")
        .and("contains", "true");
      dayPickerDay(DAY_BEFORE_MIN_DATE)
        .should("have.attr", "aria-selected")
        .and("contains", "false");
    });

    it("should check the maxDate prop", () => {
      CypressMountWithProviders(<DateInputCustom maxDate="2030-04-04" />);

      dateInput().clear().type(MIN_DATE);

      dayPickerDay(DAY_AFTER_MIN_DATE)
        .should("have.attr", "aria-disabled")
        .and("contains", "true");
      dayPickerDay(DAY_AFTER_MIN_DATE)
        .should("have.attr", "aria-selected")
        .and("contains", "false");
    });

    it("should check the date is set to today's day", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateInput().clear().type(TODAY_DATE_INPUT);

      dayPickerDay(TODAY)
        .should("have.attr", "aria-label")
        .and("contains", TODAY);
      dayPickerDay(TODAY)
        .should("have.attr", "class")
        .and("contains", `${DAY_PICKER_PREFIX}today`);
      dayPickerDay(TODAY)
        .should("have.attr", "class")
        .and("contains", `${DAY_PICKER_PREFIX}selected`);
    });

    it("should open dayPicker after click on input", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateInputParent().click();

      dayPickerWrapper().should("be.visible");
    });

    it("should not close dayPicker after double click on input", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateInputParent().dblclick();

      dayPickerWrapper().should("be.visible");
    });

    it("should open dayPicker after click on icon", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateIcon().click();

      dayPickerWrapper().should("be.visible");
    });

    it("should close dayPicker after click on icon and dayPicker is open", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateIcon().click();
      dateIcon().click();

      dayPickerWrapper().should("not.exist");
    });

    it.each([
      ["bottom", 0],
      ["top", 400],
    ])("should show Date input at the %s position", (position, margin) => {
      CypressMountWithProviders(<DateInputCustom mt={`${margin}px`} />);

      dateInputParent().click();

      dayPickerParent()
        .should("have.attr", "data-floating-placement", `${position}-start`)
        .and("be.visible");
    });

    it.each([
      ["chevron_right", "next"],
      ["chevron_left", "previous"],
    ])(
      "should use %s arrow in DayPicker to verify %s month is shown",
      (arrow, month) => {
        CypressMountWithProviders(<DateInputCustom />);

        dateInput().clear().type(DATE_INPUT);
        dateInputParent().click();

        getDataElementByValue(arrow).click();

        if (month === "next") {
          dayPickerHeading().should("have.text", NEXT_MONTH);
        } else if (month === "previous") {
          dayPickerHeading().should("have.text", PREVIOUS_MONTH);
        } else {
          throw new Error("Only Next or Previous month can be applied");
        }
      }
    );

    it.each([
      ["chevron_right", "next", "rightarrow"],
      ["chevron_left", "previous", "leftarrow"],
    ])(
      "should trigger %s arrow in DayPicker to verify %s month is shown using %s keyboard key",
      (arrow, month, key) => {
        CypressMountWithProviders(<DateInputCustom />);

        dateInput().clear().type(DATE_INPUT);
        dateInputParent().click();

        dayPickerWrapper().focus();
        getDataElementByValue(arrow).trigger("keydown", keyCode(key));

        if (month === "next") {
          dayPickerHeading().should("have.text", NEXT_MONTH);
        } else if (month === "previous") {
          dayPickerHeading().should("have.text", PREVIOUS_MONTH);
        } else {
          throw new Error("Only Next or Previous month can be applied");
        }
      }
    );

    it.each([
      [SIZE.SMALL, 29, 30.5],
      [SIZE.MEDIUM, 37, 38.5],
      [SIZE.LARGE, 45, 46.5],
    ])("should check the %s of the DateInput", (size, minValue, maxValue) => {
      CypressMountWithProviders(<DateInputCustom size={size} />);

      dateInputParent()
        .invoke("height")
        .should("be.greaterThan", minValue)
        .and("be.lessThan", maxValue);
    });
  });

  it("should check the pickerProps prop", () => {
    CypressMountWithProviders(
      <DateInputCustom pickerProps={{ numberOfMonths: "2" }} />
    );

    dateInput().click();
    dayPickerWrapper().children().last().children().should("have.length", 2);
    dayPickerHeading()
      .eq(0)
      .should("have.text", ACTUAL_MONTH)
      .and("be.visible");
    dayPickerHeading().eq(1).should("have.text", NEXT_MONTH).and("be.visible");
  });

  it("should check the required prop", () => {
    CypressMountWithProviders(<DateInputCustom required />);

    verifyRequiredAsteriskForLabel();
  });

  it("should check the autofocus prop", () => {
    CypressMountWithProviders(<DateInputCustom autoFocus />);

    dateInput().should("be.focused");
    dayPickerWrapper().should("be.visible");
  });

  it.each([
    [true, "not.be.visible"],
    [false, "be.visible"],
  ])("should check the disablePortal prop", (state, visibility) => {
    CypressMountWithProviders(
      <Confirm open height="60px">
        <DateInputCustom disablePortal={state} />
      </Confirm>
    );

    dateInput().click();
    dayPickerWrapper().should(visibility);
  });

  describe("check events for Date component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a clear event is triggered", () => {
      CypressMountWithProviders(<DateInputCustom onChange={callback} />);

      dateInput()
        .clear()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<DateInputCustom onChange={callback} />);

      dateInput()
        .type("1")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([
      ["en-US", "05/12/2022", enUS],
      ["en-CA", "05/12/2022", enCA],
      ["en-ZA", "12/05/2022", enZA],
      ["de", "12.05.2022", de],
      ["es-ES", "12/05/2022", es],
      ["fr-FR", "12/05/2022", fr],
      ["fr-CA", "12/05/2022", frCA],
      ["zh-CN", "2022/05/12", zhCN],
      ["pl-PL", "12.05.2022", pl],
      ["bg-BG", "12.05.2022", bg],
      ["zh-HK", "12/05/2022", zhHK],
      ["hu-HU", "2022. 05. 12.", hu],
      ["fi-FI", "12.05.2022", fi],
      ["de-AT", "12.05.2022", deAT],
      ["ko-KR", "2022. 05. 12.", ko],
      ["ar-EG", "12/05/2022", arEG],
      ["hi-HI", "12/05/2022", hi],
      ["sl-SI", "12. 05. 2022", sl],
      ["lv", "12.05.2022.", lv],
    ])(
      "should use %s locale and change the formattedValue to %s after selecting date",
      (localeValue, formattedValueParam, dateFnsLocaleValue) => {
        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
            },
          }
        );
        const getDatetoEnter = () => {
          if (["en-US", "en-CA"].includes(localeValue))
            return MMDDYYYY_DATE_TO_ENTER;
          if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
            return YYYYMMDD_DATE_TO_ENTER;

          return DDMMYYY_DATE_TO_ENTER;
        };

        dateInput().clear().type(getDatetoEnter(), { delay: 0 });
        dateInput().click();
        dayPickerByText("12").click();

        dateInput()
          .wait(250)
          .should("have.attr", "value", formattedValueParam)
          .then(() => {
            expect(callback.getCalls()[12].args[0].rawValue).to.equals(
              DATE_TO_VERIFY
            );
            expect(callback.getCalls()[12].args[0].formattedValue).to.equals(
              formattedValueParam
            );
          });
      }
    );

    it.each([
      ["en-US", "05/27/2022", enUS],
      ["en-CA", "05/27/2022", enCA],
      ["en-ZA", "27/05/2022", enZA],
      ["de", "27.05.2022", de],
      ["es-ES", "27/05/2022", es],
      ["fr-FR", "27/05/2022", fr],
      ["fr-CA", "27/05/2022", frCA],
      ["zh-CN", "2022/05/27", zhCN],
      ["pl-PL", "27.05.2022", pl],
      ["bg-BG", "27.05.2022", bg],
      ["zh-HK", "27/05/2022", zhHK],
      ["hu-HU", "2022. 05. 27.", hu],
      ["fi-FI", "27.05.2022", fi],
      ["de-AT", "27.05.2022", deAT],
      ["ko-KR", "2022. 05. 27.", ko],
      ["ar-EG", "27/05/2022", arEG],
      ["hi-HI", "27/05/2022", hi],
      ["sl-SI", "27. 05. 2022", sl],
      ["lv", "27.05.2022.", lv],
    ])(
      "should use %s locale and change the formattedValue to %s after type the date",
      (localeValue, formattedValueParam, dateFnsLocaleValue) => {
        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
            },
          }
        );
        const getDatetoEnter = () => {
          if (["en-US", "en-CA"].includes(localeValue))
            return MMDDYYYY_DATE_TO_ENTER;
          if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
            return YYYYMMDD_DATE_TO_ENTER;

          return DDMMYYY_DATE_TO_ENTER;
        };

        dateInput().clear().type(getDatetoEnter(), { delay: 0 });
        dateInput().blur();

        dateInput()
          .wait(250)
          .should("have.attr", "value", formattedValueParam)
          .then(() => {
            expect(callback.getCalls()[11].args[0].rawValue).to.equals(
              "2022-05-27"
            );
            expect(callback.getCalls()[11].args[0].formattedValue).to.equals(
              formattedValueParam
            );
          });
      }
    );

    it.each([
      ["en-US", "07/01/2022", enUS],
      ["en-CA", "07/01/2022", enCA],
      ["en-ZA", "01/07/2022", enZA],
      ["de", "01.07.2022", de],
      ["es-ES", "01/07/2022", es],
      ["fr-FR", "01/07/2022", fr],
      ["fr-CA", "01/07/2022", frCA],
      ["zh-CN", "2022/07/01", zhCN],
      ["pl-PL", "01.07.2022", pl],
      ["bg-BG", "01.07.2022", bg],
      ["zh-HK", "01/07/2022", zhHK],
      ["hu-HU", "2022. 07. 01.", hu],
      ["fi-FI", "01.07.2022", fi],
      ["de-AT", "01.07.2022", deAT],
      ["ko-KR", "2022. 07. 01.", ko],
      ["ar-EG", "01/07/2022", arEG],
      ["hi-HI", "01/07/2022", hi],
      ["sl-SI", "01. 07. 2022", sl],
      ["lv", "01.07.2022.", lv],
    ])(
      "should use %s locale and change the formattedValue to %s after typing short date",
      (localeValue, formattedValueParam, dateFnsLocaleValue) => {
        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
            },
          }
        );
        const getDatetoEnter = () => {
          if (["en-US", "en-CA"].includes(localeValue))
            return MMDDYYYY_DATE_TO_ENTER_SHORT;
          if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
            return YYYYMMDD_DATE_TO_ENTER_SHORT;

          return DDMMYYY_DATE_TO_ENTER_SHORT;
        };

        dateInput().clear().type(getDatetoEnter(), { delay: 0 });
        dateInput().blur();

        dateInput()
          .wait(250)
          .should("have.attr", "value", formattedValueParam)
          .then(() => {
            expect(callback.getCalls()[7].args[0].rawValue).to.equals(
              "2022-07-01"
            );
            expect(callback.getCalls()[7].args[0].formattedValue).to.equals(
              formattedValueParam
            );
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<DateInputCustom onBlur={callback} />);

      dateInput()
        .clear()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call the onBlur callback using allowEmptyValue prop and output an empty and not null rawValue", () => {
      CypressMountWithProviders(
        <DateInputCustom onBlur={callback} allowEmptyValue />
      );

      dateInput()
        .clear()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback.getCalls()[0].args[0].rawValue).to.equal("");
          expect(callback.getCalls()[0].args[0].rawValue).to.not.equal(null);
        })
        .should("have.attr", "value")
        .and("be.empty");
    });

    it("should call the onChange callback using allowEmptyValue prop and output an empty and not null rawValue", () => {
      CypressMountWithProviders(
        <DateInputCustom onChange={callback} allowEmptyValue />
      );

      dateInput().type(MIN_DATE, { delay: 0 });
      dateInput()
        .clear()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback.getCalls()[10].args[0].rawValue).to.equal("");
          expect(callback.getCalls()[10].args[0].rawValue).to.not.equal(null);
        })
        .should("have.attr", "value")
        .and("be.empty");
    });
  });
});
