import * as React from "react";
import GroupedCharacter from "./grouped-character.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  fieldHelpPreview,
  getDataElementByValue,
  tooltipPreview,
  commonDataElementInputPreview,
} from "../../../cypress/locators/index";

import { verifyRequiredAsterisk } from "../../../cypress/support/component-helper/common-steps";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const GroupedCharacterComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }) => {
    setState(target.value.rawValue);
    if (onChange) {
      onChange(target);
    }
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      {...props}
    />
  );
};

context("Tests for GroupedCharacter component", () => {
  describe("check props for GroupedCharacter component", () => {
    it.each([
      ["small", "32px"],
      ["medium", "40px"],
      ["large", "48px"],
    ])(
      "should use %s as size and render it with %s as height",
      (size, height) => {
        CypressMountWithProviders(<GroupedCharacterComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it.each([
      [[1, 2, 3], "1234567", "1-23-456"],
      [[5, 3, 1], "987654321", "98765-432-1"],
      [[2, 4, 2], "123456789", "12-3456-78"],
    ])(
      "should use %s as a group and use %s as input value to produce %s output value",
      (group, inputValue, outputValue) => {
        CypressMountWithProviders(<GroupedCharacterComponent groups={group} />);

        commonDataElementInputPreview().type(inputValue).blur({ force: true });
        commonDataElementInputPreview()
          .invoke("val")
          .then(($el) => {
            expect($el).to.be.equal(outputValue);
          });
      }
    );

    it.each([
      ["-", "123456", "12-34-56"],
      ["?", "sage", "sa?ge"],
      ["#", "tests", "te#st#s"],
      ["@", "abcdef", "ab@cd@ef"],
      ["$", "987654321", "98$76$543"],
      ["%", "123456789", "12%34%567"],
      ["^", "123456", "12^34^56"],
      ["!", "987654321", "98!76!543"],
      ["*", "12ab34cd", "12*ab*34c"],
    ])(
      "should use %s as a separator and use %s as input value to produce %s output value",
      (separator, inputValue, outputValue) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent separator={separator} />
        );

        commonDataElementInputPreview().type(inputValue).blur({ force: true });
        commonDataElementInputPreview()
          .invoke("val")
          .then(($el) => {
            expect($el).to.be.equal(outputValue);
          });
      }
    );
  });

  describe("check GroupedCharacter input", () => {
    it.each(specialCharacters)(
      "should check label renders properly with %s as specific value",
      (specificValue) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent label={specificValue} />
        );

        getDataElementByValue("label").should("have.text", specificValue);
      }
    );

    it.each(specialCharacters)(
      "should check fieldHelp renders properly with %s specific value",
      (specificValue) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent fieldHelp={specificValue} />
        );

        fieldHelpPreview().should("have.text", specificValue);
      }
    );

    it.each(specialCharacters)(
      "should check tooltip renders properly with %s specific values",
      (specificValue) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent labelHelp={specificValue} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", specificValue);
      }
    );

    it("should check add icon inside of the GroupedCharacter component renders", () => {
      CypressMountWithProviders(<GroupedCharacterComponent inputIcon="add" />);

      getDataElementByValue("add").should("be.visible");
    });

    it("should check the GroupedCharacter component is disabled", () => {
      CypressMountWithProviders(<GroupedCharacterComponent disabled />);

      commonDataElementInputPreview().parent().should("have.attr", "disabled");
      commonDataElementInputPreview().should("be.disabled");
    });

    it("should check the GroupedCharacter component is required", () => {
      CypressMountWithProviders(<GroupedCharacterComponent required />);

      verifyRequiredAsterisk();
    });

    it("should check the GroupedCharacter component has autofocus", () => {
      CypressMountWithProviders(<GroupedCharacterComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with %s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );
  });

  describe("check events for GroupedCharacter component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it.each([
      [[1, 1, 4], "123", "123", "1-2-3", 2],
      [[3, 2, 1], "sage123", "sage12", "sag-e1-2", 5],
      [[3, 3, 3], "123testtest", "123testte", "123-tes-tte", 8],
      [[4, 1, 2], "1234567", "1234567", "1234-5-67", 6],
      [[5, 2, 2], "9876543211", "987654321", "98765-43-21", 8],
      [[1, 1, 3], "123456789", "12345", "1-2-345", 4],
    ])(
      "should call onChange callback when a type event is triggered using %s as groups and %s as inputValue and return %s as formattedValue",
      (groups, inputValue, rawValue, formattedValue, callbackIndex) => {
        CypressMountWithProviders(
          <GroupedCharacterComponent onChange={callback} groups={groups} />
        );

        commonDataElementInputPreview()
          .type(inputValue)
          .blur({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.called;
            expect(
              callback.getCalls()[callbackIndex].args[0].value.rawValue
            ).to.equals(rawValue);
            expect(
              callback.getCalls()[callbackIndex].args[0].value.formattedValue
            ).to.equals(formattedValue);
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(
        <GroupedCharacterComponent onBlur={callback} />
      );

      commonDataElementInputPreview()
        .type("1")
        .blur({ force: true })
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
