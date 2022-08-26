import * as React from "react";
import Content from "./content.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  contentTitle,
  contentBody,
} from "../../../cypress/locators/content/index";

const totalWidth = 1350;
const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const ContentComponent = ({ ...props }) => {
  return (
    <Content title="Title" {...props}>
      This is an example of some content
    </Content>
  );
};

context("Tests for Content component", () => {
  describe("should check Content component properties", () => {
    it.each([
      ["primary", "rgb(0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0.55)"],
    ])(
      "should check %s as variant for Content component",
      (variant, titleColor) => {
        CypressMountWithProviders(<ContentComponent variant={variant} />);
        contentTitle().should("have.css", "color", titleColor);
      }
    );

    it.each(testData)(
      "should check %s as children for Content component",
      (children) => {
        CypressMountWithProviders(<Content title="Title">{children}</Content>);
        contentBody().should("have.text", children);
      }
    );

    it.each(testData)(
      "should check %s as title for Content component",
      (title) => {
        CypressMountWithProviders(<ContentComponent title={title} />);
        contentTitle().should("have.text", title);
      }
    );

    it("should check inline parameter is enabled for Content component", () => {
      CypressMountWithProviders(<ContentComponent inline />);
      contentTitle().should("have.css", "display", "inline-block");
    });

    it.each(["left", "center", "right"])(
      "should check %s alignment for Content component",
      (align) => {
        CypressMountWithProviders(<ContentComponent align={align} />);
        contentTitle().should("have.css", "text-align", align);
      }
    );

    it.each([
      [75, (totalWidth * 75) / 100],
      [50, (totalWidth * 50) / 100],
      [40, (totalWidth * 40) / 100],
    ])(
      "should check %s% width for Content component",
      (titleWidth, computedWidth) => {
        CypressMountWithProviders(<ContentComponent titleWidth={titleWidth} />);
        contentTitle().should("have.css", "width", `${computedWidth - 30}px`);
      }
    );

    it.each([
      [true, 70, (totalWidth * 70) / 100],
      [false, 50, (totalWidth * 50) / 100],
    ])(
      "should check Content component has bodyFullWidth parameter",
      (bodyFullWidth, titleWidth, computedWidth) => {
        CypressMountWithProviders(
          <ContentComponent
            titleWidth={titleWidth}
            bodyFullWidth={bodyFullWidth}
          />
        );
        contentBody().should(
          "have.css",
          "width",
          bodyFullWidth ? `${totalWidth}px` : `${computedWidth}px`
        );
      }
    );
  });
});
