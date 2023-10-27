import React from "react";
import { MultiSelectProps } from "../../../../src/components/select";
import * as stories from "../../../../src/components/select/multi-select/multi-select-test.stories";
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
  multiSelectDataComponent,
  selectElementInput,
  selectInput,
  boldedAndUnderlinedValue,
  multiColumnsSelectListNoResultsMessage,
  multiSelectPill,
  multiSelectPillByPosition,
  multiSelectPillByText,
  selectResetButton,
} from "../../../locators/select";
import { pillCloseIcon } from "../../../locators/pill";
import { loader } from "../../../locators/loader";
import { alertDialogPreview } from "../../../locators/dialog";
import {
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
} from "../../../support/component-helper/common-steps";
import { positionOfElement } from "../../../support/helper";
import { SIZE, CHARACTERS } from "../../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const columns = 3;
const option1 = "Green";
const option2 = "Purple";
const option3 = "Yellow";
const listOption = "Amber";
const defaultValue = ["10"];
const keyToTrigger = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "Enter",
] as const;

context("Tests for MultiSelect component", () => {
  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);
      commonDataElementInputPreview()
        .focus()
        .parent()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(
        <stories.MultiSelectDefaultValueComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );
      commonDataElementInputPreview()
        .focus()
        .parent()
        .should("have.css", "outline", "rgb(255, 188, 25) solid 3px");
    });
  });

  describe("check props for MultiSelect component", () => {
    it.each(testData)(
      "should render MultiSelect label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent label={labelValue} />
        );

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent placeholder={placeholderValue} />
        );

        selectInput().should("have.attr", "placeholder", placeholderValue);
      }
    );

    it("should render MultiSelect with name prop set to test value", () => {
      CypressMountWithProviders(
        <stories.MultiSelectComponent name={testPropValue} />
      );

      commonDataElementInputPreview().should(
        "have.attr",
        "name",
        testPropValue
      );
    });

    it("should render MultiSelect with id prop set to test value", () => {
      CypressMountWithProviders(
        <stories.MultiSelectComponent id={testPropValue} />
      );

      commonDataElementInputPreview().should("have.attr", "id", testPropValue);
    });

    it("should render MultiSelect with data-component prop set to test value", () => {
      CypressMountWithProviders(
        <stories.MultiSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render MultiSelect with data-element prop set to test value", () => {
      CypressMountWithProviders(
        <stories.MultiSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render MultiSelect with data-role prop set to test value", () => {
      CypressMountWithProviders(
        <stories.MultiSelectComponent data-role={testPropValue} />
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
    ] as [MultiSelectProps["tooltipPosition"], string, string, string, string][])(
      "should render the help tooltip in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
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

    it("should check MultiSelect is disabled", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render MultiSelect as read only", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent readOnly />);

      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectInput().click();
      selectListWrapper().should("not.be.visible");
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ] as [MultiSelectProps["size"], number][])(
      "should use %s as size and render MultiSelect with %s as height",
      (size, height) => {
        CypressMountWithProviders(<stories.MultiSelectComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "min-height", height);
          });
      }
    );

    it("should check MultiSelect has autofocus", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check MultiSelect is required", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check MultiSelect label is inline", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ])(
      "should check MultiSelect label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <stories.MultiSelectComponent
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
    ] as [MultiSelectProps["labelAlign"], string][])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each([
      [10, 90, 135, 1229],
      [30, 70, 409, 954],
      [80, 20, 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
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
      "should check maxWidth as %s for MultiSelect component",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent maxWidth={maxWidth} />
        );

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should not open the list with focus on MultiSelect input", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      commonDataElementInputPreview().focus();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should not open the list with mouse click on MultiSelect input", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      commonDataElementInputPreview().click();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
    });

    it("should close the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      dropdownButton().click();
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      selectInput().realPress("Tab");
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      selectInput().realPress("Tab");
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      body().click({ force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it.each([
      keyToTrigger[0],
      keyToTrigger[1],
      keyToTrigger[4],
      keyToTrigger[5],
    ])(
      "should open the list when %s is pressed with MultiSelect input in focus",
      (key) => {
        CypressMountWithProviders(<stories.MultiSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().realPress(key);
        selectListWrapper().should("be.visible");
      }
    );

    it.each([keyToTrigger[6]])(
      "should not open the list when %s is pressed with MultiSelect input in focus",
      (key) => {
        CypressMountWithProviders(<stories.MultiSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().realPress(key);
        selectListWrapper().should("not.be.visible");
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list and create option pill in the input",
      (option) => {
        CypressMountWithProviders(<stories.MultiSelectComponent />);

        dropdownButton().click();
        selectListText(option).click();
        selectInput().should("have.attr", "aria-expanded", "true");
        selectListWrapper().should("be.visible");
        multiSelectPill().should("have.attr", "title", option);
      }
    );

    it("should select two options and create option pills in the input", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
      multiSelectPill().should("have.attr", "title", option1);
      selectListText(option2).click();
      multiSelectPillByPosition(0).should("have.attr", "title", option1);
      multiSelectPillByPosition(1).should("have.attr", "title", option2);
    });

    it("should check number of selected options are limited to 2", () => {
      CypressMountWithProviders(<stories.MultiSelectMaxOptionsComponent />);

      const length = 2;

      dropdownButton().click();
      selectListText(option1).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
      multiSelectPill().should("have.attr", "title", option1);
      selectListText(option2).click();
      selectListText(option3).click();
      multiSelectPill().should("have.length", length);
      multiSelectPillByPosition(0).should("have.attr", "title", option1);
      multiSelectPillByPosition(1).should("have.attr", "title", option2);
    });

    it.each([
      ["A", "Amber", "Black", "Orange"],
      ["O", "Brown", "Orange", "Yellow"],
    ])(
      "should filter options when %s is typed",
      (text, optionValue1, optionValue2, optionValue3) => {
        CypressMountWithProviders(<stories.MultiSelectComponent />);

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
          .and("be.visible")
          .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
      }
    );

    it("should render the lazy loader when the prop is set", () => {
      CypressMountWithProviders(
        <stories.MultiSelectWithLazyLoadingComponent />
      );

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render the lazy loader when the prop is set and list is opened again", () => {
      CypressMountWithProviders(<stories.MultiSelectLazyLoadTwiceComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(listOption).should("be.visible");
      dropdownButton().click();
      selectResetButton().click({ force: true });
      dropdownButton().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should list options when value is set and select list is opened again", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      const count = 11;

      dropdownButton().click();
      selectListText(listOption).click();
      multiSelectPill().should("have.attr", "title", listOption);
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
      dropdownButton().click().click();
      selectListWrapper().find("li").should("have.length", count);
    });

    it("should check list is open when input is focussed and openOnFocus is set", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent openOnFocus />);

      commonDataElementInputPreview().focus();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
    });

    it("should check list is open when input is clicked and openOnFocus is set", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent openOnFocus />);

      commonDataElementInputPreview().click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
    });

    it("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(<stories.MultiSelectObjectAsValueComponent />);

      multiSelectPill().should("have.attr", "title", option1);
      selectInput().should("have.attr", "aria-expanded", "false");
      dropdownButton().click();
      selectListText(option2).click();
      multiSelectPillByPosition(0).should("have.attr", "title", option1);
      multiSelectPillByPosition(1).should("have.attr", "title", option2);
    });

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ] as [MultiSelectProps["listPlacement"], string, string, string, string][])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
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
          <stories.MultiSelectComponent
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
            <stories.MultiSelectComponent disablePortal={state} />
          </div>
        );

        dropdownButton().click();
        multiSelectDataComponent()
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should render list options with multiple columns", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

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
        "rgba(0, 0, 0, 0)"
      );
    });

    it("should check table header content in list with multiple columns", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

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
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      const text = "Do";

      commonDataElementInputPreview().click().should("be.focused");
      commonDataElementInputPreview().type(text);
      boldedAndUnderlinedValue(text)
        .should("have.css", "text-decoration-line", "underline")
        .and("have.css", "text-decoration-style", "solid")
        .and("have.css", "font-weight", "700");
    });

    it.each(["Xyz", " "])(
      'should indicate no results match entered string "%s"',
      (text) => {
        CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

        commonDataElementInputPreview().click().should("be.focused");
        commonDataElementInputPreview().type(text);
        selectListWrapper().should("be.visible");
        multiColumnsSelectListHeader()
          .should("have.length", columns)
          .and("be.visible");
        multiColumnsSelectListNoResultsMessage(text).should("be.visible");
      }
    );

    it.each([
      ["3", "Blue"],
      ["7", "Pink"],
    ])(
      "should set defaultValue prop to %s and show option pill %s preselected",
      (value, option) => {
        CypressMountWithProviders(
          <stories.MultiSelectDefaultValueComponent defaultValue={[value]} />
        );

        multiSelectPill().should("have.attr", "title", option);
      }
    );

    it("should have no pill option preselected if defaultValue prop is not set", () => {
      CypressMountWithProviders(<stories.MultiSelectDefaultValueComponent />);

      multiSelectPill().should("not.exist");
    });

    it("should render MultiSelect with custom coloured pills", () => {
      CypressMountWithProviders(<stories.MultiSelectCustomColorComponent />);

      multiSelectPillByPosition(0)
        .should("have.css", "borderColor", "rgb(255, 191, 0)")
        .and("have.css", "background-color", "rgb(255, 191, 0)");
      multiSelectPillByPosition(1)
        .should("have.css", "borderColor", "rgb(0, 119, 200)")
        .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
    });

    it.each([
      ["third" as const, "Blue as the sky on a summer's day"],
      ["fifth" as const, "Green as the grass in a spring meadow"],
    ] as ["third" | "fifth", string][])(
      "should select %s list option and show pill with complete long text wrapped in the input",
      (option, text) => {
        CypressMountWithProviders(
          <stories.MultiSelectLongPillComponent wrapPillText />
        );

        dropdownButton().click();
        selectOption(positionOfElement(option)).click();
        multiSelectPill().should("have.attr", "title", text);
      }
    );

    it("should show selected pill option with correctly formatted delete button when focussed", () => {
      CypressMountWithProviders(
        <stories.MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      pillCloseIcon()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "background-color", "rgb(0, 103, 56)");
    });

    it("should delete pill option with delete button", () => {
      CypressMountWithProviders(
        <stories.MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      pillCloseIcon().click();
      multiSelectPill().should("not.exist");
    });

    it("should delete pill option with backspace key", () => {
      CypressMountWithProviders(
        <stories.MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      commonDataElementInputPreview().focus().realPress("Backspace");
      multiSelectPill().should("not.exist");
    });

    it("should delete all selected pill options and leave list open", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1).click();
      selectListText(option2).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectListWrapper().should("be.visible");
      commonDataElementInputPreview().type("{backspace}");
      multiSelectPillByText(option2).should("not.exist");
      selectListWrapper().should("be.visible");
      commonDataElementInputPreview().type("{backspace}");
      multiSelectPill().should("not.exist");
      selectListWrapper().should("be.visible");
    });

    it("should have correct hover state of list option", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1)
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });

    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);
      selectInput().should("have.css", "border-radius", "4px");
      selectListWrapper().should("have.css", "border-radius", "4px");
    });
  });

  describe("check events for MultiSelect component", () => {
    it("should call onClick event when mouse is clicked on text input", () => {
      const callback: MultiSelectProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onClick={callback} />
      );

      commonDataElementInputPreview().click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onFocus when MultiSelect is brought into focus", () => {
      const callback: MultiSelectProps["onFocus"] = cy.stub().as("onFocus");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onFocus={callback} />
      );

      commonDataElementInputPreview().focus();
      cy.get("@onFocus").should("have.been.calledOnce");
    });

    it("should call onOpen when MultiSelect is opened", () => {
      const callback: MultiSelectProps["onOpen"] = cy.stub().as("onOpen");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onOpen={callback} />
      );

      dropdownButton().click();
      cy.get("@onOpen").should("have.been.calledOnce");
    });

    it("should call onBlur event when the list is closed", () => {
      const callback: MultiSelectProps["onBlur"] = cy.stub().as("onBlur");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onBlur={callback} />
      );

      dropdownButton().click();
      selectInput().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onChange event once when a list option is selected", () => {
      const callback: MultiSelectProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onChange={callback} />
      );

      const position = "first";
      const option = ["1"];

      dropdownButton().click();
      selectOption(positionOfElement(position)).click();
      cy.get("@onChange").should("have.been.calledWith", {
        target: { value: option },
        selectionConfirmed: true,
      });
    });

    it.each([
      keyToTrigger[0],
      keyToTrigger[1],
      keyToTrigger[2],
      keyToTrigger[3],
      keyToTrigger[6],
    ])("should call onKeyDown event when %s key is pressed", (key) => {
      const callback: MultiSelectProps["onKeyDown"] = cy.stub().as("onKeyDown");
      CypressMountWithProviders(
        <stories.MultiSelectComponent onKeyDown={callback} />
      );

      commonDataElementInputPreview().focus().realPress(key);
      cy.get("@onKeyDown").should("have.been.calledOnce");
    });

    it("should call onFilterChange event when a filter string is input", () => {
      const callback: MultiSelectProps["onFilterChange"] = cy
        .stub()
        .as("onFilterChange");
      CypressMountWithProviders(
        <stories.MultiSelectOnFilterChangeEventComponent
          onFilterChange={callback}
        />
      );

      const text = "B";

      commonDataElementInputPreview().click().type(text);
      cy.get("@onFilterChange").should("have.been.calledOnce");
      cy.get("@onFilterChange").should("have.been.calledWith", text);
    });
  });

  describe("check virtual scrolling", () => {
    it("renders only an appropriate number of options into the DOM when first opened", () => {
      CypressMountWithProviders(
        <stories.MultiSelectWithManyOptionsAndVirtualScrolling />
      );

      dropdownButton().click();

      selectOptionByText("Option 1.").should("be.visible");
      selectOptionByText("Option 10.").should("exist").and("not.be.visible");
      selectOptionByText("Option 30.").should("not.exist");
    });

    it("changes the rendered options when you scroll down", () => {
      CypressMountWithProviders(
        <stories.MultiSelectWithManyOptionsAndVirtualScrolling />
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
        <stories.MultiSelectWithManyOptionsAndVirtualScrolling />
      );

      commonDataElementInputPreview().type("Option 100");
      selectOptionByText("Option 100.").should("be.visible");
      selectOptionByText("Option 1000.").should("be.visible");
      selectOptionByText("Option 1002.").should("be.visible");
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when Select is closed by pressing an escape key", () => {
      CypressMountWithProviders(<stories.MultiSelectNestedInDialog />);

      dropdownButton().click();
      commonDataElementInputPreview().type("{esc}", { force: true });
      selectList().should("not.be.visible");
      alertDialogPreview().should("exist");

      commonDataElementInputPreview().type("{esc}", { force: true });
      alertDialogPreview().should("not.exist");
    });

    it("should not refocus the select textbox when closing it by clicking outside", () => {
      CypressMountWithProviders(<stories.MultiSelectNestedInDialog />);

      dropdownButton().click();
      body().click();

      selectList().should("not.be.visible");
      commonDataElementInputPreview().should("not.be.focused");
    });

    it("should contain custom option id option1", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(listOption).should("have.attr", "id", "option1");
    });

    it("should render option data-component prop set to option", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(listOption).should(
        "have.attr",
        "data-component",
        "option"
      );
    });

    it("should render option data-role prop set to option1", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(listOption).should("have.attr", "data-role", "option1");
    });

    it("should render option data-element prop set to option1", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      selectListText(listOption).should("have.attr", "data-element", "option1");
    });

    it("should contain custom option row id 3", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      multiColumnsSelectListBody().parent().should("have.attr", "id", "3");
    });

    it("should render option row data-component prop set to option-row", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-component", "option-row");
    });

    it("should render option row data-role prop set to option-row", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-role", "option-row");
    });

    it("should render option row data-element prop set to option-row", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-element", "option-row");
    });
  });

  describe("When error is triggered by onChange", () => {
    it("should display correctly", () => {
      CypressMountWithProviders(
        <stories.MultiSelectErrorOnChangeNewValidation />
      );

      dropdownButton().click();
      selectListText(option1).click();
      selectListText(option2).click();
      selectListText(option3).click();

      /* This is <p>Error</p> that displays the error message in the new validations. 
         It does not have a data-element or data-component prop to target the element with. 
         This can be refactored once this is implemented. */
      cy.get("p").should("be.visible").should("have.text", "Error");
    });
  });

  describe("selection confirmed", () => {
    it("is set on the event when options are clicked", () => {
      CypressMountWithProviders(<stories.SelectionConfirmed />);

      dropdownButton().click();
      selectListText("One").click();
      selectListText("Five").click();
      selectListText("Seven").click();

      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 3);
      cy.get('[data-element="confirmed-selection-1"]').should("exist");
      cy.get('[data-element="confirmed-selection-5"]').should("exist");
      cy.get('[data-element="confirmed-selection-7"]').should("exist");
    });

    it("is set on the event when Enter key is pressed on an option using ArrowDown key to navigate", () => {
      CypressMountWithProviders(<stories.SelectionConfirmed />);

      dropdownButton().click();
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");

      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 4);
      cy.get('[data-element="confirmed-selection-1"]').should("exist");
      cy.get('[data-element="confirmed-selection-3"]').should("exist");
      cy.get('[data-element="confirmed-selection-5"]').should("exist");
      cy.get('[data-element="confirmed-selection-6"]').should("exist");
    });

    it("is set on the event when Enter key is pressed on an option using ArrowUp key to navigate", () => {
      CypressMountWithProviders(<stories.SelectionConfirmed />);

      dropdownButton().click();
      selectInput().realPress("ArrowUp");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowUp");
      selectInput().realPress("ArrowUp");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowUp");
      selectInput().realPress("ArrowUp");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowUp");
      selectInput().realPress("Enter");

      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 4);
      cy.get('[data-element="confirmed-selection-9"]').should("exist");
      cy.get('[data-element="confirmed-selection-7"]').should("exist");
      cy.get('[data-element="confirmed-selection-5"]').should("exist");
      cy.get('[data-element="confirmed-selection-4"]').should("exist");
    });

    it("is set on the event when the selected options are removed via Backspace key", () => {
      CypressMountWithProviders(<stories.SelectionConfirmed />);

      dropdownButton().click();
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");
      selectInput().realPress("ArrowDown");
      selectInput().realPress("Enter");

      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 4);

      selectInput().realPress("Backspace");
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 3);
      selectInput().realPress("Backspace");
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 2);
      selectInput().realPress("Backspace");
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 1);
      selectInput().realPress("Backspace");
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 0);
    });

    it("is set on the event when the selected options are removed via clicking close icon of Pills", () => {
      CypressMountWithProviders(<stories.SelectionConfirmed />);

      dropdownButton().click();
      selectListText("One").click();
      selectListText("Five").click();
      selectListText("Seven").click();

      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 3);
      pillCloseIcon().eq(2).click();
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 2);
      pillCloseIcon().eq(1).click();
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 1);
      pillCloseIcon().eq(0).click();
      cy.get('[data-element="confirmed-selections"]')
        .children()
        .should("have.length", 0);
    });
  });

  describe("Accessibility tests for MultiSelect component", () => {
    it("should pass accessibilty tests for MultiSelect", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent />);

      dropdownButton().click();
      cy.checkAccessibility();
    });

    it.each(testData)(
      "should pass accessibilty tests for MultiSelect label prop using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent label={labelValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for MultiSelect labelHelp prop using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon()
          .trigger("mouseover")
          .then(() => cy.checkAccessibility());
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for MultiSelect placeholder prop using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent placeholder={placeholderValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ] as [MultiSelectProps["tooltipPosition"], string, string, string, string][])(
      "should pass accessibilty tests for MultiSelect tooltip prop in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
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

    it("should pass accessibilty tests for MultiSelect disabled prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect readOnly prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent readOnly />);

      cy.checkAccessibility();
      selectInput().click();
      cy.checkAccessibility();
    });

    it.each([
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
    ] as MultiSelectProps["size"][])(
      "should pass accessibilty tests for MultiSelect size prop",
      (size) => {
        CypressMountWithProviders(<stories.MultiSelectComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for MultiSelect autoFocus prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent autoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect required prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent required />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect labelInline prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent labelInline />);

      cy.checkAccessibility();
    });

    it.each([
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ])(
      "should pass accessibilty tests for MultiSelect adaptiveLabelBreakpoint prop set as %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <stories.MultiSelectComponent
            labelInline
            adaptiveLabelBreakpoint={breakpoint}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["right", "left"] as MultiSelectProps["labelAlign"][])(
      "should pass accessibilty tests for MultiSelect labelAlign prop set as %s",
      (alignment) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent labelInline labelAlign={alignment} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      [10, 90],
      [30, 70],
      [80, 20],
    ])(
      "should pass accessibilty tests for MultiSelect labelWidth prop set as %s and inputWidth set as %s",
      (label, input) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should pass accessibilty tests for MultiSelect maxWidth prop set as %s",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent maxWidth={maxWidth} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for MultiSelect isLoading prop", () => {
      CypressMountWithProviders(
        <stories.MultiSelectWithLazyLoadingComponent />
      );

      dropdownButton().click();
      loader(1).should("be.visible");
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect openOnFocus prop", () => {
      CypressMountWithProviders(<stories.MultiSelectComponent openOnFocus />);

      commonDataElementInputPreview().focus();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect with object as value", () => {
      CypressMountWithProviders(<stories.MultiSelectObjectAsValueComponent />);

      dropdownButton().click();
      selectListText(option2).click();
      cy.checkAccessibility();
    });

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ] as [MultiSelectProps["listPlacement"], string, string, string, string][])(
      "should pass accessibilty tests for MultiSelect listPlacement and flipEnabled props",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.MultiSelectComponent
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

    // FE-5764
    it.skip("should pass accessibilty tests for MultiSelect disablePortal prop", () => {
      CypressMountWithProviders(
        <div>
          <stories.MultiSelectComponent disablePortal />
        </div>
      );

      dropdownButton().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect with multiple columns", () => {
      CypressMountWithProviders(<stories.MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      cy.checkAccessibility();
    });

    it.each(["3", "7"])(
      "should pass accessibilty tests for MultiSelect defaultValue prop",
      (value) => {
        CypressMountWithProviders(
          <stories.MultiSelectDefaultValueComponent defaultValue={[value]} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for MultiSelect with custom coloured pills", () => {
      CypressMountWithProviders(<stories.MultiSelectCustomColorComponent />);

      cy.checkAccessibility();
    });

    it.each([["third"], ["fifth"]] as ["third" | "fifth"][])(
      "should pass accessibilty tests for MultiSelect wrapPillText prop",
      (option) => {
        CypressMountWithProviders(
          <stories.MultiSelectLongPillComponent wrapPillText />
        );

        dropdownButton().click();
        selectOption(positionOfElement(option))
          .click()
          .then(() => cy.checkAccessibility());
      }
    );

    it("should pass accessibilty tests for MultiSelect with virtual scrolling", () => {
      CypressMountWithProviders(
        <stories.MultiSelectWithManyOptionsAndVirtualScrolling />
      );

      dropdownButton().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for MultiSelect in nested dialog", () => {
      CypressMountWithProviders(<stories.MultiSelectNestedInDialog />);

      dropdownButton().click();
      cy.checkAccessibility();
    });

    // FE-5764
    it.skip("should pass accessibilty tests for MultiSelect When error is triggered by onChange", () => {
      CypressMountWithProviders(
        <stories.MultiSelectErrorOnChangeNewValidation />
      );

      dropdownButton().click();
      selectListText(option1).click();
      selectListText(option2).click();
      selectListText(option3).click();

      cy.checkAccessibility();
    });
  });
});
