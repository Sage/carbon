import * as React from "react";
import ButtonToggle from "../button-toggle/button-toggle.component";
import ButtonToggleGroup from "./button-toggle-group.component";
import {
  buttonTogglePreview,
  buttonToggleInput,
} from "../../../cypress/locators/button-toggle";
import {
  buttonToggleGroup,
  buttonToggleGroupHelp,
  buttonToggleGroupHelpIcon,
} from "../../../cypress/locators/button-toggle-group";
import { positionOfElement } from "../../../cypress/support/helper";
import { getDataElementByValue, icon } from "../../../cypress/locators";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const specialCharacters = [
  "label",
  "mp150ú¿¡üßä",
  "!@#$%^*()_+-=~[];:.,?{}&\"'<>",
];
const testPropValue = "cypress_test";

const ButtonToggleGroupComponent = ({ ...props }) => {
  return (
    <div>
      <ButtonToggleGroup
        id="button-toggle-group-default-id"
        name="button-toggle-group-default"
        label="Default example"
        labelHelp="help message"
        helpAriaLabel="Help"
        fieldHelp="field help message"
        onChange={function noRefCheck() {}}
        {...props}
      >
        <ButtonToggle key="foo" value="foo">
          Foo
        </ButtonToggle>
        <ButtonToggle key="bar" value="bar">
          Bar
        </ButtonToggle>
        <ButtonToggle key="baz" value="baz">
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};

const ButtonToggleGroupDefaultChecked = () => {
  return (
    <div>
      <ButtonToggleGroup
        fieldHelp="field help mesage"
        helpAriaLabel="Help"
        id="button-toggle-group-controlled-id-sage"
        label="Controlled example"
        labelHelp="help message"
        name="button-toggle-group-controlled-sage"
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar" defaultChecked>
          Bar
        </ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};

context("Testing Button-Toggle-Group component", () => {
  describe("should render Button-Toggle-Group component", () => {
    it("should render Button-Toggle-Group with data-component prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent data-component={testPropValue} />
      );

      buttonToggleGroupHelp()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Button-Toggle-Group with data-element prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent data-element={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-element", testPropValue);
    });

    it("should render Button-Toggle-Group with data-role prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent data-role={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-role", testPropValue);
    });

    it("should render Button-Toggle-Group with all button toggle input name props set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent name={testPropValue} />
      );

      buttonToggleInput().eq(0).should("have.attr", "name", testPropValue);
      buttonToggleInput().eq(1).should("have.attr", "name", testPropValue);
      buttonToggleInput().eq(2).should("have.attr", "name", testPropValue);
    });

    it.each([
      ["error", "Error Message", "", "", "rgb(203, 55, 74)"],
      ["warning", "", "Warning Message", "", "rgb(239, 103, 0)"],
      ["info", "", "", "Info Message", "rgb(0, 96, 167)"],
    ])(
      "should render Button-Toggle-Group with %s icon",
      (prop, errorMessage, warningMessage, infoMessage, bottomColor) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent
            error={errorMessage}
            warning={warningMessage}
            info={infoMessage}
          />
        );

        buttonToggleGroup()
          .children()
          .children()
          .eq(1)
          .children()
          .eq(3)
          .children()
          .should("have.attr", "type", prop);
        icon().parent().should("have.attr", "data-component", "help");
        buttonTogglePreview()
          .children()
          .eq(1)
          .should("have.css", "border-bottom-color", bottomColor);
      }
    );

    it("should render Button-Toggle-Group with validation icon on label", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent info="Info Message" validationOnLabel />
      );

      buttonToggleGroup()
        .children()
        .children()
        .children()
        .eq(1)
        .children()
        .children()
        .should("have.attr", "data-element", "info");
    });

    it.each(specialCharacters)(
      "should render Button-Toggle-Group with %s as label",
      (labelText) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent label={labelText} />
        );

        buttonToggleGroup().should("contain.text", labelText);
      }
    );

    it("should render Button-Toggle-Group with tooltip set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent labelHelp={testPropValue} />
      );

      buttonToggleGroup().find('[data-element="question"]').realHover();
      getDataElementByValue("tooltip")
        .should("be.visible")
        .and("has.text", testPropValue);
    });

    it.each(specialCharacters)(
      "should render Button-Toggle-Group with %s as field help text",
      (fieldHelpText) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent fieldHelp={fieldHelpText} />
        );

        buttonToggleGroupHelp().should("have.text", fieldHelpText);
      }
    );

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should render Button-Toggle-Group with field help %s if fieldHelpInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent
            fieldHelp="fieldHelpText"
            fieldHelpInline={state}
          />
        );

        if (state === true) {
          buttonToggleGroup()
            .children()
            .eq(0)
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        } else {
          buttonToggleGroup()
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        }
      }
    );

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should render Button-Toggle-Group with label %s if labelInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent labelInline={state} />
        );

        if (state === true) {
          buttonToggleGroup()
            .children()
            .children()
            .should("have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "0px");
        } else {
          buttonToggleGroup()
            .children()
            .children()
            .should("not.have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "8px");
        }
      }
    );

    it.each([
      ["left", "have.css", "justify-content", "flex-start"],
      ["right", "not.have.css", "box-sizing", "flex-end"],
    ])(
      "should render Button-Toggle-Group with label inline and %s aligned",
      (alignment, condition, css, flex) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent labelInline labelAlign={alignment} />
        );

        buttonToggleGroup().children().children().should(condition, css, flex);
      }
    );

    it("should render Button-Toggle-Group with second button toggle checked", () => {
      CypressMountWithProviders(<ButtonToggleGroupDefaultChecked />);

      buttonToggleInput()
        .eq(positionOfElement("second"))
        .should("have.attr", "checked");
    });

    it.each([
      [25, "337.5px"],
      [50, "675px"],
      [100, "1350px"],
    ])(
      "should render Button-Toggle-Group with labelWidth prop of %s and width of %s",
      (labelWidth, width) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent inputWidth={labelWidth} />
        );

        buttonToggleInput()
          .parent()
          .parent()
          .should("have.css", "width", width);
      }
    );

    it("should render Button-Toggle-Group with label width = %s", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent helpAriaLabel={testPropValue} />
      );

      buttonToggleGroupHelpIcon().should(
        "have.attr",
        "aria-label",
        testPropValue
      );
    });

    it.each([
      ["8px", 1],
      ["16px", 2],
    ])(
      "should render Button-Toggle-Group with padding of %s if labelSpacing prop is %s",
      (padding, spacing) => {
        CypressMountWithProviders(
          <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />
        );

        buttonToggleGroup()
          .children()
          .children()
          .should("have.css", "padding-right", padding);
      }
    );
  });

  describe("should render Button-Toggle-Group component for event tests", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent onChange={callback} />
      );

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(
        <ButtonToggleGroupComponent onBlur={callback} />
      );

      buttonToggleInput().eq(positionOfElement("first")).focus();

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
