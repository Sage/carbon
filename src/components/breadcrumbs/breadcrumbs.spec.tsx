import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs.component";
import Crumb from "./crumb/crumb.component";
import { testStyledSystemSpacing } from "../../__spec_helper__/test-utils";

describe("Breadcrumbs", () => {
  testStyledSystemSpacing((props) => (
    <Breadcrumbs {...props}>
      <Crumb href="#">Breadcrumb</Crumb>
    </Breadcrumbs>
  ));

  it("renders children as expected", () => {
    render(
      <Breadcrumbs>
        <Crumb href="#">Breadcrumb</Crumb>
        <Crumb href="#">Breadcrumb</Crumb>
        <Crumb href="#">Breadcrumb</Crumb>
        <Crumb href="#" isCurrent>
          Breadcrumb
        </Crumb>
      </Breadcrumbs>
    );

    const crumbElement = screen.getAllByText("Breadcrumb");
    expect(crumbElement.length).toBe(4);
  });
});
