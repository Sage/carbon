import React from "react";
import Menu from "./menu.component";
import MenuItem from "./menu-item/menu-item.component";
import MenuDivider from "./menu-divider/menu-divider.component";
import MenuSegmentTitle from "./menu-segment-title/menu-segment-title.component";
import * as stories from "./menu-test.stories";
import Box from "../box";
import {
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
  menuDivider,
  segmentTitle,
  menuComponent,
  submenuItem,
  fullscreenMenu,
  menu,
  menuItem,
  fullScreenMenuItem,
} from "../../../cypress/locators/menu";
import {
  searchDefaultInput,
  searchCrossIcon,
} from "../../../cypress/locators/search/index";
import { getComponent, closeIconButton } from "../../../cypress/locators";
import {
  keyCode,
  positionOfElement,
  pressTABKey,
  continuePressingTABKey,
} from "../../../cypress/support/helper";
import {
  CHARACTERS,
  COLOR,
} from "../../../cypress/support/component-helper/constants";
import {
  checkGoldenOutline,
  useJQueryCssValueAndAssert,
} from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const span = "span";
const div = "div";
const button = "button";

context("Testing Menu component", () => {
  describe("check props for Menu component", () => {
    it("should verify scroll block within a submenu is scrollable", () => {
      CypressMountWithProviders(<stories.MenuComponentScrollable />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      scrollBlock().scrollTo("bottom");
      lastSubmenuElement("li").should("be.visible");
    });

    it("should verify a submenu can be navigated using keyboard tabbing after an item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      innerMenu(positionOfElement("third"), span).click({ multiple: true });
      cy.focused().tab();
      cy.focused().tab();
    });

    it("should verify a submenu can be navigated using keyboard down arrow after an item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      innerMenu(positionOfElement("third"), span).click({ multiple: true });
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().trigger("keydown", keyCode("downarrow"));
    });

    it("should verify a submenu can be navigated using keyboard shift + tabbing after an item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      innerMenu(positionOfElement("fifth"), span).click({ multiple: true });
      cy.focused().tab({ shift: true });
      cy.focused().tab({ shift: true });
    });

    it("should verify a submenu can be navigated using keyboard up arrow after an item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      innerMenu(positionOfElement("fifth"), span).click({ multiple: true });
      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().trigger("keydown", keyCode("uparrow"));
    });

    it("should verify a the first submenu item is focused using keyboard tabbing after the parent item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), button).click();
      cy.focused().tab();
    });

    it("should verify a the first submenu item is focused using keyboard down arrow after the parent item was clicked", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first"), button).click();
      cy.focused().trigger("keydown", keyCode("downarrow"));
    });

    it("should verify number and type of elements in submenu", () => {
      const position = ["second", "third", "fifth", "sixth"];

      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      submenuBlock().children().should("have.length", 5);
      for (let i = 0; i < position.length; i++) {
        innerMenu(positionOfElement(position[i]), span).should(
          "have.attr",
          "data-component",
          "link"
        );
      }
      innerMenu(positionOfElement("fourth"), div).should(
        "have.attr",
        "data-component",
        "menu-divider"
      );
    });

    it.each([
      ["white", "first", "rgb(230, 235, 237)"],
      ["light", "third", "rgb(255, 255, 255)"],
      ["dark", "fifth", "rgb(0, 25, 38)"],
      ["black", "seventh", "rgb(38, 38, 38)"],
    ])(
      "should verify submenu has %s background color",
      (menuType, menuNumber, color) => {
        CypressMountWithProviders(<stories.MenuComponent />);

        submenu().eq(positionOfElement(menuNumber)).trigger("mouseover");
        innerMenu(positionOfElement("second"), span).should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    it.each([
      ["white", "first", "rgb(255, 255, 255)"],
      ["light", "fifth", "rgb(230, 235, 237)"],
      ["dark", "ninth", "rgb(0, 50, 76)"],
      ["black", "thirteenth", COLOR.BLACK],
    ])("should verify Menu is %s menuType", (menuType, menuNumber, color) => {
      CypressMountWithProviders(<stories.MenuComponent />);

      menuItem()
        .eq(positionOfElement(menuNumber))
        .children()
        .should("have.css", "background-color", color);
    });

    it.each([
      ["default", 1],
      ["large", 4],
    ])("should verify Menu Divider size is %s", (divider, size) => {
      CypressMountWithProviders(<stories.MenuComponent size={divider} />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      menuDivider().then(($el) => {
        useJQueryCssValueAndAssert($el, "height", size);
      });
    });

    it("should verify Menu Segment Title is visible within a submenu", () => {
      CypressMountWithProviders(<stories.MenuComponent />);

      submenu().eq(positionOfElement("second"), div).trigger("mouseover");
      segmentTitle()
        .should("have.text", "segment title")
        .and("be.visible")
        .and("have.css", "color", "rgba(0, 0, 0, 0.65)");
    });

    it("should verify default menu clickToOpen element does not open on hover", () => {
      CypressMountWithProviders(<stories.MenuComponent clickToOpen />);

      menuComponent(positionOfElement("fourth")).trigger("mouseover", {
        force: true,
      });
      submenuItem(positionOfElement("fourth"))
        .should("have.length", 0)
        .and("not.exist");
    });

    it("should verify default menu clickToOpen element opens on click", () => {
      CypressMountWithProviders(<stories.MenuComponent clickToOpen />);

      menuComponent(positionOfElement("fifth")).click();
      submenuItem(positionOfElement("fifth")).should("have.length", 3);
      innerMenu(positionOfElement("second"), span)
        .should("have.attr", "data-component", "link")
        .and("be.visible");
      innerMenu(positionOfElement("third"), div)
        .should("have.attr", "data-component", "menu-segment-title")
        .and("be.visible");
      innerMenu(positionOfElement("fourth"), span)
        .should("have.attr", "data-component", "link")
        .and("be.visible");
    });

    it.each(["Enter", "Space", "downarrow", "uparrow"])(
      "should verify default menu clickToOpen element opens using %s key",
      (key) => {
        CypressMountWithProviders(<stories.MenuComponent clickToOpen />);

        menuComponent(positionOfElement("fifth")).trigger(
          "keydown",
          keyCode(key)
        );
        submenuItem(positionOfElement("fifth")).should("have.length", 3);
        innerMenu(positionOfElement("second"), span)
          .should("have.attr", "data-component", "link")
          .and("be.visible");
        innerMenu(positionOfElement("third"), div)
          .should("have.attr", "data-component", "menu-segment-title")
          .and("be.visible");
        innerMenu(positionOfElement("fourth"), span)
          .should("have.attr", "data-component", "link")
          .and("be.visible");
      }
    );

    it.each([
      ["downarrow", 0],
      ["uparrow", 2],
    ])(
      "should verify the Search component is focusable by using the %s key",
      (key, tabs) => {
        CypressMountWithProviders(<stories.MenuComponentSearch />);

        pressTABKey(1);
        cy.wait(50);
        cy.focused().trigger("keydown", keyCode("Enter"));
        cy.wait(50);
        pressTABKey(tabs);
        cy.wait(50);
        cy.focused().trigger("keydown", keyCode(key));
        searchDefaultInput().should("have.focus");
      }
    );

    it("should verify the Search component close icon is focusable when using keyboard to navigate down the list of items", () => {
      CypressMountWithProviders(<stories.MenuComponentSearch />);

      pressTABKey(1);
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.wait(50);
      searchDefaultInput().clear().type("FooBar");
      cy.wait(50);
      searchDefaultInput().tab();
      searchCrossIcon().parent().should("have.focus");
    });

    it("should verify the Search component close icon is focusable when using keyboard to navigate up the list of items", () => {
      CypressMountWithProviders(<stories.MenuComponentSearch />);

      pressTABKey(1);
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.wait(50);
      searchDefaultInput().clear().type("FooBar");
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("End"));
      cy.wait(50);
      cy.focused().tab({ shift: true });
      cy.wait(50);
      cy.focused().tab({ shift: true });
      cy.wait(50);
      searchCrossIcon().parent().should("have.focus");
      cy.focused().tab({ shift: true });
      cy.wait(50);
      searchDefaultInput().should("have.focus");
    });

    it("should verify that the Search component is focusable by using the downarrow key when rendered as the parent of a scrollable submenu", () => {
      CypressMountWithProviders(<stories.MenuComponentSearch />);

      pressTABKey(3);
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.wait(50);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      searchDefaultInput().should("have.focus");
    });

    it("should verify scroll Menu search has an alternate background color", () => {
      CypressMountWithProviders(<stories.MenuComponentSearch />);

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      menuItem()
        .eq(2)
        .children()
        .should("have.css", "background-color", "rgb(0, 50, 76)");
    });

    it("should verify if there is a Menu Item with a very long label inside a submenu, check that the width of the whole submenu is determined by this submenu item", () => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu menuType="white">
            <MenuItem submenu="Menu Item One">
              <MenuItem href="#">
                Item Submenu One Is A Very Long Submenu Item Indeed
              </MenuItem>
              <MenuItem variant="alternate" href="#">
                Item Submenu Two
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      );

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      innerMenu(positionOfElement("second"), span).then(($item) => {
        submenuBlock()
          // .then($el => {
          //   useJQueryCssValueAndAssert($el, "width", i)
          // })
          .should("have.css", "width", `${$item.width()}px`);
      });
    });

    it("should verify if there is a Menu Item with a submenu that has a very long label, check the width of the whole submenu is determined by this parent item", () => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu menuType="white">
            <MenuItem submenu="Menu Item One Has A Very Long Menu Title For No Reason Whatsoever">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem variant="alternate" href="#">
                Item Submenu Two
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      );

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      submenu()
        .eq(positionOfElement("first"))
        .then(($menu) => {
          submenuBlock().should("have.css", "width", `${$menu.width()}px`);
        });
    });

    it.each([
      ["float", 0.3, 409],
      ["float", 0.6, 819],
      ["float", 1.0, 1366],
      ["number", 350, 350],
      ["number", 900, 900],
      ["number", 1350, 1350],
      ["string", "450px", 450],
      ["string", "675px", 675],
      ["string", "1200px", 1200],
    ])(
      "should verify Menu width is set by width prop when passed as a %s",
      (type, width, pixels) => {
        CypressMountWithProviders(<stories.MenuComponent width={width} />);

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", pixels);
        });
      }
    );

    it.each([
      ["number", 15, 15],
      ["number", 27, 27],
      ["number", 41, 41],
      ["string", "10px", 10],
      ["string", "30px", 30],
      ["string", "50px", 50],
    ])(
      "should verify Menu height is set by height prop when passed as %s",
      (type, propValue, pixels) => {
        CypressMountWithProviders(<stories.MenuComponent height={propValue} />);

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", pixels);
        });
      }
    );

    it.each([
      ["number", 810, 350, 810],
      ["number", 810, 1350, 1350],
      ["string", "700px", "300px", 700],
      ["string", "700px", "1200px", 1200],
    ])(
      "should verify Menu minimum width is set by minWidth prop when passed as %s",
      (type, minWidth, width, pixels) => {
        CypressMountWithProviders(
          <stories.MenuComponent minWidth={minWidth} width={width} />
        );

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", pixels);
        });
      }
    );

    it.each([
      ["number", 810, 350, 350],
      ["number", 810, 1350, 810],
      ["string", "700px", "300px", 300],
      ["string", "700px", "1200px", 700],
    ])(
      "should verify Menu maximum width is set by maxWidth prop when passed as %s",
      (type, maxWidth, width, pixels) => {
        CypressMountWithProviders(
          <stories.MenuComponent maxWidth={maxWidth} width={width} />
        );

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", pixels);
        });
      }
    );

    it.each([
      ["number", 30, 20, 30],
      ["number", 30, 40, 40],
      ["string", "35px", "25px", 35],
      ["string", "35px", "40px", 40],
    ])(
      "should verify Menu minimum height is set by minHeight prop when passed as %s",
      (type, minHeight, height, pixels) => {
        CypressMountWithProviders(
          <stories.MenuComponent minHeight={minHeight} height={height} />
        );

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", pixels);
        });
      }
    );

    it.each([
      ["number", 30, 20, 20],
      ["number", 30, 40, 30],
      ["string", "35px", "25px", 25],
      ["string", "35px", "40px", 35],
    ])(
      "should verify Menu maximum height is set by maxHeight prop when passed as %s",
      (type, maxHeight, height, pixels) => {
        CypressMountWithProviders(
          <stories.MenuComponent maxHeight={maxHeight} height={height} />
        );

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", pixels);
        });
      }
    );

    it.each([250, 750, 1350])(
      "should verify that using size prop sets both width and height props",
      (size) => {
        CypressMountWithProviders(<stories.MenuComponent size={size} />);

        menu().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", size);
          useJQueryCssValueAndAssert($el, "width", size);
        });
      }
    );

    it.each(["block", "inline-block", "flex", "contents", "list-item", "none"])(
      "should verify Menu display is %s",
      (display) => {
        CypressMountWithProviders(<stories.MenuComponent display={display} />);

        menu()
          .should("have.attr", "display", display)
          .and("have.css", "display", display);
      }
    );

    it.each([
      "baseline",
      "bottom",
      "middle",
      "sub",
      "super",
      "text-bottom",
      "text-top",
      "top",
    ])("should verify Menu alignItmes is %s", (alignment) => {
      CypressMountWithProviders(
        <stories.MenuComponent verticalAlign={alignment} />
      );

      menu().should("have.css", "vertical-align", alignment);
    });

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Menu overflow is %s",
      (overflow) => {
        CypressMountWithProviders(<Menu overflow={overflow} />);

        menu()
          .should("have.attr", "overflow", overflow)
          .and("have.css", "overflow", overflow);
      }
    );

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Menu overflowX is %s",
      (overflow) => {
        CypressMountWithProviders(
          <stories.MenuComponent overflowX={overflow} />
        );

        menu().should("have.css", "overflow-x", overflow);
      }
    );

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Menu overflowY is %s",
      (overflow) => {
        CypressMountWithProviders(
          <stories.MenuComponent overflowY={overflow} />
        );

        menu().should("have.css", "overflow-y", overflow);
      }
    );

    it.each([
      "normal",
      "stretch",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Menu alignItems is %s", (alignment) => {
      CypressMountWithProviders(
        <stories.MenuComponent alignItems={alignment} />
      );

      menu().should("have.css", "align-items", alignment);
    });

    it.each([
      "normal",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
      "space-between",
      "space-around",
      "stretch",
    ])("should verify Menu alignContent is %s", (alignment) => {
      CypressMountWithProviders(
        <stories.MenuComponent alignContent={alignment} />
      );

      menu().should("have.css", "align-content", alignment);
    });

    it.each([
      "left",
      "center",
      "right",
      "flex-start",
      "flex-end",
      "normal",
      "stretch",
    ])("should verify Menu justifyItems is %s", (justified) => {
      CypressMountWithProviders(
        <stories.MenuComponent justifyItems={justified} />
      );

      menu().should("have.css", "justify-items", justified);
    });

    it.each([
      "left",
      "center",
      "right",
      "flex-start",
      "flex-end",
      "normal",
      "space-between",
      "space-around",
      "stretch",
    ])("should verify Menu justifyContent is %s", (justified) => {
      CypressMountWithProviders(
        <stories.MenuComponent justifyContent={justified} />
      );

      menu().should("have.css", "justify-content", justified);
    });

    it.each(["nowrap", "wrap", "wrap-reverse"])(
      "should verify Menu flex wrap is %s",
      (wrap) => {
        CypressMountWithProviders(<stories.MenuComponent flexWrap={wrap} />);

        menu().should("have.css", "flex-wrap", wrap);
      }
    );

    it.each(["column", "column-reverse", "row", "row-reverse"])(
      "should verify Menu flex direction is %s",
      (direction) => {
        CypressMountWithProviders(
          <stories.MenuComponent flexDirection={direction} />
        );

        menu().should("have.css", "flex-direction", direction);
      }
    );

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Menu flex is %s",
      (flex) => {
        CypressMountWithProviders(<stories.MenuComponent flex={flex} />);

        menu().should("have.css", "flex-basis", flex);
      }
    );

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu flex grow is %s", (value, growText) => {
      CypressMountWithProviders(
        <stories.MenuComponent flex="auto" flexGrow={value} />
      );

      menu().should("have.css", "flex-grow", growText);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu flex shrink is %s", (value, shrinkText) => {
      CypressMountWithProviders(
        <stories.MenuComponent flex="auto" flexShrink={value} />
      );

      menu().should("have.css", "flex-shrink", shrinkText);
    });

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Menu flex basis is %s",
      (basis) => {
        CypressMountWithProviders(<stories.MenuComponent flexBasis={basis} />);

        menu().should("have.css", "flex-basis", basis);
      }
    );

    it.each([
      "auto",
      "baseline",
      "left",
      "normal",
      "right",
      "stretch",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Menu justifySelf is %s", (justify) => {
      CypressMountWithProviders(
        <stories.MenuComponent justifySelf={justify} />
      );

      menu().should("have.css", "justify-self", justify);
    });

    it.each([
      "auto",
      "baseline",
      "normal",
      "stretch",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Menu alignSelf is %s", (align) => {
      CypressMountWithProviders(<stories.MenuComponent alignSelf={align} />);

      menu().should("have.css", "align-self", align);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu order is %s", (value, orderText) => {
      CypressMountWithProviders(<stories.MenuComponent order={value} />);

      menu().should("have.css", "order", orderText);
    });

    it("should verify Menu Items className is customisable", () => {
      CypressMountWithProviders(
        <stories.MenuComponentItems className={CHARACTERS.STANDARD} />
      );

      menuItem()
        .eq(0)
        .should("have.attr", "class")
        .then(($el) => {
          expect($el).contains(CHARACTERS.STANDARD);
        });
    });

    it.each([
      ["selected", true, "rgb(230, 235, 237)"],
      ["not selected", false, "rgb(255, 255, 255)"],
    ])("should verify first Menu Item is %s", (state, boolVal, color) => {
      CypressMountWithProviders(
        <stories.MenuComponentItems selected={boolVal} />
      );

      submenu().eq(0).children().should("have.css", "background-color", color);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should verify Menu Item text is %s", (text) => {
      CypressMountWithProviders(<stories.MenuComponentItems submenu={text} />);

      menuItem().eq(0).should("have.text", text);
    });

    it("should verify Menu Item target is %s", () => {
      CypressMountWithProviders(
        <stories.MenuComponentItems target={CHARACTERS.STANDARD} />
      );

      menuItem()
        .eq(0)
        .children()
        .children()
        .children()
        .should("have.attr", "target", CHARACTERS.STANDARD);
    });

    it.each([
      [true, 32],
      [false, 16],
    ])(
      "should verify dropdown arrow is displayed on Menu Item",
      (boolVal, padding) => {
        CypressMountWithProviders(
          <stories.MenuComponentItems showDropdownArrow={boolVal} />
        );

        submenu()
          .eq(0)
          .children()
          .children()
          .should("have.css", "padding-right", `${padding}px`);
      }
    );

    it.each([
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(217, 224, 228)"],
    ])("should verify Menu Item has %s variant", (variant, color) => {
      CypressMountWithProviders(
        <stories.MenuComponentItems variant={variant} />
      );

      submenu().eq(0).children().should("have.css", "background-color", color);
    });

    it("should verify Menu Item ariaLabel is set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.MenuComponentItems ariaLabel={CHARACTERS.STANDARD} />
      );

      submenu()
        .eq(0)
        .children()
        .children()
        .should("have.attr", "aria-label", CHARACTERS.STANDARD);
    });

    it.each([
      ["default", 1, 16, 121],
      ["large", 4, 0, 153],
    ])(
      "should verify that a Menu size is %s",
      (size, height, margin, width) => {
        CypressMountWithProviders(
          <Box mb={150}>
            <Menu menuType="white">
              <MenuItem submenu="Menu">
                <MenuItem href="#">Submenu Item One</MenuItem>
                <MenuDivider size={size} />
                <MenuItem href="#">Submenu Item Two</MenuItem>
              </MenuItem>
            </Menu>
          </Box>
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        menuDivider().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
          useJQueryCssValueAndAssert($el, "margin-left", margin);
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it.each([
      [100, 100],
      [200, 200],
      ["150px", 150],
      ["250px", 250],
    ])(
      "should verify Menu scroll block height prop can be entered as a number or string",
      (height, pixels) => {
        CypressMountWithProviders(
          <stories.MenuComponentScrollable height={height} />
        );

        submenu().eq(positionOfElement("first"), div).trigger("mouseover");
        scrollBlock().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", pixels);
        });
      }
    );

    it.each([
      ["default", "rgb(230, 235, 237)"],
      ["alternate", "rgb(217, 224, 228)"],
    ])(
      "should verify Menu scroll block has %s background color using variant prop",
      (variant, color) => {
        CypressMountWithProviders(
          <stories.MenuComponentScrollable variant={variant} />
        );

        submenu().eq(positionOfElement("first"), div).trigger("mouseover");
        scrollBlock()
          .children()
          .children(1)
          .should("have.css", "background-color", color);
      }
    );

    it.each([
      ["default", "rgba(0, 0, 0, 0)"],
      ["alternate", "rgb(217, 224, 228)"],
    ])(
      "should verify that a Menu Segment Title has a variant background color",
      (variant, color) => {
        CypressMountWithProviders(
          <Box mb={150}>
            <Menu menuType="white">
              <MenuItem submenu="Menu Item One">
                <MenuItem href="#">
                  Item Submenu One Is A Very Long Submenu Item Indeed
                </MenuItem>
                <MenuSegmentTitle variant={variant}>
                  Segment Title
                </MenuSegmentTitle>
              </MenuItem>
            </Menu>
          </Box>
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        segmentTitle().should("have.css", "background-color", color);
      }
    );

    it("should verify that inner Menu without link is NOT available with tabbing in Fullscreen Menu", () => {
      CypressMountWithProviders(<stories.MenuComponentFullScreen />);

      cy.viewport(1200, 800);
      menuItem().eq(positionOfElement("first"), div).click();
      continuePressingTABKey(8);
      menuItem().should("not.be.focused");
    });

    it("should verify Menu Item href prop", () => {
      CypressMountWithProviders(
        <stories.MenuComponentItems href={CHARACTERS.STANDARD} />
      );

      submenu()
        .eq(0)
        .children()
        .children()
        .should("have.attr", "href", CHARACTERS.STANDARD);
    });

    it.each([["noopener"], ["noreferrer"], ["opener"]])(
      "should verify Menu Item with rel prop set to %s",
      (rel) => {
        CypressMountWithProviders(<stories.MenuComponentItems rel={rel} />);

        submenu().eq(0).children().children().should("have.attr", "rel", rel);
      }
    );

    it("should verify Scrollable Block parent prop", () => {
      CypressMountWithProviders(
        <stories.MenuComponentScrollable parent={<MenuItem>Parent</MenuItem>} />
      );

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      scrollBlock()
        .eq(0)
        .parent()
        .children()
        .eq(0)
        .should("have.text", "Parent");
    });

    it.each([
      ["default", "rgb(230, 235, 237)"],
      ["alternate", "rgb(217, 224, 228)"],
    ])(
      "should verify Scrollable Block parent variant prop",
      (variant, color) => {
        CypressMountWithProviders(
          <stories.MenuComponentScrollable
            parent={<MenuItem>Parent</MenuItem>}
            parentVariant={variant}
          />
        );

        submenu().eq(positionOfElement("first"), div).trigger("mouseover");
        scrollBlock()
          .eq(0)
          .parent()
          .children()
          .eq(0)
          .children()
          .should("have.css", "background-color", color);
      }
    );
  });

  describe("check props for Menu Fullscreen component", () => {
    beforeEach(() => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<stories.MenuComponentFullScreen />);
      menuItem().eq(positionOfElement("first"), div).click();
    });

    it("should verify that the Menu Fullscreen is rendered properly", () => {
      fullscreenMenu(positionOfElement("first"))
        .find("span")
        .should("have.attr", "data-element", "close")
        .and("be.visible");
      fullscreenMenu(positionOfElement("second"))
        .find("ul")
        .should("have.attr", "data-component", "menu")
        .should("be.visible");
      fullscreenMenu(positionOfElement("second"))
        .find("ul > li")
        .should("have.length", 15);
    });

    it("should verify that the Menu Fullscreen is closed when close icon is clicked", () => {
      closeIconButton().eq(0).click();

      fullscreenMenu(positionOfElement("first")).should("not.be.visible");
      fullscreenMenu(positionOfElement("second")).should("not.be.visible");
      menu().should("be.visible");
    });

    it("should verify that close icon is focused in Menu Fullscreen", () => {
      pressTABKey(1);
      closeIconButton().then(($el) => {
        checkGoldenOutline($el);
      });
    });

    it("should verify that inner Menu is available with tabbing in Menu Fullscreen", () => {
      pressTABKey(5);
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "box-shadow")
        .and("contain", "rgb(255, 181, 0)");
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "background-color")
        .and("contain", "rgb(0, 126, 69)");
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("be.focused");
    });

    it("should verify that inner Menu is available with shift-tabbing in Menu Fullscreen", () => {
      pressTABKey(6);
      cy.focused().tab({ shift: true });
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "box-shadow")
        .and("contain", "rgb(255, 181, 0)");
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "background-color")
        .and("contain", "rgb(0, 126, 69)");
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("be.focused");
    });

    it("should verify that inner Menu without link is NOT available with tabbing in Fullscreen Menu", () => {
      continuePressingTABKey(8);
      menuItem().should("not.be.focused");
    });

    it.each([
      ["open", true, "be.visible"],
      ["closed", false, "not.be.visible"],
    ])(
      "should verify that Menu Fullscreen is %s when isOpen prop is %s",
      (value, boolVal, state) => {
        CypressMountWithProviders(
          <stories.MenuComponentFullScreen isOpen={boolVal} />
        );

        getComponent("menu-fullscreen").should(state);
      }
    );

    it.each([
      ["left", -1200, 1200],
      ["right", 1200, -1200],
    ])(
      "should verify that Menu Fullscreen start position is %s",
      (side, left, right) => {
        CypressMountWithProviders(
          <stories.MenuComponentFullScreen startPosition={side} />
        );

        getComponent("menu-fullscreen").should("have.css", "left", `${left}px`);
        getComponent("menu-fullscreen").should(
          "have.css",
          "right",
          `${right}px`
        );
      }
    );
  });

  describe("check events for Menu component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<stories.MenuComponent onClick={callback} />);

      menuComponent(positionOfElement("fifth"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onSubmenuOpen callback when mouseover event is triggered", () => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu>
            <MenuItem onSubmenuOpen={callback} submenu="Menu Item One">
              <MenuSegmentTitle />
            </MenuItem>
          </Menu>
        </Box>
      );

      submenu()
        .eq(positionOfElement("first"), div)
        .trigger("mouseover")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onSubmenuOpen callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu>
            <MenuItem
              clickToOpen
              onSubmenuOpen={callback}
              submenu="Menu Item One"
            >
              <MenuSegmentTitle />
            </MenuItem>
          </Menu>
        </Box>
      );

      menuComponent(positionOfElement("second"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    // "Skipped test of Space/Enter/downArrow/upArrow because of ticket FE-5510"
    it.skip("should call onSubmenuOpen callback when a keyboard event is triggered", (key) => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu>
            <MenuItem
              clickToOpen
              onSubmenuOpen={callback}
              submenu="Menu Item One"
            >
              <MenuSegmentTitle />
            </MenuItem>
          </Menu>
        </Box>
      );

      menuComponent(positionOfElement("second"))
        .trigger("keydown", keyCode(key))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onSubmenuClose callback when menu is closed", () => {
      CypressMountWithProviders(
        <Box mb={150}>
          <Menu>
            <MenuItem onSubmenuOpen={callback} submenu="Menu Item One">
              <MenuSegmentTitle />
            </MenuItem>
            <MenuItem submenu="Menu Item Two">
              <MenuSegmentTitle />
            </MenuItem>
          </Menu>
        </Box>
      );

      submenu().eq(positionOfElement("first"), div).trigger("mouseover");
      submenu()
        .eq(positionOfElement("second"), div)
        .trigger("mouseover")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClose callback when Menu Fullscreen is closed", () => {
      CypressMountWithProviders(
        <stories.MenuComponentFullScreen onClose={callback} />
      );

      cy.viewport(1200, 800);
      menuItem().eq(positionOfElement("first"), div).click();
      closeIconButton()
        .eq(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe.only("Accessibility tests for Menu component", () => {
    // it("should pass accessibility tests for Menu default", () => {
    //   CypressMountWithProviders(<stories.MenuComponent />);

    //   cy.checkAccessibility();
    // });

    // it("should pass accessibility tests for Menu expanded", () => {
    //   CypressMountWithProviders(<stories.MenuComponent />);

    //   submenu()
    //     .eq(positionOfElement("first"), div)
    //     .trigger("mouseover")
    //     .then(() => {
    //       // eslint-disable-next-line no-unused-expressions
    //       cy.checkAccessibility();
    //     });
    // });

    // it.each(["default", "large"])(
    //   "should pass accessibility tests for Menu when divider size is %s", (divider) => {
    //   CypressMountWithProviders(<stories.MenuComponent size={divider} />);

    //   submenu()
    //     .eq(positionOfElement("first"), div)
    //     .trigger("mouseover")
    //     .then(() => {
    //       // eslint-disable-next-line no-unused-expressions
    //       cy.checkAccessibility();
    //     });
    // });

    // it("should pass accessibility tests for Menu when search component is focused", () => {
    //   CypressMountWithProviders(<stories.MenuComponentSearch />);

    //   pressTABKey(1);
    //   cy.wait(50);
    //   cy.focused().trigger("keydown", keyCode("Enter"));
    //   cy.wait(50);
    //   pressTABKey(0);
    //   cy.wait(50);
    //   cy.focused().trigger("keydown", keyCode("downarrow"))
    //     .then(() => {
    //     // eslint-disable-next-line no-unused-expressions
    //     cy.checkAccessibility();
    //   });
    // });

    // it("should pass accessibility tests for Menu when a menu item has a long label", () => {
    //   CypressMountWithProviders(
    //     <Box mb={150}>
    //       <Menu menuType="white">
    //         <MenuItem submenu="Menu Item One">
    //           <MenuItem href="#">
    //             Item Submenu One Is A Very Long Submenu Item Indeed
    //           </MenuItem>
    //           <MenuItem variant="alternate" href="#">
    //             Item Submenu Two
    //           </MenuItem>
    //         </MenuItem>
    //       </Menu>
    //     </Box>
    //   );

    //   submenu()
    //     .eq(positionOfElement("first"))
    //     .trigger("mouseover")
    //     .then(() => {
    //       // eslint-disable-next-line no-unused-expressions
    //       cy.checkAccessibility();
    //   });
    // });

    // it("should pass accessibility tests for Menu when a submenu has a long label", () => {
    //   CypressMountWithProviders(
    //     <Box mb={150}>
    //       <Menu menuType="white">
    //         <MenuItem submenu="Menu Item One Has A Very Long Menu Title For No Reason Whatsoever">
    //           <MenuItem href="#">Item Submenu One</MenuItem>
    //           <MenuItem variant="alternate" href="#">
    //             Item Submenu Two
    //           </MenuItem>
    //         </MenuItem>
    //       </Menu>
    //     </Box>
    //   );

    //   submenu().eq(positionOfElement("first")).trigger("mouseover");
    //   submenu()
    //     .eq(positionOfElement("first"))
    //     .then(() => {
    //       // eslint-disable-next-line no-unused-expressions
    //       cy.checkAccessibility();
    //     });
    // });

    // it.each(["450px", "675px", "1200px"])(
    //   "should pass accessibility tests for Menu when width is %s", (width) => {
    //     CypressMountWithProviders(<stories.MenuComponent width={width} />);

    //     cy.checkAccessibility();
    //   }
    // );

    // it.each(["10px", "30px", "50px"])(
    //   "should pass accessibility tests for Menu when height is s", (propValue) => {
    //     CypressMountWithProviders(<stories.MenuComponent height={propValue} />);

    //     cy.checkAccessibility();
    // });

    it.each([
      "normal",
      "stretch",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Menu alignItems is %s", (alignment) => {
      CypressMountWithProviders(
        <stories.MenuComponent alignItems={alignment} />
      );

      menu().should("have.css", "align-items", alignment);
    });
  });
});
