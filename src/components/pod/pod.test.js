import * as React from "react";
import Pod from "./pod.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  podComponent,
  podFooter,
  divPodComponent,
  podTitle,
  podSubTitle,
  podSoftDelete,
  podDelete,
  podUndo,
  podContent,
  podEditContainer,
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

context("Testing Pod component", () => {
  describe("should render Pod component", () => {
    it.each([
      [true, "0px none rgb(0, 0, 0)"],
      [false, "0px none rgb(0, 0, 0)"],
    ])(
      "should check when border is %s for Pod component",
      (boolVal, border) => {
        CypressMountWithProviders(<PodComponent border={boolVal} />);
        podComponent().should("have.css", "border", border);
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
      ["extra-small", "121px", "61.5625px"],
      ["small", "121px", "61.5625px"],
      ["medium", "137px", "77.5625px"],
      ["large", "185px", "93.5625px"],
      ["extra-large", "217px", "125.5625px"],
    ])("should check %s size for Pod component", (size, height, width) => {
      CypressMountWithProviders(<PodComponent size={size} />);
      divPodComponent()
        .should("have.css", "height", height)
        .and("have.css", "width", width);
    });

    it.each([
      [
        "primary",
        "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        "none",
      ],
      [
        "secondary",
        "rgb(242, 245, 246) none repeat scroll 0% 0% / auto padding-box border-box",
        "none",
      ],
      [
        "tertiary",
        "rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box",
        "none",
      ],
      [
        "tile",
        "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px",
      ],
      [
        "transparent",
        "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
        "none",
      ],
    ])(
      "should check %s variant for Pod component",
      (variant, color, boxShadow) => {
        CypressMountWithProviders(<PodComponent variant={variant} />);
        divPodComponent()
          .should("have.css", "back-ground", color)
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

    it.each(["100px", "200px", "300px"])(
      "should check when internalEditButton is %s for Pod component",
      (height) => {
        CypressMountWithProviders(<PodComponent height={height} />);
        podComponent().should("have.css", "height", height);
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
      [false, "77.5625px"],
      [true, "1292px"],
    ])(
      "should check when editContentFullWidth is %s for Pod component",
      (boolVal, width) => {
        CypressMountWithProviders(
          <PodComponent editContentFullWidth={boolVal} />
        );
        divPodComponent().should("have.css", "width", width);
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
      [true, "1350px"],
      [false, "77.5625px"],
    ])(
      "should check when internalEditButton is %s for Pod component",
      (boolVal, width) => {
        CypressMountWithProviders(
          <PodComponent internalEditButton={boolVal} />
        );
        divPodComponent().should("have.css", "width", width);
      }
    );
  });

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

    it.each([false, true])(
      "should check when triggerEditOnContent is %s for Pod component",
      (boolVal) => {
        CypressMountWithProviders(
          <PodComponent triggerEditOnContent={boolVal} />
        );
        if (boolVal === false) {
          podContent()
            .click()
            .then(() => {
              // eslint-disable-next-line no-unused-expressions
              expect(callback).to.not.have.been.calledOnce;
            });
        } else {
          podContent()
            .click()
            .then(() => {
              // eslint-disable-next-line no-unused-expressions
              expect(callback).not.to.have.been.calledOnce;
            });
        }
      }
    );
  });
});
