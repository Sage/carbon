import { getDataElementByValue } from "../../locators";
import {
  dateInput,
  dayPickerDay,
  dayPickerWrapper,
  dateIcon,
  dateInputParent,
  dayPickerParent,
  dayPickerHeading,
} from "../../locators/date-input/index";
import { keyCode } from "../helper";

const DAY_PICKER_PREFIX = "DayPicker-Day--";
const TODAY_CALENDAR = Cypress.dayjs().format("ddd D MMM YYYY");
const YESTERDAY_CALENDAR = Cypress.dayjs()
  .subtract(1, "days")
  .format("ddd D MMM YYYY");
const TOMORROW_CALENDAR = Cypress.dayjs()
  .add(1, "days")
  .format("ddd D MMM YYYY");
const TODAY_DATE_INPUT = Cypress.dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = Cypress.dayjs().add(1, "months").format("MMMM YYYY");
const PREVIOUS_MONTH = Cypress.dayjs()
  .subtract(1, "months")
  .format("MMMM YYYY");
const MIN_DATE = "04/04/2030";
const DAY_BEFORE_MIN_DATE = "Wed 3 Apr 2030";
const DAY_AFTER_MIN_DATE = "Fri 5 Apr 2030";

When("I set dateInput to today", () => {
  dateInput().clear().type(TODAY_DATE_INPUT);
});

When("I set dateInput to minimum date", () => {
  dateInput().clear().type(MIN_DATE);
});

When("I set dateInput to maximum date", () => {
  dateInput().clear().type(MIN_DATE);
});

Then("the date before minDate is not available", () => {
  dayPickerDay(DAY_BEFORE_MIN_DATE)
    .should("have.attr", "aria-disabled")
    .and("contains", "true");
  dayPickerDay(DAY_BEFORE_MIN_DATE)
    .should("have.attr", "aria-selected")
    .and("contains", "false");
});

Then("the date after maxDate is not available", () => {
  dayPickerDay(DAY_AFTER_MIN_DATE)
    .should("have.attr", "aria-disabled")
    .and("contains", "true");
  dayPickerDay(DAY_AFTER_MIN_DATE)
    .should("have.attr", "aria-selected")
    .and("contains", "false");
});

When("I click dateInput", () => {
  dateInputParent().click({ force: true });
});

When("I choose date yesterday via DayPicker", () => {
  dayPickerDay(YESTERDAY_CALENDAR).click();
});

When("I choose date tomorrow via DayPicker", () => {
  dayPickerDay(TOMORROW_CALENDAR).click();
});

Then("the date is set to today", () => {
  dayPickerDay(TODAY_CALENDAR)
    .should("have.attr", "aria-label")
    .and("contains", TODAY_CALENDAR);
  dayPickerDay(TODAY_CALENDAR)
    .should("have.attr", "class")
    .and("contains", `${DAY_PICKER_PREFIX}today`);
  dayPickerDay(TODAY_CALENDAR)
    .should("have.attr", "class")
    .and("contains", `${DAY_PICKER_PREFIX}selected`);
});

Then("dayPickerDay is visible", () => {
  dayPickerWrapper().should("be.visible");
});

Then("dayPickerDay is not visible", () => {
  dayPickerWrapper().should("not.exist");
});

When("I click onto date icon", () => {
  dateIcon().click({ force: true });
});

When("I click onto date icon twice", () => {
  dateIcon()
    .click()
    .then(($el) => {
      $el.click();
    });
});

When("I click dateInput twice", () => {
  dateInputParent()
    .click({ force: true })
    .then(($el) => {
      $el.click();
    });
});

Then("Date input is visible at the {word}", (position) => {
  dayPickerParent()
    .should("have.attr", "data-popper-placement", `${position}-start`)
    .and("be.visible");
});

When("I click {string} arrow", (monthArrow) => {
  getDataElementByValue(monthArrow).click();
});

Then("{string} month is shown in dayPicker", (whichMonth) => {
  if (whichMonth === "next") {
    dayPickerHeading().should("have.text", NEXT_MONTH);
  } else if (whichMonth === "previous") {
    dayPickerHeading().should("have.text", PREVIOUS_MONTH);
  } else {
    throw new Error("Only Next or Previous month can be applied");
  }
});

When(
  "I press {string} key on focused {string} arrow of dayPicker",
  (monthArrow, key) => {
    dayPickerWrapper().focus();
    getDataElementByValue(monthArrow).trigger("keydown", keyCode(key));
  }
);
