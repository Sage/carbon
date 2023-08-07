import React from "react";
import { TabProps, TabsProps } from "../../../src/components/tabs";
import { tabById, tabContentById, tabTitleById } from "../../locators/tabs";
import {
  TabsComponent,
  TabsComponentValidations,
  TabsComponentValidationsUnregistering,
  TabsValidationOverride,
} from "../../../src/components/tabs/tabs-test.stories";
import Box from "../../../src/components/box";
import * as stories from "../../../src/components/tabs/tabs.stories";
import Icon from "../../../src/components/icon";
import Pill from "../../../src/components/pill";
import { getDataElementByValue, tooltipPreview } from "../../locators";
import { keyCode } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import { ICON } from "../../locators/locators";
import { DrawerSidebarContext } from "../../../src/components/drawer";

const validationType = ["error", "warning", "info"] as const;

context("Testing Tabs component", () => {
  describe("should render Tabs component", () => {
    it.each([1, 2, 3, 4, 5])(
      "should verify when tab %s is clicked that tab is visible and content text is displayed",
      (id) => {
        CypressMountWithProviders(<TabsComponent />);

        tabById(id).click();
        tabContentById(id)
          .should("be.visible")
          .and("have.text", `Content for tab ${id}`);
      }
    );

    it("should verify first tab has a link property", () => {
      CypressMountWithProviders(
        <TabsComponent href="https://carbon.sage.com/" />
      );

      tabById(1)
        .should("have.attr", "href", "https://carbon.sage.com/")
        .and("have.attr", "target", "_blank");
    });

    it("should verify Tabs hidden content is not rendered when renderHiddenTabs prop is false", () => {
      CypressMountWithProviders(<TabsComponent renderHiddenTabs={false} />);

      tabContentById(1).should("be.visible");
      tabContentById(2).should("not.exist");
    });

    it.each([5, 4, 3, 2, 1])(
      "should verify correct tab is visible and correct content displayed when tab %s is selected using selectedTabId prop",
      (id) => {
        CypressMountWithProviders(
          <TabsComponent selectedTabId={`tab-${id}`} />
        );

        tabContentById(id)
          .should("be.visible")
          .and("have.text", `Content for tab ${id}`);
      }
    );

    it.each([
      ["right", "have.css", "not.have.css"],
      ["left", "not.have.css", "have.css"],
    ] as [TabsProps["align"], string, string][])(
      "should verify Tabs component is %s aligned",
      (alignment, value, startValue) => {
        CypressMountWithProviders(<TabsComponent align={alignment} />);
        cy.get(`[role="tablist"]`)
          .should(value, "text-align", alignment)
          .and(value, "justify-content", "flex-end")
          .and(startValue, "justify-content", "normal");
      }
    );

    it.each([
      ["top", "row", 40],
      ["left", "column", 200],
    ] as [TabsProps["position"], string, number][])(
      "should verify Tabs component is %s positioned",
      (pos, flex, height) => {
        CypressMountWithProviders(<TabsComponent position={pos} />);

        tabById(1)
          .parent()
          .should("have.css", "flex-direction", flex)
          .then(($el) => {
            assertCssValueIsApproximately($el, "height", height);
          });
      }
    );

    it.each([
      ["default", 40, 67],
      ["large", 48, 88],
    ] as [TabsProps["size"], number, number][])(
      "should verify Tabs height and width when size is %s",
      (size, height, width) => {
        CypressMountWithProviders(<TabsComponent size={size} />);

        tabById(1).then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
          assertCssValueIsApproximately($el, "width", width);
        });
      }
    );

    it.each([
      ["extended", true, 1358],
      ["trimmed", false, 333],
    ])(
      "should verify Tabs dividing line is %s when extendedLine prop is %s",
      (state, bool, width) => {
        CypressMountWithProviders(<TabsComponent extendedLine={bool} />);

        tabById(1).parent().should("have.css", "width").as("width");

        cy.get("@width")
          .then(($el) => parseInt($el.toString()))
          .should("be.within", width - 4, width + 4);
      }
    );

    it.each([
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "none", "solid", "solid"],
      ["no sides", "solid", "none", "none", "none"],
    ] as [TabsProps["borders"], string, string, string, string][])(
      "should verify Tabs borders are set to %s when positioned on top",
      (state, top, bottom, right, left) => {
        CypressMountWithProviders(<TabsComponent borders={state} />);

        tabById(1)
          .children()
          .should("have.css", "border-top-style", top)
          .and("have.css", "border-bottom-style", bottom)
          .and("have.css", "border-right-style", right)
          .and("have.css", "border-left-style", left);
      }
    );

    it.each([
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "solid", "none", "solid"],
      ["no sides", "solid", "solid", "none", "none"],
    ] as [TabsProps["borders"], string, string, string, string][])(
      "should verify Tabs borders are set to %s when positioned on left",
      (state, top, bottom, right, left) => {
        CypressMountWithProviders(
          <TabsComponent position="left" borders={state} />
        );

        tabById(1)
          .children()
          .should("have.css", "border-top-style", top)
          .and("have.css", "border-bottom-style", bottom)
          .and("have.css", "border-right-style", right)
          .and("have.css", "border-left-style", left);
      }
    );

    it("should verify Tabs header width is set by headerWidth prop", () => {
      CypressMountWithProviders(
        <TabsComponent headerWidth="440px" align="left" position="left" />
      );

      tabById(1)
        .parent()
        .parent()
        .then(($el) => {
          assertCssValueIsApproximately($el, "width", 440);
        });
    });

    it.each([
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(204, 214, 219)"],
    ] as [TabsProps["variant"], string][])(
      "should verify Tabs variant prop",
      (variant, backColor) => {
        CypressMountWithProviders(<TabsComponent variant={variant} />);

        tabById(1).should("have.css", "background-color", backColor);
      }
    );

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should verify first tabs title is %s", (text) => {
      CypressMountWithProviders(<TabsComponent title={text} />);

      tabById(1).should("have.text", text);
    });

    it("should verify tabId is cypress_data-tab", () => {
      CypressMountWithProviders(<TabsComponent tabId={CHARACTERS.STANDARD} />);

      getDataElementByValue("select-tab").should(
        "have.attr",
        "id",
        `${CHARACTERS.STANDARD}-tab`
      );
    });

    it("should verify Tabs can be customised with customLayout prop", () => {
      CypressMountWithProviders(
        <TabsComponent
          position="left"
          customLayout={
            <Box
              width="calc(100% - 30px)"
              display="flex"
              flexDirection="column"
              padding="4px 4px 22px 14px"
            >
              <Box display="flex" justifyContent="flex-end">
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                Tab 1
              </Box>
            </Box>
          }
        />
      );

      tabById(1)
        .children()
        .children()
        .children()
        .children()
        .children()
        .should("have.attr", "data-component", "icon");
      tabById(1).children().children().children().should("have.text", "Tab 1");
    });

    it("should verify Tabs can be displayed with title siblings", () => {
      CypressMountWithProviders(
        <TabsComponent
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
          ]}
        />
      );

      tabById(1)
        .children()
        .children()
        .children()
        .should("have.attr", "data-component", "pill")
        .and("have.text", "12");
    });

    it.each(["before", "after"] as TabProps["titlePosition"][])(
      "should verify Tabs title can be displayed %s siblings",
      (pos) => {
        CypressMountWithProviders(
          <TabsComponent
            titlePosition={pos}
            siblings={[
              <Pill size="S" pillRole="status" fill key="pill">
                12
              </Pill>,
            ]}
          />
        );

        tabById(1)
          .children()
          .children()
          .children()
          .should("have.attr", "data-component", "pill")
          .and("have.text", "12");
      }
    );

    it.each([
      [1, validationType[0]],
      [2, validationType[1]],
      [3, validationType[2]],
    ])(
      "should verify that tab %s has a %s icon displayed",
      (id, validation) => {
        CypressMountWithProviders(<TabsComponentValidations />);

        tabById(id).find(ICON).and("have.attr", "type", validation);
      }
    );

    it.each([
      [1, validationType[0]],
      [2, validationType[1]],
      [3, validationType[2]],
    ])(
      "should verify when tab %s is hovered over that %s message is displayed",
      (id, validationMessage) => {
        CypressMountWithProviders(<TabsComponentValidations />);

        tabById(id)
          .trigger("mouseover")
          .then(() => {
            tooltipPreview().should("have.text", validationMessage);
          });
      }
    );

    it.each([validationType[0], validationType[1], validationType[2]])(
      "should no longer report any %s validation failures of children no longer mounted",
      (type) => {
        CypressMountWithProviders(
          <TabsComponentValidationsUnregistering validationType={type} />
        );

        tabById(1).get(ICON).should("exist");
        getDataElementByValue("foo-button").click();

        tabById(1).get(ICON).should("not.exist");
      }
    );

    it("should verify Tabs validation status is overridden", () => {
      CypressMountWithProviders(<TabsValidationOverride />);

      tabById(1).children().children().should("not.exist");
      tabById(1)
        .children()
        .should("have.css", "outline-color", "rgba(0, 0, 0, 0.9)");
    });

    it("should focus next tab title when right arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent />);

      tabById(1).trigger("keydown", keyCode("rightarrow"));
      tabTitleById(2).should("be.focused");
    });

    it("should focus previous tab title when left arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent />);

      tabById(2).trigger("keydown", keyCode("leftarrow"));
      tabTitleById(1).should("be.focused");
    });

    it("should focus next tab title when down arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent position="left" />);

      tabById(1).trigger("keydown", keyCode("downarrow"));
      tabTitleById(2).should("be.focused");
    });

    it("should focus previous tab title when up arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent position="left" />);

      tabById(2).trigger("keydown", keyCode("uparrow"));
      tabTitleById(1).should("be.focused");
    });

    it("should focus next tab title when down arrow key event is triggered in Sidebar", () => {
      CypressMountWithProviders(
        <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
          <TabsComponent />
        </DrawerSidebarContext.Provider>
      );

      tabById(1).trigger("keydown", keyCode("downarrow"));
      tabTitleById(2).should("be.focused");
    });

    it("should focus previous tab title when up arrow key event is triggered in Sidebar", () => {
      CypressMountWithProviders(
        <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
          <TabsComponent />
        </DrawerSidebarContext.Provider>
      );

      tabById(2).trigger("keydown", keyCode("uparrow"));
      tabTitleById(1).should("be.focused");
    });

    it.each(["top", "left"] as TabsProps["position"][])(
      "has the expected border radius styling when position is %s",
      (position) => {
        CypressMountWithProviders(<TabsComponent position={position} />);
        const result =
          position === "top" ? "8px 8px 0px 0px" : "8px 0px 0px 8px";

        tabById(1).should("have.css", "border-radius", result);
        tabById(2).should("have.css", "border-radius", result);
        tabById(3).should("have.css", "border-radius", result);
        tabById(4).should("have.css", "border-radius", result);
        tabById(5).should("have.css", "border-radius", result);
      }
    );
  });

  describe("check events for Tabs component", () => {
    describe("when position: top", () => {
      it("should call onTabChange callback when a click event is triggered", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(<TabsComponent onTabChange={callback} />);

        tabById(2).click();
        cy.get("@onTabChange").should("have.been.calledOnce");
      });

      it("should call onTabChange callback when an enter key is pressed", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(<TabsComponent onTabChange={callback} />);

        tabById(2).type("{enter}");
        cy.get("@onTabChange").should("have.been.calledOnce");
      });
    });

    describe("when position: left", () => {
      it("should call onTabChange callback when a click event is triggered", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(
          <TabsComponent position="left" onTabChange={callback} />
        );

        tabById(2).click();
        cy.get("@onTabChange").should("have.been.calledOnce");
      });

      it("should call onTabChange callback when an enter key is pressed", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(
          <TabsComponent position="left" onTabChange={callback} />
        );

        tabById(2).type("{enter}");
        cy.get("@onTabChange").should("have.been.calledOnce");
      });
    });

    describe("when inSidebar: true", () => {
      it("should call onTabChange callback when a click event is triggered", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(
          <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
            <TabsComponent onTabChange={callback} />
          </DrawerSidebarContext.Provider>
        );

        tabById(2).click();
        cy.get("@onTabChange").should("have.been.calledOnce");
      });

      it("should call onTabChange callback when an enter key is pressed", () => {
        const callback: TabsProps["onTabChange"] = cy.stub().as("onTabChange");

        CypressMountWithProviders(
          <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
            <TabsComponent onTabChange={callback} />
          </DrawerSidebarContext.Provider>
        );

        tabById(2).type("{enter}");
        cy.get("@onTabChange").should("have.been.calledOnce");
      });
    });
  });

  describe("Accessibility tests for Tabs component", () => {
    it("should pass accessibility tests for Tabs Default story", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs PositionedTopAlignedRight story", () => {
      CypressMountWithProviders(<stories.PositionedTopAlignedRight />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs PositionedLeftAndAlignedLeft story", () => {
      CypressMountWithProviders(<stories.PositionedLeftAndAlignedLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs PositionedLeftAndAlignedRight story", () => {
      CypressMountWithProviders(<stories.PositionedLeftAndAlignedRight />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithLinkAsATab story", () => {
      CypressMountWithProviders(<stories.WithLinkAsATab />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithSpecifiedTabVisible story", () => {
      CypressMountWithProviders(<stories.WithSpecifiedTabVisible />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithoutExtendedDividingLine story", () => {
      CypressMountWithProviders(<stories.WithoutExtendedDividingLine />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithLargeTabsPositionedTop story", () => {
      CypressMountWithProviders(<stories.WithLargeTabsPositionedTop />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithLargeTabsPositionedLeft story", () => {
      CypressMountWithProviders(<stories.WithLargeTabsPositionedLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithBordersPositionedTop story", () => {
      CypressMountWithProviders(<stories.WithBordersPositionedTop />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithNoSidesPositionedTop story", () => {
      CypressMountWithProviders(<stories.WithNoSidesPositionedTop />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithBordersPositionedLeft story", () => {
      CypressMountWithProviders(<stories.WithBordersPositionedLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithNoSidesPositionedLeft story", () => {
      CypressMountWithProviders(<stories.WithNoSidesPositionedLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithValidationsPositionedTop story", () => {
      CypressMountWithProviders(<stories.WithValidationsPositionedTop />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithValidationsSizedLargePositionedTop story", () => {
      CypressMountWithProviders(
        <stories.WithValidationsSizedLargePositionedTop />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithValidationsPositionedLeft story", () => {
      CypressMountWithProviders(<stories.WithValidationsPositionedLeft />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithValidationsSizedLargePositionedLeft story", () => {
      CypressMountWithProviders(
        <stories.WithValidationsSizedLargePositionedLeft />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithAdditionalTitleSiblings story", () => {
      CypressMountWithProviders(<stories.WithAdditionalTitleSiblings />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithAdditionalTitleSiblingsSizeLarge story", () => {
      CypressMountWithProviders(
        <stories.WithAdditionalTitleSiblingsSizeLarge />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithCustomLayout story", () => {
      CypressMountWithProviders(<stories.WithCustomLayout />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithAlternateStyling story", () => {
      CypressMountWithProviders(<stories.WithAlternateStyling />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithHeaderWidth story", () => {
      CypressMountWithProviders(<stories.WithHeaderWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithCustomSpacing story", () => {
      CypressMountWithProviders(<stories.WithCustomSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs WithStringValidationsSummarised story", () => {
      CypressMountWithProviders(<stories.WithStringValidationsSummarised />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Tabs Responsive story", () => {
      CypressMountWithProviders(<stories.Responsive />);

      cy.checkAccessibility();
    });
  });
});
