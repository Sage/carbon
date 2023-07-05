import React from "react";
import {
  SimpleColorPickerProps,
  SimpleColorProps,
} from "../../../src/components/simple-color-picker";
import {
  SimpleColorCustom,
  SimpleColorPickerCustom,
} from "../../../src/components/simple-color-picker/simple-color-picker-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  simpleColorPicker,
  advancedColorPicker,
  simpleColorPickerInput,
  simpleColorPickerComponent,
} from "../../locators/advanced-color-picker";

import { verifyRequiredAsteriskForLegend } from "../../support/component-helper/common-steps";

import { simpleColorPickerLegend } from "../../locators/simple-color-picker";

import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../locators";

import { keyCode } from "../../support/helper";

import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";

const verifyBeforeColor = (element: string, color: string) =>
  getDataElementByValue(element).then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const before = win?.getComputedStyle($els[0], "before");
    // read the value of the `content` CSS property
    const colorVal = before?.getPropertyValue("color");
    // the returned value will have double quotes around it, but this is correct
    cy.wrap(colorVal).should("equal", color);
  });

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const colors = [
  {
    color: "#FFFFFF",
    label: "transparent",
  },
  {
    color: "#0073C1",
    label: "blue",
  },
  {
    color: "#582C83",
    label: "purple",
  },
  {
    color: "#E96400",
    label: "orange",
  },
  {
    color: "#99ADB6",
    label: "gray",
  },
  {
    color: "#C7384F",
    label: "flush mahogany",
  },
  {
    color: "#004500",
    label: "dark green",
  },
  {
    color: "#FFB500",
    label: "yellow",
  },
  {
    color: "#335C6D",
    label: "dark blue",
  },
  {
    color: "#00DC00",
    label: "light blue",
  },
];

const indexes = Array.from({ length: colors.length }).map((_, index) => index);

