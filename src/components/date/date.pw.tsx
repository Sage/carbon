// import React from "react";
// import dayjs from "dayjs";
// import Confirm from "../confirm";
// import {
//   DateInputCustom,
//   DateInputValidationNewDesign,
// } from "./date-test.stories";
// import { DateInputProps } from ".";
// import {
//   enUS,
//   zhCN,
//   de,
//   hu,
//   bg,
//   enCA,
//   enZA,
//   zhHK,
//   fi,
//   es,
//   fr,
//   frCA,
//   pl,
//   hi,
//   deAT,
//   ko,
//   arEG,
//   sl,
//   lv,
// } from "../../locales/date-fns-locales";
// import sageTheme from "../../style/themes/sage/index";
// import {
//   dateInput,
//   dayPickerDay,
//   dayPickerWrapper,
//   dateIcon,
//   dateInputParent,
//   dayPickerParent,
//   dayPickerHeading,
//   dayPickerByText,
//   dayPickerNavButtons,
// } from "../../../playwright/components/date-input";
// import { getDataElementByValue, fieldHelpPreview } from "../../../playwright/components";
// import {
//   verifyRequiredAsteriskForLabel,
//   assertCssValueIsApproximately,
//   checkGoldenOutline,
//   KeyIds,
//   keyCode,
//   checkAccessibility,
// } from "../../../playwright/support/helper";
// import {
//   SIZE,
//   CHARACTERS,
//   VALIDATION,
// } from "../../../playwright/support/constants";

// const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
// const DAY_PICKER_PREFIX = "DayPicker-Day--";
// const TODAY = dayjs().format("ddd D MMM YYYY");
// const DATE_INPUT = dayjs("2022-05-01").format("DD/MM/YYYY");
// const TODAY_DATE_INPUT = dayjs().format("DD/MM/YYYY");
// const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
// const ACTUAL_MONTH = dayjs("2022-05-01").format("MMMM YYYY");
// const PREVIOUS_MONTH = dayjs("2022-05-01")
//   .subtract(1, "months")
//   .format("MMMM YYYY");
// const MIN_DATE = "04/04/2030";
// const DAY_BEFORE_MIN_DATE = "Wed 3 Apr 2030";
// const DAY_AFTER_MIN_DATE = "Fri 5 Apr 2030";
// const DDMMYYY_DATE_TO_ENTER = "27,05,2022";
// const MMDDYYYY_DATE_TO_ENTER = "05,27,2022";
// const YYYYMMDD_DATE_TO_ENTER = "2022,05,27";
// const DDMMYYY_DATE_TO_ENTER_SHORT = "1,7,22";
// const MMDDYYYY_DATE_TO_ENTER_SHORT = "7,1,22";
// const YYYYMMDD_DATE_TO_ENTER_SHORT = "22,7,1";
// const DATE_TO_VERIFY = "2022-05-12";
// const arrowKeys = [
//   "rightarrow",
//   "leftarrow",
//   "uparrow",
//   "downarrow",
// ] as KeyIds[];

// test.describe("check functionality for DateInput component", () => {
//   it.each(testData)("should check the fieldHelp renders %s", (fieldHelp) => {
//     await mount(<DateInputCustom fieldHelp={fieldHelp} />);

//     // fieldHelpPreview().should("have.text", fieldHelp);
//   });

//   it.each(testData)("should check the label renders %s", (label) => {
//     await mount(<DateInputCustom label={label} />);

//     // getDataElementByValue("label").should("have.text", label);
//   });

//   it.each([
//     ["left", "start"],
//     ["right", "end"],
//   ] as [DateInputProps["labelAlign"], string][])(
//     "should check the label align is set to %s",
//     (labelAlign, cssValue) => {
//       await mount(test.describe("
//         <DateInputCustom
//           labelAlign={labelAlign}
//           labelHelp="labelHelp"
//           labelInline
//         />
//       );

//       // getDataElementByValue("label")
//       //   .parent()
//       //   .should("have.css", "justify-content", `flex-${cssValue}`);
//     }
//   );

//   test(`should check the minDate prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom minDate="2030-04-04" />);

//     // dateInput().clear().type(MIN_DATE);

//     // dayPickerDay(DAY_BEFORE_MIN_DATE)
//     //   .should("have.attr", "aria-disabled")
//     //   .and("contains", "true");
//     // dayPickerDay(DAY_BEFORE_MIN_DATE)
//     //   .should("have.attr", "aria-selected")
//     //   .and("contains", "false");
//   });

