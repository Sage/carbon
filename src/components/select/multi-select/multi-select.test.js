import React from "react";
import MultiSelect from "./multi-select.component";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import Button from "../../button/button.component";
import CypressMountWithProviders from "../../../../cypress/support/component-helper/cypress-mount";

import {
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  body,
} from "../../../../cypress/locators";

import {
  selectList,
  selectOption,
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
} from "../../../../cypress/locators/select";

import { pillCloseIcon } from "../../../../cypress/locators/pill";

import { loader } from "../../../../cypress/locators/loader";

import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLabel,
} from "../../../../cypress/support/component-helper/common-steps";

import { keyCode, positionOfElement } from "../../../../cypress/support/helper";
import {
  SIZE,
  CHARACTERS,
} from "../../../../cypress/support/component-helper/constants";

const MultiSelectComponent = ({ ...props }) => {
  const [value, setValue] = React.useState([]);

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <MultiSelect
      label="color"
      labelInline
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </MultiSelect>
  );
};

const MultiSelectDefaultValueComponent = ({ ...props }) => {
  return (
    <MultiSelect label="color" labelInline {...props}>
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </MultiSelect>
  );
};

const MultiSelectLongPillComponent = ({ ...props }) => {
  const [value, setValue] = React.useState([]);

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <div
      style={{
        maxWidth: "200px",
      }}
    >
      <MultiSelect
        label="color"
        labelInline
        value={value}
        onChange={onChangeHandler}
        {...props}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue as the sky on a summer's day" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green as the grass in a spring meadow" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </MultiSelect>
    </div>
  );
};

const MultiSelectWithLazyLoadingComponent = ({ ...props }) => {
  const preventLoading = React.useRef(false);
  const [value, setValue] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = React.useState([]);

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }

  return (
    <MultiSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </MultiSelect>
  );
};

const MultiSelectLazyLoadTwiceComponent = ({ ...props }) => {
  const preventLoading = React.useRef(false);
  const [value, setValue] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = React.useState([]);

  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }

  function clearData() {
    setOptionList([]);
    setValue("");
    preventLoading.current = false;
  }

  return (
    <div>
      <Button onClick={clearData} mb={2} data-element="reset-button">
        reset
      </Button>
      <MultiSelect
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        {...props}
      >
        {optionList}
      </MultiSelect>
    </div>
  );
};

const MultiSelectObjectAsValueComponent = ({ ...props }) => {
  const [value, setValue] = React.useState([
    {
      id: "Green",
      value: 5,
      text: "Green",
    },
  ]);
  const optionList = React.useRef([
    <Option
      text="Amber"
      key="Amber"
      value={{
        id: "Amber",
        value: 1,
        text: "Amber",
      }}
    />,
    <Option
      text="Black"
      key="Black"
      value={{
        id: "Black",
        value: 2,
        text: "Black",
      }}
    />,
    <Option
      text="Blue"
      key="Blue"
      value={{
        id: "Blue",
        value: 3,
        text: "Blue",
      }}
    />,
    <Option
      text="Brown"
      key="Brown"
      value={{
        id: "Brown",
        value: 4,
        text: "Brown",
      }}
    />,
    <Option
      text="Green"
      key="Green"
      value={{
        id: "Green",
        value: 5,
        text: "Green",
      }}
    />,
    <Option
      text="Orange"
      key="Orange"
      value={{
        id: "Orange",
        value: 6,
        text: "Orange",
      }}
    />,
    <Option
      text="Pink"
      key="Pink"
      value={{
        id: "Pink",
        value: 7,
        text: "Pink",
      }}
    />,
    <Option
      text="Purple"
      key="Purple"
      value={{
        id: "Purple",
        value: 8,
        text: "Purple",
      }}
    />,
    <Option
      text="Red"
      key="Red"
      value={{
        id: "Red",
        value: 9,
        text: "Red",
      }}
    />,
    <Option
      text="White"
      key="White"
      value={{
        id: "White",
        value: 10,
        text: "White",
      }}
    />,
    <Option
      text="Yellow"
      key="Yellow"
      value={{
        id: "Yellow",
        value: 11,
        text: "Yellow",
      }}
    />,
  ]);

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <MultiSelect value={value} onChange={onChangeHandler} {...props}>
      {optionList.current}
    </MultiSelect>
  );
};

