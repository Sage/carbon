import React from "react";
import {
  Menu,
  MenuProps,
  MenuItem,
  MenuWithChildren,
  MenuDivider,
  MenuDividerProps,
  MenuSegmentTitle,
  MenuFullscreenProps,
  ScrollableBlockProps,
} from "../../../src/components/menu";
import Box from "../../../src/components/box";
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
  fullScreenMenuWrapper,
  menu,
  menuItem,
  fullScreenMenuItem,
  searchDefaultInput,
  searchCrossIcon,
  searchButton,
} from "../../locators/menu";
import { getComponent, closeIconButton, icon } from "../../locators";
import {
  keyCode,
  positionOfElement,
  pressTABKey,
  continuePressingTABKey,
} from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";
import {
  checkGoldenOutline,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  MenuComponent,
  MenuComponentScrollable,
  MenuComponentSearch,
  MenuWithChildrenUpdating,
  MenuComponentFullScreen,
  MenuFullScreenBackgroundScrollTest,
  MenuFullScreenWithFalsyValues,
  MenuFullScreenKeysTest,
  MenuComponentItems,
  MenuFullScreenWithSearchButton,
  MenuComponentScrollableParent,
  MenuComponentWithIcon,
  MenuComponentButtonIcon,
  MenuSegmentTitleComponent,
  MenuItems,
  ClosedMenuFullScreenWithButtons,
  MenuDividerComponent,
  InGlobalHeaderStory,
} from "../../../src/components/menu/menu-test.stories";
import { NavigationBarWithSubmenuAndChangingHeight } from "../../../src/components/navigation-bar/navigation-bar-test.stories";

const span = "span";
const div = "div";