//   test(`should check the maxDate prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom maxDate="2030-04-04" />);

//     // dateInput().clear().type(MIN_DATE);

//     // dayPickerDay(DAY_AFTER_MIN_DATE)
//     //   .should("have.attr", "aria-disabled")
//     //   .and("contains", "true");
//     // dayPickerDay(DAY_AFTER_MIN_DATE)
//     //   .should("have.attr", "aria-selected")
//     //   .and("contains", "false");
//   });

//   test(`should check the date is set to today's day`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInput().clear().type(TODAY_DATE_INPUT);

//     // dayPickerDay(TODAY)
//     //   .should("have.attr", "aria-label")
//     //   .and("contains", TODAY);
//     // dayPickerDay(TODAY)
//     //   .should("have.attr", "class")
//     //   .and("contains", `${DAY_PICKER_PREFIX}today`);
//     // dayPickerDay(TODAY)
//     //   .should("have.attr", "class")
//     //   .and("contains", `${DAY_PICKER_PREFIX}selected`);
//   });

//   test(`should open dayPicker after click on input`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInputParent().click();

//     // dayPickerWrapper().should("be.visible");
//   });

//   test(`should not close dayPicker after double click on input`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInputParent().dblclick();

//     // dayPickerWrapper().should("be.visible");
//   });

//   test(`should open dayPicker after click on icon`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateIcon().click();

//     // dayPickerWrapper().should("be.visible");
//   });

//   test(`should close dayPicker after click on icon and dayPicker is open`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateIcon().click();
//     // dateIcon().click();

//     // dayPickerWrapper().should("not.exist");
//   });

//   it.each([
//     ["bottom", 0],
//     ["top", 400],
//   ])("should show Date input at the %s position", (position, margin) => {
//     await mount(<DateInputCustom mt={`${margin}px`} />);

//     // dateInputParent().click();

//     // dayPickerParent()
//     //   .should("have.attr", "data-floating-placement", `${position}-start`)
//     //   .and("be.visible");
//   });

//   it.each([
//     ["chevron_right", "next"],
//     ["chevron_left", "previous"],
//   ])(
//     "should use %s arrow in DayPicker to verify %s month is shown",
//     (arrow, month) => {
//       await mount(<DateInputCustom />);

//       // dateInput().clear().type(DATE_INPUT);
//       // dateInputParent().click();

//       // getDataElementByValue(arrow).click();

//       // if (month === "next") {
//       //   dayPickerHeading().should("have.text", NEXT_MONTH);
//       // } else if (month === "previous") {
//       //   dayPickerHeading().should("have.text", PREVIOUS_MONTH);
//       // } else {
//       //   throw new Error("Only Next or Previous month can be applied");
//       // }
//     }
//   );

//   it.each(arrowKeys)(
//     "should not change the displayed month when %s is pressed and next button is focused",
//     (key) => {
//       await mount(<DateInputCustom />);

//       // dateInputParent().click();
//       // getDataElementByValue("chevron_right").parent().focus();
//       // getDataElementByValue("chevron_right").trigger("keydown", keyCode(key));
//       // dayPickerHeading().should("have.text", "May 2022");
//     }
//   );

//   it.each(arrowKeys)(
//     "should not change the displayed month when %s is pressed and previous button is focused",
//     (key) => {
//       await mount(<DateInputCustom />);

//       // dateInputParent().click();
//       // getDataElementByValue("chevron_left").parent().focus();
//       // getDataElementByValue("chevron_left").trigger("keydown", keyCode(key));
//       // dayPickerHeading().should("have.text", "May 2022");
//     }
//   );

//   test(`should allow a user to tab into the picker and through its controls`, async ({ mount, page }) => {
//     await mount(<DateInputCustom value="12/12/2022" />);

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_left").parent().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_right").parent().should("be.focused");
//     // cy.focused().tab();
//     // cy.get(".DayPicker-Day--selected").should("be.focused");
//   });

//   test(`should close the picker and focus the next element in the DOM when focus is on a day element and tab pressed`, async ({ mount, page }) => {
//     await mount(
//       <>
//         <DateInputCustom value="12/12/2022" />
//         <button data-element="foo-button" type="button">
//           foo
//         </button>
//       </>
//     );

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_left").parent().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_right").parent().should("be.focused");
//     // cy.focused().tab();
//     // cy.get(".DayPicker-Day--selected").should("be.focused");
//     // cy.focused().tab();
//     // dayPickerWrapper().should("not.exist");
//     // cy.get('[data-element="foo-button"]').should("be.focused");
//   });

