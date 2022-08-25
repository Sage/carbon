import React from "react";
import Pod from "./pod.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import Content from "../content";

import { podBlock } from "../../../cypress/locators/pod";

const PodWithSoftDelete = () => (
  <Pod softDelete onUndo={() => {}}>
    Content
    <Content>More content</Content>
  </Pod>
);

context("Testing Pod component", () => {
  describe("When softDelete is true", () => {
    it("renders block with correct background colour", () => {
      const blockBackgroundColor = "rgb(230, 235, 237)";

      CypressMountWithProviders(<PodWithSoftDelete />);

      podBlock().should("have.css", "background-color", blockBackgroundColor);
    });

    it("renders text of children with correct colours", () => {
      const childrenColor = "rgba(0, 0, 0, 0.65)";

      CypressMountWithProviders(<PodWithSoftDelete />);

      cy.contains("Content").should("have.css", "color", childrenColor);
      cy.contains("More content").should("have.css", "color", childrenColor);
    });
  });
});
