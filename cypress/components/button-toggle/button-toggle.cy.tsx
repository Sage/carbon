/* eslint-disable no-unused-expressions, jest/valid-expect, jest/valid-expect-in-promise */
import React from "react";
import {
  ButtonToggle,
  ButtonToggleProps,
} from "../../../src/components/button-toggle";
import { ButtonToggleComponent } from "../../../src/components/button-toggle/button-toggle-test.stories";
import * as stories from "../../../src/components/button-toggle/button-toggle-group/button-toggle-group-test.stories";
import {
  buttonTogglePreview,
  buttonToggleButton,
} from "../../locators/button-toggle";
import {
  buttonToggleGroup,
  buttonToggleGroupHelp,
  buttonToggleGroupHelpIcon,
} from "../../locators/button-toggle-group";
import { icon, getDataElementByValue } from "../../locators";
import { positionOfElement } from "../../support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import {
  assertCssValueIsApproximately,
  checkGoldenOutline,
} from "../../support/component-helper/common-steps";

const testPropValue = CHARACTERS.STANDARD;

context("Testing Button-Toggle component", () => {
  describe("should render Button-Toggle component", () => {
    describe("when focused", () => {
      it("should have the expected styling when opt out flag is true", () => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent />,
          undefined,
          undefined,
          {
            focusRedesignOptOut: true,
          }
        );

        buttonToggleButton()
          .eq(0)
          .focus()
          .then(($el) => {
            checkGoldenOutline($el);
          });
        buttonToggleButton()
          .eq(1)
          .focus()
          .then(($el) => {
            checkGoldenOutline($el);
          });
        buttonToggleButton()
          .eq(2)
          .focus()
          .then(($el) => {
            checkGoldenOutline($el);
          });
      });

      it("should have the expected styling when opt out flag is false", () => {
        CypressMountWithProviders(<stories.ButtonToggleGroupComponent />);

        buttonToggleButton()
          .eq(0)
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

        buttonToggleButton()
          .eq(1)
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

        buttonToggleButton()
          .eq(2)
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
      });
    });

    describe("rounded corners", () => {
      it("has the expected border-radius styling on a single toggle button", () => {
        CypressMountWithProviders(
          <ButtonToggleComponent>Foo</ButtonToggleComponent>
        );

        buttonToggleButton().each((el) =>
          expect(el.css("border-radius")).equals("4px")
        );
      });

      it("should have the expected border-radius styling when the children have the grouped prop set", () => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponentGroupedChildren />
        );

        buttonToggleButton()
          .eq(0)
          .should("have.css", "border-radius", "4px 0px 0px 4px");
        buttonToggleButton().eq(1).should("have.css", "border-radius", "0px");
        buttonToggleButton()
          .eq(2)
          .should("have.css", "border-radius", "0px 4px 4px 0px");
      });

      it("should have the expected border-radius styling when children do not have grouped prop set", () => {
        CypressMountWithProviders(<stories.ButtonToggleGroupComponent />);

        buttonToggleButton().eq(0).should("have.css", "border-radius", "4px");
        buttonToggleButton().eq(1).should("have.css", "border-radius", "4px");
        buttonToggleButton().eq(2).should("have.css", "border-radius", "4px");
      });
    });

    it("should render Button-Toggle with aria-label prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-label="cypress-aria" />
      );

      buttonToggleButton().should("have.attr", "aria-label", "cypress-aria");
    });

    it("should render Button-Toggle with aria-labelledby prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-labelledby={CHARACTERS.STANDARD} />
      );

      buttonToggleButton().should(
        "have.attr",
        "aria-labelledby",
        CHARACTERS.STANDARD
      );
    });

    it.each([
      [true, "true"],
      [false, "false"],
    ])(
      "should check when pressed prop is %s that Button-Toggle has aria-pressed attribute %s",
      (state, ariaPressed) => {
        CypressMountWithProviders(<ButtonToggleComponent pressed={state} />);

        buttonToggleButton().should("have.attr", "aria-pressed", ariaPressed);
      }
    );

    it("should render Button-Toggle with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-component={CHARACTERS.STANDARD} />
      );

      buttonToggleButton()
        .parent()
        .should("have.attr", "data-component", CHARACTERS.STANDARD);
    });

    it("should render Button-Toggle with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-element={CHARACTERS.STANDARD} />
      );

      buttonToggleButton()
        .parent()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Button-Toggle with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-role={CHARACTERS.STANDARD} />
      );

      buttonToggleButton()
        .parent()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ] as [ButtonToggleProps["size"], number][])(
      "should check when prop is %s that Button-Toggle height is %s",
      (size, height) => {
        CypressMountWithProviders(
          <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
        );

        buttonTogglePreview().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
        });
      }
    );

    it.each(["add", "share", "tick"] as ButtonToggleProps["buttonIcon"][])(
      "should check that Button-Toggle has %s icon",
      (type) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        icon().should("have.attr", "type", type);
      }
    );

    it.each([
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
    ] as ButtonToggleProps["buttonIconSize"][])(
      "should check that Button-Toggle icon size is %s",
      (iconSize) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon="tick" buttonIconSize={iconSize}>
            {" "}
            {iconSize}
          </ButtonToggleComponent>
        );

        icon()
          .should("have.attr", "font-size", iconSize)
          .and("have.attr", "type", "tick");
      }
    );

    it.each([
      [true, "-1px"],
      [false, "8px"],
    ])(
      "should render Button-Toggle when Grouped prop is %s with margin-left value of %s",
      (state, margin) => {
        CypressMountWithProviders(<ButtonToggleComponent grouped={state} />);

        buttonTogglePreview()
          .eq(positionOfElement("second"))
          .should("have.css", "margin-left", margin);
      }
    );

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "should check Button-Toggle text is %s when Children prop is set to %s",
      (labelText) => {
        CypressMountWithProviders(<ButtonToggle>{labelText}</ButtonToggle>);

        buttonToggleButton().should("have.text", labelText);
      }
    );

    it("should render Button-Toggle with Value set to cypress_data", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent value={CHARACTERS.STANDARD} />
      );

      buttonToggleButton().should("have.attr", "value", CHARACTERS.STANDARD);
    });
  });

  describe("should render Button-Toggle component for event tests", () => {
    it("should render Button-Toggle disabled", () => {
      const callback: ButtonToggleProps["onClick"] = cy.stub();

      CypressMountWithProviders(<ButtonToggleComponent disabled />);

      buttonToggleButton().should("have.attr", "disabled");
      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          expect(callback).not.to.have.been.called;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: ButtonToggleProps["onFocus"] = cy.stub();

      CypressMountWithProviders(<ButtonToggleComponent onFocus={callback} />);

      buttonToggleButton()
        .eq(positionOfElement("first"))
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: ButtonToggleProps["onBlur"] = cy.stub();

      CypressMountWithProviders(<ButtonToggleComponent onBlur={callback} />);

      buttonToggleButton().eq(positionOfElement("first")).focus();

      buttonToggleButton()
        .eq(positionOfElement("first"))
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Button-Toggle component", () => {
    it("should pass accessibility tests for Button-Toggle default story", () => {
      CypressMountWithProviders(<ButtonToggleComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle disabled", () => {
      CypressMountWithProviders(<ButtonToggleComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle grouped", () => {
      CypressMountWithProviders(<ButtonToggleComponent grouped />);

      cy.checkAccessibility();
    });

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ] as [ButtonToggleProps["size"], number][])(
      "should pass accessibility tests for Button-Toggle %s",
      (size) => {
        CypressMountWithProviders(
          <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
        );

        cy.checkAccessibility();
      }
    );

    it.each(["add", "share", "tick"] as ButtonToggleProps["buttonIcon"][])(
      "should pass accessibility tests for Button-Toggle with %s icon",
      (type) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        cy.checkAccessibility();
      }
    );
  });
});