//   test(`should focus today's date if no day selected when tabbing to day elements`, async ({ mount, page }) => {
//     await mount(<DateInputCustom value="" />);

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_left").parent().should("be.focused");
//     // cy.focused().tab();
//     // getDataElementByValue("chevron_right").parent().should("be.focused");
//     // cy.focused().tab();
//     // cy.get(".DayPicker-Day--today").should("be.focused");
//     // cy.focused().tab();
//     // dayPickerWrapper().should("not.exist");
//   });

//   test(`should navigate through the day elements using the arrow keys`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().trigger("keydown", keyCode("downarrow"));
//     // cy.focused().should("have.text", "8");
//     // cy.focused().trigger("keydown", keyCode("downarrow"));
//     // cy.focused().should("have.text", "15");
//     // cy.focused().trigger("keydown", keyCode("leftarrow"));
//     // cy.focused().should("have.text", "14");
//     // cy.focused().trigger("keydown", keyCode("leftarrow"));
//     // cy.focused().should("have.text", "13");
//     // cy.focused().trigger("keydown", keyCode("rightarrow"));
//     // cy.focused().should("have.text", "14");
//     // cy.focused().trigger("keydown", keyCode("rightarrow"));
//     // cy.focused().should("have.text", "15");
//     // cy.focused().trigger("keydown", keyCode("uparrow"));
//     // cy.focused().should("have.text", "8");
//     // cy.focused().trigger("keydown", keyCode("uparrow"));
//     // cy.focused().should("have.text", "1");
//   });

//   test(`should navigate to the previous month when left arrow pressed on first day element of a month`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().trigger("keydown", keyCode("leftarrow"));
//     // cy.focused().should("have.text", "30");
//     // dayPickerHeading().should("have.text", PREVIOUS_MONTH);
//   });

//   it.each([
//     ["24", "1"],
//     ["25", "2"],
//     ["26", "3"],
//     ["27", "4"],
//     ["28", "5"],
//     ["29", "6"],
//     ["30", "7"],
//   ])(
//     "should navigate to day %s of previous month when up arrow pressed on day %s of first week of current month",
//     (result, input) => {
//       await mount(
//         <DateInputCustom value={`0${input}/05/2022`} />
//       );

//       // cy.get("body").tab();
//       // dateInput().should("be.focused");
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().trigger("keydown", keyCode("uparrow"));
//       // cy.focused().should("have.text", result);
//       // dayPickerHeading().should("have.text", PREVIOUS_MONTH);
//     }
//   );

//   it.each([
//     ["7", "31"],
//     ["6", "30"],
//     ["5", "29"],
//     ["4", "28"],
//     ["3", "27"],
//     ["2", "26"],
//     ["1", "25"],
//   ])(
//     "should navigate to day %s of next month when down arrow pressed on day %s of last week of current month",
//     (result, input) => {
//       await mount(
//         <DateInputCustom value={`${input}/05/2022`} />
//       );

//       // cy.get("body").tab();
//       // dateInput().should("be.focused");
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().trigger("keydown", keyCode("downarrow"));
//       // cy.focused().should("have.text", result);
//       // dayPickerHeading().should("have.text", NEXT_MONTH);
//     }
//   );

//   it.each(["Enter", "Space"] as KeyIds[])(
//     "should update the selected date when %s pressed on a day element",
//     (key) => {
//       await mount(<DateInputCustom />);

//       // cy.get("body").tab();
//       // dateInput().should("be.focused");
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().tab();
//       // cy.focused().trigger("keydown", keyCode("leftarrow"));
//       // cy.focused().should("have.text", "30");
//       // cy.focused().trigger("keydown", keyCode(key));
//       // getDataElementByValue("input").should("have.value", "30/04/2022");
//     }
//   );

//   test(`should close the picker when escape is pressed and input focused`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // cy.get("body").tab();
//     // dayPickerWrapper().should("exist");

//     // cy.focused().trigger("keydown", keyCode("Esc"));
//     // dayPickerWrapper().should("not.exist");
//   });

//   test(`should close the picker when escape is pressed and focus is within the picker and refocus the input`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // cy.get("body").tab();
//     // dayPickerWrapper().should("exist");
//     // cy.focused().tab();
//     // cy.focused().trigger("keydown", keyCode("Esc"));
//     // dayPickerWrapper().should("not.exist");
//     // getDataElementByValue("input").should("be.focused");
//   });

