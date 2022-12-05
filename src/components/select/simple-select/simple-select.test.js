import * as React from "react";
import SimpleSelect from "./simple-select.component";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Icon from "../../icon/icon.component";
import Box from "../../box";
import CypressMountWithProviders from "../../../../cypress/support/component-helper/cypress-mount";

import {
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  body,
} from "../../../../cypress/locators";

import {
  selectText,
  selectInput,
  selectList,
  selectListWrapper,
  selectOption,
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
} from "../../../../cypress/locators/select";

import { loader } from "../../../../cypress/locators/loader";

import { verifyRequiredAsteriskForLabel } from "../../../../cypress/support/component-helper/common-steps";

import { keyCode, positionOfElement } from "../../../../cypress/support/helper";
import {
  SIZE,
  CHARACTERS,
} from "../../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;

const SimpleSelectComponent = ({ ...props }) => {
  const [value, setValue] = React.useState("");

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      label="simple select"
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
      <Option
        text="Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night"
        value="8"
      />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

const SimpleSelectWithLazyLoadingComponent = ({ ...props }) => {
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
    <SimpleSelect
      name="isLoading"
      id="isLoading"
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </SimpleSelect>
  );
};

const SimpleSelectWithInfiniteScrollComponent = ({ ...props }) => {
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
    <SimpleSelect
      name="infiniteScroll"
      id="infiniteScroll"
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      onListScrollBottom={onLazyLoading}
      {...props}
    >
      {optionList}
    </SimpleSelect>
  );
};

const SimpleSelectObjectAsValueComponent = ({ ...props }) => {
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
    <SimpleSelect
      id="withObject"
      name="withObject"
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionList.current}
    </SimpleSelect>
  );
};

const SimpleSelectMultipleColumnsComponent = ({ ...props }) => {
  return (
    <SimpleSelect
      name="withMultipleColumns"
      id="withMultipleColumns"
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
    </SimpleSelect>
  );
};

const SimpleSelectCustomOptionChildrenComponent = ({ ...props }) => {
  return (
    <SimpleSelect
      name="customOptionChildren"
      id="customOptionChildren"
      defaultValue="4"
      disablePortal
      label="Pick your favourite color"
      {...props}
    >
      <Option text="Orange" value="1">
        <Icon type="favourite" color="orange" mr={1} /> Orange
      </Option>
      <Option text="Black" value="2">
        <Icon type="money_bag" color="black" mr={1} /> Black
      </Option>
      <Option text="Blue" value="3">
        <Icon type="gift" color="blue" mr={1} /> Blue
      </Option>
    </SimpleSelect>
  );
};