const MultiSelectMultiColumnsComponent = ({ ...props }) => {
  return (
    <MultiSelect
      multiColumn
      defaultValue={["2"]}
      {...props}
      tableHeader={
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Occupation</th>
        </tr>
      }
    >
      <OptionRow value="1" text="John Doe">
        <td>John</td>
        <td>Doe</td>
        <td>Welder</td>
      </OptionRow>
      <OptionRow value="2" text="Joe Vick">
        <td>Joe</td>
        <td>Vick</td>
        <td>Accountant</td>
      </OptionRow>
      <OptionRow value="3" text="Jane Poe">
        <td>Jane</td>
        <td>Poe</td>
        <td>Accountant</td>
      </OptionRow>
      <OptionRow value="4" text="Jill Moe">
        <td>Jill</td>
        <td>Moe</td>
        <td>Engineer</td>
      </OptionRow>
      <OptionRow value="5" text="Bill Zoe">
        <td>Bill</td>
        <td>Zoe</td>
        <td>Astronaut</td>
      </OptionRow>
    </MultiSelect>
  );
};

const MultiSelectMaxOptionsComponent = ({ ...props }) => {
  const maxSelectionsAllowed = 2;
  const [selectedPills, setSelectedPills] = React.useState([]);

  function onChangeHandler(event) {
    if (event.target.value.length <= maxSelectionsAllowed) {
      setSelectedPills(event.target.value);
    }
  }

  return (
    <MultiSelect
      value={selectedPills}
      onChange={onChangeHandler}
      disablePortal
      openOnFocus
      label="color"
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </MultiSelect>
  );
};

const MultiSelectOnFilterChangeEventComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }) => {
    setState(target.value.rawValue);
    if (onChange) {
      onChange(target);
    }
  };

  return (
    <MultiSelect
      label="color"
      value={state}
      labelInline
      onChange={setValue}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
    </MultiSelect>
  );
};

const MultiSelectCustomColorComponent = ({ ...props }) => {
  return (
    <MultiSelect label="color" labelInline defaultValue={["1", "3"]} {...props}>
      <Option text="Amber" value="1" borderColor="#FFBF00" fill />
      <Option text="Black" value="2" borderColor="blackOpacity65" fill />
      <Option text="Blue" value="3" borderColor="productBlue" />
      <Option text="Brown" value="4" borderColor="brown" fill />
      <Option text="Green" value="5" borderColor="productGreen" />
      <Option text="Orange" value="6" borderColor="orange" />
      <Option text="Pink" value="7" borderColor="pink" />
      <Option text="Purple" value="8" borderColor="purple" />
      <Option text="Red" value="9" borderColor="red" fill />
      <Option text="White" value="10" borderColor="white" />
      <Option text="Yellow" value="11" borderColor="yellow" fill />
    </MultiSelect>
  );
};

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const columns = 3;
const option1 = "Green";
const option2 = "Purple";
const option3 = "Yellow";
const defaultValue = ["10"];