//   test(`should close the picker when shift + tab is pressed and focus is on the previous month button in the picker and refocus the input`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // cy.get("body").tab();
//     // dayPickerWrapper().should("exist");
//     // cy.focused().tab();
//     // cy.focused().tab({ shift: true });
//     // dayPickerWrapper().should("not.exist");
//     // getDataElementByValue("input").should("be.focused");
//   });

//   test(`should navigate to the next month when right arrow pressed on last day element of a month`, async ({ mount, page }) => {
//     await mount(<DateInputCustom value="31/05/2022" />);

//     // cy.get("body").tab();
//     // dateInput().should("be.focused");
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().tab();
//     // cy.focused().trigger("keydown", keyCode("rightarrow"));
//     // cy.focused().should("have.text", "1");
//     // dayPickerHeading().should("have.text", NEXT_MONTH);
//   });

//   it.each([
//     ["enter", "next", "chevron_right"],
//     ["space", "next", "chevron_right"],
//     ["enter", "previous", "chevron_left"],
//     ["space", "previous", "chevron_left"],
//   ])(
//     "should change the displayed month when %s is pressed and %s button is focused",
//     (key, month, arrow) => {
//       await mount(<DateInputCustom />);

//     //   const keyToType = key === "space" ? " " : key;
//     //   dateInputParent().click();
//     //   getDataElementByValue(arrow).parent().focus();
//     //   getDataElementByValue(arrow).type(`{${keyToType}}`);

//     //   if (month === "next") {
//     //     dayPickerHeading().should("have.text", NEXT_MONTH);
//     //   } else if (month === "previous") {
//     //     dayPickerHeading().should("have.text", PREVIOUS_MONTH);
//     //   }
//     // }
//   );

//   it.each([
//     [SIZE.SMALL, 29, 30.5],
//     [SIZE.MEDIUM, 37, 38.5],
//     [SIZE.LARGE, 45, 46.5],
//   ] as [DateInputProps["size"], number, number][])(
//     "should check the %s of the DateInput",
//     (size, minValue, maxValue) => {
//       await mount(<DateInputCustom size={size} />);

//       // dateInputParent()
//       //   .invoke("height")
//       //   .should("be.greaterThan", minValue)
//       //   .and("be.lessThan", maxValue);
//     }
//   );

//   it.each([
//     [10, 90, 135, 1229],
//     [30, 70, 409, 956],
//     [80, 20, 1092, 273],
//   ])(
//     "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
//     (label, input, labelRatio, inputRatio) => {
//       await mount(
//         <DateInputCustom labelInline labelWidth={label} inputWidth={input} />
//       );

//       // getDataElementByValue("label")
//       //   .parent()
//       //   .then(($el) => {
//       //     assertCssValueIsApproximately($el, "width", labelRatio);
//       //   });

//       // getDataElementByValue("input")
//       //   .parent()
//       //   .then(($el) => {
//       //     assertCssValueIsApproximately($el, "width", inputRatio);
//       //   });
//     }
//   );

//   it.each(["10%", "30%", "50%", "80%", "100%"])(
//     "should check maxWidth as %s for Date Input component",
//     (maxWidth) => {
//       await mount(<DateInputCustom maxWidth={maxWidth} />);

//       // getDataElementByValue("input")
//       //   .parent()
//       //   .parent()
//       //   .should("have.css", "max-width", maxWidth);
//     }
//   );

//   test(`when maxWidth has no value it should render as 100%`, async ({ mount, page }) => {
//     await mount(
//       <DateInputCustom inputWidth={100} maxWidth="" />
//     );

//     // getDataElementByValue("input")
//     //   .parent()
//     //   .parent()
//     //   .should("have.css", "max-width", "100%");
//   });

//   test(`should render Date with disabled prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom disabled />);

//     // dateInput().should("be.disabled").and("have.attr", "disabled");
//   });

//   test(`should render Date icon with disabled style`, async ({ mount, page }) => {
//     await mount(<DateInputCustom disabled />);

//     // dateIcon()
//     //   .should("be.visible")
//     //   .and("have.css", "color", "rgba(0, 0, 0, 0.3)");
//   });

//   test(`should render Date with read only prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom readOnly />);

//     // dateInput().should("have.attr", "readOnly");
//   });

//   test(`should render Date icon with read only style`, async ({ mount, page }) => {
//     await mount(<DateInputCustom readOnly />);

//     // dateIcon()
//     //   .should("be.visible")
//     //   .and("have.css", "color", "rgba(0, 0, 0, 0.3)");
//   });
// });