const SimpleSelectGroupComponent = ({ ...props }) => {
  return (
    <SimpleSelect name="optGroups" id="optGroups" {...props}>
      <OptionGroupHeader label="Group one" icon="individual" />
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <OptionGroupHeader label="Group two" icon="shop" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <OptionGroupHeader label="Group three" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

const SimpleSelectEventsComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }) => {
    setState(target.value.rawValue);
    if (onChange) {
      onChange(target);
    }
  };

  return (
    <SimpleSelect
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
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

const SimpleSelectWithLongWrappingTextComponent = () => (
  <Box width={400}>
    <SimpleSelect name="simple" id="simple" label="label" labelInline>
      <Option
        text="Like a lot of intelligent animals, most crows are quite social. 
        For instance, American crows spend most of the year living in pairs or small family groups.
        During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night."
        value="1"
      />
    </SimpleSelect>
  </Box>
);

context("Tests for Simple Select component", () => {
  describe("check props for Simple Select component", () => {
    it.each(testData)(
      "should render Simple Select label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(<SimpleSelectComponent label={labelValue} />);

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <SimpleSelectComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <SimpleSelectComponent placeholder={placeholderValue} />
        );

        selectText().should("have.text", placeholderValue);
      }
    );

    it("should render Simple Select with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <SimpleSelectComponent data-component={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Simple Select with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <SimpleSelectComponent data-element={testPropValue} />
      );

      selectElementInput()
        .parent()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render Simple Select with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <SimpleSelectComponent data-role={testPropValue} />
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
          <SimpleSelectComponent
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

    it("should check Simple Select is disabled", () => {
      CypressMountWithProviders(<SimpleSelectComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render Simple Select as read only", () => {
      CypressMountWithProviders(<SimpleSelectComponent readOnly />);

      selectText().click();
      commonDataElementInputPreview().should("have.attr", "readOnly");
      selectText().should("have.attr", "aria-hidden", "true");
      selectList().should("not.be.visible");
    });

    it("should render Simple Select as transparent", () => {
      CypressMountWithProviders(<SimpleSelectComponent transparent />);

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
    ])(
      "should use %s as size and render Simple Select with %s as height",
      (size, height) => {
        CypressMountWithProviders(<SimpleSelectComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it("should check Simple Select has autofocus", () => {
      CypressMountWithProviders(<SimpleSelectComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check Simple Select is required", () => {
      CypressMountWithProviders(<SimpleSelectComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check Simple Select label is inline", () => {
      CypressMountWithProviders(<SimpleSelectComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <SimpleSelectComponent labelInline labelAlign={alignment} />
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
          <SimpleSelectComponent
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

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for SimpleSelect component",
      (maxWidth) => {
        CypressMountWithProviders(
          <SimpleSelectComponent maxWidth={maxWidth} />
        );

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<SimpleSelectComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should open the list with mouse click on Select input", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      selectText().click();
      commonDataElementInputPreview().should(
        "have.attr",
        "aria-expanded",
        "true"
      );
      selectList().should("be.visible");
    });

    it("should open the list with mouse click on dropdown button", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      dropdownButton().click();
      selectList().should("be.visible");
    });

    it("should close the list with the Tab key", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      selectText().click();
      selectList().should("be.visible");
      selectInput().tab();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should close the list with the Esc key", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      selectText().click();
      selectList().should("be.visible");
      selectText().trigger("keydown", { ...keyCode("Esc") });
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it("should close the list by clicking out of the component", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      selectText().click();
      selectList().should("be.visible");
      body().realClick();
      selectInput().should("have.attr", "aria-expanded", "false");
      selectList().should("not.be.visible");
    });

    it.each([["downarrow"], ["uparrow"], ["Space"], ["Home"], ["End"]])(
      "should open the list when %s is pressed with Select input in focus",
      (key) => {
        CypressMountWithProviders(<SimpleSelectComponent />);

        commonDataElementInputPreview().focus();
        selectInput().trigger("keydown", { ...keyCode(key), force: true });
        selectList().should("be.visible");
      }
    );

    it.each([["Amber"], ["Yellow"]])(
      "should select option %s when clicked from the list",
      (option) => {
        CypressMountWithProviders(<SimpleSelectComponent />);

        selectText().click();
        selectListText(option).click();
        getDataElementByValue("input").should("have.attr", "value", option);
        selectInput().should("have.attr", "aria-expanded", "false");
        selectList().should("not.be.visible");
      }
    );

    it("should render an option that wraps onto more than one line correctly", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      const optionValue8 =
        "Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night";
      const optionValue9 = "Red";
      const optionValue10 = "White";
      const optionValue11 = "Yellow";

      selectText().click();
      selectList().should("be.visible");
      selectList().scrollTo("bottom");
      selectListText(optionValue8).should("be.visible");
      selectListText(optionValue9).should("be.visible");
      selectListText(optionValue10).should("be.visible");
      selectListText(optionValue11).should("be.visible");
    });

    it("should render the lazy loader when the prop is set", () => {
      CypressMountWithProviders(<SimpleSelectWithLazyLoadingComponent />);

      selectText().click();
      selectList().should("be.visible");
      for (let i = 0; i < 3; i++) {
        loader(i).should("be.visible");
      }
    });

    it("should render a lazy loaded option when the infinte scroll prop is set", () => {
      CypressMountWithProviders(<SimpleSelectWithInfiniteScrollComponent />);

      const option = "Lazy Loaded A1";

      selectText().click();
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

    it("should open correct list and select one when an object is already set as a value", () => {
      CypressMountWithProviders(<SimpleSelectObjectAsValueComponent />);

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
      CypressMountWithProviders(<SimpleSelectMultipleColumnsComponent />);

      const columns = 3;

      selectText().click();
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
      CypressMountWithProviders(<SimpleSelectMultipleColumnsComponent />);

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
          <SimpleSelectCustomOptionChildrenComponent />
        );

        selectText().click();
        selectList().should("be.visible");
        selectListCustomChild(option)
          .should("have.attr", "type", type)
          .and("have.attr", "color", color);
      }
    );

    it("should list option group header Group one", () => {
      CypressMountWithProviders(<SimpleSelectGroupComponent />);

      selectText().click();
      selectList().should("be.visible");
      selectListOptionGroup("1").should("have.text", "Group one");
    });

    it("should render option list with proper maxHeight value", () => {
      const maxHeight = 200;
      CypressMountWithProviders(
        <SimpleSelectComponent listMaxHeight={maxHeight} />
      );
      selectText().click();
      selectList()
        .should("have.css", "max-height", `${maxHeight}px`)
        .and("be.visible");
    });

    it.each([
      ["top", "300px", "0px", "200px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "500px", "0px"],
      ["right", "200px", "0px", "0px", "500px"],
    ])(
      "should render list in %s position when margins are top %s, bottom %s, left %s and right %s",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <SimpleSelectComponent
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
      ["top", "0px", "0px", "0px", "0px"],
      ["bottom", "600px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "0px", "900px"],
      ["right", "200px", "0px", "500px", "0px"],
    ])(
      "should flip list to opposite position when there is not enough space to render it in %s position",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <SimpleSelectComponent
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
      ["bottom", "0px", "0px", "0px", "0px"],
      ["top", "600px", "0px", "0px", "0px"],
      ["bottom", "200px", "0px", "0px", "900px"],
      ["top", "600px", "0px", "900px", "0px"],
    ])(
      "should render list in %s position with the most space when listPosition is not set",
      (position, top, bottom, left, right) => {
        CypressMountWithProviders(
          <SimpleSelectComponent mt={top} mb={bottom} ml={left} mr={right} />
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
            <SimpleSelectComponent disablePortal={state} />
          </div>
        );

        selectText().click();
        selectDataComponent("simple")
          .children()
          .should("have.length", numberOfChildren);
      }
    );

    it("should have correct hover state of list option", () => {
      CypressMountWithProviders(<SimpleSelectComponent />);

      const optionValue3 = "Blue";

      selectText().click();
      selectListText(optionValue3)
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });
  });

  describe("check height of Select list when opened", () => {
    it("should not cut off any text with long option text", () => {
      CypressMountWithProviders(<SimpleSelectWithLongWrappingTextComponent />);

      selectText().click();
      selectListWrapper()
        .should("have.css", "height", "152px")
        .and("be.visible");
    });
  });

  describe("check events for Simple Select component", () => {
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange event when a list option is selected", () => {
      CypressMountWithProviders(
        <SimpleSelectEventsComponent onChange={callback} />
      );

      const position = "first";

      selectText().click();
      selectOption(positionOfElement(position))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur event when the list is closed", () => {
      CypressMountWithProviders(<SimpleSelectComponent onBlur={callback} />);

      selectText().click();
      commonDataElementInputPreview()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick event when mouse is clicked on text input", () => {
      CypressMountWithProviders(<SimpleSelectComponent onClick={callback} />);

      commonDataElementInputPreview()
        .realClick()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onOpen when Simple Select is opened", () => {
      CypressMountWithProviders(<SimpleSelectComponent onOpen={callback} />);

      commonDataElementInputPreview()
        .realClick()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus when Simple Select is brought into focus", () => {
      CypressMountWithProviders(<SimpleSelectComponent onFocus={callback} />);

      commonDataElementInputPreview()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["downarrow"], ["uparrow"]])(
      "should call onKeyDown event when %s key is pressed",
      (key) => {
        CypressMountWithProviders(
          <SimpleSelectComponent onKeyDown={callback} />
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
  });
});
