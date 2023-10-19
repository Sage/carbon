import React from "react";
import dayjs from "dayjs";
import Confirm from "../../../src/components/confirm";
import {
  DateInputCustom,
  DateInputValidationNewDesign,
} from "../../../src/components/date/date-test.stories";
import { DateInputProps } from "../../../src/components/date";
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
} from "../../../src/locales/date-fns-locales";
import sageTheme from "../../../src/style/themes/sage/index";

import {
  dateInput,
  dayPickerDay,
  dayPickerWrapper,
  dateIcon,
  dateInputParent,
  dayPickerParent,
  dayPickerHeading,
  dayPickerByText,
  dayPickerNavButtons,
} from "../../locators/date-input";

import { getDataElementByValue, fieldHelpPreview } from "../../locators";
import { keyCode } from "../../support/helper";
import {
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
  checkGoldenOutline,
} from "../../support/component-helper/common-steps";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  SIZE,
  CHARACTERS,
  VALIDATION,
} from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const DAY_PICKER_PREFIX = "DayPicker-Day--";
const TODAY = dayjs().format("ddd D MMM YYYY");
const DATE_INPUT = dayjs("2022-05-01").format("DD/MM/YYYY");
const TODAY_DATE_INPUT = dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
const ACTUAL_MONTH = dayjs("2022-05-01").format("MMMM YYYY");
const PREVIOUS_MONTH = dayjs("2022-05-01")
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
const keysToTrigger = ["rightarrow", "leftarrow"] as const;

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
    ] as [DateInputProps["labelAlign"], string][])(
      "should check the label align is set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <DateInputCustom
            labelAlign={labelAlign}
            labelHelp="labelHelp"
            labelInline
          />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "justify-content", `flex-${cssValue}`);
      }
    );

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
      ["chevron_right", "next", keysToTrigger[0]],
      ["chevron_left", "previous", keysToTrigger[1]],
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
    ] as [DateInputProps["size"], number, number][])(
      "should check the %s of the DateInput",
      (size, minValue, maxValue) => {
        CypressMountWithProviders(<DateInputCustom size={size} />);

        dateInputParent()
          .invoke("height")
          .should("be.greaterThan", minValue)
          .and("be.lessThan", maxValue);
      }
    );

    it.each([
      [10, 90, 135, 1229],
      [30, 70, 409, 956],
      [80, 20, 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <DateInputCustom labelInline labelWidth={label} inputWidth={input} />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", labelRatio);
          });

        getDataElementByValue("input")
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", inputRatio);
          });
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for Date Input component",
      (maxWidth) => {
        CypressMountWithProviders(<DateInputCustom maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(
        <DateInputCustom inputWidth={100} maxWidth="" />
      );

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });
  });

  it("should check the pickerProps prop", () => {
    CypressMountWithProviders(
      <DateInputCustom pickerProps={{ numberOfMonths: 2 }} />
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
      <Confirm open height="60px" onConfirm={() => {}}>
        <DateInputCustom disablePortal={state} />
      </Confirm>
    );

    dateInput().click();
    dayPickerWrapper().should(visibility);
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<DateInputCustom />);
    dateInputParent().click();

    dateInput().should("have.css", "border-radius", "4px");
    dayPickerDay("Sun 1 May 2022").should("have.css", "border-radius", "32px");
    dayPickerDay("Mon 2 May 2022").should("have.css", "border-radius", "32px");
    dayPickerNavButtons(0).should("have.css", "border-radius", "4px");
    dayPickerNavButtons(1).should("have.css", "border-radius", "4px");
  });

  describe("check events for Date component", () => {
    it("should call onChange callback when a clear event is triggered", () => {
      const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(<DateInputCustom onChange={callback} />);

      dateInput().clear();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onChange callback when a type event is triggered", () => {
      const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(<DateInputCustom onChange={callback} />);

      dateInput().type("1");
      cy.get("@onChange").should("have.been.calledOnce");
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
        const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
              ariaLabels: {
                previousMonthButton: () => "Previous month",
                nextMonthButton: () => "Next month",
              },
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
            cy.get("@onChange")
              .invoke("getCalls")
              .its("12")
              .its("args[0].target.value.rawValue")
              .should("equal", DATE_TO_VERIFY);

            cy.get("@onChange")
              .invoke("getCalls")
              .its("12")
              .its("args[0].target.value.formattedValue")
              .should("equal", formattedValueParam);
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
        const callback: DateInputProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
              ariaLabels: {
                previousMonthButton: () => "Previous month",
                nextMonthButton: () => "Next month",
              },
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
            cy.get("@onChange")
              .invoke("getCalls")
              .its("11")
              .its("args[0].target.value.rawValue")
              .should("equal", "2022-05-27");

            cy.get("@onChange")
              .invoke("getCalls")
              .its("11")
              .its("args[0].target.value.formattedValue")
              .should("equal", formattedValueParam);
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
        const callback: DateInputProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(
          <DateInputCustom onChange={callback} />,
          sageTheme,
          {
            locale: () => localeValue,
            date: {
              dateFnsLocale: () => dateFnsLocaleValue,
              ariaLabels: {
                previousMonthButton: () => "Previous month",
                nextMonthButton: () => "Next month",
              },
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
            cy.get("@onChange")
              .invoke("getCalls")
              .its("7")
              .its("args[0].target.value.rawValue")
              .should("equal", "2022-07-01");

            cy.get("@onChange")
              .invoke("getCalls")
              .its("7")
              .its("args[0].target.value.formattedValue")
              .should("equal", formattedValueParam);
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<DateInputCustom onBlur={callback} />);

      dateInput().clear().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call the onBlur callback using allowEmptyValue prop and output an empty and not null rawValue", () => {
      const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(
        <DateInputCustom onBlur={callback} allowEmptyValue />
      );

      dateInput().clear().blur();
      cy.get("@onBlur")
        .invoke("getCalls")
        .its("0")
        .its("args[0].target.value.rawValue")
        .should("equal", "")
        .and("not.equal", null);
      dateInput().should("have.attr", "value").and("be.empty");
    });

    it("should call the onChange callback using allowEmptyValue prop and output an empty and not null rawValue", () => {
      const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(
        <DateInputCustom onChange={callback} allowEmptyValue />
      );

      dateInput().type(MIN_DATE, { delay: 0 });
      dateInput().clear();

      cy.get("@onBlur")
        .invoke("getCalls")
        .its("10")
        .its("args[0].target.value.rawValue")
        .should("equal", "")
        .and("not.equal", null);
      dateInput().should("have.attr", "value").and("be.empty");
    });
  });

  describe("when focused", () => {
    it("should have the expected styling when opt out flag is true", () => {
      CypressMountWithProviders(<DateInputCustom />, undefined, undefined, {
        focusRedesignOptOut: true,
      });

      dateInput()
        .focus()
        .then(($el) => {
          checkGoldenOutline($el.parent());
        });
      dayPickerDay("Sun 1 May 2022")
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
      dayPickerDay("Mon 2 May 2022")
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
      dayPickerNavButtons(0)
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
      dayPickerNavButtons(1)
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it("should have the expected styling when opt out flag is false", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateInput().focus();

      dateInputParent()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      dayPickerDay("Sun 1 May 2022")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      dayPickerDay("Mon 2 May 2022")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      dayPickerNavButtons(0)
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      dayPickerNavButtons(1)
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });
  });

  describe("rounded corners", () => {
    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<DateInputCustom />);
      dateInputParent().click();

      dateInput().should("have.css", "border-radius", "4px");
      dayPickerDay("Sun 1 May 2022").should(
        "have.css",
        "border-radius",
        "32px"
      );
      dayPickerDay("Mon 2 May 2022").should(
        "have.css",
        "border-radius",
        "32px"
      );
      dayPickerNavButtons(0).should("have.css", "border-radius", "4px");
      dayPickerNavButtons(1).should("have.css", "border-radius", "4px");
    });
  });

  describe("should check accessibility for the component", () => {
    it("should check accessibility the default component", () => {
      CypressMountWithProviders(<DateInputCustom />);

      cy.checkAccessibility();
    });

    it("should check accessibility the default component with open prop", () => {
      CypressMountWithProviders(<DateInputCustom />);

      dateIcon().click();

      cy.checkAccessibility();
    });

    it.each([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as DateInputProps["size"][])(
      "should check accessibility with size set to %s",
      (size) => {
        CypressMountWithProviders(<DateInputCustom size={size} />);

        dateIcon().click();

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for component with autoFocus prop", () => {
      CypressMountWithProviders(<DateInputCustom autoFocus />);

      cy.checkAccessibility();
    });

    it("should check accessibility for component with disabled prop", () => {
      CypressMountWithProviders(<DateInputCustom disabled />);

      cy.checkAccessibility();
    });

    it("should check accessibility for component with readOnly prop", () => {
      CypressMountWithProviders(<DateInputCustom readOnly />);

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should check accessibility with the fieldHelp renders %s",
      (fieldHelp) => {
        CypressMountWithProviders(<DateInputCustom fieldHelp={fieldHelp} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check accessibility with the label renders %s",
      (label) => {
        CypressMountWithProviders(<DateInputCustom label={label} />);

        cy.checkAccessibility();
      }
    );

    it.each(["left", "right"] as DateInputProps["labelAlign"][])(
      "should check accessibility with the label align is set to %s",
      (labelAlign) => {
        CypressMountWithProviders(
          <DateInputCustom
            labelAlign={labelAlign}
            labelHelp="labelHelp"
            labelInline
          />
        );

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for component with required prop", () => {
      CypressMountWithProviders(<DateInputCustom required />);

      cy.checkAccessibility();
    });

    it.each(["error", "warning", "info"])(
      "should check accessibility for DateInput with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <DateInputCustom
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["error", "warning", "info"])(
      "should check accessibility for DateInput with %s validation icon",
      (type) => {
        CypressMountWithProviders(
          <DateInputCustom
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        cy.checkAccessibility();
      }
    );
  });

  it.each([
    [VALIDATION.ERROR, "error", true],
    [VALIDATION.WARNING, "warning", true],
    [VALIDATION.INFO, "info", true],
  ])(
    "should check accessibility for DateInput is %s when validation is %s and boolean prop is %s",
    (borderColor, type, bool) => {
      CypressMountWithProviders(
        <DateInputCustom labelInline labelAlign="right" {...{ [type]: bool }} />
      );

      cy.checkAccessibility();
    }
  );

  it("should check accessibility for component with new validation", () => {
    CypressMountWithProviders(<DateInputValidationNewDesign />);

    cy.checkAccessibility();
  });

  it("should check accessibility when the picker is open", () => {
    CypressMountWithProviders(<DateInputCustom />);

    dateInputParent()
      .click()
      .then(() => cy.checkAccessibility());
  });
});