context("Testing SimpleColorPicker component", () => {
  describe("should render SimpleColorPicker component and check functionality", () => {
    it("should render all proper colors", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      cy.fixture(`commonComponents/simpleColorPicker.json`).then(($json) => {
        for (let i = 0; i < $json.length; ++i) {
          simpleColorPickerInput(i)
            .should("have.value", $json[i].color)
            .and("have.attr", "aria-label", $json[i].label);
        }
      });
    });

    it.each(testData)(
      "should render SimpleColorPicker and set legend to %s",
      (legend) => {
        CypressMountWithProviders(<SimpleColorPickerCustom legend={legend} />);

        simpleColorPickerLegend().should("have.text", legend);
      }
    );

    it.each(testData)(
      "should render SimpleColorPicker and set name to %s",
      (name) => {
        CypressMountWithProviders(<SimpleColorPickerCustom name={name} />);

        commonDataElementInputPreview().should("have.attr", "name", name);
      }
    );

    it("should use rightarrow key and move selection to 0 cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(9).trigger("keydown", keyCode("rightarrow"));
      simpleColorPickerInput(0).should("have.attr", "aria-checked", "true");
    });

    it("should use rightarrow key and move selection to 4th cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(3).trigger("keydown", keyCode("rightarrow"));
      simpleColorPickerInput(4).should("have.attr", "aria-checked", "true");
    });

    it("should use leftarrow key and move selection to 0 cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(0).trigger("keydown", keyCode("leftarrow"));
      simpleColorPickerInput(9).should("have.attr", "aria-checked", "true");
    });

    it("should use leftarrow key and move selection to 2nd cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(3).trigger("keydown", keyCode("leftarrow"));
      simpleColorPickerInput(2).should("have.attr", "aria-checked", "true");
    });

    it("should use downarrow key and move selection to 8th cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(3).trigger("keydown", keyCode("downarrow"));
      simpleColorPickerInput(8).should("have.attr", "aria-checked", "true");
    });

    it("should use uparrow key and move selection to 3rd cell", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      simpleColorPickerInput(8).trigger("keydown", keyCode("uparrow"));
      simpleColorPickerInput(3).should("have.attr", "aria-checked", "true");
    });

    it.each([1, 2, 3])(
      "should select proper %s cell for SimpleColorPicker",
      (cellIndex) => {
        CypressMountWithProviders(<SimpleColorPickerCustom />);

        for (let i = 0; i < cellIndex; ++i) {
          simpleColorPickerInput(i + 1).click();
        }

        simpleColorPicker(cellIndex).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      }
    );

    it.each([
      ["250", "232px"],
      ["450", "406px"],
    ])(
      "should render SimpleColorPicker with maxWidth prop set to %s",
      (maxWidth, assertionValue) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom maxWidth={maxWidth} />
        );

        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "maxWidth", assertionValue);
      }
    );

    it.each([
      ["300", "75", 89, 33, 233],
      ["100", "60", 321, 265, 1],
    ])(
      "should render SimpleColorPicker with childWidth prop set to %s",
      (maxWidth, childWidth, bottomLess, topLess, leftLess) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            maxWidth={maxWidth}
            childWidth={childWidth}
          />
        );

        const additionVal = 2;

        advancedColorPicker(4).then(($el) => {
          const position = $el[0].getBoundingClientRect();

          cy.wrap(position.bottom).should(
            "be.lessThan",
            bottomLess + additionVal
          );
          cy.wrap(position.bottom).should("be.greaterThan", bottomLess);
          cy.wrap(position.top).should("be.lessThan", topLess + additionVal);
          cy.wrap(position.top).should("be.greaterThan", topLess);
          cy.wrap(position.left).should("be.lessThan", leftLess + additionVal);
          cy.wrap(position.left).should("be.greaterThan", leftLess);
        });
      }
    );

    it("should render SimpleColorPicker with required prop", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom required />);

      verifyRequiredAsteriskForLegend();
    });

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s and set as string",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: "Message" }} />
        );

        simpleColorPickerComponent()
          .find("div")
          .find(`[data-element="${type}"]`)
          .trigger("mouseover");
        getDataElementByValue("tooltip").should("have.text", "Message");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
        verifyBeforeColor(type, color);
      }
    );

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s as string and have validationOnLegend prop",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            {...{ [type]: "Message" }}
            validationOnLegend
          />
        );

        simpleColorPickerComponent()
          .find("legend")
          .find(`[data-element="${type}"]`)
          .trigger("mouseover");
        getDataElementByValue("tooltip").should("have.text", "Message");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
        verifyBeforeColor(type, color);
      }
    );

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s as boolean",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: true }} />
        );

        simpleColorPickerComponent()
          .find(`[data-element="${type}"]`)
          .should("not.exist");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
      }
    );
  });

  describe("should render SimpleColorPicker component and check events", () => {
    it("should call onChange callback when a click event is triggered", () => {
      const callback: SimpleColorPickerProps["onChange"] = cy
        .stub()
        .as("onChange");

      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );

      simpleColorPickerInput(5).click();

      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onChange callback and focus the correct item when the right arrow key is triggered", () => {
      const callback: SimpleColorPickerProps["onChange"] = cy
        .stub()
        .as("onChange");

      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );

      indexes.forEach((index) => {
        const next = index < colors.length - 1 ? index + 1 : 0;

        simpleColorPickerInput(index).trigger("keydown", keyCode("rightarrow"));

        simpleColorPickerInput(next)
          .should("be.focused")
          .and("have.value", colors[next].color);

        cy.get("@onChange").should("have.been.called");
      });
    });

    it("should call onChange callback and focus the correct item when the left arrow key is triggered", () => {
      const callback: SimpleColorPickerProps["onChange"] = cy
        .stub()
        .as("onChange");

      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );

      indexes.reverse().forEach((index) => {
        const next = index > 0 ? index - 1 : colors.length - 1;

        simpleColorPickerInput(index).trigger("keydown", keyCode("leftarrow"));

        simpleColorPickerInput(next)
          .should("be.focused")
          .and("have.value", colors[next].color);

        cy.get("@onChange").should("have.been.called");
      });
    });

    it.each([
      [9, 4],
      [8, 3],
      [7, 2],
      [6, 1],
      [5, 0],
    ])(
      "should call onChange callback and focus the correct item when the up arrow key is triggered",
      (indexPress, focusedIndex) => {
        const callback: SimpleColorPickerProps["onChange"] = cy
          .stub()
          .as("onChange");

        CypressMountWithProviders(
          <SimpleColorPickerCustom onChange={callback} />
        );

        simpleColorPickerInput(indexPress).trigger(
          "keydown",
          keyCode("uparrow")
        );

        simpleColorPickerInput(focusedIndex)
          .should("be.focused")
          .and("have.value", colors[focusedIndex].color);
        cy.get("@onChange").should("have.been.calledOnce");
      }
    );

    it.each([
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ])(
      "should call onChange callback and focus the correct item when the down arrow key is triggered",
      (indexPress, focusedIndex) => {
        const callback: SimpleColorPickerProps["onChange"] = cy
          .stub()
          .as("onChange");

        CypressMountWithProviders(
          <SimpleColorPickerCustom onChange={callback} />
        );

        simpleColorPickerInput(indexPress).trigger(
          "keydown",
          keyCode("downarrow")
        );

        simpleColorPickerInput(focusedIndex)
          .should("be.focused")
          .and("have.value", colors[focusedIndex].color);
        cy.get("@onChange").should("have.been.calledOnce");
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: SimpleColorPickerProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<SimpleColorPickerCustom onBlur={callback} />);

      simpleColorPickerInput(5).focus().blur();

      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should not call onBlur callback when a blur event is triggered", () => {
      const callback: SimpleColorPickerProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(
        <SimpleColorPickerCustom onBlur={callback} isBlurBlocked />
      );

      simpleColorPickerInput(5).focus().blur();

      cy.get("@onBlur").should("not.have.been.called");
    });
  });

  describe("should render SimpleColor component and check functionality", () => {
    it("should check the value prop in SimpleColor item", () => {
      CypressMountWithProviders(<SimpleColorCustom value={colors[7].color} />);

      simpleColorPickerInput(0).should("have.attr", "value", colors[7].color);
    });

    it("should check the name prop in SimpleColor item", () => {
      CypressMountWithProviders(<SimpleColorCustom name={testPropValue} />);

      simpleColorPickerInput(0).should("have.attr", "name", testPropValue);
    });

    it("should check the className prop in SimpleColor item", () => {
      CypressMountWithProviders(
        <SimpleColorCustom className={testPropValue} />
      );

      simpleColorPickerInput(0).parent().should("have.class", testPropValue);
    });

    it.each([
      [true, "be.checked"],
      [false, "be.not.checked"],
    ])(
      "should check the checked prop is set to %s in SimpleColor item",
      (checkedBool, assertion) => {
        CypressMountWithProviders(<SimpleColorCustom checked={checkedBool} />);

        simpleColorPickerInput(0).should(assertion);
      }
    );
  });

  describe("should render SimpleColor component and check events", () => {
    it("should call onChange callback when a click event is triggered", () => {
      const callback: SimpleColorProps["onChange"] = cy.stub().as("onChange");

      CypressMountWithProviders(<SimpleColorCustom onChange={callback} />);

      advancedColorPicker(1).click();

      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: SimpleColorProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<SimpleColorCustom onBlur={callback} />);

      advancedColorPicker(1).click();
      cy.focused().blur();

      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onMouseDown callback when a click event is triggered", () => {
      const callback: SimpleColorProps["onMouseDown"] = cy
        .stub()
        .as("onMouseDown");

      CypressMountWithProviders(<SimpleColorCustom onMouseDown={callback} />);

      advancedColorPicker(1).click();
      cy.get("@onMouseDown").should("have.been.calledOnce");
    });
  });

  describe("check Accessibility for SimpleColorPicker component", () => {
    it("should check Accessibility for all proper colors", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should render SimpleColorPicker and set legend to %s for Accessibility tests",
      (legend) => {
        CypressMountWithProviders(<SimpleColorPickerCustom legend={legend} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should render SimpleColorPicker and set name to %s for Accessibility tests",
      (name) => {
        CypressMountWithProviders(<SimpleColorPickerCustom name={name} />);

        cy.checkAccessibility();
      }
    );

    it.each(["250", "450"])(
      "should render SimpleColorPicker with maxWidth prop set to %s for Accessibility tests",
      (maxWidth) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom maxWidth={maxWidth} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([
      ["300", "75"],
      ["100", "60"],
    ])(
      "should render SimpleColorPicker with childWidth prop set to %s for Accessibility tests",
      (maxWidth, childWidth) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            maxWidth={maxWidth}
            childWidth={childWidth}
          />
        );
        cy.checkAccessibility();
      }
    );

    it("should render SimpleColorPicker with required prop for Accessibility tests", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom required />);

      cy.checkAccessibility();
    });

    it.each(["error", "warning", "info"])(
      "should render SimpleColorPicker and set type to %s and set as string for Accessibility tests",
      (type) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: "Message" }} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(["error", "warning", "info"])(
      "should render SimpleColorPicker and set type to %s as string and have validationOnLegend prop for Accessibility tests",
      (type) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            {...{ [type]: "Message" }}
            validationOnLegend
          />
        );
        cy.checkAccessibility();
      }
    );

    it.each(["error", "warning", "info"])(
      "should render SimpleColorPicker and set type to %s as boolean for Accessibility tests",
      (type) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: true }} />
        );
        cy.checkAccessibility();
      }
    );

    it("should check the value prop in SimpleColor item for Accessibility tests", () => {
      CypressMountWithProviders(<SimpleColorCustom value={colors[7].color} />);

      cy.checkAccessibility();
    });

    it("should check the name prop in SimpleColor item for Accessibility tests", () => {
      CypressMountWithProviders(<SimpleColorCustom name={testPropValue} />);

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "should check the checked prop is set to %s in SimpleColor item for Accessibility tests",
      (checkedBool) => {
        CypressMountWithProviders(<SimpleColorCustom checked={checkedBool} />);

        cy.checkAccessibility();
      }
    );

    it("should check the className prop in SimpleColor item for Accessibility tests", () => {
      CypressMountWithProviders(
        <SimpleColorCustom className={testPropValue} />
      );
      cy.checkAccessibility();
    });
  });
});
