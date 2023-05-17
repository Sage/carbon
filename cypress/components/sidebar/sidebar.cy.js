import React from "react";
import Sidebar from "../../../src/components/sidebar";
import { sidebarPreview } from "../../locators/sidebar";
import {
  SidebarComponent,
  SidebarBackgroundScrollTestComponent,
  SidebarBackgroundScrollWithOtherFocusableContainers,
} from "../../../src/components/sidebar/sidebar-test.stories";
import {
  backgroundUILocator,
  closeIconButton,
  getComponent,
  getDataElementByValue,
} from "../../locators";
import Button from "../../../src/components/button";
import Textbox from "../../../src/components/textbox";
import Toast from "../../../src/components/toast";
import Typography from "../../../src/components/typography";
import { keyCode, continuePressingTABKey } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";
import {
  SIDEBAR_SIZES,
  SIDEBAR_SIZES_CSS,
} from "../../../src/components/sidebar/sidebar.config";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const CUSTOM_SELECTOR = "button, .focusable-container input";

const SidebarComponentFocusable = ({ ...props }) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  return (
    <>
      <Sidebar
        open
        onCancel={() => setIsDialogOpen(false)}
        header={<Typography variant="h3">Sidebar header</Typography>}
        focusableContainers={[toastRef]}
        focusableSelectors={CUSTOM_SELECTOR}
        {...props}
      >
        <div className="focusable-container">
          <Textbox label="First Name" />
        </div>
        <div>
          <Textbox label="Surname" />
        </div>
        <div className="focusable-container">
          <Button
            buttonType="primary"
            data-element="open-toast"
            onClick={() => setIsToastOpen(true)}
          >
            Show toast
          </Button>
        </div>
      </Sidebar>
      <Toast
        open={isToastOpen}
        onDismiss={() => setIsToastOpen(false)}
        ref={toastRef}
        targetPortalId="stacked"
        data-element="toast"
      >
        Toast Message
      </Toast>
    </>
  );
};