context("Tests for Multi Select component", () => {
  describe("check props for Multi Select component", () => {
    it.each(testData)(
      "should render Multi Select label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(<MultiSelectComponent label={labelValue} />);

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <MultiSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <MultiSelectComponent placeholder={placeholderValue} />
        );

        selectInput().should("have.attr", "placeholder", placeholderValue);
      }
    );

    it("should render Multi Select with name prop set to test value", () => {
      CypressMountWithProviders(<MultiSelectComponent name={testPropValue} />);

      commonDataElementInputPreview().should(
        "have.attr",
        "name",
        testPropValue
      );
    });

    it("should render Multi Select with id prop set to test value", () => {
      CypressMountWithProviders(<MultiSelectComponent id={testPropValue} />);

      commonDataElementInputPreview().should("have.attr", "id", testPropValue);
    });

    it("should render Multi Select with data-component prop set to test value", () => {
      CypressMountWithProviders(
        <MultiSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Multi Select with data-element prop set to test value", () => {
      CypressMountWithProviders(
        <MultiSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render Multi Select with data-role prop set to test value", () => {
      CypressMountWithProviders(
        <MultiSelectComponent data-role={testPropValue} />
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
          <MultiSelectComponent
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

    it("should check Multi Select is disabled", () => {
      CypressMountWithProviders(<MultiSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render Multi Select as read only", () => {
      CypressMountWithProviders(<MultiSelectComponent readOnly />);

      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectInput().click();
      selectList().should("not.be.visible");
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ])(
      "should use %s as size and render Multi Select with %s as height",
      (size, height) => {
        CypressMountWithProviders(<MultiSelectComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "min-height", height);
          });
      }
    );

    it("should check Multi Select has autofocus", () => {
      CypressMountWithProviders(<MultiSelectComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check Multi Select is required", () => {
      CypressMountWithProviders(<MultiSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check Multi Select label is inline", () => {
      CypressMountWithProviders(<MultiSelectComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["flex", "399"],
      ["flex", "400"],
      ["block", "401"],
    ])(
      "should check Multi Select label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <MultiSelectComponent
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
          <MultiSelectComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each([
      ["10", "90", 135, 1229],
      ["30", "70", 409, 954],
      ["80", "20", 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <MultiSelectComponent
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
      "should check maxWidth as %s for MultiSelect component",
      (maxWidth) => {
        CypressMountWithProviders(<MultiSelectComponent maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<MultiSelectComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should not open the list with focus on Multi Select input", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      commonDataElementInputPreview().focus();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should not open the list with mouse click on Multi Select input", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      commonDataElementInputPreview().click();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
    });

    it("should close the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      dropdownButton().click();
      selectList().should("not.be.visible");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      selectInput().tab();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      selectInput().trigger("keydown", { ...keyCode("Esc") });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      body().click({ force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it.each([
      ["open", "downarrow"],
      ["open", "uparrow"],
      ["open", "Home"],
      ["open", "End"],
      ["not open", "Enter"],
    ])(
      "should %s the list when %s is pressed with Multi Select input in focus",
      (state, key) => {
        CypressMountWithProviders(<MultiSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().trigger("keydown", { ...keyCode(key), force: true });
        if (state === "open") {
          selectList().should("be.visible");
        } else {
          selectList().should("not.be.visible");
        }
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list and create option pill in the input",
      (option) => {
        CypressMountWithProviders(<MultiSelectComponent />);

        dropdownButton().click();
        selectListText(option).click();
        selectInput().should("have.attr", "aria-expanded", "true");
        selectList().should("be.visible");
        multiSelectPill().should("have.attr", "title", option);
      }
    );

    it("should select two options and create option pills in the input", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
      multiSelectPill().should("have.attr", "title", option1);
      selectListText(option2).click();
      multiSelectPillByPosition(0).should("have.attr", "title", option1);
      multiSelectPillByPosition(1).should("have.attr", "title", option2);
    });

    it("should check number of selected options are limited to 2", () => {
      CypressMountWithProviders(<MultiSelectMaxOptionsComponent />);

      const length = 2;

      dropdownButton().click();
      selectListText(option1).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
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
        CypressMountWithProviders(<MultiSelectComponent />);

        commonDataElementInputPreview().type(text);
        selectInput().should("have.attr", "aria-expanded", "true");
        selectList().should("be.visible");
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
      CypressMountWithProviders(<MultiSelectWithLazyLoadingComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render the lazy loader when the prop is set and list is opened again", () => {
      CypressMountWithProviders(<MultiSelectLazyLoadTwiceComponent />);

      const option = "Amber";

      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(option).should("be.visible");
      dropdownButton().click();
      selectResetButton().click({ force: true });
      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should list options when value is set and select list is opened again", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      const option = "Amber";
      const count = 11;

      dropdownButton().click();
      selectListText(option).click();
      multiSelectPill().should("have.attr", "title", option);
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
      dropdownButton().click().click();
      selectList()
        .find("li")
        .should(($lis) => {
          expect($lis).to.have.length(count);
        });
    });

    it("should check list is open when input is focussed and openOnFocus is set", () => {
      CypressMountWithProviders(<MultiSelectComponent openOnFocus />);

      commonDataElementInputPreview().focus();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
    });

    it("should check list is open when input is clicked and openOnFocus is set", () => {
      CypressMountWithProviders(<MultiSelectComponent openOnFocus />);

      commonDataElementInputPreview().click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
    });

    // FE-5332 logged for bug in master preventing editing of pills when object set as value
    it.skip("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(<MultiSelectObjectAsValueComponent />);

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
    ])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <MultiSelectComponent
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
          <MultiSelectComponent mt={top} mb={bottom} ml={left} mr={right} />
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
            <MultiSelectComponent disablePortal={state} />
          </div>
        );

        dropdownButton().click();
        multiSelectDataComponent()
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should render list options with multiple columns", () => {
      CypressMountWithProviders(<MultiSelectMultiColumnsComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
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
      CypressMountWithProviders(<MultiSelectMultiColumnsComponent />);

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
      CypressMountWithProviders(<MultiSelectMultiColumnsComponent />);

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
        CypressMountWithProviders(<MultiSelectMultiColumnsComponent />);

        commonDataElementInputPreview().click().should("be.focused");
        commonDataElementInputPreview().type(text);
        selectList().should("be.visible");
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
          <MultiSelectDefaultValueComponent defaultValue={[value]} />
        );

        multiSelectPill().should("have.attr", "title", option);
      }
    );

    it("should have no pill option preselected if defaultValue prop is not set", () => {
      CypressMountWithProviders(<MultiSelectDefaultValueComponent />);

      multiSelectPill().should("not.exist");
    });

    it("should render Multi Select with custom coloured pills", () => {
      CypressMountWithProviders(<MultiSelectCustomColorComponent />);

      multiSelectPillByPosition(0)
        .should("have.css", "borderColor", "rgb(255, 191, 0)")
        .and("have.css", "background-color", "rgb(255, 191, 0)");
      multiSelectPillByPosition(1)
        .should("have.css", "borderColor", "rgb(0, 119, 200)")
        .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
    });

    it.each([
      ["third", "Blue as the sky on a summer's day"],
      ["fifth", "Green as the grass in a spring meadow"],
    ])(
      "should select %s list option and show pill with complete long text wrapped in the input",
      (option, text) => {
        CypressMountWithProviders(
          <MultiSelectLongPillComponent wrapPillText />
        );

        dropdownButton().click();
        selectOption(positionOfElement(option)).click();
        multiSelectPill().should("have.attr", "title", text);
      }
    );

    it("should show selected pill option with correctly formatted delete button when focussed", () => {
      CypressMountWithProviders(
        <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      pillCloseIcon()
        .focus()
        .should("have.css", "box-shadow", "rgb(255, 181, 0) 0px 0px 0px 3px")
        .and("have.css", "background-color", "rgb(0, 103, 56)");
    });

    it("should delete pill option with delete button", () => {
      CypressMountWithProviders(
        <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      pillCloseIcon().click();
      multiSelectPill().should("not.exist");
    });

    it("should delete pill option with backspace key", () => {
      CypressMountWithProviders(
        <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
      );

      multiSelectPill().should("have.attr", "title", "White");
      commonDataElementInputPreview().type("{backspace}");
      multiSelectPill().should("not.exist");
    });

    it("should delete all selected pill options and leave list open", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1).click();
      selectListText(option2).click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
      commonDataElementInputPreview().type("{backspace}");
      multiSelectPillByText(option2).should("not.exist");
      selectList().should("be.visible");
      commonDataElementInputPreview().type("{backspace}");
      multiSelectPill().should("not.exist");
      selectList().should("be.visible");
    });

    it("should have correct hover state of list option", () => {
      CypressMountWithProviders(<MultiSelectComponent />);

      dropdownButton().click();
      selectListText(option1)
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });
  });

  describe("check events for Multi Select component", () => {
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick event when mouse is clicked on text input", () => {
      CypressMountWithProviders(<MultiSelectComponent onClick={callback} />);

      commonDataElementInputPreview()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus when Multi Select is brought into focus", () => {
      CypressMountWithProviders(<MultiSelectComponent onFocus={callback} />);

      commonDataElementInputPreview()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onOpen when Multi Select is opened", () => {
      CypressMountWithProviders(<MultiSelectComponent onOpen={callback} />);

      dropdownButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur event when the list is closed", () => {
      CypressMountWithProviders(<MultiSelectComponent onBlur={callback} />);

      dropdownButton().click();
      selectInput()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange event when a list option is selected", () => {
      CypressMountWithProviders(<MultiSelectComponent onChange={callback} />);

      const position = "first";
      const option = ["1"];

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
          <MultiSelectComponent onKeyDown={callback} />
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
        <MultiSelectOnFilterChangeEventComponent onFilterChange={callback} />
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
  });
});
