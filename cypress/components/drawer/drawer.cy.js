import React from "react";
import { DrawerCustom } from "../../../src/components/drawer/drawer-test.stories";
import Box from "../../../src/components/box";
import Button from "../../../src/components/button";
import { Checkbox } from "../../../src/components/checkbox";

import {
  drawer,
  drawerToggle,
  drawerSidebar,
  drawerSidebarContentInnerElement,
} from "../../locators/drawer";

import { stickyFooter } from "../../locators";

import { positionOfElement } from "../../support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

context("Test for Drawer component", () => {
  describe("check props for Drawer component", () => {
    it.each([
      [0, "be.visible", "matrix(-1, 0, 0, 1, 0, 0)", "true"],
      [1, "be.not.visible", "none", "false"],
    ])(
      "should verify chevron orientation",
      (times, state, transformVal, expandedVal) => {
        CypressMountWithProviders(<DrawerCustom showControls />);

        for (let i = 0; i < times; i++) {
          drawerToggle().click().wait(500);
        }

        drawerToggle()
          .should("have.css", "transform", transformVal)
          .and("have.attr", "aria-expanded", expandedVal);
        drawerSidebarContentInnerElement(positionOfElement("first"))
          .should("have.text", "link a")
          .and(state);
        drawerSidebarContentInnerElement(positionOfElement("second"))
          .should("have.text", "link b")
          .and(state);
        drawerSidebarContentInnerElement(positionOfElement("third"))
          .should("have.text", "link c")
          .and(state);
      }
    );

    it.each(["3s", "15s"])(
      "should check animation time is set to %s",
      (animationDuration) => {
        CypressMountWithProviders(
          <DrawerCustom showControls animationDuration={animationDuration} />
        );
        drawerToggle().click().wait(500);
        drawerSidebar().should(
          "have.css",
          "animation-duration",
          animationDuration
        );
      }
    );

    it("should render component closed by default", () => {
      CypressMountWithProviders(<DrawerCustom defaultExpanded={false} />);
      drawerSidebarContentInnerElement(positionOfElement("first"))
        .should("have.text", "link a")
        .and("not.be.visible");
    });

    it("should render component opened when the expanded prop is true", () => {
      CypressMountWithProviders(<DrawerCustom expanded />);
      drawerSidebarContentInnerElement(positionOfElement("first"))
        .should("have.text", "link a")
        .and("be.visible");
    });

    it("should render component with custom sidebar", () => {
      CypressMountWithProviders(
        <DrawerCustom
          sidebar={
            <ul>
              <li>cypress</li>
            </ul>
          }
        />
      );
      drawerSidebarContentInnerElement(positionOfElement("first"))
        .should("have.text", "cypress")
        .and("be.visible");
    });

    it("should render component with custom expandedWidth", () => {
      CypressMountWithProviders(<DrawerCustom expandedWidth="65%" />);

      drawer()
        .children()
        .first()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "width", 887);
        });
    });

    it("should render component with custom backgroundColor", () => {
      CypressMountWithProviders(<DrawerCustom backgroundColor="#FF0000" />);

      const color = "rgb(255, 0, 0)";

      drawer()
        .children()
        .first()
        .should(($el) => {
          expect($el).to.have.css("background-color").to.equal(color);
          expect($el).to.have.css("border-right-color").to.equal(color);
        });
    });

    it("should render component with custom height", () => {
      CypressMountWithProviders(<DrawerCustom height="75%" />);

      drawer().should("have.attr", "height", "75%");
    });

    it("should render component with custom title", () => {
      CypressMountWithProviders(<DrawerCustom title="cypress_title" />);

      drawer().children().children().eq(0).should("have.text", "cypress_title");
    });

    it("should render component with toggle control when showControls prop is true", () => {
      CypressMountWithProviders(<DrawerCustom showControls />);

      drawerToggle().should("be.visible");
    });

    it("should render component without toggle control when showControls prop is falsy", () => {
      CypressMountWithProviders(<DrawerCustom />);

      drawerToggle().should("not.exist");
    });

    it("should render component with custom footer", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "400px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
          />
        </div>
      );

      stickyFooter().should("exist").and("not.be.visible");
    });

    it("should render component with custom stickyFooter", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "400px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
            stickyFooter
          />
        </div>
      );

      stickyFooter().should("be.visible");
    });

    it("should render component with custom stickyHeader", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "400px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="90px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
            stickyHeader
          />
        </div>
      );

      stickyFooter().scrollIntoView();
      drawer()
        .children()
        .children()
        .eq(0)
        .should("have.text", "Drawer title")
        .and("be.visible");
    });
  });

  describe("check events for Drawer component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a component is closed", () => {
      CypressMountWithProviders(
        <DrawerCustom onChange={callback} showControls />
      );

      drawerToggle()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a component is expanded", () => {
      CypressMountWithProviders(
        <DrawerCustom onChange={callback} showControls expanded={false} />
      );

      drawerToggle()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Drawer", () => {
    it.each([
      ["expanded", 0],
      ["not expanded", 1],
    ])(
      "should pass accessibility tests for Drawer when chevron is %s",
      (state, times) => {
        CypressMountWithProviders(<DrawerCustom showControls />);

        for (let i = 0; i < times; i++) {
          drawerToggle().click().wait(500);
        }

        cy.checkAccessibility();
      }
    );

    it.each(["3s", "15s"])(
      "should pass accessibility tests for Drawer when animation time is set to %s",
      (animationDuration) => {
        CypressMountWithProviders(
          <DrawerCustom showControls animationDuration={animationDuration} />
        );

        drawerToggle().click().wait(500);
        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Drawer when closed by default", () => {
      CypressMountWithProviders(<DrawerCustom defaultExpanded={false} />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer when expanded prop is true", () => {
      CypressMountWithProviders(<DrawerCustom expanded />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom sidebar", () => {
      CypressMountWithProviders(
        <DrawerCustom
          sidebar={
            <ul>
              <li>cypress</li>
            </ul>
          }
        />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom expandedWidth", () => {
      CypressMountWithProviders(<DrawerCustom expandedWidth="65%" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom backgroundColor", () => {
      CypressMountWithProviders(<DrawerCustom backgroundColor="#FF0000" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom height", () => {
      CypressMountWithProviders(<DrawerCustom height="75%" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom title", () => {
      CypressMountWithProviders(<DrawerCustom title="cypress_title" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom footer", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "200px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
          />
        </div>
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer custom stickyFooter", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "200px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
            stickyFooter
          />
        </div>
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Drawer with custom stickyHeader", () => {
      CypressMountWithProviders(
        <div
          style={{
            height: "200px",
          }}
        >
          <DrawerCustom
            sidebar={
              <Box mb={9}>
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
                <Checkbox
                  label="Example checkbox"
                  name="checkbox-default"
                  ml="40px"
                  mt="40px"
                />
              </Box>
            }
            footer={
              <Box>
                <Button mr="16px">Cancel</Button>
                <Button buttonType="primary" type="submit">
                  Action
                </Button>
              </Box>
            }
            stickyHeader
          />
        </div>
      );

      cy.checkAccessibility();
    });
  });

  it("has the expected border radius styling on the sidebar control", () => {
    CypressMountWithProviders(<DrawerCustom showControls />);

    drawerToggle().focus().should("have.css", "border-radius", "4px");
  });
});
