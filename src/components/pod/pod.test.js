import React from "react";
import Pod from "./pod.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import Content from "../content";

import {
  podBlock,
  podComponent,
  podTitle,
  podSubTitle,
  podFooter,
  podSoftDelete,
  podContent,
  podEditContainer,
  podDelete,
  podUndo,
  podEdit,
} from "../../../cypress/locators/pod";

import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const PodComponent = ({ ...props }) => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      mb={3}
      {...props}
    />
  );
};

const SoftDeletePodComponent = ({ ...props }) => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      description="Description"
      footer="Footer"
      onUndo={() => {}}
      softDelete
      {...props}
    >
      Soft delete state
    </Pod>
  );
};

const SoftDeletePodWithChildren = () => (
  <Pod softDelete onUndo={() => {}}>
    Content
    <Content>More content</Content>
  </Pod>
);

context("Testing Pod component", () => {
  describe("should render Pod component", () => {
    it.each([
      [true, "1px solid rgb(204, 214, 219)"],
      [false, "0px none rgb(0, 0, 0)"],
    ])(
      "should check when border is %s the border value is %s for Pod component ",
      (boolVal, border) => {
        CypressMountWithProviders(<PodComponent border={boolVal} />);
        podBlock().should("have.css", "border", border);
      }
    );

    it.each(specialCharacters)(
      "should check children as %s for Pod component",
      (children) => {
        CypressMountWithProviders(<PodComponent>{children}</PodComponent>);
        podContent()
          .should("have.css", "text-align", "left")
          .contains(children);
      }
    );

    it.each(specialCharacters)(
      "should check className as %s for Pod component",
      (className) => {
        CypressMountWithProviders(<PodComponent className={className} />);
        podComponent().should("have.class", className);
      }
    );

    it.each([
      ["none", 88, 45],
      [SIZE.EXTRASMALL, 120, 61],
      [SIZE.SMALL, 120, 61],
      [SIZE.MEDIUM, 136, 77],
      [SIZE.LARGE, 184, 93],
      [SIZE.EXTRALARGE, 216, 125],
    ])(
      "should check %s size for Pod component when height is %s and width is %s",
      (size, height, width) => {
        CypressMountWithProviders(<PodComponent size={size} />);
        podBlock().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it.each([
      ["primary", "rgb(255, 255, 255)", "none"],
      ["secondary", "rgb(242, 245, 246)", "none"],
      ["tertiary", "rgb(237, 241, 242)", "none"],
      ["tile", "rgb(255, 255, 255)", "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px"],
      ["transparent", "rgba(0, 0, 0, 0)", "none"],
    ])(
      "should check %s variant for Pod component when the color is %s and boxShadow is %s",
      (variant, color, boxShadow) => {
        CypressMountWithProviders(<PodComponent variant={variant} />);
        podBlock()
          .should(
            "have.css",
            "back-ground",
            `${color} none repeat scroll 0% 0% / auto padding-box border-box`
          )
          .and("have.css", "box-shadow", boxShadow);
      }
    );

    it.each(specialCharacters)(
      "should check title as %s for Pod component",
      (title) => {
        CypressMountWithProviders(<PodComponent title={title} />);
        podTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should check subtitle as %s for Pod component",
      (subtitle) => {
        CypressMountWithProviders(<PodComponent subtitle={subtitle} />);
        podSubTitle().should("have.text", subtitle);
      }
    );

    it.each(["left", "center", "right"])(
      "should check title alignment for Pod component when text is aligned to the %s",
      (alignTitle) => {
        CypressMountWithProviders(<PodComponent alignTitle={alignTitle} />);
        podTitle().should("have.css", "text-align", alignTitle);
      }
    );

    it.each(specialCharacters)(
      "should check footer text as %s for Pod component",
      (footerText) => {
        CypressMountWithProviders(<PodComponent footer={footerText} />);
        podFooter().should("have.text", footerText).and("be.visible");
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check visibility of undo button when softDelete is %s",
      (boolVal, state) => {
        CypressMountWithProviders(
          <SoftDeletePodComponent softDelete={boolVal} />
        );
        podSoftDelete().should(state);
      }
    );

    it.each([
      [false, 77],
      [true, 1291],
    ])(
      "should check when editContentFullWidth is %s for Pod component",
      (boolVal, width) => {
        CypressMountWithProviders(
          <PodComponent editContentFullWidth={boolVal} />
        );
        podBlock().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it("should check edit button is only visible when user clicks on Pod component and displayEditButtonOnHover is true", () => {
      CypressMountWithProviders(<PodComponent displayEditButtonOnHover />);
      podEditContainer().should("not.be.visible");

      podContent().click();
      podEditContainer().should("be.visible");
      podDelete().should("not.be.visible");
    });

    it("should check edit and delete buttons are visible on first render when displayEditButtonOnHover is false", () => {
      CypressMountWithProviders(
        <PodComponent displayEditButtonOnHover={false} />
      );
      podEditContainer().should("be.visible");
      podDelete().should("be.visible");
    });

    it.each([
      [true, "rgb(0, 103, 56)"],
      [false, "rgb(255, 255, 255)"],
    ])(
      "should check when triggerEditOnContent is %s for Pod component",
      (boolVal, color) => {
        CypressMountWithProviders(
          <PodComponent triggerEditOnContent={boolVal} />
        );
        podBlock().realHover().and("have.css", "background-color", color);
        podEdit().should("have.css", "background-color", color);
      }
    );

    it.each([
      [true, 1349, "rgba(0, 0, 0, 0)"],
      [false, 77, "rgb(0, 103, 56)"],
    ])(
      "should check the width value when internalEditButton is %s for Pod component",
      (boolVal, width, color) => {
        CypressMountWithProviders(
          <PodComponent internalEditButton={boolVal} />
        );
        podBlock().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", width);
        });
        podEdit().realHover().and("have.css", "background-color", color);
        podBlock().should("have.css", "background-color", "rgb(217, 224, 228)");
      }
    );

    it.each([100, 200, 300])(
      "should render Pod component with correct height when height prop is %s",
      (height) => {
        CypressMountWithProviders(<PodComponent height={height} />);
        podComponent().should("have.css", "height", `${height}px`);
      }
    );

    describe("should render Pod component for event tests", () => {
      let callback;
      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onDelete callback when a click event is triggered for Pod component", () => {
        CypressMountWithProviders(<PodComponent onDelete={callback} />);
        podDelete()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onUndo callback when a click event is triggered for Pod component", () => {
        CypressMountWithProviders(<SoftDeletePodComponent onUndo={callback} />);
        podUndo()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });

    describe("When softDelete is true", () => {
      it("renders block with correct background colour", () => {
        const blockBackgroundColor = "rgb(230, 235, 237)";

        CypressMountWithProviders(<SoftDeletePodWithChildren />);

        podBlock().should("have.css", "background-color", blockBackgroundColor);
      });

      it("renders text of children with correct colours", () => {
        const childrenColor = "rgba(0, 0, 0, 0.65)";

        CypressMountWithProviders(<SoftDeletePodWithChildren />);

        cy.contains("Content").should("have.css", "color", childrenColor);
        cy.contains("More content").should("have.css", "color", childrenColor);
      });
    });
  });
});
