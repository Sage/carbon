/* eslint-disable jest/valid-expect */
import React from "react";
import { AdvancedColorPickerProps } from "components/advanced-color-picker";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { AdvancedColorPickerCustom } from "../../../src/components/advanced-color-picker/advanced-color-picker-test.stories";
import {
  simpleColorPicker,
  currentColorDescription,
  advancedColorPickerCell,
  advancedColorPicker,
  simpleColorPickerInput,
  simpleColorPickerComponent,
  advancedColorPickerPreview,
} from "../../locators/advanced-color-picker";
import { alertDialogPreview as advancedColorPickerParent } from "../../locators/dialog";
import { closeIconButton } from "../../locators";
import { keyCode } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";

const keyToTrigger = ["Space", "Enter"] as const;
const keyToTriggerArrow = ["leftarrow", "rightarrow", "uparrow"] as const;

const indexByKey = (key: string) => {
  let index;
  switch (key) {
    case keyToTriggerArrow[0]:
      index = 6;
      break;
    case keyToTriggerArrow[1]:
      index = 8;
      break;
    case keyToTriggerArrow[2]:
      index = 2;
      break;
    default:
      throw new Error(`${key} is not acceptable.`);
  }

  return index;
};

context("Testing AdvancedColorPicker component", () => {
  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(<AdvancedColorPickerCustom open />);
      cy.focused()
        .tab()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom open />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );
      cy.focused()
        .tab()
        .should("have.css", "outline", "rgb(255, 188, 25) solid 3px");
    });
  });

  describe("should render AdvancedColorPicker component and check functionality", () => {
    beforeEach(() => {
      CypressMountWithProviders(<AdvancedColorPickerCustom />);
    });

    it.each([keyToTriggerArrow[0], keyToTriggerArrow[1], keyToTriggerArrow[2]])(
      "should use %s key and move selection",
      (key) => {
        advancedColorPicker(7).trigger("keydown", keyCode(key));

        simpleColorPickerInput(indexByKey(key)).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      }
    );

    it("should move selection down using downarrow", () => {
      simpleColorPicker(7).trigger("keydown", keyCode("uparrow"));
      simpleColorPicker(2).trigger("keydown", keyCode("downarrow"));

      simpleColorPickerInput(7).should("have.attr", "aria-checked", "true");
    });

    it("should regain focus on color after second tab", () => {
      simpleColorPicker(7).click().tab().tab();

      simpleColorPickerInput(7).should("be.focused");
    });

    it.each([keyToTrigger[0], keyToTrigger[1]])(
      "should close AdvancedColorPicker using %s on selected color",
      (key) => {
        simpleColorPicker(7).trigger("keydown", keyCode(key));
        simpleColorPickerComponent().should("not.exist");
      }
    );

    it.each([1, 2, 3])(
      "should confirm dedicated %s color was selected",
      (index) => {
        simpleColorPickerInput(index).click();

        simpleColorPickerInput(index).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      }
    );
  });

  describe("should render AdvancedColorPicker component and check props", () => {
    const testPropValue = CHARACTERS.STANDARD;
    const colors = [
      { value: "#111222", label: "superBlack" },
      { value: "#333555", label: "black" },
    ];

    it("should render AdvancedColorPicker with aria-describedby prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom aria-describedby={testPropValue} />
      );

      advancedColorPickerParent().should(
        "have.attr",
        "aria-describedby",
        testPropValue
      );
    });

    it("should render AdvancedColorPicker with aria-label prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom aria-label={testPropValue} />
      );

      advancedColorPickerParent().should(
        "have.attr",
        "aria-label",
        testPropValue
      );
    });

    it("should render AdvancedColorPicker open button with aria-label prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom aria-label="Change colour" />
      );

      advancedColorPickerCell().should(
        "have.attr",
        "aria-label",
        "Change colour"
      );
    });

    it("should render AdvancedColorPicker with aria-labelledby prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom aria-labelledby={testPropValue} />
      );

      advancedColorPickerParent().should(
        "have.attr",
        "aria-labelledby",
        testPropValue
      );
    });

    it("should render AdvancedColorPicker with role prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom role={testPropValue} />
      );

      advancedColorPickerParent().should("have.attr", "role", testPropValue);
    });

    it("should render AdvancedColorPicker with name prop passed to color", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom name="cypressTestColorName" />
      );

      simpleColorPicker(6).should("have.attr", "name", "cypressTestColorName");
    });

    it("should render AdvancedColorPicker with availableColors prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom
          availableColors={colors}
          selectedColor="#111222"
        />
      );

      simpleColorPicker(0)
        .should("have.attr", "value", colors[0].value)
        .and("have.attr", "aria-label", colors[0].label);
      simpleColorPicker(1)
        .should("have.attr", "value", colors[1].value)
        .and("have.attr", "aria-label", colors[1].label);
    });

    it("should render AdvancedColorPicker with selectedColor prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom
          availableColors={colors}
          selectedColor="#333555"
        />
      );

      cy.focused()
        .should("have.attr", "value", colors[1].value)
        .and("have.attr", "aria-label", colors[1].label);
    });

    it("should render AdvancedColorPicker with defaultColor prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom
          availableColors={colors}
          defaultColor="#111222"
        />
      );

      advancedColorPickerPreview().should(
        "have.attr",
        "color",
        colors[0].value
      );
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render AdvancedColorPicker with open prop set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(
          <AdvancedColorPickerCustom open={booleanValue} />
        );

        advancedColorPickerParent().should(assertion);
      }
    );
  });

  describe("should render AdvancedColorPicker component and check events", () => {
    it("should call onChange callback when a click event is triggered", () => {
      const callback: AdvancedColorPickerProps["onChange"] = cy
        .stub()
        .as("onChange");

      CypressMountWithProviders(
        <AdvancedColorPickerCustom onChange={callback} />
      );

      simpleColorPickerInput(0).click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onOpen callback when a click event is triggered", () => {
      const callback: AdvancedColorPickerProps["onOpen"] = cy
        .stub()
        .as("onOpen");

      CypressMountWithProviders(
        <AdvancedColorPickerCustom onOpen={callback} />
      );

      closeIconButton().click();
      advancedColorPickerCell().first().click();

      cy.get("@onOpen").should("have.been.calledOnce");
    });

    it("should call onClose callback when a click event is triggered", () => {
      const callback: AdvancedColorPickerProps["onClose"] = cy
        .stub()
        .as("onClose");

      CypressMountWithProviders(
        <AdvancedColorPickerCustom onClose={callback} />
      );

      closeIconButton().click();
      cy.get("@onClose").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: AdvancedColorPickerProps["onBlur"] = cy
        .stub()
        .as("onBlur");

      CypressMountWithProviders(
        <AdvancedColorPickerCustom onBlur={callback} selectedColor="#FD9BA3" />
      );

      cy.focused().blur();
      cy.get("@onBlur").should("have.been.calledOnce");
    });
  });

  describe("Should render a current color description list", () => {
    it("description is correct when color is selected", () => {
      CypressMountWithProviders(<AdvancedColorPickerCustom />);
      currentColorDescription().contains("Current color assigned: orchid");
    });
  });

  describe("Accessibility tests for AdvancedColorPicker component", () => {
    it("should pass accessibility tests for AdvancedColorPicker default", () => {
      CypressMountWithProviders(<AdvancedColorPickerCustom />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<AdvancedColorPickerCustom open />);
    advancedColorPickerPreview().should("have.css", "border-radius", "4px");
  });
});
