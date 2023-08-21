import React from "react";
import Pod, { PodProps } from "../../../src/components/pod";
import {
  PodExample,
  PodDefault,
  SoftDeleteExample,
  SoftDeleteExampleWithChildren,
} from "../../../src/components/pod/pod-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  podComponent,
  podBlock,
  podTitle,
  podSubTitle,
  podContent,
  podFooter,
  podEdit,
  podEditIcon,
  podDelete,
  podDeleteIcon,
  podUndo,
  podUndoIcon,
} from "../../locators/pod";

import {
  checkOutlineCss,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import Typography, {
  VariantTypes,
} from "../../../src/components/typography/typography.component";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Testing Pod component", () => {
  it.each([
    [true, 1, "solid", "rgb(204, 214, 219)"],
    [false, 0, "none", "rgba(0, 0, 0, 0.9)"],
  ])(
    "should check when border is %s the border value is %s for Pod component",
    (boolVal, px, style, color) => {
      CypressMountWithProviders(<PodExample border={boolVal} />);
      podBlock().then((elem) => {
        checkOutlineCss(elem, px, "border", style, color);
      });
    }
  );

  it.each(specialCharacters)(
    "should check children as %s for Pod component",
    (children) => {
      CypressMountWithProviders(<PodExample>{children}</PodExample>);
      cy.contains(children);
      podContent().should("have.css", "text-align", "left");
    }
  );

  it.each(specialCharacters)(
    "should check className as %s for Pod component",
    (className) => {
      CypressMountWithProviders(<PodExample className={className} />);
      podComponent().should("have.class", className);
    }
  );

  it.each([
    [SIZE.EXTRASMALL, 120, 66],
    [SIZE.SMALL, 120, 66],
    [SIZE.MEDIUM, 136, 82],
    [SIZE.LARGE, 184, 98],
    [SIZE.EXTRALARGE, 216, 130],
  ] as [PodProps["size"], number, number][])(
    "should check %s size for Pod component when height is %s and width is %s",
    (size, expectedHeight, expectedWidth) => {
      CypressMountWithProviders(<PodExample size={size} />);
      podBlock().then(($element) => {
        assertCssValueIsApproximately($element, "height", expectedHeight);
        assertCssValueIsApproximately($element, "width", expectedWidth);
      });
    }
  );

  it.each([
    ["primary", "rgb(255, 255, 255)", "none"],
    ["secondary", "rgb(242, 245, 246)", "none"],
    ["tertiary", "rgb(237, 241, 242)", "none"],
    ["tile", "rgb(255, 255, 255)", "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px"],
    ["transparent", "rgba(0, 0, 0, 0)", "none"],
  ] as [PodProps["variant"], string, string][])(
    "should check %s variant for Pod component when the color is %s and boxShadow is %s",
    (variant, color, boxShadow) => {
      CypressMountWithProviders(<PodExample variant={variant} />);

      podBlock()
        .should("have.css", "background-color", `${color}`)
        .and("have.css", "box-shadow", boxShadow);
    }
  );

  it.each(specialCharacters)(
    "should check title as %s for Pod component",
    (title) => {
      CypressMountWithProviders(<PodExample title={title} />);
      podTitle().should("have.text", title);
    }
  );

  it.each<VariantTypes>(["h1", "h2", "h3", "h4", "h5"])(
    "renders title node when node is passed with %s variant",
    (variantType) => {
      const title = "title";
      CypressMountWithProviders(
        <PodExample
          title={<Typography variant={variantType}>{title}</Typography>}
        />
      );

      cy.get(variantType).contains(title);
    }
  );

  it.each(specialCharacters)(
    "should check subtitle as %s for Pod component",
    (subtitle) => {
      CypressMountWithProviders(<PodExample subtitle={subtitle} />);
      podSubTitle().should("have.text", subtitle);
    }
  );

  it.each<VariantTypes>(["h2", "h3", "p", "em", "b"])(
    "renders subtitle node when node is passed with %s variant",
    (variantType) => {
      const title = "title";
      const subtitle = "subtitle";
      CypressMountWithProviders(
        <PodExample
          title
          subtitle={<Typography variant={variantType}>{subtitle}</Typography>}
        />
      );

      cy.get(variantType).contains(title);
    }
  );

  it.each(["left", "center", "right"] as PodProps["alignTitle"][])(
    "should check title alignment for Pod component when text is aligned to the %s",
    (alignTitle) => {
      CypressMountWithProviders(<PodExample alignTitle={alignTitle} />);
      podTitle().should("have.css", "text-align", alignTitle);
    }
  );

  it.each(specialCharacters)(
    "should check footer text as %s for Pod component",
    (footerText) => {
      CypressMountWithProviders(<PodExample footer={footerText} />);
      podFooter().should("have.text", footerText).and("be.visible");
    }
  );

  it.each([100, 200, 300])(
    "should render Pod component with correct height when height prop is %s",
    (height) => {
      CypressMountWithProviders(<PodExample height={height} />);
      podComponent().should("have.css", "height", `${height}px`);
    }
  );

  it.each([
    [false, 82],
    [true, 1308],
  ])(
    "should check when editContentFullWidth is %s for Pod component",
    (boolVal, expectedWidth) => {
      CypressMountWithProviders(<PodExample editContentFullWidth={boolVal} />);
      podBlock().then(($element) => {
        assertCssValueIsApproximately($element, "width", expectedWidth);
      });
    }
  );

  it.each([
    [true, "rgb(0, 103, 56)"],
    [false, "rgb(255, 255, 255)"],
  ])(
    "when triggerEditOnContent is %s and Pod component is hovered, background colours are correct",
    (boolVal, color) => {
      CypressMountWithProviders(<PodExample triggerEditOnContent={boolVal} />);

      podBlock().should("have.css", "background-color", "rgb(255, 255, 255)");
      podBlock().realHover().should("have.css", "background-color", color);
      podEdit().should("have.css", "background-color", color);
    }
  );

  describe("when onDelete prop is passed", () => {
    it("should call onDelete callback when a click event is triggered for Pod component", () => {
      const callback: PodProps["onDelete"] = cy.stub().as("onDelete");
      CypressMountWithProviders(<PodExample onDelete={callback} />);
      podDelete().click();
      cy.get("@onDelete").should("have.been.calledOnce");
    });

    it("when delete button is focused and internalEditButton prop is true, delete button and Pod component have correct border styles", () => {
      CypressMountWithProviders(
        <Pod onDelete={() => {}} internalEditButton>
          Content
        </Pod>
      );
      podDelete().focus();
      podDelete().should("have.css", "outline", "rgb(255, 188, 25) solid 3px");
      podBlock().should("have.css", "border", "1px solid rgb(204, 214, 219)");
    });

    it("when delete button is hovered over and internalEditButton prop is true, delete button does not have default hover colours", () => {
      CypressMountWithProviders(
        <Pod onDelete={() => {}} internalEditButton>
          Content
        </Pod>
      );

      podDelete()
        .trigger("mouseover")
        .should("not.have.css", "background-color", "rgb(164, 45, 60)");
      podDeleteIcon().should("not.have.css", "color", "rgb(255, 255, 255)");
    });
  });

  describe("when onEdit prop is passed", () => {
    it("when displayEditButtonOnHover is true, edit button is only visible when user clicks on Pod component", () => {
      CypressMountWithProviders(
        <Pod onEdit={() => {}} displayEditButtonOnHover>
          Content
        </Pod>
      );
      podEdit().should("not.be.visible");
      podContent().click();
      podEdit().should("be.visible");
    });

    it("when displayEditButtonOnHover is true, edit button is only visible when Pod component is hovered over", () => {
      CypressMountWithProviders(
        <Pod onEdit={() => {}} displayEditButtonOnHover>
          Content
        </Pod>
      );

      podEdit().should("not.be.visible");
      podBlock().trigger("mouseover");
      podEdit().should("be.visible");
    });

    it("when displayEditButtonOnHover is true, edit button is only visible when Pod component is focused", () => {
      CypressMountWithProviders(
        <Pod onEdit={() => {}} displayEditButtonOnHover>
          Content
        </Pod>
      );

      podEdit().should("not.be.visible");
      podBlock().focus();
      podEdit().should("be.visible");
    });

    it("when displayEditButtonOnHover is false, edit button should be rendered", () => {
      CypressMountWithProviders(
        <PodExample displayEditButtonOnHover={false} />
      );
      podEdit().should("be.visible");
    });

    it("when internalEditButton is true, edit button does not have default hover colours when hovered over", () => {
      CypressMountWithProviders(
        <Pod onEdit={() => {}} internalEditButton>
          Content
        </Pod>
      );

      podEdit()
        .trigger("mouseover")
        .should("not.have.css", "background-color", "rgb(0, 103, 56)");
      podEditIcon().should("not.have.css", "color", "rgb(255, 255, 255)");
    });

    it.each([
      [true, 1366],
      [false, 82],
    ])(
      "when internalEditButton is %s for Pod component, width value is correct",
      (boolVal, expectedWidth) => {
        CypressMountWithProviders(<PodExample internalEditButton={boolVal} />);
        podBlock().then(($element) => {
          assertCssValueIsApproximately($element, "width", expectedWidth);
        });
      }
    );

    it.each([
      [true, "rgba(0, 0, 0, 0)"],
      [false, "rgb(0, 103, 56)"],
    ])(
      "when internalEditButton is %s and edit button is hovered, Pod background colours are correct",
      (boolVal, color) => {
        CypressMountWithProviders(
          <Pod onEdit={() => {}} internalEditButton={boolVal}>
            Content
          </Pod>
        );

        podBlock().should("have.css", "background-color", "rgb(255, 255, 255)");
        podEdit().realHover();
        podEdit().should("have.css", "background-color", color);
      }
    );
  });

  describe("when onUndo and softDelete props are passed", () => {
    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check visibility of undo button when softDelete is %s",
      (boolVal, state) => {
        CypressMountWithProviders(<SoftDeleteExample softDelete={boolVal} />);
        podUndo().should(state);
      }
    );

    it("should call onUndo callback when a click event is triggered for Pod component", () => {
      const callback: PodProps["onUndo"] = cy.stub().as("onUndo");
      CypressMountWithProviders(<SoftDeleteExample onUndo={callback} />);
      podUndo().click();
      cy.get("@onUndo").should("have.been.calledOnce");
    });

    it("undo button does not have default hover colours when hovered over and internalEditButton prop is true", () => {
      CypressMountWithProviders(
        <Pod onUndo={() => {}} softDelete internalEditButton>
          Content
        </Pod>
      );

      podUndo()
        .trigger("mouseover")
        .should("not.have.css", "background-color", "rgb(0, 103, 56)");
      podUndoIcon().should("not.have.css", "color", "rgb(255, 255, 255)");
    });

    it("renders block with correct background colour", () => {
      const blockBackgroundColor = "rgb(230, 235, 237)";

      CypressMountWithProviders(<SoftDeleteExampleWithChildren />);

      podBlock().should("have.css", "background-color", blockBackgroundColor);
    });

    it("renders children with correct text colours", () => {
      const childrenColor = "rgba(0, 0, 0, 0.65)";

      CypressMountWithProviders(<SoftDeleteExampleWithChildren />);

      cy.contains("Content").should("have.css", "color", childrenColor);
      cy.contains("More content").should("have.css", "color", childrenColor);
    });
  });

  describe("should render Pod component and check accessibility", () => {
    it("should check accessibility for pod component", () => {
      CypressMountWithProviders(<PodDefault />);

      cy.checkAccessibility();
    });

    it.each([
      "primary",
      "secondary",
      "tertiary",
      "tile",
      "transparent",
    ] as PodProps["variant"][])(
      "should check %s variant accessibility for Pod component",
      (variant) => {
        CypressMountWithProviders(<PodDefault variant={variant} />);

        cy.checkAccessibility();
      }
    );

    it.each(["left", "center", "right"] as PodProps["alignTitle"][])(
      "should check title alignment accessbility for Pod component when text is aligned to the %s",
      (alignTitle) => {
        CypressMountWithProviders(<PodDefault alignTitle={alignTitle} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      SIZE.EXTRASMALL,
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
      SIZE.EXTRALARGE,
    ] as PodProps["size"][])(
      "should check accessbility when size is %s for Pod component",
      (size) => {
        CypressMountWithProviders(<PodDefault size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "when internalEditButton is %s for Pod component, check accessbility",
      (boolVal) => {
        CypressMountWithProviders(<PodDefault internalEditButton={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it.each([false, true])(
      "should check accessibility when editContentFullWidth is %s for Pod component",
      (boolVal) => {
        CypressMountWithProviders(
          <PodDefault editContentFullWidth={boolVal} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should check accessbility when title is %s for Pod component",
      (title) => {
        CypressMountWithProviders(<PodDefault title={title} />);

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should check accessbility when subtitle is %s for Pod component",
      (subtitle) => {
        CypressMountWithProviders(<PodDefault subtitle={subtitle} />);

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should check accessibility when footer text is %s for Pod component",
      (footerText) => {
        CypressMountWithProviders(<PodDefault footer={footerText} />);

        cy.checkAccessibility();
      }
    );

    it.each(["100px", "200px", "300px"])(
      "should check accessibility with correct height when height prop is %s for pod component",
      (height) => {
        CypressMountWithProviders(<PodDefault height={height} />);

        cy.checkAccessibility();
      }
    );
    it("should check accessibility when delete button is focused and internalEditButton prop is true", () => {
      CypressMountWithProviders(
        <Pod onDelete={() => {}} internalEditButton>
          Content
        </Pod>
      );

      podDelete().focus();
      cy.checkAccessibility();
    });

    it.each([true, false])(
      "should check accessbility when softDelete is %s",
      (boolVal) => {
        CypressMountWithProviders(<SoftDeleteExample softDelete={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it("should check accessbility for SoftDelete with chidlren", () => {
      CypressMountWithProviders(<SoftDeleteExampleWithChildren />);
      cy.checkAccessibility();
    });
  });

  describe("rounded corners", () => {
    it("should render with expected border radius styling on the main container and edit and delete buttons", () => {
      CypressMountWithProviders(<PodExample>Foo</PodExample>);

      podBlock().should("have.css", "border-radius", "8px");
      podEdit().should("have.css", "border-radius", "8px");
      podDelete().should("have.css", "border-radius", "8px");
    });

    it("should render with expected border radius styling on the soft delete/ undo button", () => {
      CypressMountWithProviders(
        <PodExample onUndo={() => {}} softDelete>
          Foo
        </PodExample>
      );

      podUndo().should("have.css", "border-radius", "8px");
    });
  });
});
