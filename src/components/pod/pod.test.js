import * as React from "react";
import Pod from "./pod.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import Content from "../content";

import {
  podBlock,
  podComponent,
  divPodComponent,
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

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
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
      {...props}
    >
      Soft delete state
    </Pod>
  );
};

const PodWithSoftDelete = () => (
  <Pod softDelete onUndo={() => {}}>
    Content
    <Content>More content</Content>
  </Pod>
);

context("Testing Pod component", () => {
  describe("should render Pod component", () => {
    it.each([
      [true, "0px none rgb(0, 0, 0)"],
      [false, "0px none rgb(0, 0, 0)"],
    ])(
      "should check when border is %s the border value is %s for Pod component ",
      (boolVal, border) => {
        CypressMountWithProviders(<PodComponent border={boolVal} />);
        podComponent().should("have.css", "border", border);
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
      ["none", "89", "45.5625"],
      ["extra-small", "121", "61.5625"],
      ["small", "121", "61.5625"],
      ["medium", "137", "77.5625"],
      ["large", "185", "93.5625"],
      ["extra-large", "217", "125.5625"],
    ])("should check %s size for Pod component", (size, height, width) => {
      CypressMountWithProviders(<PodComponent size={size} />);
      divPodComponent()
        .should("have.css", "height", `${height}px`)
        .and("have.css", "width", `${width}px`);
    });

    it.each([
      ["primary", "rgb(255, 255, 255)", "none"],
      ["secondary", "rgb(242, 245, 246)", "none"],
      ["tertiary", "rgb(237, 241, 242)", "none"],
      ["tile", "rgb(255, 255, 255)", "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px"],
      ["transparent", "rgba(0, 0, 0, 0)", "none"],
    ])(
      "should check for %s variant pod, the color is %s and boxShadow is %s",
      (variant, color, boxShadow) => {
        CypressMountWithProviders(<PodComponent variant={variant} />);
        divPodComponent()
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
      "should check when title alignment is %s for Pod component",
      (alignTitle) => {
        CypressMountWithProviders(<PodComponent alignTitle={alignTitle} />);
        podTitle().should("have.css", "text-align", alignTitle);
      }
    );

    it.each(specialCharacters)(
      "should check footer as %s for Pod component",
      (footerText) => {
        CypressMountWithProviders(<PodComponent footer={footerText} />);
        podFooter().should("have.text", footerText).and("be.visible");
      }
    );

    it.each([
      [false, "not.exist"],
      [true, "be.visible"],
    ])(
      "should check when softDelete is %s for Pod component",
      (boolVal, state) => {
        CypressMountWithProviders(
          <SoftDeletePodComponent softDelete={boolVal} />
        );
        podSoftDelete().should(state);
      }
    );

    it.each([
      [false, "77.5625"],
      [true, "1292"],
    ])(
      "should check when editContentFullWidth is %s for Pod component",
      (boolVal, width) => {
        CypressMountWithProviders(
          <PodComponent editContentFullWidth={boolVal} />
        );
        divPodComponent().should("have.css", "width", `${width}px`);
      }
    );

    it.each([true, false])(
      "should check when displayEditButtonOnHover is %s for Pod component",
      (boolVal) => {
        CypressMountWithProviders(
          <PodComponent displayEditButtonOnHover={boolVal} />
        );
        if (boolVal === true) {
          podContent().click();
          podEditContainer().should("be.visible");
          podDelete().should("not.be.visible");
        } else {
          podDelete().should("be.visible");
        }
      }
    );

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
      [true, "1350", "rgba(0, 0, 0, 0)"],
      [false, "77.5625", "rgb(0, 103, 56)"],
    ])(
      "should check the width value when internalEditButton is %s for Pod component",
      (boolVal, width, color) => {
        CypressMountWithProviders(
          <PodComponent internalEditButton={boolVal} />
        );
        divPodComponent().should("have.css", "width", `${width}px`);
        podEdit().realHover().and("have.css", "background-color", color);
        divPodComponent().should(
          "have.css",
          "background-color",
          "rgb(217, 224, 228)"
        );
      }
    );

    it.each(["100px", "200px", "300px"])(
      "should check when internalEditButton is %s for Pod component",
      (height) => {
        CypressMountWithProviders(<PodComponent height={height} />);
        podComponent().should("have.css", "height", height);
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
        CypressMountWithProviders(
          <SoftDeletePodComponent softDelete onUndo={callback} />
        );
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

        CypressMountWithProviders(<PodWithSoftDelete />);

        podBlock().should("have.css", "background-color", blockBackgroundColor);
      });

      it("renders text of children with correct colours", () => {
        const childrenColor = "rgba(0, 0, 0, 0.65)";

        CypressMountWithProviders(<PodWithSoftDelete />);

        cy.contains("Content").should("have.css", "color", childrenColor);
        cy.contains("More content").should("have.css", "color", childrenColor);
      });
    });
  });
});
