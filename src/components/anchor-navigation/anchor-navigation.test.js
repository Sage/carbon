import * as React from "react";
import { mount } from "@cypress/react";
import {
  AnchorNavigation,
  AnchorNavigationItem,
  AnchorSectionDivider,
} from ".";
import Textbox from "../textbox";

import {
  anchorNavigationStickyNavigation,
  anchorNavigationStickyMainPage,
} from "../../../cypress/locators/anchor-navigation";

const Content = ({ title, noTextbox }) => (
  <>
    <div>
      <h2>{title}</h2>
      {!noTextbox && <Textbox label={title} />}
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
    </div>
  </>
);

const AnchorNavigationComponent = () => {
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();
  const ref4 = React.useRef();
  const ref5 = React.useRef();
  return (
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
          <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
          <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
          <AnchorNavigationItem target={ref4}>
            Navigation item with very long label
          </AnchorNavigationItem>
          <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
        </>
      }
    >
      <div ref={ref1}>
        <Content title="First section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref2}>
        <Content title="Second section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref3}>
        <Content noTextbox title="Third section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref4}>
        <Content title="Fourth section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref5}>
        <Content title="Fifth section" />
      </div>
    </AnchorNavigation>
  );
};

context("Testing AnchorNavigation component", () => {
  describe("Should render AnchorNavigation component", () => {
    it.each([
      ["First", "First section"],
      ["Second", "Second section"],
      ["Third", "Third section"],
      ["Navigation item with very long label", "Fourth section"],
      ["Fifth", "Fifth section"],
    ])(
      "should scrolldown to the %s AnchorNavigation section after pressing Tab on the %s",
      (sectionIndex, sectionName) => {
        mount(<AnchorNavigationComponent />);

        anchorNavigationStickyNavigation(sectionIndex).click();
        anchorNavigationStickyMainPage(sectionName).should("be.visible");
      }
    );

    it.each([
      ["First", "First section"],
      ["Fifth", "Fifth section"],
    ])(
      "should scroll to the %s and verify that proper %s AnchorNavigation row is visible",
      (sectionIndex, sectionName) => {
        mount(<AnchorNavigationComponent />);

        anchorNavigationStickyNavigation(sectionIndex).click();
        anchorNavigationStickyMainPage(sectionName).scrollIntoView();
        anchorNavigationStickyMainPage(sectionName).should("be.visible");
      }
    );
  });
});