context("Testing Button-Toggle-Group component", () => {
  describe("should render Button-Toggle-Group component", () => {
    it("should render Button-Toggle-Group with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-component={testPropValue} />
      );

      buttonToggleGroupHelp()
        .prev()
        .find('[role="group"]')
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Button-Toggle-Group with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-element={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-element", testPropValue);
    });

    it("should render Button-Toggle-Group with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-role={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-role", testPropValue);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should render Button-Toggle-Group with %s as label", (labelText) => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent label={labelText} />
      );

      buttonToggleGroup().parent().prev().should("contain.text", labelText);
    });

    it("should render Button-Toggle-Group with tooltip set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent labelHelp={testPropValue} />
      );

      buttonToggleGroup()
        .parent()
        .prev()
        .find('[data-element="question"]')
        .realHover();
      getDataElementByValue("tooltip")
        .should("be.visible")
        .and("has.text", testPropValue);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "should render Button-Toggle-Group with %s as field help text",
      (fieldHelpText) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent fieldHelp={fieldHelpText} />
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
          <stories.ButtonToggleGroupComponent
            fieldHelp="fieldHelpText"
            fieldHelpInline={state}
          />
        );

        if (state === true) {
          buttonToggleGroup()
            .parent()
            .prev()
            .should("have.attr", "data-element", "help");
        } else {
          buttonToggleGroup()
            .parent()
            .parent()
            .next()
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
          <stories.ButtonToggleGroupComponent labelInline={state} />
        );

        if (state === true) {
          buttonToggleGroup()
            .parent()
            .prev()
            .should("have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "0px");
        } else {
          buttonToggleGroup()
            .parent()
            .prev()
            .should("not.have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "8px");
        }
      }
    );

    it("should render Button-Toggle-Group with second button toggle pressed", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      buttonToggleButton()
        .eq(positionOfElement("second"))
        .should("have.attr", "aria-pressed");
    });

    it.each([
      [25, 341],
      [50, 683],
      [100, 1366],
    ])(
      "should render Button-Toggle-Group with labelWidth prop of %s and width of %s",
      (labelWidth, width) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent inputWidth={labelWidth} />
        );

        buttonToggleButton()
          .parent()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", width);
          });
      }
    );

    it("should render Button-Toggle-Group with helpAriaLabel set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent helpAriaLabel={testPropValue} />
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
          <stories.ButtonToggleGroupComponent
            labelInline
            labelSpacing={spacing}
          />
        );

        buttonToggleGroup()
          .parent()
          .prev()
          .should("have.css", "padding-right", padding);
      }
    );
  });

  describe("should render Button-Toggle-Group component for event tests", () => {
    let callback: Cypress.Agent<sinon.SinonStub>;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent onChange={callback} />
      );

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback with undefined when a click event is triggered on the currently-selected button and the allowDeselect prop is true", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent
          onChange={callback}
          value="foo"
          allowDeselect
        />
      );

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          expect(callback.getCall(0).args[1]).to.equal(undefined);
        });
    });

    it("should only allow the first button to be tabbed to when no buttons are selected", () => {
      CypressMountWithProviders(<stories.WithOutsideButtons />);

      cy.get("#button-before").focus();
      cy.get("#button-before").tab();
      buttonToggleButton().eq(positionOfElement("first")).should("be.focused");

      cy.focused().tab();

      cy.get("#button-after").should("be.focused");
    });

    it("should only allow the first button to be shift-tabbed to when no buttons are selected", () => {
      CypressMountWithProviders(<stories.WithOutsideButtons />);

      cy.get("#button-after").focus();
      cy.focused().tab({ shift: true });

      buttonToggleButton().eq(positionOfElement("first")).should("be.focused");

      cy.focused().tab({ shift: true });

      cy.get("#button-before").should("be.focused");
    });

    it("should only allow the selected button to be tabbed to when one is selected", () => {
      CypressMountWithProviders(<stories.WithOutsideButtons />);

      buttonTogglePreview().eq(positionOfElement("second")).click();

      cy.get("#button-before").focus();
      cy.get("#button-before").tab();

      buttonToggleButton().eq(positionOfElement("second")).should("be.focused");

      cy.focused().tab();

      cy.get("#button-after").should("be.focused");
    });

    it("should only allow the selected button to be shift-tabbed to when one is selected", () => {
      CypressMountWithProviders(<stories.WithOutsideButtons />);

      buttonTogglePreview().eq(positionOfElement("second")).click();

      cy.get("#button-after").focus();
      cy.focused().tab({ shift: true });

      buttonToggleButton().eq(positionOfElement("second")).should("be.focused");

      cy.focused().tab({ shift: true });

      cy.get("#button-before").should("be.focused");
    });

    it("should cycle through the buttons in the group when using the right arrow key", () => {
      CypressMountWithProviders(<stories.ButtonToggleGroupComponent />);

      buttonToggleButton()
        .eq(positionOfElement("first"))
        .click()
        .realPress("ArrowRight")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("second"))
            .should("be.focused");
        })
        .realPress("ArrowRight")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("third"))
            .should("be.focused");
        })
        .realPress("ArrowRight")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("first"))
            .should("be.focused");
        });
    });

    it("should cycle through the buttons in the group, selecting each one, when using the left arrow key", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent onChange={callback} />
      );

      buttonToggleButton()
        .eq(positionOfElement("first"))
        .click()
        .realPress("ArrowLeft")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("third"))
            .should("be.focused");
        })
        .realPress("ArrowLeft")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("second"))
            .should("be.focused");
        })
        .realPress("ArrowLeft")
        .then(() => {
          buttonToggleButton()
            .eq(positionOfElement("first"))
            .should("be.focused");
        });
    });
  });

  describe("should make css changes when fullWidth prop is passed", () => {
    it("container div should auto flex", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent fullWidth />
      );

      buttonTogglePreview().should("have.css", "flex", "1 1 auto");
    });

    it("width of label should be 100% / 450px", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent fullWidth />
      );

      buttonToggleButton()
        .eq(0)
        .then(($el) => {
          assertCssValueIsApproximately($el, "width", 450);
        });
    });
  });

  describe("Accessibility tests for Button-Toggle-Group component", () => {
    it("should pass accessibility tests for Button-Toggle-Group default story", () => {
      CypressMountWithProviders(<stories.ButtonToggleGroupComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle-Group with second button toggle checked", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      cy.checkAccessibility();
    });

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should pass accessibility tests for Button-Toggle-Group with label %s if labelInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent labelInline={state} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["left", "right"])(
      "should pass accessibility tests for Button-Toggle-Group with label inline and %s aligned",
      (alignment) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelAlign={alignment}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([1, 2])(
      "should pass accessibility tests for Button-Toggle-Group with labelSpacing prop set to %s",
      (padding, spacing) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelSpacing={spacing}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["error", "Error Message", "", ""],
      ["warning", "", "Warning Message", ""],
      ["info", "", "", "Info Message"],
    ])(
      "should pass accessibility tests for Button-Toggle-Group with %s icon",
      (prop, errorMessage, warningMessage, infoMessage) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            error={errorMessage}
            warning={warningMessage}
            info={infoMessage}
          />
        );

        cy.checkAccessibility();
      }
    );
  });
});
