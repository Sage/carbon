import React from "react";
import Box from "../box";
import Button from "../button";
import { Checkbox } from "../checkbox";
import Drawer from "./drawer.component";
import Typography from "../typography";

import {
  drawer,
  drawerToggle,
  drawerSidebar,
  drawerSidebarContentInnerElement,
} from "../../../cypress/locators/drawer";

import { stickyFooter } from "../../../cypress/locators";

import { positionOfElement } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const DrawerCustom = ({ ...props }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const onChangeHandler = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Drawer
      id="drawer"
      onChange={onChangeHandler}
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      title={<Typography variant="h2">Drawer title</Typography>}
      {...props}
    >
      content body for Drawer
    </Drawer>
  );
};

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

    it.each([["3s"], ["15s"]])(
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
});