// test(`should check the pickerProps prop`, async ({ mount, page }) => {
//   await mount(
//     <DateInputCustom pickerProps={{ numberOfMonths: 2 }} />
//   );

//   // dateInput().click();
//   // dayPickerWrapper().children().last().children().should("have.length", 2);
//   // dayPickerHeading()
//   //   .eq(0)
//   //   .should("have.text", ACTUAL_MONTH)
//   //   .and("be.visible");
//   // dayPickerHeading().eq(1).should("have.text", NEXT_MONTH).and("be.visible");
// });

// test(`should check the required prop`, async ({ mount, page }) => {
//   await mount(<DateInputCustom required />);

//   // verifyRequiredAsteriskForLabel();
// });

// test(`should check the autofocus prop`, async ({ mount, page }) => {
//   await mount(<DateInputCustom autoFocus />);

//   // dateInput().should("be.focused");
//   // dayPickerWrapper().should("be.visible");
// });

// it.each([
//   [true, "not.be.visible"],
//   [false, "be.visible"],
// ])("should check the disablePortal prop", (state, visibility) => {
//   await mount(
//     <Confirm open height="60px" onConfirm={() => {}}>
//       <DateInputCustom disablePortal={state} />
//     </Confirm>
//   );

//   // dateInput().click();
//   // dayPickerWrapper().should(visibility);
// });

// test(`should have the expected border radius styling`, async ({ mount, page }) => {
//   await mount(<DateInputCustom />);

//   // dateInputParent().click();

//   // dateInput().should("have.css", "border-radius", "4px");
//   // dayPickerDay("Sun 1 May 2022").should("have.css", "border-radius", "32px");
//   // dayPickerDay("Mon 2 May 2022").should("have.css", "border-radius", "32px");
//   // dayPickerNavButtons(0).should("have.css", "border-radius", "4px");
//   // dayPickerNavButtons(1).should("have.css", "border-radius", "4px");
// });

// test.describe("check events for Date component", () => {
//   test(`should call onChange callback when a clear event is triggered`, async ({ mount, page }) => {
//     const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
//     await mount(<DateInputCustom onChange={callback} />);

//     // dateInput().clear();
//     // cy.get("@onChange").should("have.been.calledOnce");
//   });

//   test(`should call onChange callback when a type event is triggered`, async ({ mount, page }) => {
//     const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
//     await mount(<DateInputCustom onChange={callback} />);

//     // dateInput().type("1");
//     // cy.get("@onChange").should("have.been.calledOnce");
//   });

//   it.each([
//     ["en-US", "05/12/2022", enUS],
//     ["en-CA", "05/12/2022", enCA],
//     ["en-ZA", "12/05/2022", enZA],
//     ["de", "12.05.2022", de],
//     ["es-ES", "12/05/2022", es],
//     ["fr-FR", "12/05/2022", fr],
//     ["fr-CA", "12/05/2022", frCA],
//     ["zh-CN", "2022/05/12", zhCN],
//     ["pl-PL", "12.05.2022", pl],
//     ["bg-BG", "12.05.2022", bg],
//     ["zh-HK", "12/05/2022", zhHK],
//     ["hu-HU", "2022. 05. 12.", hu],
//     ["fi-FI", "12.05.2022", fi],
//     ["de-AT", "12.05.2022", deAT],
//     ["ko-KR", "2022. 05. 12.", ko],
//     ["ar-EG", "12/05/2022", arEG],
//     ["hi-HI", "12/05/2022", hi],
//     ["sl-SI", "12. 05. 2022", sl],
//     ["lv", "12.05.2022.", lv],
//   ])(
//     "should use %s locale and change the formattedValue to %s after selecting date",
//     (localeValue, formattedValueParam, dateFnsLocaleValue) => {
//       const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
//       await mount(
//         <DateInputCustom onChange={callback} />,
//         sageTheme,
//         {
//           locale: () => localeValue,
//           date: {
//             dateFnsLocale: () => dateFnsLocaleValue,
//             ariaLabels: {
//               previousMonthButton: () => "Previous month",
//               nextMonthButton: () => "Next month",
//             },
//           },
//         }
//       );

//       // const getDatetoEnter = () => {
//       //   if (["en-US", "en-CA"].includes(localeValue))
//       //     return MMDDYYYY_DATE_TO_ENTER;
//       //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
//       //     return YYYYMMDD_DATE_TO_ENTER;

