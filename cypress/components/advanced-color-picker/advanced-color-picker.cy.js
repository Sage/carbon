import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import AdvancedColorPicker from "../../../src/components/advanced-color-picker";
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

const AdvancedColorPickerCustom = ({ onChange, ...props }) => {
  const [open, setOpen] = React.useState(true);
  const [color, setColor] = React.useState();

  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
    setColor(value);
  };
  return (
    <AdvancedColorPicker
      name="advancedColor"
      availableColors={[
        { value: "#FFFFFF", label: "white" },
        { value: "transparent", label: "transparent" },
        { value: "#000000", label: "black" },
        { value: "#A3CAF0", label: "blue" },
        { value: "#FD9BA3", label: "pink" },
        { value: "#B4AEEA", label: "purple" },
        { value: "#ECE6AF", label: "goldenrod" },
        { value: "#EBAEDE", label: "orchid" },
        { value: "#EBC7AE", label: "desert" },
        { value: "#AEECEB", label: "turquoise" },
        { value: "#AEECD6", label: "mint" },
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={handleChange}
      onOpen={() => {
        setOpen(open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
      {...props}
    />
  );
};

context("Testing AdvancedColorPicker component", () => {
  describe("should render AdvancedColorPicker component and check functionality", () => {
    beforeEach(() => {
      CypressMountWithProviders(<AdvancedColorPickerCustom />);
    });

    it.each([
      ["leftarrow", 6],
      ["rightarrow", 8],
      ["uparrow", 2],
    ])("should use %s key and move selection to %s cell", (key, index) => {
      advancedColorPicker(7).trigger("keydown", keyCode(key));

      simpleColorPickerInput(index).should("have.attr", "aria-checked", "true");
    });

    it("should move selection down using downarrow", () => {
      simpleColorPicker(7).trigger("keydown", keyCode("uparrow"));
      simpleColorPicker(2).trigger("keydown", keyCode("downarrow"));

      simpleColorPickerInput(7).should("have.attr", "aria-checked", "true");
    });

    it("should regain focus on color after second tab", () => {
      simpleColorPicker(7).tab().tab();

      simpleColorPickerInput(7).should("be.focused");
    });

    it.each(["Space", "Enter"])(
      "should close AdvancedColorPicker using %s on selected color",
      (key) => {
        simpleColorPicker(7).trigger("keydown", keyCode(key));
        simpleColorPickerComponent().should("not.exist");
      }
    );

    it("should have a focus state with black and yellow border", () => {
      advancedColorPickerParent().should(
        "have.css",
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
      );
      advancedColorPickerParent()
        .getDesignTokensByCssProperty("box-shadow")
        .then(($el) => {
          expect($el[0]).to.equal("--colorsSemanticFocus500");
          expect($el[1]).to.equal("--colorsUtilityYin090");
        });
    });

    it.each(["Space", "Enter"])(
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
          selectedColor="#333555"
        />
      );

      simpleColorPicker(0).should((el) => {
        expect(el).to.have.attr("value").to.equal(colors[0].value);
        expect(el).to.have.attr("aria-label").to.equal(colors[0].label);
      });
      simpleColorPicker(1).should((el) => {
        expect(el).to.have.attr("value").to.equal(colors[1].value);
        expect(el).to.have.attr("aria-label").to.equal(colors[1].label);
      });
    });

    it("should render AdvancedColorPicker with selectedColor prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom
          availableColors={colors}
          selectedColor="#333555"
        />
      );

      cy.focused().should((el) => {
        expect(el).to.have.attr("value").to.equal(colors[1].value);
        expect(el).to.have.attr("aria-label").to.equal(colors[1].label);
      });
    });

    it("should render AdvancedColorPicker with defaultColor prop", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom
          availableColors={colors}
          defaultColor="#111222"
        />
      );

      cy.focused().should((el) => {
        expect(el).to.have.attr("value").to.equal(colors[0].value);
        expect(el).to.have.attr("aria-label").to.equal(colors[0].label);
      });
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
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom onChange={callback} />
      );

      simpleColorPickerInput(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onOpen callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom onOpen={callback} />
      );

      closeIconButton().click();
      advancedColorPickerCell()
        .first()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClose callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom onClose={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(
        <AdvancedColorPickerCustom onBlur={callback} />
      );

      cy.focused()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
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
