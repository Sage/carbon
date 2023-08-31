import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import Typography, {
  TypographyProps,
} from "../../../src/components/typography";
import * as testStories from "../../../src/components/typography/typography-test.stories";
import * as stories from "../../../src/components/typography/typography.stories";
import { CHARACTERS } from "../../support/component-helper/constants";

const testCypress = CHARACTERS.STANDARD;

const VARIANT_TYPES = [
  "h1-large",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "segment-header",
  "segment-header-small",
  "segment-subheader",
  "segment-subheader-alt",
  "p",
  "small",
  "big",
  "sup",
  "sub",
  "strong",
  "b",
  "em",
  "ul",
  "ol",
];

type VariantTypes = typeof VARIANT_TYPES[number];

const getAs = (variant: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "h1";
    case "segment-header":
    case "segment-header-small":
    case "segment-subheader":
    case "segment-subheader-alt":
      return "h5";
    case "big":
      return "p";
    default:
      return variant;
  }
};

const getSize = (variant: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "32px";
    case "h1":
      return "24px";
    case "h2":
      return "22px";
    case "h3":
    case "segment-header":
      return "20px";
    case "h4":
    case "segment-header-small":
      return "18px";
    case "h5":
    case "segment-subheader":
    case "big":
      return "16px";
    case "small":
    case "sub":
    case "sup":
      return "13px";
    case "segment-subheader-alt":
    case "p":
    case "b":
    case "strong":
    case "em":
    default:
      return "14px";
  }
};

const getLineHeight = (variant: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "40px";
    case "h1":
    case "segment-subheader":
      return "31px";
    case "h2":
      return "29px";
    case "h3":
    case "segment-header":
      return "26px";
    case "big":
      return "24px";
    case "h4":
    case "segment-header-small":
      return "23px";
    case "small":
    case "sub":
    case "sup":
      return "20px";
    case "h5":
    case "segment-subheader-alt":
    case "p":
    case "b":
    case "strong":
    case "em":
    default:
      return "21px";
  }
};

const getWeight = (variant: VariantTypes) => {
  switch (variant) {
    case "h1-large":
    case "h1":
    case "segment-header":
    case "segment-header-small":
      return "900";
    case "h2":
    case "h3":
    case "segment-subheader":
    case "segment-subheader-alt":
    case "b":
    case "em":
    case "strong":
      return "700";
    case "h4":
    case "h5":
    case "p":
    case "small":
    case "big":
    case "sub":
    case "sup":
    default:
      return "400";
  }
};

const getTransform = (variant: VariantTypes) => {
  if (variant === "segment-subheader-alt") {
    return "uppercase";
  }
  return "none";
};

const getDecoration = (variant: VariantTypes) => {
  if (variant === "em") {
    return "underline";
  }
  return "none";
};

context("Tests for Typography component", () => {
  describe("should check Typography component properties", () => {
    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check variant prop set to %s for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));

        cy.get(variantElem).should("have.text", testCypress);
      }
    );

    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check font-size for %s variant prop for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));
        const fontSize = getSize(String(variant));

        cy.get(variantElem).should("have.css", "font-size", fontSize);
      }
    );

    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check line-height for %s variant prop for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));
        const lineHeight = getLineHeight(String(variant));

        cy.get(variantElem).should("have.css", "line-height", lineHeight);
      }
    );

    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check font-weight for %s variant prop for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));
        const fontWeight = getWeight(String(variant));

        cy.get(variantElem).should("have.css", "font-weight", fontWeight);
      }
    );

    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check text-transform for %s variant prop for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));
        const textTransform = getTransform(String(variant));

        cy.get(variantElem).should("have.css", "text-transform", textTransform);
      }
    );

    it.each(VARIANT_TYPES as TypographyProps["variant"][])(
      "should check text-decoration-line for %s variant prop for Typography component",
      (variant) => {
        CypressMountWithProviders(
          <Typography variant={variant}>{testCypress}</Typography>
        );

        const variantElem = getAs(String(variant));
        const textDecorationLine = getDecoration(String(variant));

        cy.get(variantElem).should(
          "have.css",
          "text-decoration-line",
          textDecorationLine
        );
      }
    );

    it.each(["ol", "ul"])(
      "should check as prop set to %s for List component",
      (as) => {
        CypressMountWithProviders(<testStories.ListComponent as={as} />);

        cy.get(as).should("exist").and("be.visible");
      }
    );

    it.each([
      [true, "have"],
      [false, "not.have"],
    ])(
      "should check truncate prop set to %s for Typography component",
      (truncate, assertion) => {
        CypressMountWithProviders(
          <div
            style={{
              height: "80px",
              width: "80px",
            }}
          >
            <Typography variant="h1" truncate={truncate}>
              {testCypress}
            </Typography>
          </div>
        );

        cy.get("h1")
          .should("have.text", testCypress)
          .and(`${assertion}.css`, "text-overflow", "ellipsis");
      }
    );

    it("should display as visually hidden when screenReaderOnly prop is enabled", () => {
      CypressMountWithProviders(
        <Typography variant="h1" screenReaderOnly>
          {testCypress}
        </Typography>
      );
      cy.get("h1")
        .should("have.text", testCypress)
        .and("have.css", "border", "0px none rgba(0, 0, 0, 0.9)")
        .and("have.css", "height", "1px")
        .and("have.css", "margin", "-1px")
        .and("have.css", "overflow", "hidden")
        .and("have.css", "padding", "0px")
        .and("have.css", "position", "absolute")
        .and("have.css", "width", "1px");
    });
  });

  describe("should check accessibility for Typography component", () => {
    it("should check accessibility for Typography component VariantsStory", () => {
      CypressMountWithProviders(<stories.VariantsStory />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Typography component TruncateStory", () => {
      CypressMountWithProviders(<stories.TruncateStory />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Typography component ScreenReaderOnlyStory", () => {
      CypressMountWithProviders(<stories.ScreenReaderOnlyStory />);

      cy.checkAccessibility();
    });
  });
});