//       //   return DDMMYYY_DATE_TO_ENTER;
//       // };

//       // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
//       // dateInput().click();
//       // dayPickerByText("12").click();

//       // dateInput()
//       //   .wait(250)
//       //   .should("have.attr", "value", formattedValueParam)
//       //   .then(() => {
//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("12")
//       //       .its("args[0].target.value.rawValue")
//       //       .should("equal", DATE_TO_VERIFY);

//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("12")
//       //       .its("args[0].target.value.formattedValue")
//       //       .should("equal", formattedValueParam);
//       //   });
//     }
//   );

//   it.each([
//     ["en-US", "05/27/2022", enUS],
//     ["en-CA", "05/27/2022", enCA],
//     ["en-ZA", "27/05/2022", enZA],
//     ["de", "27.05.2022", de],
//     ["es-ES", "27/05/2022", es],
//     ["fr-FR", "27/05/2022", fr],
//     ["fr-CA", "27/05/2022", frCA],
//     ["zh-CN", "2022/05/27", zhCN],
//     ["pl-PL", "27.05.2022", pl],
//     ["bg-BG", "27.05.2022", bg],
//     ["zh-HK", "27/05/2022", zhHK],
//     ["hu-HU", "2022. 05. 27.", hu],
//     ["fi-FI", "27.05.2022", fi],
//     ["de-AT", "27.05.2022", deAT],
//     ["ko-KR", "2022. 05. 27.", ko],
//     ["ar-EG", "27/05/2022", arEG],
//     ["hi-HI", "27/05/2022", hi],
//     ["sl-SI", "27. 05. 2022", sl],
//     ["lv", "27.05.2022.", lv],
//   ])(
//     "should use %s locale and change the formattedValue to %s after type the date",
//     (localeValue, formattedValueParam, dateFnsLocaleValue) => {
//       const callback: DateInputProps["onChange"] = cy.stub().as("onChange");

//       await mount(
//         <DateInputCustom onChange={callback} />,
//         sageTheme,
//         {
//           locale: () => localeValue,
//           date: {
//             dateFnsLocale: () => dateFnsLocaleValue,
//             ariaLabels: {
//               previousMonthButton: () => "Previous month",
//               nextMonthButton: () => "Next month",
//             },
//           },
//         }
//       );
//       // const getDatetoEnter = () => {
//       //   if (["en-US", "en-CA"].includes(localeValue))
//       //     return MMDDYYYY_DATE_TO_ENTER;
//       //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
//       //     return YYYYMMDD_DATE_TO_ENTER;

//       //   return DDMMYYY_DATE_TO_ENTER;
//       // };

//       // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
//       // dateInput().blur();

//       // dateInput()
//       //   .wait(250)
//       //   .should("have.attr", "value", formattedValueParam)
//       //   .then(() => {
//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("11")
//       //       .its("args[0].target.value.rawValue")
//       //       .should("equal", "2022-05-27");

//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("11")
//       //       .its("args[0].target.value.formattedValue")
//       //       .should("equal", formattedValueParam);
//       //   });
//     }
//   );

//   it.each([
//     ["en-US", "07/01/2022", enUS],
//     ["en-CA", "07/01/2022", enCA],
//     ["en-ZA", "01/07/2022", enZA],
//     ["de", "01.07.2022", de],
//     ["es-ES", "01/07/2022", es],
//     ["fr-FR", "01/07/2022", fr],
//     ["fr-CA", "01/07/2022", frCA],
//     ["zh-CN", "2022/07/01", zhCN],
//     ["pl-PL", "01.07.2022", pl],
//     ["bg-BG", "01.07.2022", bg],
//     ["zh-HK", "01/07/2022", zhHK],
//     ["hu-HU", "2022. 07. 01.", hu],
//     ["fi-FI", "01.07.2022", fi],
//     ["de-AT", "01.07.2022", deAT],
//     ["ko-KR", "2022. 07. 01.", ko],
//     ["ar-EG", "01/07/2022", arEG],
//     ["hi-HI", "01/07/2022", hi],
//     ["sl-SI", "01. 07. 2022", sl],
//     ["lv", "01.07.2022.", lv],
//   ])(
//     "should use %s locale and change the formattedValue to %s after typing short date",
//     (localeValue, formattedValueParam, dateFnsLocaleValue) => {
//       const callback: DateInputProps["onChange"] = cy.stub().as("onChange");