context("Testing Menu component", () => {
  describe("check props for Menu component", () => {
    it("should verify scroll block within a submenu is scrollable", () => {
      CypressMountWithProviders(<MenuComponentScrollable />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      scrollBlock().scrollTo("bottom");
      lastSubmenuElement("li").should("be.visible");
    });

    it("should verify a submenu can be navigated using keyboard tabbing after an item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      innerMenu(positionOfElement("third"), span).click({ multiple: true });
      cy.focused().tab();
      cy.focused().should("contain", "Item Submenu Three");
      cy.focused().parent().should("have.css", "box-shadow", "none");
      cy.focused().tab();
      cy.focused().should("contain", "Item Submenu Four");
      cy.focused().parent().should("have.css", "box-shadow", "none");
    });

    it("should verify a submenu can be navigated using keyboard down arrow after an item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      innerMenu(positionOfElement("third"), span).click({ multiple: true });
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Item Submenu Three");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Item Submenu Four");
    });

    it("should verify a submenu can be navigated using keyboard shift + tabbing after an item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      innerMenu(positionOfElement("fifth"), span).click({ multiple: true });
      cy.focused().tab({ shift: true });
      cy.focused().should("contain", "Item Submenu Two");
      cy.focused().tab({ shift: true });
      cy.focused().should("contain", "Item Submenu One");
    });

    it("should verify a submenu can be navigated using keyboard up arrow after an item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      innerMenu(positionOfElement("fifth"), span).click({ multiple: true });
      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().should("contain", "Item Submenu Two");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().should("contain", "Item Submenu One");
    });

    it("should verify a the first submenu item is focused using keyboard tabbing after the parent item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).click();
      cy.focused().tab();
      cy.focused().should("contain", "Item Submenu One");
    });

    it("should verify a the first submenu item is focused using keyboard down arrow after the parent item was clicked", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).click();
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Item Submenu One");
    });

    it("should verify number and type of elements in submenu", () => {
      const position = ["second", "third", "fifth", "sixth"] as const;

      CypressMountWithProviders(<MenuComponent />);

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
      ["white", "rgb(230, 235, 237)", "first"],
      ["light", "rgb(255, 255, 255)", "third"],
      ["dark", "rgb(0, 25, 38)", "fifth"],
      ["black", "rgb(38, 38, 38)", "seventh"],
    ] as [string, string, "first" | "third" | "fifth" | "seventh"][])(
      "should verify submenu background color is %s",
      (colorName, color, menuNumber) => {
        CypressMountWithProviders(<MenuComponent />);

        submenu().eq(positionOfElement(menuNumber)).trigger("mouseover");
        innerMenu(positionOfElement("second"), span).should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    it.each([
      ["white", "rgb(255, 255, 255)", "first"],
      ["light", "rgb(230, 235, 237)", "fifth"],
      ["dark", "rgb(0, 50, 76)", "ninth"],
      ["black", "rgb(0, 0, 0)", "thirteenth"],
    ] as [string, string, "first" | "fifth" | "ninth" | "thirteenth"][])(
      "should verify Menu background color is %s",
      (colorName, color, menuNumber) => {
        CypressMountWithProviders(<MenuComponent />);
        menuItem()
          .eq(positionOfElement(menuNumber))
          .children()
          .should("have.css", "background-color", color);
      }
    );

    it.each([
      ["white", "rgba(0, 0, 0, 0.9)"],
      ["light", "rgba(0, 0, 0, 0.9)"],
      ["dark", "rgb(255, 255, 255)"],
      ["black", "rgb(255, 255, 255)"],
    ] as [MenuProps["menuType"], string][])(
      "should verify icons have the correct color when menuType is %s",
      (menuType, color) => {
        CypressMountWithProviders(
          <Menu menuType={menuType}>
            <MenuItem onClick={() => {}} icon="home">
              Foo
            </MenuItem>
          </Menu>
        );
        pressTABKey(1);
        icon().should("have.css", "color", color);
      }
    );

    it.each([
      ["default", 1],
      ["large", 4],
    ] as [MenuDividerProps["size"], number][])(
      "should verify Menu Divider size is %s",
      (size, height) => {
        CypressMountWithProviders(<MenuDividerComponent size={size} />);

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        menuDivider().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
        });
      }
    );

    it("should verify Menu Segment Title is visible within a submenu", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("second")).trigger("mouseover");
      segmentTitle()
        .should("have.text", "segment title")
        .and("be.visible")
        .and("have.css", "color", "rgba(0, 0, 0, 0.65)");
    });

    it("should verify default menu clickToOpen element does not open on hover", () => {
      CypressMountWithProviders(<MenuComponentItems clickToOpen />);

      menuComponent(positionOfElement("fourth")).trigger("mouseover", {
        force: true,
      });
      submenuItem(positionOfElement("fourth"))
        .should("have.length", 0)
        .and("not.exist");
    });

    it("should verify default menu clickToOpen element opens on click", () => {
      CypressMountWithProviders(<MenuItems clickToOpen />);

      menuComponent(positionOfElement("sixth")).click();
      submenuItem(positionOfElement("sixth")).should("have.length", 2);
      innerMenu(positionOfElement("second"), span)
        .should("have.attr", "data-component", "link")
        .and("be.visible");
      innerMenu(positionOfElement("third"), span)
        .should("have.attr", "data-component", "link")
        .and("be.visible");
    });

    it.each(["Enter", "Space", "downarrow", "uparrow"] as (
      | "Enter"
      | "Space"
      | "downarrow"
      | "uparrow"
    )[])(
      "should verify default menu clickToOpen element opens using %s key",
      (key) => {
        CypressMountWithProviders(<MenuItems clickToOpen />);
        menuComponent(positionOfElement("sixth")).trigger(
          "keydown",
          keyCode(key)
        );
        submenuItem(positionOfElement("sixth")).should("have.length", 2);
        innerMenu(positionOfElement("second"), span)
          .should("have.attr", "data-component", "link")
          .and("be.visible");
        innerMenu(positionOfElement("third"), span)
          .should("have.attr", "data-component", "link")
          .and("be.visible");
      }
    );

    it.each([
      ["downarrow", 0],
      ["uparrow", 2],
    ] as ["downarrow" | "uparrow", number][])(
      "should verify the Search component is focusable by using the %s key",
      (key, tabs) => {
        CypressMountWithProviders(<MenuComponentSearch />);

        pressTABKey(1);

        cy.focused().trigger("keydown", keyCode("Enter"));
        pressTABKey(tabs);
        cy.focused().trigger("keydown", keyCode(key));
        searchDefaultInput().should("have.focus");
      }
    );

    it("should verify the Search component close icon is focusable when using keyboard to navigate down the list of items", () => {
      CypressMountWithProviders(<MenuComponentSearch />);

      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.focused().trigger("keydown", keyCode("downarrow"));
      searchDefaultInput().clear().type("FooBar");
      searchDefaultInput().tab();
      searchCrossIcon().parent().should("have.focus");
    });

    it("should verify the Search component close icon is centred when focused", () => {
      CypressMountWithProviders(<MenuComponentSearch />);
      const bottomLess = 201;
      const topLess = 181;
      const leftLess = 134;
      // additionVal is to compensate for the outline.
      const additionVal = 2;

      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("Enter"));

      cy.focused().trigger("keydown", keyCode("downarrow"));

      searchDefaultInput().clear().type("FooBar");

      searchDefaultInput().tab();
      searchCrossIcon().parent().should("have.focus");

      const bounding = (element: JQuery<Element>) => {
        return element[0].getBoundingClientRect();
      };

      searchCrossIcon()
        .then(($el) => bounding($el))
        .as("position");

      cy.get("@position")
        .its("bottom")
        .should("be.lessThan", bottomLess + additionVal);
      cy.get("@position").its("bottom").should("be.greaterThan", bottomLess);
      cy.get("@position")
        .its("top")
        .should("be.lessThan", topLess + additionVal);
      cy.get("@position").its("top").should("be.greaterThan", topLess);
      cy.get("@position")
        .its("left")
        .should("be.lessThan", leftLess + additionVal);
      cy.get("@position").its("left").should("be.greaterThan", leftLess);
    });

    it("should verify the Search component close icon is focusable when using keyboard to navigate up the list of items", () => {
      CypressMountWithProviders(<MenuComponentSearch />);
      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("Enter"));
      searchDefaultInput().clear().type("FooBar");
      cy.focused().trigger("keydown", keyCode("End"));
      cy.focused().tab({ shift: true });
      cy.focused().tab({ shift: true });
      searchCrossIcon().parent().should("have.focus");
      cy.focused().tab({ shift: true });
      searchDefaultInput().should("have.focus");
    });

    it("should verify that the Search component is focusable by using the downarrow key when rendered as the parent of a scrollable submenu", () => {
      CypressMountWithProviders(<MenuComponentSearch />);

      pressTABKey(3);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.focused().trigger("keydown", keyCode("downarrow"));
      searchDefaultInput().should("have.focus");
    });

    it("should verify scroll Menu search has an alternate background color", () => {
      CypressMountWithProviders(<MenuComponentSearch />);
      submenu().eq(positionOfElement("third")).trigger("mouseover");
      menuItem()
        .eq(4)
        .children()
        .should("have.css", "background-color", "rgb(0, 50, 76)");
    });

    it("should not close submenu when enter is pressed on search component", () => {
      CypressMountWithProviders(<MenuComponentSearch />);

      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("Enter"));
      cy.focused().trigger("keydown", keyCode("downarrow"));
      searchDefaultInput().clear().type("FooBar");
      cy.focused().tab();
      cy.focused().trigger("keydown", keyCode("Enter"));
      submenuBlock().should("be.visible");
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
      innerMenu(positionOfElement("second"), span).as("submenuBlock");
      cy.get("@submenuBlock").its("0").should("have.css", "width").as("width");
      cy.get("@width")
        .then(($el) => parseInt($el.toString()))
        .should("be.within", 385, 395);
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
      submenu().eq(positionOfElement("first")).as("submenuBlock");
      cy.get("@submenuBlock").its("0").should("have.css", "width").as("width");
      cy.get("@width")
        .then(($el) => parseInt($el.toString()))
        .should("be.within", 490, 499);
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
      "should verify Menu width is set by width prop when passed as %s",
      (type, width, pixels) => {
        CypressMountWithProviders(<MenuComponent width={width} />);

        menu().then(($el) => {
          assertCssValueIsApproximately($el, "width", pixels);
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
        CypressMountWithProviders(<MenuComponent height={propValue} />);

        menu().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixels);
        });
      }
    );

    it.each([
      ["number", 810, 350, 810],
      ["number", 810, 1350, 1350],
      ["string", "700px", "300px", 700],
      ["string", "700px", "1200px", 1200],
    ] as [string, string | number, string | number, number][])(
      "should verify Menu minimum width is set by minWidth prop when passed as %s",
      (type, minWidth, width, pixels) => {
        CypressMountWithProviders(
          <MenuComponent minWidth={minWidth} width={width} />
        );
        menu().then(($el) => {
          assertCssValueIsApproximately($el, "width", pixels);
        });
      }
    );

    it.each([
      ["number", 810, 350, 350],
      ["number", 810, 1350, 810],
      ["string", "700px", "300px", 300],
      ["string", "700px", "1200px", 700],
    ] as [string, string | number, string | number, number][])(
      "should verify Menu maximum width is set by minWidth prop when passed as %s",
      (type, maxWidth, width, pixels) => {
        CypressMountWithProviders(
          <MenuComponent maxWidth={maxWidth} width={width} />
        );
        menu().then(($el) => {
          assertCssValueIsApproximately($el, "width", pixels);
        });
      }
    );

    it.each([
      ["number", 30, 20, 30],
      ["number", 30, 40, 40],
      ["string", "35px", "25px", 35],
      ["string", "35px", "40px", 40],
    ] as [string, string | number, string | number, number][])(
      "should verify Menu minimum height is set by minWidth prop when passed as %s",
      (type, minHeight, height, pixels) => {
        CypressMountWithProviders(
          <MenuComponent minHeight={minHeight} height={height} />
        );

        menu().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixels);
        });
      }
    );

    it.each([
      ["number", 30, 20, 20],
      ["number", 30, 40, 30],
      ["string", "35px", "25px", 25],
      ["string", "35px", "40px", 35],
    ] as [string, string | number, string | number, number][])(
      "should verify Menu maximum height is set by minWidth prop when passed as %s",
      (type, maxHeight, height, pixels) => {
        CypressMountWithProviders(
          <MenuComponent maxHeight={maxHeight} height={height} />
        );

        menu().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixels);
        });
      }
    );

    it.each(["block", "inline-block", "flex", "contents", "list-item", "none"])(
      "should verify Menu display is %s",
      (display) => {
        CypressMountWithProviders(<MenuComponent display={display} />);

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
    ])("should verify Menu verticalAlign is %s", (alignment) => {
      CypressMountWithProviders(<MenuComponent verticalAlign={alignment} />);

      menu().should("have.css", "vertical-align", alignment);
    });

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Menu overflow is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflow={overflow} />);

        menu()
          .should("have.attr", "overflow", overflow)
          .and("have.css", "overflow", overflow);
      }
    );

    it.each([
      "auto",
      "clip",
      "hidden",
      "scroll",
      "visible",
    ] as MenuProps["overflowX"][])(
      "should verify Menu overflowX is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflowX={overflow} />);

        menu().should("have.css", "overflow-x", overflow);
      }
    );

    it.each([
      "auto",
      "clip",
      "hidden",
      "scroll",
      "visible",
    ] as MenuProps["overflowY"][])(
      "should verify Menu overflowY is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflowY={overflow} />);

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
      CypressMountWithProviders(<MenuComponent alignItems={alignment} />);

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
      CypressMountWithProviders(<MenuComponent alignContent={alignment} />);

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
      CypressMountWithProviders(<MenuComponent justifyItems={justified} />);

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
      CypressMountWithProviders(<MenuComponent justifyContent={justified} />);

      menu().should("have.css", "justify-content", justified);
    });

    it.each(["nowrap", "wrap", "wrap-reverse"] as MenuProps["flexWrap"][])(
      "should verify Menu flex wrap is %s",
      (wrap) => {
        CypressMountWithProviders(<MenuComponent flexWrap={wrap} />);

        menu().should("have.css", "flex-wrap", wrap);
      }
    );

    it.each([
      "column",
      "column-reverse",
      "row",
      "row-reverse",
    ] as MenuProps["flexDirection"][])(
      "should verify Menu flex direction is %s",
      (direction) => {
        CypressMountWithProviders(<MenuComponent flexDirection={direction} />);

        menu().should("have.css", "flex-direction", direction);
      }
    );

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Menu flex is %s",
      (flex) => {
        CypressMountWithProviders(<MenuComponent flex={flex} />);

        menu().should("have.css", "flex-basis", flex);
      }
    );

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu flex grow is %s", (value, growText) => {
      CypressMountWithProviders(<MenuComponent flex="auto" flexGrow={value} />);

      menu().should("have.css", "flex-grow", growText);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu flex shrink is %s", (value, shrinkText) => {
      CypressMountWithProviders(
        <MenuComponent flex="auto" flexShrink={value} />
      );

      menu().should("have.css", "flex-shrink", shrinkText);
    });

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Menu flex basis is %s",
      (basis) => {
        CypressMountWithProviders(<MenuComponent flexBasis={basis} />);

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
      CypressMountWithProviders(<MenuComponent justifySelf={justify} />);

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
      CypressMountWithProviders(<MenuComponent alignSelf={align} />);

      menu().should("have.css", "align-self", align);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Menu order is %s", (value, orderText) => {
      CypressMountWithProviders(<MenuComponent order={value} />);

      menu().should("have.css", "order", orderText);
    });

    it("should verify Menu Items className is customisable", () => {
      CypressMountWithProviders(
        <MenuComponentItems className={CHARACTERS.STANDARD} />
      );
      menuItem().eq(0).should("have.attr", "class").as("item");
      cy.get("@item").should("contain", CHARACTERS.STANDARD);
    });

    it.each([
      ["selected", true, "rgb(230, 235, 237)"],
      ["not selected", false, "rgb(255, 255, 255)"],
    ])("should verify first Menu Item is %s", (state, boolVal, color) => {
      CypressMountWithProviders(<MenuComponentItems selected={boolVal} />);

      submenu().eq(0).children().should("have.css", "background-color", color);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should verify Menu Item text is %s", (text) => {
      CypressMountWithProviders(<MenuComponentItems submenu={text} />);

      menuItem().eq(0).should("have.text", text);
    });

    it("should verify Menu Item target is %s", () => {
      CypressMountWithProviders(
        <MenuComponentItems target={CHARACTERS.STANDARD} />
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
          <MenuComponentItems showDropdownArrow={boolVal} />
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
    ] as [MenuWithChildren["variant"], string][])(
      "should verify Menu Item has %s variant",
      (variant, color) => {
        CypressMountWithProviders(<MenuComponentItems variant={variant} />);

        submenu()
          .eq(0)
          .children()
          .should("have.css", "background-color", color);
      }
    );

    it("should verify Menu Item ariaLabel is set to cypress_data", () => {
      CypressMountWithProviders(
        <MenuComponentItems ariaLabel={CHARACTERS.STANDARD} />
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
    ] as [MenuDividerProps["size"], number, number, number][])(
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
          assertCssValueIsApproximately($el, "height", height);
          assertCssValueIsApproximately($el, "margin-left", margin);
          assertCssValueIsApproximately($el, "width", width);
        });
      }
    );

    it.each([
      [100, 100],
      [200, 200],
      ["150px", 150],
      ["250px", 250],
    ] as [ScrollableBlockProps["height"], number][])(
      "should verify Menu scroll block height prop can be entered as a number or string",
      (height, pixels) => {
        CypressMountWithProviders(<MenuComponentScrollable height={height} />);

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        scrollBlock().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixels);
        });
      }
    );

    it.each([
      ["default", "rgb(230, 235, 237)"],
      ["alternate", "rgb(217, 224, 228)"],
    ] as [ScrollableBlockProps["variant"], string][])(
      "should verify Menu scroll block has %s background color using variant prop",
      (variant, color) => {
        CypressMountWithProviders(
          <MenuComponentScrollable variant={variant} />
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        scrollBlock()
          .children()
          .children()
          .should("have.css", "background-color", color);
      }
    );

    it.each([
      ["default", "rgba(0, 0, 0, 0)"],
      ["alternate", "rgb(217, 224, 228)"],
    ] as [ScrollableBlockProps["variant"], string][])(
      "should verify that a Menu Segment Title has a variant background color",
      (variant, color) => {
        CypressMountWithProviders(
          <Box mb={150}>
            <Menu menuType="white">
              <MenuItem submenu="Menu Item One">
                <MenuItem href="#">
                  Item Submenu One Is A Very Long Submenu Item Indeed
                </MenuItem>
                <MenuSegmentTitle variant={variant} text="Segment Title">
                  <MenuItem href="#">Item With Segment Title</MenuItem>
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
      CypressMountWithProviders(<MenuComponentFullScreen />);

      cy.viewport(1200, 800);
      menuItem().eq(positionOfElement("first")).click();
      continuePressingTABKey(8);
      menuItem().should("not.be.focused");
    });

    it("should verify Menu Item href prop", () => {
      CypressMountWithProviders(
        <MenuComponentItems href={CHARACTERS.STANDARD} />
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
        CypressMountWithProviders(<MenuComponentItems rel={rel} />);

        submenu().eq(0).children().children().should("have.attr", "rel", rel);
      }
    );

    it("should verify Scrollable Block parent prop", () => {
      CypressMountWithProviders(
        <MenuComponentScrollable parent={<MenuItem>Parent</MenuItem>} />
      );

      submenu().eq(positionOfElement("first")).trigger("mouseover");
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
    ] as [ScrollableBlockProps["parentVariant"], string][])(
      "should verify Scrollable Block parent variant prop",
      (variant, color) => {
        CypressMountWithProviders(
          <MenuComponentScrollable
            parent={<MenuItem>Parent</MenuItem>}
            parentVariant={variant}
          />
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
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
      CypressMountWithProviders(<MenuComponentFullScreen />);
      menuItem().eq(positionOfElement("first")).click();
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

    it("should verify that close icon is focused in Menu Fullscreen, focusRedesignOptOut false", () => {
      fullScreenMenuWrapper().tab();
      closeIconButton()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
      closeIconButton().tab();
      cy.focused()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should verify that close icon is focused in Menu Fullscreen, focusRedesignOptOut true", () => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(
        <MenuComponentFullScreen />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );
      menuItem().eq(positionOfElement("first")).click();

      fullScreenMenuWrapper().tab();
      closeIconButton().then(($el) => {
        checkGoldenOutline($el);
      });

      closeIconButton().tab();
      cy.focused().should(
        "have.css",
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px inset"
      );
    });

    it("should verify that inner Menu is available with tabbing and styles are correct", () => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<MenuComponentFullScreen />);
      menuItem().eq(positionOfElement("first")).click();

      fullScreenMenuWrapper().tab();
      for (let i = 0; i < 4; i++) {
        cy.focused().tab();
      }
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "box-shadow")
        .and("contain", "rgb(255, 188, 25)");
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
        .should("have.css", "color")
        .and("contain", "rgb(255, 255, 255)");
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("be.focused");
    });

    it("should verify that inner Menu is available with shift-tabbing and styles are correct", () => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<MenuComponentFullScreen />);
      menuItem().eq(positionOfElement("first")).click();

      fullScreenMenuWrapper().tab();
      for (let i = 0; i < 5; i++) {
        cy.focused().tab();
      }
      cy.focused().tab({ shift: true });
      fullScreenMenuItem(positionOfElement("fourth"))
        .find("ul > li")
        .eq(1)
        .children()
        .children()
        .should("have.css", "box-shadow")
        .and("contain", "rgb(255, 188, 25)");
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
        .should("have.css", "color")
        .and("contain", "rgb(255, 255, 255)");
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

    it("Menu Fullscreen dialog should exist when isOpen prop is true", () => {
      CypressMountWithProviders(
        <MenuComponentFullScreen isOpen>Content</MenuComponentFullScreen>
      );
      getComponent("menu-fullscreen").should("exist");
    });

    it("Menu Fullscreen dialog does not exist when isOpen prop is false", () => {
      CypressMountWithProviders(
        <MenuComponentFullScreen isOpen={false}>
          Content
        </MenuComponentFullScreen>
      );
      getComponent("menu-fullscreen").should("not.exist");
    });

    it("should verify that Menu Fullscreen has no effect on the tab order when isOpen prop is false", () => {
      CypressMountWithProviders(<ClosedMenuFullScreenWithButtons />);

      cy.tab();
      cy.get("#button-1").should("be.focused");
      cy.tab();
      cy.get("#button-2").should("be.focused");
    });

    it("should focus the next menu item on tab press when the current item has a Search input with searchButton but no value", () => {
      CypressMountWithProviders(
        <MenuFullScreenWithSearchButton searchValue="" />
      );

      menuItem().first().find("a").focus();
      cy.tab();
      searchDefaultInput().should("have.focus");
      cy.tab();
      menuItem().last().find("a").should("have.focus");
    });

    it("should focus the search icon and button on tab press when the current item has a Search input with searchButton and has a value, focusRedesignOptOut flag not set", () => {
      CypressMountWithProviders(
        <MenuFullScreenWithSearchButton searchValue="foo" />
      );

      menuItem().first().find("a").focus();
      cy.tab();
      searchDefaultInput().should("have.focus");
      cy.tab();
      searchCrossIcon().parent().should("have.focus");
      cy.tab();
      searchButton().should("have.focus");
      searchButton().should(
        "have.css",
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
      );
      cy.tab();
      menuItem().last().find("a").should("have.focus");
    });

    it("should focus the search icon and button on tab press when the current item has a Search input with searchButton and has a value, focusRedesignOptOut flag set", () => {
      CypressMountWithProviders(
        <MenuFullScreenWithSearchButton searchValue="foo" />,
        undefined,
        undefined,
        { focusRedesignOptOut: true }
      );

      menuItem().first().find("a").focus();
      cy.tab();
      searchDefaultInput().should("have.focus");
      cy.tab();
      searchCrossIcon().parent().should("have.focus");
      cy.tab();
      searchButton().should("have.focus");
      searchButton().then(($el) => {
        checkGoldenOutline($el);
      });
      cy.tab();
      menuItem().last().find("a").should("have.focus");
    });
  });

  describe("check events for Menu component", () => {
    it("should call onClick callback when a click event is triggered", () => {
      const callback: MenuWithChildren["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(<MenuComponentItems onClick={callback} />);
      menuComponent(positionOfElement("second")).click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onSubmenuOpen callback when mouseover event is triggered", () => {
      const callback: MenuWithChildren["onSubmenuOpen"] = cy
        .stub()
        .as("onSubmenuOpen");
      CypressMountWithProviders(
        <MenuComponentItems onSubmenuOpen={callback} submenu="Menu Item One" />
      );

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      cy.get("@onSubmenuOpen").should("have.been.calledOnce");
    });

    it("should call onSubmenuOpen callback when a click event is triggered", () => {
      const callback: MenuWithChildren["onSubmenuOpen"] = cy
        .stub()
        .as("onSubmenuOpen");
      CypressMountWithProviders(
        <MenuComponentItems
          clickToOpen
          onSubmenuOpen={callback}
          submenu="Menu Item One"
        />
      );
      menuComponent(positionOfElement("second")).click();
      cy.get("@onSubmenuOpen").should("have.been.calledOnce");
    });

    it.each(["Space", "Enter", "downarrow", "uparrow"] as (
      | "Space"
      | "Enter"
      | "downarrow"
      | "uparrow"
    )[])(
      "should call onSubmenuOpen callback when a %s keyboard event is triggered",
      (key) => {
        const callback: MenuWithChildren["onSubmenuOpen"] = cy
          .stub()
          .as("onSubmenuOpen");
        CypressMountWithProviders(
          <MenuComponentItems
            clickToOpen
            onSubmenuOpen={callback}
            submenu="Menu Item One"
          />
        );
        menuComponent(positionOfElement("second")).trigger(
          "keydown",
          keyCode(key)
        );
        cy.get("@onSubmenuOpen").should("have.been.calledOnce");
      }
    );

    it("should call onSubmenuClose callback when menu is closed", () => {
      const callback: MenuWithChildren["onSubmenuOpen"] = cy
        .stub()
        .as("onSubmenuOpen");
      CypressMountWithProviders(
        <MenuComponentItems onSubmenuClose={callback} submenu="Menu Item One" />
      );
      submenu().eq(positionOfElement("first")).trigger("mouseover");
      submenu().eq(positionOfElement("second")).trigger("mouseover");

      cy.get("@onSubmenuOpen").should("have.been.calledOnce");
    });

    it("should call onClose callback when Menu Fullscreen is closed", () => {
      const callback: MenuFullscreenProps["onClose"] = cy.stub().as("onClose");
      CypressMountWithProviders(<MenuComponentFullScreen onClose={callback} />);
      cy.viewport(1200, 800);
      menuItem().eq(positionOfElement("first")).click();
      closeIconButton().eq(0).click();
      cy.get("@onClose").should("have.been.calledOnce");
    });

    it("should have correct keyboard navigation order when children of submenu update", () => {
      CypressMountWithProviders(<MenuWithChildrenUpdating />);
      submenu().eq(positionOfElement("first")).trigger("mouseover");
      submenuBlock().children().should("have.length", 4);

      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Apple");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Banana");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Carrot");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().should("contain", "Broccoli");

      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().should("contain", "Carrot");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().should("contain", "Banana");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      cy.focused().should("contain", "Apple");
    });
  });

  describe("Accessibility tests for Menu component", () => {
    it("should pass accessibility tests for Menu default", () => {
      CypressMountWithProviders(<MenuComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu expanded", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");

      cy.checkAccessibility();
    });

    it.each(["default", "large"] as MenuDividerProps["size"][])(
      "should pass accessibility tests for Menu when divider size is %s",
      (divider) => {
        CypressMountWithProviders(<MenuComponent size={divider} />);

        submenu().eq(positionOfElement("first")).trigger("mouseover");

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Menu when search component is focused", () => {
      CypressMountWithProviders(<MenuComponentSearch />);

      pressTABKey(1);
      cy.focused().trigger("keydown", keyCode("Enter"));
      pressTABKey(0);
      cy.focused().trigger("keydown", keyCode("downarrow"));

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu when a submenu has a long label", () => {
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

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu when a menu item has a long label", () => {
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

      cy.checkAccessibility();
    });

    it.each(["450px", "675px", "1200px"])(
      "should pass accessibility tests for Menu when width is %s",
      (width) => {
        CypressMountWithProviders(<MenuComponent width={width} />);

        cy.checkAccessibility();
      }
    );

    it.each(["10px", "30px", "50px"])(
      "should pass accessibility tests for Menu when height is s",
      (propValue) => {
        CypressMountWithProviders(<MenuComponent height={propValue} />);

        cy.checkAccessibility();
      }
    );

    it.each(["default", "large"] as MenuDividerProps["size"][])(
      "should pass accessibility tests for Menu when size is %spx",
      (size) => {
        CypressMountWithProviders(<MenuDividerComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each(["block", "inline-block", "flex", "contents", "list-item", "none"])(
      "should pass accessibility tests for Menu when display is %s",
      (display) => {
        CypressMountWithProviders(<MenuComponent display={display} />);

        cy.checkAccessibility();
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
    ])(
      "should pass accessibility tests for Menu when alignItems is %s",
      (alignment) => {
        CypressMountWithProviders(<MenuComponent verticalAlign={alignment} />);

        cy.checkAccessibility();
      }
    );

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should pass accessibility tests for Menu when overflow is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflow={overflow} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "auto",
      "clip",
      "hidden",
      "scroll",
      "visible",
    ] as MenuProps["overflowX"][])(
      "should pass accessibility tests for Menu when overflowX is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflowX={overflow} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "auto",
      "clip",
      "hidden",
      "scroll",
      "visible",
    ] as MenuProps["overflowY"][])(
      "should pass accessibility tests for Menu when overflowY is %s",
      (overflow) => {
        CypressMountWithProviders(<MenuComponent overflowY={overflow} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "normal",
      "stretch",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
    ])(
      "should pass accessibility tests for Menu when alignItems is %s",
      (alignment) => {
        CypressMountWithProviders(<MenuComponent alignItems={alignment} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "normal",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
      "space-between",
      "space-around",
      "stretch",
    ])(
      "should pass accessibility tests for Menu when alignContent is %s",
      (alignment) => {
        CypressMountWithProviders(<MenuComponent alignContent={alignment} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "left",
      "center",
      "right",
      "flex-start",
      "flex-end",
      "normal",
      "stretch",
    ])(
      "should pass accessibility tests for Menu when justifyItems is %s",
      (justified) => {
        CypressMountWithProviders(<MenuComponent justifyItems={justified} />);

        cy.checkAccessibility();
      }
    );

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
    ])(
      "should pass accessibility tests for Menu when justifyContent is %s",
      (justified) => {
        CypressMountWithProviders(<MenuComponent justifyContent={justified} />);

        cy.checkAccessibility();
      }
    );

    it.each(["nowrap", "wrap", "wrap-reverse"] as MenuProps["flexWrap"][])(
      "should pass accessibility tests for Menu when flexWrap is %s",
      (wrap) => {
        CypressMountWithProviders(<MenuComponent flexWrap={wrap} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "column",
      "column-reverse",
      "row",
      "row-reverse",
    ] as MenuProps["flexDirection"][])(
      "should pass accessibility tests for Menu when flexDirection is %s",
      (direction) => {
        CypressMountWithProviders(<MenuComponent flexDirection={direction} />);

        cy.checkAccessibility();
      }
    );

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should pass accessibility tests for Menu when flex is %s",
      (flex) => {
        CypressMountWithProviders(<MenuComponent flex={flex} />);

        cy.checkAccessibility();
      }
    );

    it.each([10, 50, 100])(
      "should pass accessibility tests for Menu when flexGrow is %s",
      (value) => {
        CypressMountWithProviders(
          <MenuComponent flex="auto" flexGrow={value} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([10, 50, 100])(
      "should pass accessibility tests for Menu when flexShrink is %s",
      (value) => {
        CypressMountWithProviders(
          <MenuComponent flex="auto" flexShrink={value} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should pass accessibility tests for Menu when flexBasis is %s",
      (basis) => {
        CypressMountWithProviders(<MenuComponent flexBasis={basis} />);

        cy.checkAccessibility();
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
    ])(
      "should pass accessibility tests for Menu when justifySelf is %s",
      (justify) => {
        CypressMountWithProviders(<MenuComponent justifySelf={justify} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      "auto",
      "baseline",
      "normal",
      "stretch",
      "center",
      "flex-start",
      "flex-end",
    ])(
      "should pass accessibility tests for Menu when alignSelf is %s",
      (align) => {
        CypressMountWithProviders(<MenuComponent alignSelf={align} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "should pass accessibility tests for Menu when item text is %s",
      (text) => {
        CypressMountWithProviders(<MenuComponentItems submenu={text} />);

        cy.checkAccessibility();
      }
    );

    it.each(["default", "alternate"] as ScrollableBlockProps["variant"][])(
      "should pass accessibility tests for Menu when scroll block has a variant background color",
      (variant) => {
        CypressMountWithProviders(
          <MenuComponentScrollable variant={variant} />
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        cy.checkAccessibility();
      }
    );

    it.each(["default", "alternate"] as ScrollableBlockProps["variant"][])(
      "should pass accessibility tests for Menu when Segment Title has a variant background color",
      (variant) => {
        CypressMountWithProviders(
          <MenuSegmentTitleComponent variant={variant} />
        );

        submenu().eq(positionOfElement("first")).trigger("mouseover");
        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Menu with parent item", () => {
      CypressMountWithProviders(<MenuComponentScrollableParent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu with button icon", () => {
      CypressMountWithProviders(<MenuComponentButtonIcon />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      cy.checkAccessibility();
    });

    // Test skipped because of issue FE-5731
    it.skip("should pass accessibility tests for Menu with icon", () => {
      CypressMountWithProviders(<MenuComponentWithIcon />);

      cy.checkAccessibility();
    });
  });

  describe("Accessibility tests for Menu Fullscreen component", () => {
    beforeEach(() => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<MenuComponentFullScreen />);
      menuItem().eq(positionOfElement("first")).click();
    });

    it("should pass accessibility tests for Menu Fullscreen", () => {
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu Fullscreen when close icon is clicked", () => {
      closeIconButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Menu Fullscreen when menu item is highlighted", () => {
      pressTABKey(5);
      cy.checkAccessibility();
    });

    it.each(["left", "right"] as MenuFullscreenProps["startPosition"][])(
      "should pass accessibility tests for Menu Fullscreen when start position is %s",
      (side) => {
        CypressMountWithProviders(
          <MenuComponentFullScreen startPosition={side} />
        );
        cy.checkAccessibility();
      }
    );
  });

  describe("when focused", () => {
    it("menu items should have the expected focus styling, focusRedesignOptOut true", () => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<MenuComponent />, undefined, undefined, {
        focusRedesignOptOut: true,
      });

      menuItem()
        .first()
        .find("a")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px inset"
        );

      menuItem()
        .last()
        .find("button")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px inset"
        );

      menuItem().last().find("button").click();

      submenu()
        .last()
        .find("button")
        .first()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px inset"
        );

      submenu()
        .last()
        .find("a")
        .first()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px inset"
        );
    });

    it("menu items should have the expected focus styling, focusRedesignOptOut false", () => {
      cy.viewport(1200, 800);
      CypressMountWithProviders(<MenuComponent />);

      menuItem()
        .first()
        .find("a")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      menuItem()
        .last()
        .find("button")
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      menuItem().last().find("button").click();

      submenu()
        .last()
        .find("button")
        .first()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      submenu()
        .last()
        .find("a")
        .first()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });
  });

  describe("rounded corners", () => {
    it("has the expected border radius styling on the Submenu", () => {
      CypressMountWithProviders(<MenuComponent />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      submenuBlock().should("have.css", "border-radius", "0px 0px 8px 8px");
      submenu()
        .find("a")
        .last()
        .should("have.css", "border-radius", "0px 0px 8px 8px");
    });

    it("has the expected border radius styling on the Submenu Scrollable Block", () => {
      CypressMountWithProviders(<MenuComponentScrollable />);

      submenu().eq(positionOfElement("first")).trigger("mouseover");
      scrollBlock().should("have.css", "border-radius", "0px 0px 0px 8px");
      scrollBlock()
        .find("a")
        .last()
        .should("have.css", "border-radius", "0px 0px 0px 8px");
    });
  });

  describe("edge case tests for MenuFullScreen", () => {
    it("tabbing forward through the menu and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(<MenuFullScreenBackgroundScrollTest />);

      continuePressingTABKey(4);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("tabbing backward through the menu and back to the start should not make the background scroll to the bottom", () => {
      CypressMountWithProviders(<MenuFullScreenBackgroundScrollTest />);

      continuePressingTABKey(3, true);

      closeIconButton().should("be.focused");

      cy.checkNotInViewport("#bottom-box");
    });

    it("should not render a MenuDivider when falsy values are rendered", () => {
      CypressMountWithProviders(<MenuFullScreenWithFalsyValues isOpen />);

      menuDivider().should("not.exist");
    });

    it("should maintain the state of child items when a new item is added", () => {
      cy.clock();
      CypressMountWithProviders(<MenuFullScreenKeysTest />);

      cy.tick(5000);
      fullScreenMenuItem(5).should("contain.text", "count 2");
    });
  });

  describe("when inside a Navigation Bar", () => {
    it("all the content of a long submenu can be accessed with the keyboard while remaining visible", () => {
      CypressMountWithProviders(<InGlobalHeaderStory />);

      cy.viewport(1000, 500);

      menuComponent(1).trigger("keydown", keyCode("downarrow"));
      submenuItem(1).should("have.length", 20);

      for (let i = 0; i < 20; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }

      cy.focused().should("contain", "Foo 20");
      cy.checkInViewport(
        '[data-component="submenu-wrapper"] ul > li:nth-child(20)'
      );
    });

    it("all the content of a long submenu can be accessed with the keyboard while remaining visible if the navbar height changes", () => {
      CypressMountWithProviders(<NavigationBarWithSubmenuAndChangingHeight />);

      cy.viewport(1000, 500);

      menuComponent(1).trigger("keydown", keyCode("downarrow"));
      submenuItem(1).should("have.length", 21);

      // navigate to "change height" item and press it
      for (let i = 0; i < 3; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("Enter"));

      // reopen menu and scroll to bottom with keyboard
      cy.wait(100);
      menuComponent(1).trigger("keydown", keyCode("downarrow"));

      for (let i = 0; i < 21; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }

      cy.checkInViewport(
        '[data-component="submenu-wrapper"] ul > li:nth-child(21)'
      );
    });
  });
});
