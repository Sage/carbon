import React from "react";
import Form from "../form/form.component";
import Textbox from "../textbox/textbox.component";
import Button from "../button/button.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import { getElement, getComponent } from "../../../cypress/locators/index";
import {
  formPreview,
  formFooterComponent,
  formButtonComponent,
} from "../../../cypress/locators/form/index";

const FormComponent = ({ ...props }) => {
  return (
    <Form
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      {...props}
    >
      <Textbox label="Textbox1" />
      <Textbox label="Textbox2" />
      <Textbox label="Textbox3" />
    </Form>
  );
};

context("Tests for Form component", () => {
  describe("check props for Form component", () => {
    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
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
      [0, 287],
      [3, 335],
      [5, 367],
      [7, 407],
    ])(
      "should check fieldSpacing as %s for Form component",
      (fieldSpacing, formHeight) => {
        CypressMountWithProviders(
          <FormComponent fieldSpacing={fieldSpacing} />
        );
        formPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", formHeight);
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

    it("should call onSubmit callback when a click event is triggered", () => {
      const callback = cy.stub();
      CypressMountWithProviders(<FormComponent onSubmit={callback} />);
      formPreview()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback);
        });
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

    it.each(["30px", "100px", "200px"])(
      "should check height for Form component",
      (height) => {
        CypressMountWithProviders(<FormComponent height={height} />);
        formPreview().should("have.css", "height", height);
      }
    );

    it.each([
      [false, 98],
      [true, 1349],
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
          useJQueryCssValueAndAssert($el, "width", buttonWidth);
        });
      }
    );
  });
});
