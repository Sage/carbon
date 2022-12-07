/* eslint-disable react/prop-types */
import React from "react";
import path from "path";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from ".";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";
import { Accordion } from "../accordion";

import { accordionDefaultTitle } from "../../../cypress/locators/accordion";

import {
  actionPopoverButton,
  actionPopover,
  actionPopoverSubmenu,
  actionPopoverSubmenuByIndex,
  actionPopoverInnerItem,
  actionPopoverWrapper,
} from "../../../cypress/locators/action-popover";

import { getDataElementByValue, cyRoot } from "../../../cypress/locators/index";

import { buttonDataComponent } from "../../../cypress/locators/button";

import { keyCode } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const ActionPopoverCustom = (props) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem
        data-element="submenu1"
        onClick={() => props.onClick("sub menu item 1")}
      >
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => props.onClick("sub menu item 2")}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem disabled>Sub Menu 3</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <div
      style={{
        marginTop: "40px",
        height: "275px",
      }}
    >
      <FlatTable isZebra>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>&nbsp;</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  disabled
                  icon="graph"
                  submenu={submenu}
                  onClick={() => props.onClick("Business")}
                >
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="email"
                  onClick={() => props.onClick("Email Invoice")}
                >
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="print"
                  onClick={() => props.onClick("Print Invoice")}
                  submenu={submenu}
                >
                  Print Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="pdf"
                  onClick={() => props.onClick("Download PDF")}
                  submenu={submenu}
                >
                  Download PDF
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="csv"
                  onClick={() => props.onClick("Download CSV")}
                >
                  Download CSV
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem icon="delete" {...props}>
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane</FlatTableCell>
            <FlatTableCell>Smith</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  download
                  onClick={() => props.onClick("Download")}
                  icon="download"
                  href="example-img.jpg"
                >
                  Download
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Bob</FlatTableCell>
            <FlatTableCell>Jones</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  onClick={() => props.onClick("Download CSV")}
                  submenu={submenuWithIcons}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const ActionPopoverWithProps = ({ ...props }) => {
  return (
    <div
      style={{
        height: "250px",
      }}
    >
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>&nbsp;</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover {...props}>
                <ActionPopoverItem icon="email" disabled onClick={() => {}}>
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem onClick={() => {}} icon="delete">
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

const ActionPopoverMenuWithProps = ({ ...props }) => {
  return (
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu {...props}>
            <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
            <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
            <ActionPopoverItem icon="print" disabled>
              Sub Menu 3
            </ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

const ActionPopoverProps = ({ ...props }) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

context("Test for ActionPopover component", () => {
  describe("check functionality for ActionPopover component", () => {
    it("should render ActionPopover component", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      actionPopover().should("be.visible");
    });

    it.each([
      [0, "Business"],
      [1, "Email Invoice"],
      [2, "Print Invoice"],
      [3, "Download PDF"],
      [4, "Download CSV"],
      [5, "Delete"],
    ])(
      "should render ActionPopover and be able to press downarrow %s times and get button %s focused",
      (times, elementText) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().should("contain", elementText);
      }
    );

    it.each([["Enter"], ["Space"], ["downarrow"]])(
      "should Open ActionPopover component using %s keyboard key",
      (key) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().first().trigger("keydown", keyCode(key));
        cy.focused().should("contain", "Business");

        actionPopover().should("be.visible");
      }
    );

    it("should focus the first element Business using Home key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("Home"));
      cy.focused().should("contain", "Business");
    });

    it("should focus the first sub menu 1 element using Home key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("Home"));
      cy.focused().should("contain", "Sub Menu 1");
    });

    it.each([["uparrow"], ["End"]])(
      "should focus the last element Delete using %s keyboard key",
      (key) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        cy.focused().trigger("keydown", keyCode(key));
        cy.focused().should("contain", "Delete");
      }
    );

    it("should focus the last sub menu 3 element using End keyboard key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      cy.focused().trigger("keydown", keyCode("End"));
      cy.focused().should("contain", "Sub Menu 3");
    });

    it("should open ActionPopover and close it using Tab key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().tab();
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it using ShiftTab key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().tab({ shift: true });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it using ESC key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().trigger("keydown", { key: "Escape" });
      actionPopover().should("not.exist");
    });

    it("should close ActionPopover using ESC key if it hasn't a submenu", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().trigger("keydown", { key: "Escape" });
      actionPopover().should("not.exist");
    });

    it("should close ActionPopover using ESC key if it has a submenu", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().trigger("keydown", { key: "Escape" });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it by clicking outside of the component", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cyRoot().click({ force: true });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it by clicking onto Open icon", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).dblclick();
      actionPopover().should("not.exist");
    });

    it.each([
      ["d", "Download PDF", 1],
      ["d", "Download CSV", 2],
      ["d", "Delete", 3],
      ["e", "Email Invoice", 1],
      ["p", "Print Invoice", 1],
    ])(
      "should focus element using %s keyboard key",
      (key, innerText, times) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();

        for (let i = 0; i < times; i++) {
          cy.focused().type(`${key}`);
        }
        actionPopover().should("be.visible");
        cy.focused().should("contain", innerText);
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
      ["Sub Menu 3", 2],
    ])("should focus %s element", (innerText, times) => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < times; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().should("contain", innerText);
    });

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after press Enter keyboard key",
      (name, element) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        getDataElementByValue("submenu1")
          .eq(element)
          .trigger("keydown", keyCode("EnterForce"));
        actionPopover().should("not.exist");
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])("should close %s after press ArrowRight keyboard key", (times) => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < times; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("rightarrow"));
      actionPopoverSubmenuByIndex().should("not.be.visible");
    });

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after press Esc keyboard key",
      (times) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", {
          key: "Shift",
          release: false,
        });
        cy.focused().trigger("keydown", { key: "Escape" });
        actionPopover().should("not.exist");
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after clicking on the submenu",
      (name, item) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        actionPopoverSubmenu(item).click({ force: true });
        actionPopover().should("not.exist");
      }
    );

    it("should invoke ActionPopover component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <ActionPopoverCustom />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      actionPopoverButton().eq(0).click();
      actionPopover().should("be.visible");
    });

    it("should check that actionPopoverInnerItem has download prop", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      const downloadsFolder = Cypress.config("downloadsFolder");
      const downloadedFilename = path.join(downloadsFolder, "example-img.jpg");

      actionPopoverButton().eq(1).click();
      actionPopover()
        .find("a")
        .should("have.attr", "href", "example-img.jpg")
        .and("have.attr", "download");
      actionPopover().click();
      cy.readFile(downloadedFilename, "binary", {
        timeout: 15000,
      }).should((buffer) => expect(buffer.length).to.be.gt(100));
    });

    it("should show ActionPopover list is positioned properly in large viewport", () => {
      cy.viewport(700, 300);

      CypressMountWithProviders(
        <Accordion mt="150px" title="Heading">
          <ActionPopoverCustom />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      actionPopoverButton().eq(0).click();
      cy.scrollTo("0", "1000");
      actionPopover()
        .should("have.attr", "data-floating-placement", "bottom-end")
        .and("be.visible");
      cy.scrollTo("0", "0");
      actionPopover()
        .should("have.attr", "data-floating-placement", "top-end")
        .and("be.visible");
    });

    it.each([[0], [1]])(
      "should have correct hover state of submenu item in ActionPopoverMenu",
      (element) => {
        CypressMountWithProviders(<ActionPopoverMenuWithProps />);

        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .realHover()
          .should("have.css", "background-color", "rgb(204, 214, 219)");
      }
    );
  });

  describe("check props for ActionPopover component", () => {
    it("should render ActionPopover with unique id", () => {
      CypressMountWithProviders(<ActionPopoverWithProps id="cypress" />);

      actionPopoverButton().eq(0).click();
      actionPopoverWrapper().should("have.attr", "id", "cypress");
    });

    it.each([
      [true, "right"],
      [false, "left"],
    ])(
      "should render ActionPopover with rightAlignMenu set to %s",
      (rightAlignMenu, css) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps rightAlignMenu={rightAlignMenu} />
        );

        actionPopoverButton().eq(0).click();
        actionPopover().should("have.css", css);
      }
    );

    it("should render ActionPopover with custom button", () => {
      CypressMountWithProviders(
        <ActionPopoverWithProps
          renderButton={() => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
            >
              More
            </ActionPopoverMenuButton>
          )}
        />
      );

      buttonDataComponent().click();
      actionPopoverWrapper()
        .find('[data-component="button"]')
        .should("be.visible");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render ActionPopover with horizontalAlignment prop set to %s",
      (position, attrValue) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps horizontalAlignment={position} />
        );

        actionPopoverButton().eq(0).click();
        actionPopover()
          .children()
          .should("have.css", "justify-content", `flex-${attrValue}`);
      }
    );

    it("should render ActionPopoverMenu with menuID", () => {
      CypressMountWithProviders(
        <ActionPopoverMenuWithProps menuID="cypress" />
      );

      actionPopoverButton().eq(0).click();
      actionPopover()
        .eq(1)
        .should("have.attr", "id")
        .and("contain", "ActionPopoverMenu_");
    });

    it("should render ActionPopoverMenu with focusIndex set to null", () => {
      CypressMountWithProviders(
        <ActionPopoverMenuWithProps focusIndex={null} />
      );

      actionPopoverButton().eq(0).click();
      actionPopover().eq(1).children().eq(0).should("not.be.focused");
    });
  });

  describe("check events for ActionPopover component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it.each([[1], [4], [6]])(
      "should call onClick callback when a click event is triggered",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .click({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[1], [4], [6]])(
      "should call onClick callback when a keydown event is triggered by pressing Enter",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .trigger("keydown", keyCode("Enter"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[0], [1]])(
      "should call onClick callback when a click event is triggered for submenu",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);

        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element)
          .invoke("show")
          .click({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[0], [1]])(
      "should call onClick callback when a keydown event is triggered for submenu by pressing Enter",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element)
          .invoke("show")
          .trigger("keydown", keyCode("EnterForce"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onOpen callback when a click event is triggered ActionPopover", () => {
      CypressMountWithProviders(<ActionPopoverProps onOpen={callback} />);
      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClose callback when a click event is triggered ActionPopover", () => {
      CypressMountWithProviders(<ActionPopoverProps onClose={callback} />);
      actionPopoverButton()
        .eq(0)
        .dblclick()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
