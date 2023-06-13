import React from "react";
import { SimpleSelectProps } from "../../../../src/components/select";
import * as stories from "../../../../src/components/select/simple-select/simple-select-test.stories";
import CypressMountWithProviders from "../../../support/component-helper/cypress-mount";
import {
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  body,
} from "../../../locators";
import {
  selectText,
  selectInput,
  selectListWrapper,
  selectOption,
  selectOptionByText,
  dropdownButton,
  selectListText,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListBody,
  multiColumnsSelectListRow,
  selectListCustomChild,
  selectListOptionGroup,
  selectListPosition,
  selectDataComponent,
  selectElementInput,
  multiColumnsSelectListRowAt,
  selectList,
} from "../../../locators/select";
import { alertDialogPreview } from "../../../locators/dialog";
import { loader } from "../../../locators/loader";
import {
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
} from "../../../support/component-helper/common-steps";
import { keyCode, positionOfElement } from "../../../support/helper";
import { SIZE, CHARACTERS } from "../../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const keyToTrigger = ["downarrow", "uparrow", "Space", "Home", "End"] as const;

context("Tests for SimpleSelect component", () => {
  describe("check props for SimpleSelect component", () => {
    it.each(testData)(
      "should render SimpleSelect label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent label={labelValue} />
        );

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent placeholder={placeholderValue} />
        );

        selectText().should("have.text", placeholderValue);
      }
    );

    it("should render SimpleSelect with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render SimpleSelect with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render SimpleSelect with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectComponent data-role={testPropValue} />
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
    ] as [SimpleSelectProps["tooltipPosition"], string, string, string, string][])(
      "should render the help tooltip in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
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

    it("should check SimpleSelect is disabled", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render SimpleSelect as read only", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent readOnly />);

      selectText().click();
      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectText().should("have.attr", "aria-hidden", "true");
      selectListWrapper().should("not.be.visible");
    });

    it("should render SimpleSelect as transparent", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent transparent />);

      getDataElementByValue("input").should(
        "have.css",
        "background",
        "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
      );
    });

    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ] as [SimpleSelectProps["size"], string][])(
      "should use %s as size and render SimpleSelect with %s as height",
      (size, height) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent size={size} />
        );

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it("should check SimpleSelect has autofocus", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check SimpleSelect is required", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check SimpleSelect label is inline", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ] as [SimpleSelectProps["labelAlign"], string][])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
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
          <stories.SimpleSelectComponent
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
      "should check maxWidth as %s for SimpleSelect component",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent maxWidth={maxWidth} />
        );

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should open the list with mouse click on Select input", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      selectText().click();
      commonDataElementInputPreview().should(
        "have.attr",
        "aria-expanded",
        "true"
      );
      selectListWrapper().should("be.visible");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      dropdownButton().click();
      selectListWrapper().should("be.visible");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectInput().tab();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      commonDataElementInputPreview().type("{esc}", { force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      body().realClick();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectListWrapper().should("not.be.visible");
    });

    it.each([...keyToTrigger])(
      "should open the list when %s is pressed with Select input in focus",
      (key) => {
        CypressMountWithProviders(<stories.SimpleSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().trigger("keydown", { ...keyCode(key), force: true });
        selectListWrapper().should("be.visible");
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list",
      (option) => {
        CypressMountWithProviders(<stories.SimpleSelectComponent />);

        selectText().click();
        selectListText(option).click();
        getDataElementByValue("input").should("have.attr", "value", option);
        selectInput().should("have.attr", "aria-expanded", "false");
        selectListWrapper().should("not.be.visible");
      }
    );

    it("should render an option that wraps onto more than one line correctly", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      const optionValue8 =
        "Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night";
      const optionValue9 = "Red";
      const optionValue10 = "White";
      const optionValue11 = "Yellow";

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListWrapper().scrollTo("bottom");
      selectListText(optionValue8).should("be.visible");
      selectListText(optionValue9).should("be.visible");
      selectListText(optionValue10).should("be.visible");
      selectListText(optionValue11).should("be.visible");
    });

    it("should render the lazy loader when the prop is set", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithLazyLoadingComponent />
      );

      selectText().click();
      selectListWrapper().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render a lazy loaded option when the infinite scroll prop is set", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithInfiniteScrollComponent />
      );

      const option = "Lazy Loaded A1";

      selectText().click();
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

    it("infinite scroll example should not cycle back to the start when using down arrow key", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithInfiniteScrollComponent />
      );

      const pressDownArrow = () =>
        commonDataElementInputPreview().trigger("keydown", {
          ...keyCode("downarrow"),
          force: true,
        });

      commonDataElementInputPreview().focus();

      pressDownArrow();

      selectListText("Amber").should("exist");

      for (let i = 0; i < 5; i++) {
        pressDownArrow();
      }

      selectListText("Lazy Loaded A1").should("exist");

      // run this 10 times to try to catch any intermitted failures
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          pressDownArrow();
        }
        selectListText("Amber").should("not.be.visible");
      }
    });

    it("keyboard navigation should work correctly in multicolumn mode and ensure the selected option is visible", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      const pressDownArrow = () =>
        commonDataElementInputPreview().trigger("keydown", {
          ...keyCode("downarrow"),
          force: true,
        });

      commonDataElementInputPreview().focus();

      for (let i = 0; i < 3; i++) {
        pressDownArrow();
      }

      getDataElementByValue("input").should("have.attr", "value", "Jill Moe");

      multiColumnsSelectListRowAt(4).should("be.visible");
    });

    it("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(<stories.SimpleSelectObjectAsValueComponent />);

      const position = "first";
      const positionValue = "Amber";

      getDataElementByValue("input").should("have.attr", "value", "Green");
      selectInput().should("have.attr", "aria-expanded", "false");
      selectText().click();
      selectOption(positionOfElement(position)).click();
      getDataElementByValue("input").should(
        "have.attr",
        "value",
        positionValue
      );
    });

    it("should render list options with multiple columns", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      const columns = 3;

      selectText().click();
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
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      const headerCol1 = "Name";
      const headerCol2 = "Surname";
      const headerCol3 = "Occupation";

      selectText().click();
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

    it.each([
      ["1", "favourite", "orange"],
      ["2", "money_bag", "black"],
      ["3", "gift", "blue"],
    ])(
      "should render list option %s with custom option %s icon and custom icon color %s",
      (option, type, color) => {
        CypressMountWithProviders(
          <stories.SimpleSelectCustomOptionChildrenComponent />
        );

        selectText().click();
        selectListWrapper().should("be.visible");
        selectListCustomChild(option)
          .should("have.attr", "type", type)
          .and("have.attr", "color", color);
      }
    );

    it("should list option group header Group one", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListOptionGroup().should("have.text", "Group one");
    });

    it("should contain custom option group header id groupHeader1", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListOptionGroup()
        .parent()
        .should("have.attr", "id", "groupHeader1");
    });

    it("should render option group header data-component prop set to group-header", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListOptionGroup()
        .parent()
        .should("have.attr", "data-component", "group-header");
    });

    it("should render option group header data-role prop set to group-header", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListOptionGroup()
        .parent()
        .should("have.attr", "data-role", "group-header");
    });

    it("should render option group header data-element prop set to group-header", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent />);

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListOptionGroup()
        .parent()
        .should("have.attr", "data-element", "group-header");
    });

    it("should contain custom option row id 3", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      selectText().click();
      multiColumnsSelectListBody().parent().should("have.attr", "id", "3");
    });

    it("should render option row data-component prop set to option-row", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      selectText().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-component", "option-row");
    });

    it("should render option row data-role prop set to option-row", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      selectText().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-role", "option-row");
    });

    it("should render option row data-element prop set to option-row", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent />
      );

      selectText().click();
      multiColumnsSelectListBody()
        .parent()
        .should("have.attr", "data-element", "option-row");
    });

    it("should contain custom option id option1", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectCustomOptionChildrenComponent />
      );

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListCustomChild(1).parent().should("have.attr", "id", "option1");
    });

    it("should render custom option data-component prop set to option", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectCustomOptionChildrenComponent />
      );

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListCustomChild(1)
        .parent()
        .should("have.attr", "data-component", "option");
    });

    it("should render custom option data-role prop set to option", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectCustomOptionChildrenComponent />
      );

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListCustomChild(1)
        .parent()
        .should("have.attr", "data-role", "option");
    });

    it("should render custom option data-element prop set to option", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectCustomOptionChildrenComponent />
      );

      selectText().click();
      selectListWrapper().should("be.visible");
      selectListCustomChild(1)
        .parent()
        .should("have.attr", "data-element", "option");
    });

    it("should render option list with proper maxHeight value", () => {
      const maxHeight = 200;
      CypressMountWithProviders(
        <stories.SimpleSelectComponent listMaxHeight={maxHeight} />
      );
      selectText().click();
      selectListWrapper()
        .should("have.css", "max-height", `${maxHeight}px`)
        .and("be.visible");
    });

    it.each([
      ["top", "300px", "0px", "200px", "20px"],
      ["bottom", "0px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "500px", "20px"],
      ["right", "200px", "0px", "0px", "500px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][])(
      "should render list in %s position when margins are top %s, bottom %s, left %s and right %s",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
            listPlacement={position}
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        selectText().click();
        selectListPosition()
          .should("have.attr", "data-floating-placement", position)
          .and("be.visible");
      }
    );

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
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

        selectText().click();
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
          <stories.SimpleSelectComponent
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        selectText().click();
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
            <stories.SimpleSelectComponent disablePortal={state} />
          </div>
        );

        selectText().click();
        selectDataComponent("simple")
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should have correct hover state of list option", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      const optionValue3 = "Blue";

      selectText().click();
      selectListText(optionValue3)
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });

    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);
      selectInput().should("have.css", "border-radius", "4px");
      selectListWrapper().should("have.css", "border-radius", "4px");
    });
  });

  describe("check height of Select list when opened", () => {
    it("should not cut off any text with long option text", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithLongWrappingTextComponent />
      );

      selectText().click();
      selectListWrapper()
        .should("have.css", "height", "152px")
        .and("be.visible");
    });

    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);
      selectInput().should("have.css", "border-radius", "4px");
      selectListWrapper().should("have.css", "border-radius", "4px");
    });
  });

  describe("check events for SimpleSelect component", () => {
    it("should call onChange event when a list option is selected", () => {
      const callback: SimpleSelectProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(
        <stories.SimpleSelectEventsComponent onChange={callback} />
      );

      const position = "first";

      selectText().click();
      selectOption(positionOfElement(position)).click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onBlur event when the list is closed", () => {
      const callback: SimpleSelectProps["onBlur"] = cy.stub().as("onBlur");
      CypressMountWithProviders(
        <stories.SimpleSelectComponent onBlur={callback} />
      );

      selectText().click();
      commonDataElementInputPreview().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onClick event when mouse is clicked on text input", () => {
      const callback: SimpleSelectProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(
        <stories.SimpleSelectComponent onClick={callback} />
      );

      commonDataElementInputPreview().realClick();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onOpen when SimpleSelect is opened", () => {
      const callback: SimpleSelectProps["onOpen"] = cy.stub().as("onOpen");
      CypressMountWithProviders(
        <stories.SimpleSelectComponent onOpen={callback} />
      );

      commonDataElementInputPreview().realClick();
      cy.get("@onOpen").should("have.been.calledOnce");
    });

    it("should call onFocus when SimpleSelect is brought into focus", () => {
      const callback: SimpleSelectProps["onFocus"] = cy.stub().as("onFocus");
      CypressMountWithProviders(
        <stories.SimpleSelectComponent onFocus={callback} />
      );

      commonDataElementInputPreview().focus();
      cy.get("@onFocus").should("have.been.calledOnce");
    });

    it.each([keyToTrigger[0], keyToTrigger[1]])(
      "should call onKeyDown event when %s key is pressed",
      (key) => {
        const callback: SimpleSelectProps["onKeyDown"] = cy
          .stub()
          .as("onKeyDown");
        CypressMountWithProviders(
          <stories.SimpleSelectComponent onKeyDown={callback} />
        );

        commonDataElementInputPreview()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true });
        cy.get("@onKeyDown").should("have.been.calledOnce");
      }
    );
  });

  describe("check virtual scrolling", () => {
    it("renders only an appropriate number of options into the DOM when first opened", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithManyOptionsAndVirtualScrolling />
      );

      selectText().click();

      selectOptionByText("Option 1.").should("be.visible");
      selectOptionByText("Option 10.").should("exist").and("not.be.visible");
      selectOptionByText("Option 30.").should("not.exist");
    });

    it("changes the rendered options when you scroll down", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithManyOptionsAndVirtualScrolling />
      );

      selectText().click();
      selectListWrapper().scrollTo(0, 750).wait(250);

      selectOptionByText("Option 1.").should("not.exist");
      selectOptionByText("Option 20.").should("be.visible");
      selectOptionByText("Option 30.").should("exist").and("not.be.visible");
      selectOptionByText("Option 40.").should("not.exist");
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when Select is closed by pressing an escape key", () => {
      CypressMountWithProviders(<stories.SimpleSelectNestedInDialog />);

      selectText().click();
      commonDataElementInputPreview().type("{esc}", { force: true });
      selectList().should("not.be.visible");
      alertDialogPreview().should("exist");

      commonDataElementInputPreview().type("{esc}", { force: true });
      alertDialogPreview().should("not.exist");
    });

    it("should not refocus the select textbox when closing it by clicking outside", () => {
      CypressMountWithProviders(<stories.SimpleSelectNestedInDialog />);

      selectText().click();
      body().click();

      selectList().should("not.be.visible");
      commonDataElementInputPreview().should("not.be.focused");
    });
  });

  describe("Accessibility tests for SimpleSelect component", () => {
    it("should pass accessibilty tests for SimpleSelect", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent />);

      dropdownButton().click();
      cy.checkAccessibility();
    });

    it.each(testData)(
      "should pass accessibilty tests for SimpleSelect label prop using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent label={labelValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for SimpleSelect labelHelp prop using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon()
          .trigger("mouseover")
          .then(() => cy.checkAccessibility());
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for SimpleSelect placeholder prop using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent placeholder={placeholderValue} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ] as [SimpleSelectProps["tooltipPosition"], string, string, string, string][])(
      "should pass accessibilty tests for SimpleSelect tooltip prop in the %s position",
      (tooltipPositionValue, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
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

    it("should pass accessibilty tests for SimpleSelect disabled prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect readOnly prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent readOnly />);

      cy.checkAccessibility();
      selectText().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect transparent prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent transparent />);

      cy.checkAccessibility();
    });

    it.each([
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
    ] as SimpleSelectProps["size"][])(
      "should pass accessibilty tests for SimpleSelect size prop",
      (size) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent size={size} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for SimpleSelect autoFocus prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent autoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect required prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent required />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect labelInline prop", () => {
      CypressMountWithProviders(<stories.SimpleSelectComponent labelInline />);

      cy.checkAccessibility();
    });

    it.each(["right", "left"] as SimpleSelectProps["labelAlign"][])(
      "should pass accessibilty tests for SimpleSelect labelAlign prop set as %s",
      (alignment) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent labelInline labelAlign={alignment} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      [10, 90],
      [30, 70],
      [80, 20],
    ])(
      "should pass accessibilty tests for SimpleSelect labelWidth prop set as %s and inputWidth set as %s",
      (label, input) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should pass accessibilty tests for SimpleSelect maxWidth prop set as %s",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent maxWidth={maxWidth} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibilty tests for SimpleSelect isLoading prop", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithLazyLoadingComponent />
      );

      selectText().click();
      loader(1).should("be.visible");
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect onListScrollBottom prop", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithInfiniteScrollComponent />
      );

      selectText().click();
      cy.checkAccessibility();
      selectListWrapper().scrollTo("bottom");
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect with multiple columns", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectMultipleColumnsComponent label="multiple columns" />
      );

      commonDataElementInputPreview().trigger("keydown", {
        ...keyCode("downarrow"),
        force: true,
      });
      commonDataElementInputPreview().focus();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect with object as value", () => {
      CypressMountWithProviders(<stories.SimpleSelectObjectAsValueComponent label="with object as value" />);

      selectText().click();
      selectOption(positionOfElement("first")).click();
      cy.checkAccessibility();
    });

    it.each(["1", "2", "3"])(
      "should pass accessibilty tests for SimpleSelect with custom option %s icon and custom icon color %s",
      (option) => {
        CypressMountWithProviders(
          <stories.SimpleSelectCustomOptionChildrenComponent />
        );

        selectText().click();
        selectListCustomChild(option).then(() => cy.checkAccessibility());
      }
    );

    it("should pass accessibilty tests for SimpleSelect group component", () => {
      CypressMountWithProviders(<stories.SimpleSelectGroupComponent label="groups" />);

      selectText().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect listMaxHeight prop", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectComponent listMaxHeight={200} />
      );

      selectText().click();
      cy.checkAccessibility();
    });

    it.each([
      ["top", "300px", "0px", "200px", "20px"],
      ["bottom", "0px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "500px", "20px"],
      ["right", "200px", "0px", "0px", "500px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][])(
      "should pass accessibilty tests for SimpleSelect listPlacement prop",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
            listPlacement={position}
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        selectText().click();
        cy.checkAccessibility();
      }
    );

    it.each([
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "20px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][])(
      "should pass accessibilty tests for SimpleSelect flipEnabled prop",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <stories.SimpleSelectComponent
            listPlacement={position}
            flipEnabled
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        selectText().click();
        cy.checkAccessibility();
      }
    );

    // FE-5764
    it.skip("should pass accessibilty tests for SimpleSelect disablePortal prop", () => {
      CypressMountWithProviders(
        <div>
          <stories.SimpleSelectComponent disablePortal />
        </div>
      );

      selectText()
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for SimpleSelect with long option text", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithLongWrappingTextComponent />
      );

      selectText().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect with virtual scrolling", () => {
      CypressMountWithProviders(
        <stories.SimpleSelectWithManyOptionsAndVirtualScrolling />
      );

      selectText().click();
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for SimpleSelect in nested dialog", () => {
      CypressMountWithProviders(<stories.SimpleSelectNestedInDialog />);

      selectText().click();
      cy.checkAccessibility();
    });
  });
});
