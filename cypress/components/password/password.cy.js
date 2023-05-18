import React from "react";
import Password from "../../../src/components/password/password.component";
import * as stories from "../../../src/components/password/password.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  fieldHelpPreview,
  getDataElementByValue,
  getElement,
  tooltipPreview,
  commonDataElementInputPreview,
  icon,
} from "../../locators/index";
import { buttonMinorComponent } from "../../locators/button";
import { verifyRequiredAsteriskForLabel } from "../../support/component-helper/common-steps";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const transparent = "rgba(0, 0, 0, 0)";
const colorsActionMinor500 = "rgb(51, 91, 112)";
const colorsUtilityMajor300 = "rgb(102, 132, 148)";

// eslint-disable-next-line react/prop-types
const PasswordComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("test");

  const setValue = (ev) => {
    setState(ev.target.value);
    if (onChange) {
      onChange(ev);
    }
  };

  return (
    <Password label="Password" value={state} onChange={setValue} {...props} />
  );
};

context("Tests for Password component", () => {
  describe("check Password specific props", () => {
    it("default input type should be password", () => {
      CypressMountWithProviders(<PasswordComponent />);

      getDataElementByValue("input")
        .eq(0)
        .should("have.attr", "type", "password");
    });

    it("when 'forceObscurity' is 'true', input type should be password", () => {
      CypressMountWithProviders(<PasswordComponent forceObscurity />);

      getDataElementByValue("input")
        .eq(0)
        .should("have.attr", "type", "password");
    });

    it("input type should change from password to text on click", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .click()
        .then(() => {
          getDataElementByValue("input")
            .eq(0)
            .should("have.attr", "type", "text");
        });
    });

    it("autoComplete attribute is 'off'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      getDataElementByValue("input")
        .eq(0)
        .should("have.attr", "autoComplete", "off");
    });
  });

  describe("disabled checks", () => {
    it("input should be disabled", () => {
      CypressMountWithProviders(<PasswordComponent disabled />);

      getDataElementByValue("input")
        .eq(0)
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("button should be disabled", () => {
      CypressMountWithProviders(<PasswordComponent disabled />);

      buttonMinorComponent().should("be.disabled").and("have.attr", "disabled");
    });

    it("when 'forceObscurity' is 'true', button should be disabled", () => {
      CypressMountWithProviders(<PasswordComponent forceObscurity />);

      buttonMinorComponent().should("be.disabled").and("have.attr", "disabled");
    });
  });

  describe("check buttonMinor specific props", () => {
    it("aria-controls attribute is correct'", () => {
      CypressMountWithProviders(<PasswordComponent id="baz" />);

      buttonMinorComponent().should("have.attr", "aria-controls", "baz");
    });

    it("default iconType should be 'view'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      icon().should("have.attr", "type", "view");
    });

    it("iconType should change from 'view' to 'hide' onClick", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .click()
        .then(() => {
          icon().should("have.attr", "type", "hide");
        });
    });

    it("default iconPosition should be 'before'", () => {
      CypressMountWithProviders(<PasswordComponent />);
      icon().should("have.css", "margin-right", "8px");
    });

    it("default size should be 'small'", () => {
      CypressMountWithProviders(<PasswordComponent />);
      buttonMinorComponent().should("have.css", "min-height", "32px");
    });

    it("default label should be 'Show'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent().contains("Show");
    });

    it("label should change from 'Show' to 'Hide' onClick", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .click()
        .then(() => {
          buttonMinorComponent().contains("Hide");
        });
    });

    it("default aria-label should be 'Show password'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent().should("have.attr", "aria-label", "Show password");
    });

    it("aria-label should change from 'Show password' to 'Hide password' onClick", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .click()
        .then(() => {
          buttonMinorComponent().should(
            "have.attr",
            "aria-label",
            "Hide password"
          );
        });
    });

    it("buttonType is 'tertiary', when in password default styling should be correct", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .should("be.visible")
        .and("have.css", "background-color", transparent)
        .and("have.css", "color", colorsActionMinor500);
      buttonMinorComponent()
        .getDesignTokensByCssProperty("color")
        .should(($el) => {
          expect($el[1]).to.deep.equal("--colorsActionMinor500");
        });
    });

    it("buttonType is 'tertiary', when in password default styling should be correct onHover", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .realHover()
        .then(() => {
          buttonMinorComponent()
            .should("be.visible")
            .and("have.css", "background-color", transparent)
            .and("have.css", "color", colorsActionMinor500);
          buttonMinorComponent()
            .getDesignTokensByCssProperty("color")
            .then(($el) => {
              expect($el[2]).to.equal("--colorsActionMinor500");
            });
        });
    });

    it("icon color is 'colorsActionMajorYang300'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      icon()
        .should("be.visible")
        .and("have.css", "color", colorsUtilityMajor300);
      icon()
        .getDesignTokensByCssProperty("color")
        .should(($el) => {
          expect($el[3]).to.equal("--colorsUtilityMajor300");
        });
    });

    it("icon color is 'colorsActionMajorYang300' onHover'", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .realHover()
        .then(() => {
          icon()
            .should("be.visible")
            .and("have.css", "color", colorsUtilityMajor300);
          icon()
            .getDesignTokensByCssProperty("color")
            .should(($el) => {
              expect($el[4]).to.equal("--colorsUtilityMajor300");
            });
        });
    });
  });

  describe("aria-live region checks", () => {
    it("when password is hidden, aria-live region should contain the correct text", () => {
      CypressMountWithProviders(<PasswordComponent />);

      cy.get("p").contains("Your Password is currently hidden.");
    });

    it("when user clicks to show password, aria-live region should contain the correct text", () => {
      CypressMountWithProviders(<PasswordComponent />);

      buttonMinorComponent()
        .click()
        .then(() => {
          cy.get("p").contains(
            "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so."
          );
        });
    });

    it("aria-live region text should be visually hidden", () => {
      CypressMountWithProviders(<PasswordComponent />);

      cy.get("p")
        .should("be.visible")
        .and("have.css", "border", "0px none rgba(0, 0, 0, 0.9)")
        .and("have.css", "height", "1px")
        .and("have.css", "margin", "-1px")
        .and("have.css", "overflow", "hidden")
        .and("have.css", "padding", "0px")
        .and("have.css", "position", "absolute")
        .and("have.css", "width", "1px");
    });
  });

  describe("check props for Textbox props for Password component", () => {
    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ])(
      "should use %s as size and render it with %s as height",
      (size, height) => {
        CypressMountWithProviders(<PasswordComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it.each(specialCharacters)(
      "should check label renders properly with %s as specific value",
      (specificValue) => {
        CypressMountWithProviders(<PasswordComponent label={specificValue} />);

        getDataElementByValue("label")
          .first()
          .should("have.text", specificValue);
      }
    );

    it.each(specialCharacters)(
      "should check fieldHelp renders properly with %s specific value",
      (specificValue) => {
        CypressMountWithProviders(
          <PasswordComponent fieldHelp={specificValue} />
        );

        fieldHelpPreview().should("have.text", specificValue);
      }
    );

    it.each(specialCharacters)(
      "should check tooltip renders properly with %s specific values",
      (specificValue) => {
        CypressMountWithProviders(
          <PasswordComponent labelHelp={specificValue} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", specificValue);
      }
    );

    it("should check add icon inside of the Password component renders", () => {
      CypressMountWithProviders(<PasswordComponent inputIcon="add" />);

      getDataElementByValue("add").should("be.visible");
    });

    it("should check the Password component is disabled", () => {
      CypressMountWithProviders(<PasswordComponent disabled />);

      commonDataElementInputPreview().parent().should("have.attr", "disabled");
      commonDataElementInputPreview().should("be.disabled");
    });

    it("should check the Password component is required", () => {
      CypressMountWithProviders(<PasswordComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check the Password component has autofocus", () => {
      CypressMountWithProviders(<PasswordComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with %s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <PasswordComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for Password component",
      (maxWidth) => {
        CypressMountWithProviders(<PasswordComponent maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<PasswordComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });
  });

  describe("Accessibility tests for Password component", () => {
    it("should pass accessibility tests for Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for AutoFocus story", () => {
      CypressMountWithProviders(<stories.AutoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for CharacterCounter story", () => {
      CypressMountWithProviders(<stories.CharacterCounter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Disabled story", () => {
      CypressMountWithProviders(<stories.Disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ForceObscurity story", () => {
      CypressMountWithProviders(<stories.ForceObscurity />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InputHint story", () => {
      CypressMountWithProviders(<stories.InputHint />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Margins story", () => {
      CypressMountWithProviders(<stories.Margins />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NewDesignsValidation story", () => {
      CypressMountWithProviders(<stories.NewDesignsValidation />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Prefix story", () => {
      CypressMountWithProviders(<stories.Prefix />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ReadOnly story", () => {
      CypressMountWithProviders(<stories.ReadOnly />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius styling on input", () => {
    CypressMountWithProviders(<stories.Default />);
    getElement("input").should("have.css", "border-radius", "4px");
  });
});