//       await mount(
//         <DateInputCustom onChange={callback} />,
//         sageTheme,
//         {
//           locale: () => localeValue,
//           date: {
//             dateFnsLocale: () => dateFnsLocaleValue,
//             ariaLabels: {
//               previousMonthButton: () => "Previous month",
//               nextMonthButton: () => "Next month",
//             },
//           },
//         }
//       );
//       // const getDatetoEnter = () => {
//       //   if (["en-US", "en-CA"].includes(localeValue))
//       //     return MMDDYYYY_DATE_TO_ENTER_SHORT;
//       //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
//       //     return YYYYMMDD_DATE_TO_ENTER_SHORT;

//       //   return DDMMYYY_DATE_TO_ENTER_SHORT;
//       // };

//       // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
//       // dateInput().blur();

//       // dateInput()
//       //   .wait(250)
//       //   .should("have.attr", "value", formattedValueParam)
//       //   .then(() => {
//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("7")
//       //       .its("args[0].target.value.rawValue")
//       //       .should("equal", "2022-07-01");

//       //     cy.get("@onChange")
//       //       .invoke("getCalls")
//       //       .its("7")
//       //       .its("args[0].target.value.formattedValue")
//       //       .should("equal", formattedValueParam);
//       //   });
//     }
//   );

//   test(`should call onBlur callback when a blur event is triggered`, async ({ mount, page }) => {
//     const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

//     await mount(<DateInputCustom onBlur={callback} />);

//     // dateInput().clear().blur();
//     // cy.get("@onBlur").should("have.been.calledOnce");
//   });

//   test(`should call the onBlur callback using allowEmptyValue prop and output an empty and not null rawValue`, async ({ mount, page }) => {
//     const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

//     await mount(
//       <DateInputCustom onBlur={callback} allowEmptyValue />
//     );

//     // dateInput().clear().blur();
//     // cy.get("@onBlur")
//     //   .invoke("getCalls")
//     //   .its("0")
//     //   .its("args[0].target.value.rawValue")
//     //   .should("equal", "")
//     //   .and("not.equal", null);
//     // dateInput().should("have.attr", "value").and("be.empty");
//   });

//   test(`should call the onChange callback using allowEmptyValue prop and output an empty and not null rawValue`, async ({ mount, page }) => {
//     const callback: DateInputProps["onBlur"] = cy.stub().as("onBlur");

//     await mount(
//       <DateInputCustom onChange={callback} allowEmptyValue />
//     );

//     // dateInput().type(MIN_DATE, { delay: 0 });
//     // dateInput().clear();

//     // cy.get("@onBlur")
//     //   .invoke("getCalls")
//     //   .its("10")
//     //   .its("args[0].target.value.rawValue")
//     //   .should("equal", "")
//     //   .and("not.equal", null);
//     // dateInput().should("have.attr", "value").and("be.empty");
//   });
// });

// test.describe("when focused", () => {
//   test(`should have the expected styling when opt out flag is true`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />, undefined, undefined, {
//       focusRedesignOptOut: true,
//     });

//     // dateInput()
//     //   .focus()
//     //   .then(($el) => {
//     //     checkGoldenOutline($el.parent());
//     //   });
//     // dayPickerDay("Sun 1 May 2022")
//     //   .focus()
//     //   .then(($el) => {
//     //     checkGoldenOutline($el);
//     //   });
//     // dayPickerDay("Mon 2 May 2022")
//     //   .focus()
//     //   .then(($el) => {
//     //     checkGoldenOutline($el);
//     //   });
//     // dayPickerNavButtons(0)
//     //   .focus()
//     //   .then(($el) => {
//     //     checkGoldenOutline($el);
//     //   });
//     // dayPickerNavButtons(1)
//     //   .focus()
//     //   .then(($el) => {
//     //     checkGoldenOutline($el);
//     //   });
//   });

//   test(`should have the expected styling when opt out flag is false`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInput().focus();

//     // dayPickerParent().should("have.css", "margin-top", "4px");

//     // dateInputParent()
//     //   .should(
//     //     "have.css",
//     //     "box-shadow",
//     //     "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
//     //   )
//     //   .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

//     // dayPickerDay("Sun 1 May 2022")
//     //   .focus()
//     //   .should(
//     //     "have.css",
//     //     "box-shadow",
//     //     "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
//     //   )
//     //   .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

//     // dayPickerDay("Mon 2 May 2022")
//     //   .focus()
//     //   .should(
//     //     "have.css",
//     //     "box-shadow",
//     //     "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
//     //   )
//     //   .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

