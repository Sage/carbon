import React from "react";
import { render, screen, within } from "@testing-library/react";

import {
  testStyledSystemSpacingRTL,
  testStyledSystemPaddingRTL,
} from "../../__spec_helper__/__internal__/test-utils";
import Form from "./form.component";
import Button from "../button";
import Dialog from "../dialog";

testStyledSystemSpacingRTL(
  (props) => <Form aria-label="form-example" {...props} />,
  () => screen.getByRole("form")
);

test("the form footer is not rendered by default", () => {
  render(<Form />);

  expect(screen.queryByTestId("form-footer")).not.toBeInTheDocument();
});

test("renders buttons passed as the leftSideButtons prop", () => {
  render(
    <Form
      leftSideButtons={
        <>
          <Button>Left1</Button>
          <Button>Left2</Button>
        </>
      }
      saveButton={<Button>Save</Button>}
    />
  );

  const footerButtons = within(screen.getByTestId("form-footer")).getAllByRole(
    "button"
  );
  expect(footerButtons[0]).toHaveTextContent("Left1");
  expect(footerButtons[1]).toHaveTextContent("Left2");
  expect(footerButtons[2]).toHaveTextContent("Save");
});

test("renders the button passed as the saveButton prop in the form footer", () => {
  render(<Form saveButton={<Button>Custom Save Button</Button>} />);

  expect(
    within(screen.getByTestId("form-footer")).getByRole("button", {
      name: "Custom Save Button",
    })
  ).toBeVisible();
});

test("renders buttons passed as the rightSideButtons prop", () => {
  render(
    <Form
      rightSideButtons={
        <>
          <Button>Right1</Button>
          <Button>Right2</Button>
        </>
      }
      saveButton={<Button>Save</Button>}
    />
  );

  const footerButtons = within(screen.getByTestId("form-footer")).getAllByRole(
    "button"
  );
  expect(footerButtons[0]).toHaveTextContent("Save");
  expect(footerButtons[1]).toHaveTextContent("Right1");
  expect(footerButtons[2]).toHaveTextContent("Right2");
});

test("includes correct component, element and role data tags on form element", () => {
  render(
    <Form
      aria-label="form-example" // getByRole("form") doesn't work without an accessible name for the form
      data-element="bar"
      data-role="baz"
    />
  );

  const formElement = screen.getByRole("form");
  expect(formElement).toHaveAttribute("data-component", "form");
  expect(formElement).toHaveAttribute("data-element", "bar");
  expect(formElement).toHaveAttribute("data-role", "baz");
});

test("includes correct data-element tags on elements", () => {
  render(
    <Form
      data-element="bar"
      data-role="baz"
      saveButton={<Button>Save</Button>}
      errorCount={1}
      warningCount={1}
    />
  );

  expect(screen.getByTestId("form-footer")).toHaveAttribute(
    "data-element",
    "form-footer"
  );
  expect(screen.getByTestId("form-summary")).toHaveAttribute(
    "data-element",
    "form-summary"
  );

  expect(screen.getAllByTestId("internal-summary")[0]).toHaveAttribute(
    "data-element",
    "errors"
  );
  expect(screen.getAllByTestId("internal-summary")[1]).toHaveAttribute(
    "data-element",
    "warnings"
  );
});

test("default browser validation is disabled on the form by default", () => {
  render(<Form aria-label="form-example" />);
  expect(screen.getByRole("form")).toHaveAttribute("novalidate");
});

test("browser validation can be enabled by setting the `noValidate` prop to `false", () => {
  render(<Form aria-label="form-example" noValidate={false} />);
  expect(screen.getByRole("form")).not.toHaveAttribute("novalidate");
});

// for coverage - fullWidthButtons styles are fully tested with Chromatic/Playwright
test("form summary and footer have correct styles when the `fullWidthButtons` prop is set", () => {
  render(
    <Form
      fullWidthButtons
      saveButton={<Button>Save</Button>}
      leftSideButtons={
        <>
          <Button>Left1</Button>
          <Button>Left2</Button>
        </>
      }
      rightSideButtons={
        <>
          <Button>Right1</Button>
          <Button>Right2</Button>
        </>
      }
      errorCount={2}
      warningCount={3}
    />
  );

  expect(screen.getByTestId("form-footer")).toHaveStyle({
    display: "flex",
    "flex-direction": "column",
    "align-items": "stretch",
  });
  expect(screen.getByTestId("form-summary")).toHaveStyle({
    display: "flex",
    "flex-wrap": "wrap",
    width: "100%",
    "justify-content": "flex-start",
  });
});

// for coverage: stickyFooter prop styles are covered by Chromatic and Playwright
test("has the correct styles when the `stickyFooter` prop is set", () => {
  render(
    <Form
      aria-label="form-example"
      stickyFooter
      saveButton={<Button>Save</Button>}
    />
  );

  expect(screen.getByTestId("form-footer")).toHaveStyle({
    "box-shadow": "0 -4px 12px 0 rgba(0,0,0,0.05)",
    "box-sizing": "border-box",
    padding: "16px 32px",
    width: "100%",
    "z-index": "1000",
    position: "sticky",
    bottom: "0",
  });
  expect(screen.getByTestId("form-footer")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityYang100)"
  );
  expect(screen.getByRole("form")).toHaveStyle({
    display: "flex",
    "flex-direction": "column",
  });
  expect(screen.getByRole("form")).not.toHaveStyle("overflow-y: auto");
});

// for coverage: stickyFooter prop styles are covered by Chromatic and Playwright
test("applies overflow styling when `stickyFooter` is set and form is in a Dialog", () => {
  render(
    <Dialog open>
      <Form
        aria-label="form-example"
        stickyFooter
        saveButton={<Button>Save</Button>}
      />
    </Dialog>
  );

  expect(screen.getByTestId("form-content")).toHaveStyle({
    overflowY: "auto",
  });
});

// for coverage - `footerPadding` prop is covered by Chromatic
describe("when the `footerPadding` prop is set", () => {
  testStyledSystemPaddingRTL(
    (props) => (
      <Form saveButton={<Button>Save</Button>} footerPadding={props} />
    ),
    () => screen.getByTestId("form-footer")
  );
});

// for coverage - `height` prop is tested in Playwright
test.each(["100px", "200px", "300px"])(
  "has the correct height when the `height` prop is set to %s",
  (height) => {
    render(<Form aria-label="form-example" height={height} />);

    expect(screen.getByRole("form")).toHaveStyle({
      height,
    });
  }
);

// for coverage - `buttonAlignment="left"` tested in both Playwright and Chromatic
test("renders with correct styles when `buttonAlignment` prop is set to `left`", () => {
  render(
    <Form
      buttonAlignment="left"
      rightSideButtons={
        <>
          <Button>Right1</Button>
          <Button>Right2</Button>
        </>
      }
    />
  );

  expect(screen.getByTestId("form-right-buttons")).toHaveStyle({
    "flex-grow": "1",
  });
});
