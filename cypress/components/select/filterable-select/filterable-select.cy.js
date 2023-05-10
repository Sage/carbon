import React from "react";
import * as stories from "../../../../src/components/select/filterable-select/filterable-select-test.stories";
import CypressMountWithProviders from "../../../support/component-helper/cypress-mount";

import {
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  body,
} from "../../../locators";

import {
  selectList,
  selectListWrapper,
  selectOption,
  selectOptionByText,
  dropdownButton,
  selectListText,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListBody,
  multiColumnsSelectListRow,
  selectListPosition,
  selectDataComponent,
  selectElementInput,
  selectInput,
  filterableSelectAddElementButton,
  filterableSelectButtonIcon,
  filterableSelectAddNewButton,
  selectResetButton,
  boldedAndUnderlinedValue,
  multiColumnsSelectListNoResultsMessage,
} from "../../../locators/select";

import { loader } from "../../../locators/loader";

import { alertDialogPreview } from "../../../locators/dialog";

import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLabel,
} from "../../../support/component-helper/common-steps";

import { keyCode, positionOfElement } from "../../../support/helper";

import { SIZE, CHARACTERS } from "../../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const addElementText = "Add a New Element";
const columns = 3;
const icon = "add";

context("Tests for FilterableSelect component", () => {
  describe("check props for FilterableSelect component", () => {
    it.each(testData)(
      "should render FilterableSelect label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent label={labelValue} />
        );

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent placeholder={placeholderValue} />
        );

        selectInput().should("have.attr", "placeholder", placeholderValue);
      }
    );

    it("should render FilterableSelect with name prop set to test value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent name={testPropValue} />
      );

      commonDataElementInputPreview().should(
        "have.attr",
        "name",
        testPropValue
      );
    });

    it("should render FilterableSelect with id prop prop set to test value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent id={testPropValue} />
      );

      commonDataElementInputPreview().should("have.attr", "id", testPropValue);
    });

    it("should render FilterableSelect with data-component prop set to test value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render FilterableSelect with data-element prop set to test value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render FilterableSelect with data-role prop set to test value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent data-role={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-role", testPropValue);
    });

    it.each([
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ])(
      "should render the help tooltip in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelHelp="Help"
            tooltipPosition={tooltipPositionValue}
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview()
          .should("be.visible")
          .and("have.attr", "data-placement", tooltipPositionValue);
      }
    );

    it("should check FilterableSelect is disabled", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render FilterableSelect as read only", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent readOnly />);

      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectInput().click();
      selectListWrapper().should("not.be.visible");
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ])(
      "should use %s as size and render FilterableSelect with %s as height",
      (size, height) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent size={size} />
        );

        commonDataElementInputPreview()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "min-height", height);
          });
      }
    );

    it("should check FilterableSelect has autofocus", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent autoFocus />
      );

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check FilterableSelect is required", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check FilterableSelect label is inline", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent labelInline />
      );

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["flex", "399"],
      ["flex", "400"],
      ["block", "401"],
    ])(
      "should check FilterableSelect label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            adaptiveLabelBreakpoint={breakpoint}
          />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            labelAlign={alignment}
          />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each([
      ["10", "90", 135, 1229],
      ["30", "70", 409, 956],
      ["80", "20", 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", labelRatio);
          });

        getDataElementByValue("input")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", inputRatio);
          });
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for FilterableSelect component",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent maxWidth={maxWidth} />
        );

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent maxWidth="" />
      );

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should not open the list with focus on FilterableSelect input", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      commonDataElementInputPreview().focus();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should not open the list with mouse click on FilterableSelect input", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      commonDataElementInputPreview().click();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
    });

    it("should close the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton().click();
      dropdownButton().click();
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      selectInput().tab();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      selectInput().type("{esc}", { force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      body().click({ force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it.each([
      ["open", "downarrow"],
      ["open", "uparrow"],
      ["open", "Home"],
      ["open", "End"],
      ["not open", "Enter"],
    ])(
      "should %s the list when %s is pressed with FilterableSelect input in focus",
      (state, key) => {
        CypressMountWithProviders(<stories.FilterableSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().trigger("keydown", { ...keyCode(key), force: true });
        if (state === "open") {
          selectListWrapper().should("be.visible");
        } else {
          selectListWrapper().should("not.be.visible");
        }
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list",
      (option) => {
        CypressMountWithProviders(<stories.FilterableSelectComponent />);

        dropdownButton().click();
        selectListText(option).click();
        getDataElementByValue("input").should("have.attr", "value", option);
        selectInput().should("have.attr", "aria-expanded", "false");
        selectListWrapper().should("not.be.visible");
      }
    );

    it.each([
      ["A", "Amber", "Black", "Orange"],
      ["O", "Brown", "Orange", "Yellow"],
    ])(
      "should filter options when %s is typed",
      (text, optionValue1, optionValue2, optionValue3) => {
        CypressMountWithProviders(<stories.FilterableSelectComponent />);

        commonDataElementInputPreview().type(text);
        selectInput().should("have.attr", "aria-expanded", "true");
        selectListWrapper().should("be.visible");
        selectOption(positionOfElement("first"))
          .should("have.text", optionValue1)
          .and("be.visible")
          .and("have.css", "background-color", "rgb(153, 173, 183)");
        selectOption(positionOfElement("second"))
          .should("have.text", optionValue2)
          .and("be.visible")
          .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
        selectOption(positionOfElement("third"))
          .should("have.text", optionValue3)
          .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
          .and("be.visible");
      }
    );

    it("should render the lazy loader when the prop is set", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithLazyLoadingComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    // FE-5300 raised to fix the issue with the loader not reappeearing
    it.skip("should render the lazy loader when the prop is set and list is opened again", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectLazyLoadTwiceComponent />
      );

      const option = "Amber";

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(option).should("be.visible");
      dropdownButton().click();
      selectResetButton().click({ force: true });
      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render a lazy loaded option when the infinite scroll prop is set", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithInfiniteScrollComponent />
      );

      const option = "Lazy Loaded A1";

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListWrapper().scrollTo("bottom").wait(250);
      selectListWrapper().scrollTo("bottom");
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(option).should("exist");
    });

    it("should list options when value is set and select list is opened again", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      const option = "Amber";
      const count = 11;

      dropdownButton().click();
      selectListText(option).click();
      getDataElementByValue("input").should("have.attr", "value", option);
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
      dropdownButton().click();
      selectListWrapper()
        .find("li")
        .should(($lis) => {
          expect($lis).to.have.length(count);
        });
    });

    it("should check list is open when input is focussed and openOnFocus is set", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent openOnFocus />
      );

      commonDataElementInputPreview().focus();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
    });

    it("should check list is open when input is clicked and openOnFocus is set", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent openOnFocus />
      );

      commonDataElementInputPreview().click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
    });

    it("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectObjectAsValueComponent />
      );

      const position = "first";
      const positionValue = "Amber";

      getDataElementByValue("input").should("have.attr", "value", "Green");
      selectInput().should("have.attr", "aria-expanded", "false");
      dropdownButton().click();
      selectOption(positionOfElement(position)).click();
      getDataElementByValue("input").should(
        "have.attr",
        "value",
        positionValue
      );
    });

    it("should render option list with proper maxHeight value", () => {
      const maxHeight = 200;
      CypressMountWithProviders(
        <stories.FilterableSelectComponent listMaxHeight={maxHeight} />
      );
      dropdownButton().click();
      selectListWrapper()
        .should("have.css", "max-height", `${maxHeight}px`)
        .and("be.visible");
    });

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            listPlacement={position}
            flipEnabled
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        let flipPosition;
        if (position === "top") {
          flipPosition = "bottom";
        }
        if (position === "bottom") {
          flipPosition = "top";
        }
        if (position === "left") {
          flipPosition = "right";
        }
        if (position === "right") {
          flipPosition = "left";
        }
        if (position === "auto") {
          flipPosition = "right";
        }

        dropdownButton().click();
        selectListPosition()
          .should("have.attr", "data-floating-placement", flipPosition)
          .and("be.visible");
      }
    );

    it.each([
      ["bottom", "0px", "0px", "0px", "20px"],
      ["top", "600px", "0px", "0px", "20px"],
      ["bottom", "200px", "0px", "0px", "900px"],
      ["top", "600px", "0px", "900px", "20px"],
    ])(
      "should render list in %s position with the most space when listPosition is not set",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        dropdownButton().click();
        selectListPosition()
          .should("have.attr", "data-floating-placement", position)
          .and("be.visible");
      }
    );

    it.each([
      [true, 2],
      [false, 1],
    ])(
      "should check the disablePortal prop when %s",
      (state, numberOfChildren) => {
        CypressMountWithProviders(
          <div>
            <stories.FilterableSelectComponent disablePortal={state} />
          </div>
        );

        dropdownButton().click();
        selectDataComponent("filterable")
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should render list options with multiple columns", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      multiColumnsSelectListHeader()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListBody()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListRow().should(
        "have.css",
        "background-color",
        "rgb(153, 173, 183)"
      );
    });

    it("should check table header content in list with multiple columns", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsComponent />
      );

      const headerCol1 = "Name";
      const headerCol2 = "Surname";
      const headerCol3 = "Occupation";

      dropdownButton().click();
      multiColumnsSelectListHeaderColumn(1)
        .should("have.text", headerCol1)
        .and("be.visible");
      multiColumnsSelectListHeaderColumn(2)
        .should("have.text", headerCol2)
        .and("be.visible");
      multiColumnsSelectListHeaderColumn(3)
        .should("have.text", headerCol3)
        .and("be.visible");
    });

    it("should indicate a matched filtered string with bold and underline", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsComponent />
      );

      const text = "Do";

      commonDataElementInputPreview().click().should("be.focused");
      commonDataElementInputPreview().type(text);
      boldedAndUnderlinedValue(text)
        .should("have.css", "text-decoration-line", "underline")
        .and("have.css", "text-decoration-style", "solid")
        .and("have.css", "font-weight", "700");
    });

    it("should indicate no results match entered string", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsComponent />
      );

      const text = "Xyz";

      commonDataElementInputPreview().click().should("be.focused");
      commonDataElementInputPreview().type(text);
      selectListWrapper().should("be.visible");
      multiColumnsSelectListHeader()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListNoResultsMessage(text).should("be.visible");
    });

    it("should render list options with multiple columns and nested component", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsNestedComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      multiColumnsSelectListHeader()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListBody()
        .should("have.length", columns)
        .and("be.visible");
      filterableSelectAddElementButton()
        .should("exist")
        .and("have.text", addElementText);
      filterableSelectButtonIcon()
        .should("exist")
        .and("have.attr", "type", icon);
    });

    it("should render list options with an action button and trigger Dialog on action", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithActionButtonComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      filterableSelectAddElementButton()
        .should("exist")
        .and("have.text", addElementText);
      filterableSelectButtonIcon()
        .should("exist")
        .and("have.attr", "type", icon);
      filterableSelectAddElementButton().click();
      alertDialogPreview().should("be.visible");
    });

    it("should render list options with an action button that is visible without scrolling and without affecting the list height", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithActionButtonComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");

      filterableSelectAddElementButton().should("be.visible");

      selectListWrapper().then((wrapperElement) => {
        const actualHeight = parseInt(wrapperElement.css("height"));
        expect(actualHeight).to.be.above(220);
        expect(actualHeight).to.be.below(250);
      });
    });

    it("when navigating with the keyboard, the selected option is not hidden behind an action button", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithActionButtonComponent />
      );

      dropdownButton().click();

      for (let i = 0; i < 5; i++) {
        commonDataElementInputPreview()
          .focus()
          .trigger("keydown", { ...keyCode("downarrow"), force: true });
      }

      selectOptionByText("Green").should("be.visible");
    });

    it("should add new list option from Add new Dialog", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithActionButtonComponent />
      );

      const newOption = "New10";

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      filterableSelectAddElementButton().should("exist").click();
      alertDialogPreview().should("be.visible");
      filterableSelectAddNewButton().should("be.visible").click();
      getDataElementByValue("input").should("have.attr", "value", newOption);
    });

    it("should have correct hover state of list option", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      const optionValue = "Blue";

      dropdownButton().click();
      selectListText(optionValue)
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });

    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);
      selectInput().should("have.css", "border-radius", "4px");
      selectListWrapper().should("have.css", "border-radius", "4px");
    });
  });

  describe("check events for FilterableSelect component", () => {
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick event when mouse is clicked on text input", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onClick={callback} />
      );

      dropdownButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus when FilterableSelect is brought into focus", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onFocus={callback} />
      );

      commonDataElementInputPreview()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onOpen when FilterableSelect is opened by focusing the input", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent openOnFocus onOpen={callback} />
      );

      commonDataElementInputPreview()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          cy.wrap(callback).should("have.been.calledOnce");
        });
    });

    it("should call onOpen when FilterableSelect is opened by clicking on Icon", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onOpen={callback} />
      );

      dropdownButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur event when the list is closed", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onBlur={callback} />
      );

      dropdownButton().click();
      commonDataElementInputPreview()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange event when a list option is selected", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onChange={callback} />
      );

      const position = "first";
      const option = "1";

      dropdownButton().click();
      selectOption(positionOfElement(position))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledWith({
            target: { value: option },
          });
        });
    });

    it.each([["downarrow"], ["uparrow"]])(
      "should call onKeyDown event when %s key is pressed",
      (key) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent onKeyDown={callback} />
        );

        commonDataElementInputPreview()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onFilterChange event when a filter string is input", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectOnChangeEventComponent
          onFilterChange={callback}
        />
      );

      const text = "B";

      commonDataElementInputPreview()
        .click()
        .type(text)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
          expect(callback).to.have.been.calledWith(text);
        });
    });

    it("should call onListAction event when the Action Button is clicked", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectListActionEventComponent
          onListAction={callback}
        />
      );

      dropdownButton().click();
      filterableSelectAddElementButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onListScrollBottom event when the list is scrolled to the bottom", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent onListScrollBottom={callback} />
      );

      dropdownButton().click();
      selectListWrapper()
        .scrollTo("bottom")
        .wait(250)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("check virtual scrolling", () => {
    it("renders only an appropriate number of options into the DOM when first opened", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithManyOptionsAndVirtualScrolling />
      );

      dropdownButton().click();

      selectOptionByText("Option 1.").should("be.visible");
      selectOptionByText("Option 10.").should("exist").and("not.be.visible");
      selectOptionByText("Option 30.").should("not.exist");
    });

    it("changes the rendered options when you scroll down", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithManyOptionsAndVirtualScrolling />
      );

      dropdownButton().click();
      selectListWrapper().scrollTo(0, 750).wait(250);

      selectOptionByText("Option 1.").should("not.exist");
      selectOptionByText("Option 20.").should("be.visible");
      selectOptionByText("Option 30.").should("exist").and("not.be.visible");
      selectOptionByText("Option 40.").should("not.exist");
    });

    it("should filter options when text is typed, taking into account non-rendered options", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithManyOptionsAndVirtualScrolling />
      );

      commonDataElementInputPreview().type("Option 100");
      selectOptionByText("Option 100.").should("be.visible");
      selectOptionByText("Option 1000.").should("be.visible");
      selectOptionByText("Option 1002.").should("be.visible");
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when Select is closed by pressing an escape key", () => {
      CypressMountWithProviders(<stories.FilterableSelectNestedInDialog />);

      dropdownButton().click();
      commonDataElementInputPreview()
        .type("{esc}", { force: true })
        .then(() => {
          selectList().should("not.be.visible");
          alertDialogPreview().should("exist");
        });

      commonDataElementInputPreview()
        .type("{esc}", { force: true })
        .then(() => {
          alertDialogPreview().should("not.exist");
        });
    });

    it("should not refocus the select textbox when closing it by clicking outside", () => {
      CypressMountWithProviders(<stories.FilterableSelectNestedInDialog />);

      dropdownButton().click();
      body().click();

      selectList().should("not.be.visible");
      commonDataElementInputPreview().should("not.be.focused");
    });
  });

  describe("Accessibility tests for FilterableSelect component", () => {
    it("should pass accessibilty tests for FilterableSelect", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent />);

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it.each(testData)(
      "should pass accessibilty tests for FilterableSelect label prop using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent label={labelValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for FilterableSelect labelHelp prop using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon()
          .trigger("mouseover")
          .then(() => cy.checkAccessibility());
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for FilterableSelect placeholder prop using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent placeholder={placeholderValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ])(
      "should pass accessibilty tests for FilterableSelect tooltip prop in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelHelp="Help"
            tooltipPosition={tooltipPositionValue}
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        helpIcon()
          .trigger("mouseover")
          .then(() => cy.checkAccessibility());
      }
    );

    it("should pass accessibilty tests for FilterableSelect disabled prop", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for FilterableSelect readOnly prop", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent readOnly />);

      cy.checkAccessibility();
      selectInput()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it.each([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE])(
      "should pass accessibilty tests for FilterableSelect size prop",
      (size) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent size={size} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for FilterableSelect autoFocus prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent autoFocus />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for FilterableSelect required prop", () => {
      CypressMountWithProviders(<stories.FilterableSelectComponent required />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for FilterableSelect labelInline prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent labelInline />
      );

      cy.checkAccessibility();
    });

    it.each([
      ["flex", "399"],
      ["flex", "400"],
      ["block", "401"],
    ])(
      "should pass accessibilty tests for FilterableSelect adaptiveLabelBreakpoint prop set as %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            adaptiveLabelBreakpoint={breakpoint}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["right", "left"])(
      "should pass accessibilty tests for FilterableSelect labelAlign prop set as %s",
      (alignment) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            labelAlign={alignment}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["10", "90"],
      ["30", "70"],
      ["80", "20"],
    ])(
      "should pass accessibilty tests for FilterableSelect labelWidth prop set as %s and inputWidth set as %s",
      (label, input) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should pass accessibilty tests for FilterableSelect maxWidth prop set as %s",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent maxWidth={maxWidth} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for FilterableSelect isLoading prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithLazyLoadingComponent />
      );

      dropdownButton().click();
      loader(1).should("be.visible");
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for FilterableSelect onListScrollBottom prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithInfiniteScrollComponent />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
      selectListWrapper()
        .scrollTo("bottom")
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect openOnFocus prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent openOnFocus />
      );

      commonDataElementInputPreview()
        .focus()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect with object as value", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectObjectAsValueComponent />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect listMaxHeight prop", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectComponent listMaxHeight={200} />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ])(
      "should pass accessibilty tests for FilterableSelect listPlacement and flipEnabled props",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.FilterableSelectComponent
            listPlacement={position}
            flipEnabled
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        dropdownButton()
          .click()
          .then(() => cy.checkAccessibility());
      }
    );

    it("should pass accessibilty tests for FilterableSelect with multiple columns", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsComponent />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect with multiple columns and nested component", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectMultiColumnsNestedComponent />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect with an action button and trigger Dialog on action", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithActionButtonComponent />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect with virtual scrolling", () => {
      CypressMountWithProviders(
        <stories.FilterableSelectWithManyOptionsAndVirtualScrolling />
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for FilterableSelect in nested dialog", () => {
      CypressMountWithProviders(<stories.FilterableSelectNestedInDialog />);

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });

    // FE-5764
    it.skip("should pass accessibilty tests for FilterableSelect disablePortal prop", () => {
      CypressMountWithProviders(
        <div>
          <stories.FilterableSelectComponent disablePortal />
        </div>
      );

      dropdownButton()
        .click()
        .then(() => cy.checkAccessibility());
    });
  });
});
