import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs.component";
import Crumb from "./crumb/crumb.component";

test("renders all child crumbs correctly", () => {
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