//     // dayPickerNavButtons(0)
//     //   .focus()
//     //   .should(
//     //     "have.css",
//     //     "box-shadow",
//     //     "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
//     //   )
//     //   .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

//     // dayPickerNavButtons(1)
//     //   .focus()
//     //   .should(
//     //     "have.css",
//     //     "box-shadow",
//     //     "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
//     //   )
//     //   .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
//   });
// });

// test.describe("rounded corners", () => {
//   test(`should have the expected border radius styling`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInputParent().click();

//     // dateInput().should("have.css", "border-radius", "4px");
//     // dayPickerDay("Sun 1 May 2022").should(
//     //   "have.css",
//     //   "border-radius",
//     //   "32px"
//     // );
//     // dayPickerDay("Mon 2 May 2022").should(
//     //   "have.css",
//     //   "border-radius",
//     //   "32px"
//     // );
//     // dayPickerNavButtons(0).should("have.css", "border-radius", "4px");
//     // dayPickerNavButtons(1).should("have.css", "border-radius", "4px");
//   });
// });

// test.describe("should check accessibility for the component", () => {
//   test(`should check accessibility the default component`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     await checkAccessibility(page);
//   });

//   test(`should check accessibility the default component with open prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateIcon().click();

//     await checkAccessibility(page);
//   });

//   it.each([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as DateInputProps["size"][])(
//     "should check accessibility with size set to %s",
//     (size) => {
//       await mount(<DateInputCustom size={size} />);

//       // dateIcon().click();

//       await checkAccessibility(page);
//     }
//   );

//   test(`should check accessibility for component with autoFocus prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom autoFocus />);

//     await checkAccessibility(page);
//   });

//   test(`should check accessibility for component with disabled prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom disabled />);

//     await checkAccessibility(page);
//   });

//   test(`should check accessibility for component with readOnly prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom readOnly />);

//     await checkAccessibility(page);
//   });

//   it.each(testData)(
//     "should check accessibility with the fieldHelp renders %s",
//     (fieldHelp) => {
//       await mount(<DateInputCustom fieldHelp={fieldHelp} />);

//       await checkAccessibility(page);
//     }
//   );

//   it.each(testData)(
//     "should check accessibility with the label renders %s",
//     (label) => {
//       await mount(<DateInputCustom label={label} />);

//       await checkAccessibility(page);
//     }
//   );

//   it.each(["left", "right"] as DateInputProps["labelAlign"][])(
//     "should check accessibility with the label align is set to %s",
//     (labelAlign) => {
//       await mount(
//         <DateInputCustom
//           labelAlign={labelAlign}
//           labelHelp="labelHelp"
//           labelInline
//         />
//       );

//       await checkAccessibility(page);
//     }
//   );

//   test(`should check accessibility for component with required prop`, async ({ mount, page }) => {
//     await mount(<DateInputCustom required />);

//     await checkAccessibility(page);
//   });

//   it.each(["error", "warning", "info"])(
//     "should check accessibility for DateInput with %s validation icon on label",
//     (type) => {
//       await mount(
//         <DateInputCustom
//           labelInline
//           labelAlign="right"
//           validationOnLabel
//           {...{ [type]: "Message" }}
//         />
//       );

//       await checkAccessibility(page);
//     }
//   );

//   it.each(["error", "warning", "info"])(
//     "should check accessibility for DateInput with %s validation icon",
//     (type) => {
//       await mount(
//         <DateInputCustom
//           labelInline
//           labelAlign="right"
//           {...{ [type]: "Message" }}
//         />
//       );

//       await checkAccessibility(page);
//     }
//   );

//   it.each([
//     [VALIDATION.ERROR, "error", true],
//     [VALIDATION.WARNING, "warning", true],
//     [VALIDATION.INFO, "info", true],
//   ])(
//     "should check accessibility for DateInput is %s when validation is %s and boolean prop is %s",
//     (borderColor, type, bool) => {
//       await mount(
//         <DateInputCustom labelInline labelAlign="right" {...{ [type]: bool }} />
//       );

//       await checkAccessibility(page);
//     }
//   );

//   test(`should check accessibility for component with new validation`, async ({ mount, page }) => {
//     await mount(<DateInputValidationNewDesign />);

//     await checkAccessibility(page);
//   });

//   test(`should check accessibility when the picker is open`, async ({ mount, page }) => {
//     await mount(<DateInputCustom />);

//     // dateInputParent()
//     //   .click()
//     //   .then(() => cy.checkAccessibility());
//   });
// });
