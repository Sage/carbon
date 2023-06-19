import React from "react";
import Form, { FormProps } from "../../../src/components/form";
import { FormComponent } from "../../../src/components/form/form-test.stories";
import Textbox from "../../../src/components/textbox";
import Button from "../../../src/components/button";
import * as stories from "../../../src/components/form/form.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import { getElement, getComponent } from "../../locators/index";
import {
  formPreview,
  formFooterComponent,
  formButtonComponent,
} from "../../locators/form/index";
import { dataComponentButtonByText } from "../../locators/pages";

context("Tests for Form component", () => {
  describe("check props for Form component", () => {
    it.each([
      ["left", "start"],
      ["right", "end"],
    ] as [FormProps["buttonAlignment"], string][])(
      "should check buttonAlignment set as %s for Form component",
      (buttonAlignment, webkitAlign) => {
        CypressMountWithProviders(
          <FormComponent buttonAlignment={buttonAlignment} />
        );
        formFooterComponent().should(
          "have.css",
          "-webkit-box-pack",
          webkitAlign
        );
      }
    );

    it("should check children for Form component", () => {
      CypressMountWithProviders(
        <Form>
          <Textbox label="Textbox" />
        </Form>
      );
      getElement("input").should("be.visible");
    });

    it.each([3, 11, 9])(
      "should check errorCount as %s for Form component",
      (errorCount) => {
        CypressMountWithProviders(<FormComponent errorCount={errorCount} />);
        getElement("errors")
          .should("have.css", "color", "rgb(162, 44, 59)")
          .and("have.text", `${errorCount} errors`)
          .and("be.visible");
      }
    );

    it.each([
      [0, 281],
      [3, 329],
      [5, 361],
      [7, 401],
    ] as [FormProps["fieldSpacing"], number][])(
      "should check fieldSpacing as %s for Form component",
      (fieldSpacing, formHeight) => {
        CypressMountWithProviders(
          <FormComponent fieldSpacing={fieldSpacing} />
        );
        formPreview().then(($el) => {
          assertCssValueIsApproximately($el, "height", formHeight);
        });
      }
    );

    it("should check leftSideButtons for Form component", () => {
      CypressMountWithProviders(
        <FormComponent
          leftSideButtons={
            <Button onClick={() => {}} ml={2}>
              Cancel
            </Button>
          }
        />
      );
      formButtonComponent()
        .eq(0)
        .should("have.text", "Cancel")
        .and("be.visible");
    });

    it.each([true, false])(
      "should check noValidate set as %s for Form component",
      (noValidate) => {
        CypressMountWithProviders(<FormComponent noValidate={noValidate} />);

        if (noValidate) {
          formPreview().should("have.attr", "noValidate");
        } else {
          formPreview().should("not.have.attr", "noValidate");
        }
      }
    );

    it("should call onSubmit callback, when onSubmit prop is passed and save button is triggered", () => {
      const onSubmit: FormProps["onSubmit"] = (event) => {
        event.preventDefault(); // this prevents the default reloading behaviour
      };

      const onSubmitSpy = cy.spy(onSubmit).as("onSubmitSpy");

      CypressMountWithProviders(
        <FormComponent
          onSubmit={onSubmitSpy}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        />
      );

      cy.contains("Save").click();
      cy.get("@onSubmitSpy").should("have.been.called");
    });

    it("should check rightSideButtons for Form component", () => {
      CypressMountWithProviders(
        <FormComponent
          rightSideButtons={
            <Button onClick={() => {}} ml={2}>
              Other
            </Button>
          }
        />
      );
      formButtonComponent()
        .eq(1)
        .should("have.text", "Other")
        .and("be.visible");
    });

    it("should check saveButton for Form component", () => {
      CypressMountWithProviders(
        <Form
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" />
        </Form>
      );
      getComponent("button").should("be.visible").and("have.text", "Save");
    });

    it.each([
      [true, "rgba(0, 0, 0, 0.05) 0px -4px 12px 0px"],
      [false, "none"],
    ])(
      "should check when stickyFooter set as %s, the boxShadow value is %s for Form component",
      (bool, boxShadow) => {
        CypressMountWithProviders(<FormComponent stickyFooter={bool} />);
        formFooterComponent().should("have.css", "box-shadow", boxShadow);
      }
    );

    it.each([2, 4, 6])(
      "should check warningCount as %s for Form component",
      (warningCount) => {
        CypressMountWithProviders(
          <FormComponent warningCount={warningCount} />
        );
        getElement("warnings")
          .should("have.css", "color", "rgb(167, 72, 0)")
          .and("have.text", `${warningCount} warnings`)
          .and("be.visible");
      }
    );

    it.each([
      ["30px", 30],
      ["100px", 100],
      ["200px", 200],
    ])("should check height for Form component", (height, heightVal) => {
      CypressMountWithProviders(<FormComponent height={height} />);
      formPreview().then(($el) => {
        assertCssValueIsApproximately($el, "height", heightVal);
      });
    });

    it.each([
      [false, 98],
      [true, 1366],
    ])(
      "should check when fullWidthButtons set as %s, the buttonWidth is %s for Form component",
      (bool, buttonWidth) => {
        CypressMountWithProviders(
          <FormComponent
            fullWidthButtons={bool}
            saveButton={
              <Button buttonType="primary" type="submit" fullWidth>
                Submit
              </Button>
            }
          />
        );
        getComponent("button").then(($el) => {
          assertCssValueIsApproximately($el, "width", buttonWidth);
        });
      }
    );
  });

  describe("Accessibility tests for Form component", () => {
    it("should pass accessibility tests for DefaultWithStickyFooter story", () => {
      CypressMountWithProviders(<stories.DefaultWithStickyFooter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for FormAlignmentExample story", () => {
      CypressMountWithProviders(<stories.FormAlignmentExample />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InDialog story", () => {
      CypressMountWithProviders(<stories.InDialog />);

      dataComponentButtonByText("Open Preview").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InDialogFullScreen story", () => {
      CypressMountWithProviders(<stories.InDialogFullScreen />);

      dataComponentButtonByText("Open Preview").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InDialogFullScreenWithStickyFooter story", () => {
      CypressMountWithProviders(<stories.InDialogFullScreenWithStickyFooter />);

      dataComponentButtonByText("Open Preview").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InDialogWithStickyFooter story", () => {
      CypressMountWithProviders(<stories.InDialogWithStickyFooter />);

      dataComponentButtonByText("Open Preview").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for OverrideFieldSpacing story", () => {
      CypressMountWithProviders(<stories.OverrideFieldSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithAdditionalButtons story", () => {
      CypressMountWithProviders(<stories.WithAdditionalButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithBothErrorsAndWarningsSummary story", () => {
      CypressMountWithProviders(<stories.WithBothErrorsAndWarningsSummary />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithButtonsAlignedToTheLeft story", () => {
      CypressMountWithProviders(<stories.WithButtonsAlignedToTheLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithCustomFooterPadding story", () => {
      CypressMountWithProviders(<stories.WithCustomFooterPadding />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithDifferentSpacing story", () => {
      CypressMountWithProviders(<stories.WithDifferentSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithErrorsSummary story", () => {
      CypressMountWithProviders(<stories.WithErrorsSummary />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithFullWidthButtons story", () => {
      CypressMountWithProviders(<stories.WithFullWidthButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithLabelsInline story", () => {
      CypressMountWithProviders(<stories.WithLabelsInline />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithWarningsSummary story", () => {
      CypressMountWithProviders(<stories.WithWarningsSummary />);

      cy.checkAccessibility();
    });
  });
});
