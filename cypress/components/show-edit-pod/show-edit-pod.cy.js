import React from "react";
import ShowEditPod from "../../../src/components/show-edit-pod";
import Textbox from "../../../src/components/textbox";
import Content from "../../../src/components/content";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  showEditPod,
  showEditPodBlock,
  showEditPodContentForm,
  showEditPodHideDeleteButton,
  showEditPodFormFooter,
  showEditPodCancelButton,
  showEditPodSaveButton,
  showEditPodDeleteButton,
  showEditPodTitle,
  showEditPodEditButton,
  showEditPodUndoButton,
  showEditPodTransitionName,
} from "../../locators/show-edit-pod";

import { contentPreview } from "../../locators/content";

import { getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { checkOutlineCss } from "../../support/component-helper/common-steps";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const ShowEditPodComponent = ({ ...props }) => {
  return (
    <ShowEditPod
      title="Title"
      onEdit={() => {}}
      onDelete={() => {}}
      saveText="Save"
      deleteText="Delete"
      cancelText="Cancel"
      editFields={<Textbox label="Field" labelInline labelAlign="right" />}
      {...props}
    />
  );
};

const UndoShowEditPodComponent = ({ ...props }) => {
  return (
    <ShowEditPod title="With borders" onUndo={() => {}} softDelete {...props} />
  );
};

context("Testing ShowEditPod component", () => {
  describe("should render ShowEditPod component", () => {
    it.each([
      ["primary", "rgb(255, 255, 255)", "none"],
      ["secondary", "rgb(242, 245, 246)", "none"],
      ["tertiary", "rgb(237, 241, 242)", "none"],
      ["tile", "rgb(255, 255, 255)", "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px"],
      ["transparent", "rgba(0, 0, 0, 0)", "none"],
    ])(
      "should check %s variant for ShowEditPod component",
      (variant, color, boxShadow) => {
        CypressMountWithProviders(<ShowEditPodComponent variant={variant} />);
        showEditPodBlock()
          .should("have.css", "background-color", color)
          .and("have.css", "box-shadow", boxShadow);
      }
    );

    it.each([
      [true, 1, "solid", "rgb(204, 214, 219)"],
      [false, 0, "none", "rgba(0, 0, 0, 0.9)"],
    ])(
      "should check when border is %s for ShowEditPod component",
      (boolVal, borderWidth, borderStyle, borderColor) => {
        CypressMountWithProviders(<ShowEditPodComponent border={boolVal} />);
        showEditPodBlock().then((elem) => {
          checkOutlineCss(
            elem,
            borderWidth,
            "border",
            borderStyle,
            borderColor
          );
        });
      }
    );

    it.each(specialCharacters)(
      "should check children as %s for ShowEditPod component",
      (children) => {
        CypressMountWithProviders(
          <ShowEditPodComponent>
            {" "}
            <Content title="Content title">{children}</Content>{" "}
          </ShowEditPodComponent>
        );
        contentPreview().contains(children);
      }
    );

    it.each(specialCharacters)(
      "should check className as %s for ShowEditPod component",
      (className) => {
        CypressMountWithProviders(
          <ShowEditPodComponent className={className} />
        );
        showEditPod().should("have.class", className);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when editing is %s for ShowEditPod component",
      (boolVal, state) => {
        CypressMountWithProviders(<ShowEditPodComponent editing={boolVal} />);
        showEditPodContentForm().should(state);
      }
    );

    it.each([
      [false, "rgba(0, 0, 0, 0)", "not.exist"],
      [true, "rgb(230, 235, 237)", "be.visible"],
    ])(
      "should check when softDelete is %s for ShowEditPod component",
      (boolVal, backgroundColor, state) => {
        CypressMountWithProviders(
          <UndoShowEditPodComponent softDelete={boolVal} />
        );
        showEditPodBlock().should(
          "have.css",
          "background-color",
          backgroundColor
        );
        showEditPodUndoButton().should(state);
      }
    );

    it.each([
      [false, "be.visible"],
      [true, "not.exist"],
    ])(
      "should check when hideDeleteButtonInViewMode is %s for ShowEditPod component",
      (boolVal, state) => {
        CypressMountWithProviders(
          <ShowEditPodComponent hideDeleteButtonInViewMode={boolVal} />
        );
        showEditPodHideDeleteButton().should(state);
      }
    );

    it("should check editFields for textbox component", () => {
      CypressMountWithProviders(
        <ShowEditPodComponent editing editFields={<Textbox label="Field" />} />
      );
      getDataElementByValue("input").should("be.visible");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should check when buttonAlign is %s for ShowEditPod component",
      (align, webkitBoxPack) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing buttonAlign={align} />
        );
        showEditPodFormFooter().should(
          "have.css",
          "-webkit-box-pack",
          webkitBoxPack
        );
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when cancel button is %s for ShowEditPod component",
      (boolVal, state) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing cancel={boolVal} />
        );

        showEditPodCancelButton().should(state);
      }
    );

    it.each(specialCharacters)(
      "should check cancelText as %s for ShowEditPod component",
      (cancelText) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing cancelText={cancelText} />
        );
        showEditPodCancelButton().should("have.text", cancelText);
      }
    );

    it.each(specialCharacters)(
      "should check saveText as %s for ShowEditPod component",
      (saveText) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing saveText={saveText} />
        );
        showEditPodSaveButton().should("have.text", saveText);
      }
    );

    it.each(specialCharacters)(
      "should check deleteText as %s for ShowEditPod component",
      (deleteText) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing deleteText={deleteText} />
        );
        showEditPodDeleteButton().should("have.text", deleteText);
      }
    );

    it.each([
      [
        false,
        "rgb(0, 126, 69) none repeat scroll 0% 0% / auto padding-box border-box",
        "rgb(255, 255, 255)",
      ],
      [
        true,
        "rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box",
        "rgba(0, 0, 0, 0.3)",
      ],
    ])(
      "should check saving state is %s for ShowEditPod component",
      (boolVal, background, color) => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing saving={boolVal} />
        );

        showEditPodSaveButton()
          .should("have.css", "background", background)
          .and("have.css", "color", color);
      }
    );

    it.each(specialCharacters)(
      "should check title as %s for ShowEditPod component",
      (title) => {
        CypressMountWithProviders(<ShowEditPodComponent title={title} />);
        showEditPodTitle().should("have.text", title);
      }
    );

    it("should check transitionName for ShowEditPod component", () => {
      CypressMountWithProviders(
        <ShowEditPodComponent transitionName="test_cypress" />
      );
      showEditPodEditButton().click();
      showEditPodTransitionName().should(
        "have.class",
        "test_cypress-enter-done"
      );
    });

    describe("should render ShowEditPod component for event tests", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onEdit callback when edit button is clicked", () => {
        CypressMountWithProviders(<ShowEditPodComponent onEdit={callback} />);

        showEditPodEditButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onDelete callback when delete button is clicked", () => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing onDelete={callback} />
        );
        showEditPodDeleteButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onUndo callback when undo button is clicked", () => {
        CypressMountWithProviders(
          <UndoShowEditPodComponent onUndo={callback} />
        );
        showEditPodUndoButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onSave callback when a click event is triggered for ShowEditPod component", () => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing onSave={callback} />
        );
        showEditPodSaveButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onCancel callback when a click event is triggered for ShowEditPod component", () => {
        CypressMountWithProviders(
          <ShowEditPodComponent editing onCancel={callback} />
        );
        showEditPodCancelButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });

  describe("rounded corners", () => {
    it("should render with expected border radius styling on the main container and edit button", () => {
      CypressMountWithProviders(<ShowEditPodComponent />);
      showEditPodBlock().should("have.css", "border-radius", "8px");
      showEditPodEditButton().should("have.css", "border-radius", "8px");
    });

    it("should render with expected border radius styling on the soft delete/ undo button", () => {
      CypressMountWithProviders(
        <ShowEditPodComponent onUndo={() => {}} softDelete>
          Foo
        </ShowEditPodComponent>
      );

      showEditPodUndoButton().should("have.css", "border-radius", "8px");
    });
  });
});
