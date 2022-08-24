import * as React from "react";
import FilterableSelect from "./filterable-select.component";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import Button from "../../button/button.component";
import Dialog from "../../dialog/dialog.component";
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
  selectDataComponent,
  selectElementInput,
  selectInput,
  filterableSelectAddElementButton,
  filterableSelectButtonIcon,
  filterableSelectAddNewButton,
  filterableSelectResetButton,
  boldedAndUnderlinedValue,
  multiColumnsSelectListNoResultsMessage,
} from "../../../../cypress/locators/select";

import { loader } from "../../../../cypress/locators/loader";

import { verifyRequiredAsteriskForLabel } from "../../../../cypress/support/component-helper/common-steps";

import { keyCode, positionOfElement } from "../../../../cypress/support/helper";

import { alertDialogPreview } from "../../../../cypress/locators/dialog";

const FilterableSelectComponent = ({ ...props }) => {
  const [value, setValue] = React.useState("");

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <FilterableSelect
      label="filterable select"
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
    </FilterableSelect>
  );
};

const FilterableSelectWithLazyLoadingComponent = ({ ...props }) => {
  const preventLoading = React.useRef(false);
  const [value, setValue] = React.useState("black");
  const [isLoading, setIsLoading] = React.useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = React.useState([
    <Option text="Black" value="black" key="Black" />,
  ]);

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
    <FilterableSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </FilterableSelect>
  );
};

const FilterableSelectLazyLoadTwiceComponent = ({ ...props }) => {
  const preventLoading = React.useRef(false);
  const [value, setValue] = React.useState("");
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
      <FilterableSelect
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        {...props}
      >
        {optionList}
      </FilterableSelect>
    </div>
  );
};

const FilterableSelectWithInfiniteScrollComponent = ({ ...props }) => {
  const preventLoading = React.useRef(false);
  const preventLazyLoading = React.useRef(false);
  const lazyLoadingCounter = React.useRef(0);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];

  const getLazyLoaded = () => {
    const counter = lazyLoadingCounter.current;
    return [
      <Option
        text={`Lazy Loaded A${counter}`}
        value={`lazyA${counter}`}
        key={`lazyA${counter}`}
      />,
      <Option
        text={`Lazy Loaded B${counter}`}
        value={`lazyB${counter}`}
        key={`lazyB${counter}`}
      />,
      <Option
        text={`Lazy Loaded C${counter}`}
        value={`lazyC${counter}`}
        key={`lazyC${counter}`}
      />,
    ];
  };

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

  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }

    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setIsLoading(false);
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
    }, 2000);
  }

  return (
    <FilterableSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      onListScrollBottom={onLazyLoading}
      {...props}
    >
      {optionList}
    </FilterableSelect>
  );
};

const FilterableSelectObjectAsValueComponent = ({ ...props }) => {
  const [value, setValue] = React.useState({
    id: "Green",
    value: 5,
    text: "Green",
  });
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
    <FilterableSelect value={value} onChange={onChangeHandler} {...props}>
      {optionList.current}
    </FilterableSelect>
  );
};

const FilterableSelectMultiColumnsComponent = ({ ...props }) => {
  return (
    <FilterableSelect
      multiColumn
      defaultValue="2"
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
    </FilterableSelect>
  );
};

const FilterableSelectMultiColumnsNestedComponent = ({ ...props }) => {
  return (
    <FilterableSelect
      multiColumn
      defaultValue="2"
      {...props}
      tableHeader={
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Occupation</th>
        </tr>
      }
      listActionButton={
        <Button iconType="add" iconPosition="after">
          Add a New Element
        </Button>
      }
      onListAction={() => console.log("Action")}
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
    </FilterableSelect>
  );
};

const FilterableSelectWithActionButtonComponent = () => {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [optionList, setOptionList] = React.useState([
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ]);

  function addNew() {
    const counter = optionList.length.toString();
    setOptionList((newOptionList) => [
      ...newOptionList,
      <Option
        text={`New${counter}`}
        value={`val${counter}`}
        key={`New${counter}`}
      />,
    ]);
    setIsOpen(false);
    setValue(`val${counter}`);
  }

  return (
    <>
      <FilterableSelect
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Add a New Element
          </Button>
        }
        onListAction={() => setIsOpen(true)}
      >
        {optionList}
      </FilterableSelect>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Dialog component triggered on action"
      >
        <Button onClick={addNew}>Add new</Button>
      </Dialog>
    </>
  );
};

const FilterableSelectOnChangeEventComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }) => {
    setState(target.value.rawValue);
    if (onChange) {
      onChange(target);
    }
  };

  return (
    <FilterableSelect
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
    </FilterableSelect>
  );
};

const FilterableSelectListActionEventComponent = ({ ...props }) => {
  const [value, setValue] = React.useState("");

  return (
    <FilterableSelect
      label="color"
      value={value}
      labelInline
      onChange={(event) => setValue(event.target.value)}
      {...props}
      listActionButton={
        <Button iconType="add" iconPosition="after">
          Add a New Element
        </Button>
      }
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
    </FilterableSelect>
  );
};

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testPropValue = "cypress_test";
const addElementText = "Add a New Element";
const columns = 3;
const icon = "add";

context("Tests for Filterable Select component", () => {
  describe("check props for Filterable Select component", () => {
    it.each(testData)(
      "should render Filterable Select label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(
          <FilterableSelectComponent label={labelValue} />
        );

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <FilterableSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <FilterableSelectComponent placeholder={placeholderValue} />
        );

        selectInput().should("have.attr", "placeholder", placeholderValue);
      }
    );

    it("should render Filterable Select with name prop set to test value", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent name={testPropValue} />
      );

      commonDataElementInputPreview().should(
        "have.attr",
        "name",
        testPropValue
      );
    });

    it("should render Filterable Select with id prop prop set to test value", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent id={testPropValue} />
      );

      commonDataElementInputPreview().should("have.attr", "id", testPropValue);
    });

    it("should render Filterable Select with data-component prop set to test value", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Filterable Select with data-element prop set to test value", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render Filterable Select with data-role prop set to test value", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent data-role={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-role", testPropValue);
    });

    it.each([["top"], ["bottom"], ["left"], ["right"]])(
      "should render the help tooltip in the %s position",
      (tooltipPositionValue) => {
        CypressMountWithProviders(
          <FilterableSelectComponent
            labelHelp="Help"
            tooltipPosition={tooltipPositionValue}
          />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview()
          .should("be.visible")
          .and("have.css", tooltipPositionValue);
      }
    );

    it("should check Filterable Select is disabled", () => {
      CypressMountWithProviders(<FilterableSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render Filterable Select as read only", () => {
      CypressMountWithProviders(<FilterableSelectComponent readOnly />);

      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectInput().click();
      selectList().should("not.exist");
    });

    it.each([
      ["small", "32px"],
      ["medium", "40px"],
      ["large", "48px"],
    ])(
      "should use %s as size and render Filterable Select with %s as height",
      (size, height) => {
        CypressMountWithProviders(<FilterableSelectComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it("should check Filterable Select has autofocus", () => {
      CypressMountWithProviders(<FilterableSelectComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check Filterable Select is required", () => {
      CypressMountWithProviders(<FilterableSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check Filterable Select label is inline", () => {
      CypressMountWithProviders(<FilterableSelectComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["inline", "399"],
      ["inline", "400"],
      ["above", "401"],
    ])(
      "should check Filterable Select label is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (alignment, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <FilterableSelectComponent
            labelInline
            adaptiveLabelBreakpoint={breakpoint}
          />
        );

        if (alignment === "inline") {
          getDataElementByValue("label")
            .parent()
            .parent()
            .should("have.css", "display", "flex");
        } else {
          getDataElementByValue("label")
            .parent()
            .parent()
            .should("have.css", "display", "block");
        }
      }
    );

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <FilterableSelectComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each([
      ["10", "90", "135px", "1215px"],
      ["30", "70", "405px", "945px"],
      ["80", "20", "1080px", "270px"],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <FilterableSelectComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "width", labelRatio);

        getDataElementByValue("input")
          .parent()
          .should("have.css", "width", inputRatio);
      }
    );

    it("should not open the list with focus on Filterable Select input", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      commonDataElementInputPreview().focus();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
    });

    it("should not open the list with mouse click on Filterable Select input", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      commonDataElementInputPreview().click();
      commonDataElementInputPreview()
        .should("be.focused")
        .and("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
    });

    it("should close the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      dropdownButton().click();
      dropdownButton().click();
      selectList().should("not.exist");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      selectInput().tab();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      selectInput().trigger("keydown", { ...keyCode("Esc") });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      body().click({ force: true });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
    });

    it.each([
      ["open", "downarrow"],
      ["open", "uparrow"],
      ["open", "Home"],
      ["open", "End"],
      ["not open", "Enter"],
    ])(
      "should %s the list when %s is pressed with Filterable Select input in focus",
      (state, key) => {
        CypressMountWithProviders(<FilterableSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().trigger("keydown", { ...keyCode(key), force: true });
        if (state === "open") {
          selectList().should("be.visible");
        } else {
          selectList().should("not.exist");
        }
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list",
      (option) => {
        CypressMountWithProviders(<FilterableSelectComponent />);

        dropdownButton().click();
        selectListText(option).click();
        getDataElementByValue("input").should("have.attr", "value", option);
        selectInput().should("have.attr", "aria-expanded", "false");
        selectList().should("not.exist");
      }
    );

    it.each([
      ["A", "Amber", "Black", "Orange"],
      ["O", "Brown", "Orange", "Yellow"],
    ])(
      "should filter options when %s is typed",
      (text, optionValue1, optionValue2, optionValue3) => {
        CypressMountWithProviders(<FilterableSelectComponent />);

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
          .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
          .and("be.visible");
      }
    );

    it("should render the lazy loader when the prop is set", () => {
      CypressMountWithProviders(<FilterableSelectWithLazyLoadingComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    // FE-5300 raised to fix the issue with the loader not reappeearing
    it.skip("should render the lazy loader when the prop is set and list is opened again", () => {
      CypressMountWithProviders(<FilterableSelectLazyLoadTwiceComponent />);

      const option = "Amber";

      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(option).should("be.visible");
      dropdownButton().click();
      filterableSelectResetButton().click({ force: true });
      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render a lazy loaded option when the infinite scroll prop is set", () => {
      CypressMountWithProviders(
        <FilterableSelectWithInfiniteScrollComponent />
      );

      const option = "Lazy Loaded A1";

      dropdownButton().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectList().scrollTo("bottom").wait(250);
      selectList().scrollTo("bottom");
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
      selectListText(option).should("be.visible");
    });

    it("should list options when value is set and select list is opened again", () => {
      CypressMountWithProviders(<FilterableSelectComponent />);

      const option = "Amber";
      const count = 11;

      dropdownButton().click();
      selectListText(option).click();
      getDataElementByValue("input").should("have.attr", "value", option);
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.exist");
      dropdownButton().click();
      selectList()
        .find("li")
        .should(($lis) => {
          expect($lis).to.have.length(count);
        });
    });

    it("should check list is open when input is focussed and openOnFocus is set", () => {
      CypressMountWithProviders(<FilterableSelectComponent openOnFocus />);

      commonDataElementInputPreview().focus();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
    });

    it("should check list is open when input is clicked and openOnFocus is set", () => {
      CypressMountWithProviders(<FilterableSelectComponent openOnFocus />);

      commonDataElementInputPreview().click();
      selectInput().should("have.attr", "aria-expanded", "true");
      selectList().should("be.visible");
    });

    it("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(<FilterableSelectObjectAsValueComponent />);

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

    it.each([
      ["top", "0px", "0px", "0px", "0px"],
      ["bottom", "600px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "0px"],
    ])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <FilterableSelectComponent
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
          .should("have.attr", "data-popper-placement", flipPosition)
          .and("be.visible");
      }
    );

    it.each([
      ["bottom", "0px", "0px", "0px", "0px"],
      ["top", "600px", "0px", "0px", "0px"],
      ["right", "200px", "0px", "0px", "900px"],
      ["left", "600px", "0px", "900px", "0px"],
    ])(
      "should render list in %s position with the most space when listPosition is set to auto",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <FilterableSelectComponent
            listPlacement="auto"
            mt={top}
            mb={bottom}
            ml={left}
            mr={right}
          />
        );

        dropdownButton().click();
        selectListPosition()
          .should("have.attr", "data-popper-placement", position)
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
            <FilterableSelectComponent disablePortal={state} />
          </div>
        );

        dropdownButton().click();
        selectDataComponent("filterable")
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should render list options with multiple columns", () => {
      CypressMountWithProviders(<FilterableSelectMultiColumnsComponent />);

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
        "rgb(153, 173, 183)"
      );
    });

    it("should check table header content in list with multiple columns", () => {
      CypressMountWithProviders(<FilterableSelectMultiColumnsComponent />);

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
      CypressMountWithProviders(<FilterableSelectMultiColumnsComponent />);

      const text = "Do";

      commonDataElementInputPreview().click().should("be.focused");
      commonDataElementInputPreview().type(text);
      boldedAndUnderlinedValue(text)
        .should("have.css", "text-decoration-line", "underline")
        .and("have.css", "text-decoration-style", "solid")
        .and("have.css", "font-weight", "700");
    });

    it("should indicate no results match entered string", () => {
      CypressMountWithProviders(<FilterableSelectMultiColumnsComponent />);

      const text = "Xyz";

      commonDataElementInputPreview().click().should("be.focused");
      commonDataElementInputPreview().type(text);
      selectList().should("be.visible");
      multiColumnsSelectListHeader()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListNoResultsMessage(text).should("be.visible");
    });

    it("should render list options with multiple columns and nested component", () => {
      CypressMountWithProviders(
        <FilterableSelectMultiColumnsNestedComponent />
      );

      dropdownButton().click();
      selectList().should("be.visible");
      multiColumnsSelectListHeader()
        .should("have.length", columns)
        .and("be.visible");
      multiColumnsSelectListBody()
        .should("have.length", columns)
        .and("be.visible");
      filterableSelectAddElementButton()
        .should("be.visible")
        .and("have.text", addElementText);
      filterableSelectButtonIcon()
        .should("be.visible")
        .and("have.attr", "type", icon);
    });

    it("should render list options with an action button and trigger Dialog on action", () => {
      CypressMountWithProviders(<FilterableSelectWithActionButtonComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
      filterableSelectAddElementButton()
        .should("be.visible")
        .and("have.text", addElementText);
      filterableSelectButtonIcon()
        .should("be.visible")
        .and("have.attr", "type", icon);
      filterableSelectAddElementButton().click();
      alertDialogPreview().should("be.visible");
    });

    it("should add new list option from Add new Dialog", () => {
      CypressMountWithProviders(<FilterableSelectWithActionButtonComponent />);

      const newOption = "New5";

      dropdownButton().click();
      selectList().should("be.visible");
      filterableSelectAddElementButton().should("be.visible").click();
      alertDialogPreview().should("be.visible");
      filterableSelectAddNewButton().should("be.visible").click();
      getDataElementByValue("input").should("have.attr", "value", newOption);
    });
  });

  describe("check events for Filterable Select component", () => {
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick event when mouse is clicked on text input", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent onClick={callback} />
      );

      dropdownButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus when Filterable Select is brought into focus", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent onFocus={callback} />
      );

      commonDataElementInputPreview()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onOpen when Filterable Select is opened", () => {
      CypressMountWithProviders(
        <FilterableSelectComponent onOpen={callback} />
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
        <FilterableSelectComponent onBlur={callback} />
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
        <FilterableSelectOnChangeEventComponent onChange={callback} />
      );

      const position = "first";

      dropdownButton().click();
      selectOption(positionOfElement(position))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["downarrow"], ["uparrow"]])(
      "should call onKeyDown event when %s key is pressed",
      (key) => {
        CypressMountWithProviders(
          <FilterableSelectComponent onKeyDownEnabled onKeyDown={callback} />
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
        <FilterableSelectOnChangeEventComponent onChange={callback} />
      );

      const text = "B";

      commonDataElementInputPreview()
        .click()
        .type(text)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onListAction event when the Action Button is clicked", () => {
      CypressMountWithProviders(
        <FilterableSelectListActionEventComponent onListAction={callback} />
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
        <FilterableSelectComponent onListScrollBottom={callback} />
      );

      dropdownButton().click();
      selectList()
        .scrollTo("bottom")
        .wait(250)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