context("Testing Sidebar component", () => {
  describe("check props for Sidebar component", () => {
    it.each([
      [true, "not.exist"],
      [false, "exist"],
    ])(
      "verify Sidebar with enableBackgroundUI prop set to %s",
      (boolVal, property) => {
        CypressMountWithProviders(
          <SidebarComponent enableBackgroundUI={boolVal} />
        );

        backgroundUILocator().should(property);
      }
    );

    it.each([
      ["left", 0, 852],
      ["right", 852, 0],
    ])("verify Sidebar position is %s", (boolVal, left, right) => {
      CypressMountWithProviders(<SidebarComponent position={boolVal} />);

      sidebarPreview().then(($el) => {
        assertCssValueIsApproximately($el, "left", left);
        assertCssValueIsApproximately($el, "right", right);
      });
    });

    it("verify Sidebar has aria-describedby cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent aria-describedby={CHARACTERS.STANDARD} />
      );

      sidebarPreview().should(
        "have.attr",
        "aria-describedby",
        CHARACTERS.STANDARD
      );
    });

    it("verify Sidebar has aria-label cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent aria-label={CHARACTERS.STANDARD} />
      );

      sidebarPreview().should("have.attr", "aria-label", CHARACTERS.STANDARD);
    });

    it("verify Sidebar has aria-labelledby cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent aria-labelledby={CHARACTERS.STANDARD} />
      );

      sidebarPreview().should(
        "have.attr",
        "aria-labelledby",
        CHARACTERS.STANDARD
      );
    });

    it.each([
      [SIDEBAR_SIZES[0], SIDEBAR_SIZES_CSS["extra-small"]],
      [SIDEBAR_SIZES[1], SIDEBAR_SIZES_CSS.small],
      [SIDEBAR_SIZES[2], SIDEBAR_SIZES_CSS["medium-small"]],
      [SIDEBAR_SIZES[3], SIDEBAR_SIZES_CSS.medium],
      [SIDEBAR_SIZES[4], SIDEBAR_SIZES_CSS["medium-large"]],
      [SIDEBAR_SIZES[5], SIDEBAR_SIZES_CSS.large],
      [SIDEBAR_SIZES[6], SIDEBAR_SIZES_CSS["extra-large"]],
    ])("verify Sidebar size is %s", (size, width) => {
      CypressMountWithProviders(<SidebarComponent size={size} />);

      sidebarPreview().then(($el) => {
        assertCssValueIsApproximately($el, "width", parseInt(width));
      });
    });

    it("verify Sidebar has header", () => {
      CypressMountWithProviders(
        <SidebarComponent
          header={<Typography variant="h3">Sidebar Header</Typography>}
        />
      );

      sidebarPreview()
        .children()
        .should("have.attr", "data-component", "sidebar-header");
      sidebarPreview()
        .children()
        .children()
        .eq(0)
        .and("have.text", "Sidebar Header");
    });

    it("verify Sidebar has role cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent role={CHARACTERS.STANDARD} />
      );

      sidebarPreview().should("have.attr", "role", CHARACTERS.STANDARD);
    });

    it("verify Sidebar has data-element cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent data-element={CHARACTERS.STANDARD} />
      );

      sidebarPreview()
        .parent()
        .parent()
        .parent()
        .parent()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("verify Sidebar has data-role cypress_data", () => {
      CypressMountWithProviders(
        <SidebarComponent data-role={CHARACTERS.STANDARD} />
      );

      sidebarPreview()
        .parent()
        .parent()
        .parent()
        .parent()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it.each([
      [true, "not.be.visible"],
      [false, "be.visible"],
    ])("verify Sidebar with disableEscKey prop set to %s", (boolVal, state) => {
      CypressMountWithProviders(<SidebarComponent disableEscKey={boolVal} />);

      sidebarPreview().trigger("keydown", keyCode("Esc"));
      sidebarPreview().should(state);
    });

    it.each([
      [true, "exist"],
      [false, "not.exist"],
    ])("verify Sidebar with open prop set to %s", (boolVal, state) => {
      CypressMountWithProviders(<SidebarComponent open={boolVal} />);

      sidebarPreview().should(state);
    });

    it("should render Sidebar with focusableContainers", () => {
      CypressMountWithProviders(<SidebarComponentFocusable />);

      getComponent("toast").should("not.exist");
      getDataElementByValue("open-toast").click();
      getComponent("toast").should("exist");
      getComponent("toast").children().eq(2).children().click();
      getComponent("toast").should("not.exist");
    });

    it("should render Sidebar with first input and button as focusableSelectors", () => {
      CypressMountWithProviders(<SidebarComponentFocusable />);

      sidebarPreview().tab();
      cy.focused().tab();
      getDataElementByValue("input").eq(0).should("be.focused");
      cy.focused().tab();
      getDataElementByValue("input").eq(1).should("not.be.focused");
      getDataElementByValue("open-toast").should("be.focused");
    });

    it("should return focus to the Toast within Sidebar after non-focusable content has been selected", () => {
      CypressMountWithProviders(<SidebarComponentFocusable />);

      getComponent("toast").should("not.exist");
      getDataElementByValue("open-toast").click();
      getComponent("toast").should("exist");
      cy.get("body").click().tab();
      closeIconButton().eq(1).should("be.focused");
    });

    it("should call onCancel callback when a click event is triggered", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<SidebarComponent onCancel={callback} />);

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("should render Sidebar component and check accessibility issues", () => {
    it("should check sidebar accessibility", () => {
      CypressMountWithProviders(<SidebarComponent />);

      cy.checkAccessibility();
    });

    it.each(["left", "right"])(
      "should check accessibility when sidebar position is %s",
      (boolVal) => {
        CypressMountWithProviders(<SidebarComponent position={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it("should check accessibility when sidebar has header", () => {
      CypressMountWithProviders(
        <SidebarComponent
          header={<Typography variant="h3">Sidebar Header</Typography>}
        />
      );

      cy.checkAccessibility();
    });

    it.each([
      SIDEBAR_SIZES[0],
      SIDEBAR_SIZES[1],
      SIDEBAR_SIZES[2],
      SIDEBAR_SIZES[3],
      SIDEBAR_SIZES[4],
      SIDEBAR_SIZES[5],
      SIDEBAR_SIZES[6],
    ])("should check accessibility when sidebar size is %s", (size) => {
      CypressMountWithProviders(<SidebarComponent size={size} />);

      cy.checkAccessibility();
    });
  });

  describe("test background scroll when tabbing", () => {
    it("tabbing forward through the sidebar and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(<SidebarBackgroundScrollTestComponent />);

      continuePressingTABKey(3);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the sidebar and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(<SidebarBackgroundScrollTestComponent />);

      continuePressingTABKey(2, true);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing forward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <SidebarBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(6);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(
        <SidebarBackgroundScrollWithOtherFocusableContainers />
      );

      continuePressingTABKey(7, true);

      closeIconButton().eq(0).should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });
  });
});