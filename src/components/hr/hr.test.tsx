import React from "react";
import { render, screen } from "@testing-library/react";
import {
  mockMatchMedia,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

import Hr from "./hr.component";
import CarbonProvider from "../carbon-provider";

testStyledSystemMargin((props) => <Hr {...props} />, {
  mt: "24px",
  mb: "24px",
});

test("should apply the expected margin top", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Hr mt={7} />
    </CarbonProvider>
  );
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginTop: "var(--spacing700)" });
});

test("should apply the expected margin bottom", () => {
  render(<Hr mb={7} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginBottom: "var(--spacing700)" });
});

test("should apply the expected margin left", () => {
  render(<Hr ml="100px" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "100px" });
});

test("should apply the expected margin right", () => {
  render(<Hr ml="100px" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "100px" });
});

test("when adaptiveMxBreakpoint prop is set and when screen bigger than breakpoint it should pass the correct margin styles", () => {
  mockMatchMedia(true);
  render(<Hr ml="10%" mr="20%" adaptiveMxBreakpoint={1000} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "10%", marginRight: "20%" });
});

test("when adaptiveMxBreakpoint prop is set and when screen smaller than breakpoint it should pass the correct margin styles", () => {
  mockMatchMedia(false);
  render(<Hr ml="10%" mr="20%" adaptiveMxBreakpoint={1000} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({
    marginLeft: "var(--spacing000)",
    marginRight: "var(--spacing000)",
  });
});
