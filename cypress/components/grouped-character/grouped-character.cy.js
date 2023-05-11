import React from "react";
import { GroupedCharacterComponent } from "../../../src/components/grouped-character/grouped-character-test.stories";
import * as stories from "../../../src/components/grouped-character/grouped-character.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  fieldHelpPreview,
  getDataElementByValue,
  tooltipPreview,
  commonDataElementInputPreview,
  getElement,
} from "../../locators/index";
import { verifyRequiredAsteriskForLabel } from "../../support/component-helper/common-steps";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for GroupedCharacter component", () => {
  describe("check props for GroupedCharacter component", () => {
    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
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

        commonDataElementInputPreview()
          .type(inputValue, { delay: 0 })
          .blur({ force: true });
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

        commonDataElementInputPreview()
          .type(inputValue, { delay: 0 })
          .blur({ force: true });
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

      verifyRequiredAsteriskForLabel();
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

  it.each(["10%", "30%", "50%", "80%", "100%"])(
    "should check maxWidth as %s for GroupedCharacter component",
    (maxWidth) => {
      CypressMountWithProviders(
        <GroupedCharacterComponent maxWidth={maxWidth} />
      );

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", maxWidth);
    }
  );

  it("when maxWidth has no value it should render as 100%", () => {
    CypressMountWithProviders(<GroupedCharacterComponent maxWidth="" />);

    getDataElementByValue("input")
      .parent()
      .parent()
      .should("have.css", "max-width", "100%");
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
          .type(inputValue, { delay: 0 })
          .blur({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(
              callback.getCalls()[callbackIndex].args[0].target.value.rawValue
            ).to.equals(rawValue);
            expect(
              callback.getCalls()[callbackIndex].args[0].target.value
                .formattedValue
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

    describe("check accessibility for Groupcharacter component", () => {
      it("should pass accessibility tests for Groupcharacter Default story", () => {
        CypressMountWithProviders(<stories.DefaultStory />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter Sizes story", () => {
        CypressMountWithProviders(<stories.Sizes />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter AutoFocus story", () => {
        CypressMountWithProviders(<stories.AutoFocus />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter Disabled story", () => {
        CypressMountWithProviders(<stories.Disabled />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter LabelInline story", () => {
        CypressMountWithProviders(<stories.LabelInline />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter LabelInputWidth story", () => {
        CypressMountWithProviders(<stories.LabelInputWidth />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter FieldHelp story", () => {
        CypressMountWithProviders(<stories.FieldHelp />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter LabelHelp story", () => {
        CypressMountWithProviders(<stories.LabelHelp />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter Required story", () => {
        CypressMountWithProviders(<stories.Required />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter LabelAlign story", () => {
        CypressMountWithProviders(<stories.LabelAlign />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter VariousSeparators story", () => {
        CypressMountWithProviders(<stories.VariousSeparators />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter VariousGroups story", () => {
        CypressMountWithProviders(<stories.VariousGroups />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter Validations story", () => {
        CypressMountWithProviders(<stories.Validations />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter ValidationsStringComponent story", () => {
        CypressMountWithProviders(<stories.ValidationsStringComponent />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter ValidationsStringLabel story", () => {
        CypressMountWithProviders(<stories.ValidationsStringLabel />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter ValidationsBoolean story", () => {
        CypressMountWithProviders(<stories.ValidationsBoolean />);

        cy.checkAccessibility();
      });

      it("should pass accessibility tests for Groupcharacter ValidationsRedesign story", () => {
        CypressMountWithProviders(<stories.ValidationsRedesign />);

        cy.checkAccessibility();
      });
      // FE-4639
      describe.skip("should render Groupcharacter component", () => {
        it("should pass accessibility tests for Groupcharacter ValidationsTooltip story", () => {
          CypressMountWithProviders(<stories.ValidationsTooltip />);

          cy.checkAccessibility();
        });

        it("should pass accessibility tests for Groupcharacter ValidationsTooltipLabel story", () => {
          CypressMountWithProviders(<stories.ValidationsTooltipLabel />);

          cy.checkAccessibility();
        });
      });
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<GroupedCharacterComponent />);
    getElement("input").should("have.css", "border-radius", "4px");
  });
});
