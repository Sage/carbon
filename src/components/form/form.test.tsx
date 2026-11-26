import React from "react";
import { render, screen, within } from "@testing-library/react";

import {
  testStyledSystemSpacing,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";
import Form from "./form.component";
import Button from "../button/__next__";
import Dialog from "../dialog";
import SidebarContext from "../sidebar/__internal__/sidebar.context";
import I18nProvider from "../i18n-provider";
import enGB from "../../locales/en-gb";

testStyledSystemSpacing(
  (props) => <Form aria-label="form-example" {...props} />,
  () => screen.getByRole("form"),
);

test("includes correct component, element and role data tags on form element", () => {
  render(<Form aria-label="form-example" data-element="bar" data-role="baz" />);

  const formElement = screen.getByRole("form");
  expect(formElement).toHaveAttribute("data-component", "form");
  expect(formElement).toHaveAttribute("data-element", "bar");
  expect(formElement).toHaveAttribute("data-role", "baz");
});

test("passes the id prop to the underlying form element", () => {
  render(<Form aria-label="form-example" id="my-form" />);
  expect(screen.getByRole("form")).toHaveAttribute("id", "my-form");
});

test("default browser validation is disabled on the form by default", () => {
  render(<Form aria-label="form-example" />);
  expect(screen.getByRole("form")).toHaveAttribute("novalidate");
});

test("browser validation can be enabled by setting the `noValidate` prop to `false", () => {
  render(<Form aria-label="form-example" noValidate={false} />);
  expect(screen.getByRole("form")).not.toHaveAttribute("novalidate");
});

test("has the correct height when the `height` prop is set", () => {
  render(<Form aria-label="form-example" height="100px" />);

  expect(screen.getByRole("form")).toHaveStyle({
    height: "100px",
  });
});

describe("footer", () => {
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
      />,
    );

    const footerButtons = within(
      screen.getByTestId("form-footer"),
    ).getAllByRole("button");
    expect(footerButtons[0]).toHaveTextContent("Left1");
    expect(footerButtons[1]).toHaveTextContent("Left2");
    expect(footerButtons[2]).toHaveTextContent("Save");
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
      />,
    );

    const footerButtons = within(
      screen.getByTestId("form-footer"),
    ).getAllByRole("button");
    expect(footerButtons[0]).toHaveTextContent("Save");
    expect(footerButtons[1]).toHaveTextContent("Right1");
    expect(footerButtons[2]).toHaveTextContent("Right2");
  });

  test("renders `footerChildren` in place of the buttons and count summary", () => {
    render(
      <Form
        footerChildren={<span>Footer content</span>}
        leftSideButtons={<Button>Cancel</Button>}
        saveButton={<Button>Save</Button>}
        rightSideButtons={<Button>Other</Button>}
        errorCount={1}
      />,
    );

    const footer = screen.getByTestId("form-footer");
    expect(within(footer).getByText("Footer content")).toBeVisible();
    expect(within(footer).queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("form-summary")).not.toBeInTheDocument();
  });

  // for coverage - `fullWidthButtons` styles are covered by Chromatic
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
      />,
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

  describe("when the `footerPadding` prop is set", () => {
    testStyledSystemPadding(
      (props) => (
        <Form saveButton={<Button>Save</Button>} footerPadding={props} />
      ),
      () => screen.getByTestId("form-footer"),
    );
  });

  // for coverage - `buttonAlignment="left"` styles are covered by Chromatic
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
      />,
    );

    expect(screen.getByTestId("form-right-buttons")).toHaveStyle({
      "flex-grow": "1",
    });
  });
});

describe("deprecated error and warning count summary", () => {
  test("includes correct data-element tags on elements", () => {
    render(
      <Form
        saveButton={<Button>Save</Button>}
        errorCount={1}
        warningCount={1}
      />,
    );

    expect(screen.getByTestId("form-footer")).toHaveAttribute(
      "data-element",
      "form-footer",
    );
    expect(screen.getByTestId("form-summary")).toHaveAttribute(
      "data-element",
      "form-summary",
    );

    expect(screen.getAllByTestId("internal-summary")[0]).toHaveAttribute(
      "data-element",
      "errors",
    );
    expect(screen.getAllByTestId("internal-summary")[1]).toHaveAttribute(
      "data-element",
      "warnings",
    );
  });

  test.each([
    ["errorCount", "errors", "There are", "2 errors"],
    ["warningCount", "warnings", "There are", "2 warnings"],
  ])(
    "renders in the footer when only `%s` is set",
    (prop, dataElement, prefix, count) => {
      render(<Form {...{ [prop]: 2 }} />);

      const summaries = within(
        screen.getByTestId("form-footer"),
      ).getAllByTestId("internal-summary");
      expect(summaries).toHaveLength(1);
      expect(summaries[0]).toHaveAttribute("data-element", dataElement);
      expect(screen.getByText(prefix)).toBeVisible();
      expect(screen.getByText(count)).toBeVisible();
    },
  );

  test("renders the default text when both counts are set", () => {
    render(<Form errorCount={1} warningCount={3} />);

    expect(screen.getByText("There is")).toBeVisible();
    expect(screen.getByText("1 error")).toBeVisible();
    expect(screen.getByText("and")).toBeVisible();
    expect(screen.getByText("3 warnings")).toBeVisible();
  });

  test("renders the text from a custom `formSummary` translation", () => {
    render(
      <I18nProvider
        locale={{
          ...enGB,
          errors: {
            messages: {
              formSummary: (errors, warnings, type) =>
                type === "error"
                  ? ["Il y a", `${errors} errors`]
                  : ["et", `${warnings} avertissements`],
            },
          },
        }}
      >
        <Form
          saveButton={<Button>Save</Button>}
          errorCount={2}
          warningCount={3}
        />
      </I18nProvider>,
    );

    expect(screen.getByText("Il y a")).toBeVisible();
    expect(screen.getByText("2 errors")).toBeVisible();
    expect(screen.getByText("et")).toBeVisible();
    expect(screen.getByText("3 avertissements")).toBeVisible();
  });
});

describe("deprecated sticky footer", () => {
  // for coverage - `stickyFooter` styles in Dialog are covered by Chromatic
  test("applies overflow styling when `stickyFooter` is set and form is in a Dialog", () => {
    render(
      <Dialog open>
        <Form
          aria-label="form-example"
          stickyFooter
          saveButton={<Button>Save</Button>}
        />
      </Dialog>,
    );

    expect(screen.getByTestId("form-content")).toHaveStyle({
      overflowY: "auto",
    });
    expect(screen.getByTestId("form-content")).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  test("makes sticky Form content tabbable only when it is in a small-screen Sidebar", () => {
    render(
      <SidebarContext.Provider
        value={{
          isInSidebar: true,
          isStickyContentFocusable: true,
        }}
      >
        <Form stickyFooter saveButton={<Button>Save</Button>} />
      </SidebarContext.Provider>,
    );

    expect(screen.getByTestId("form-content")).toHaveAttribute("tabindex", "0");
  });

  // for coverage - `stickyFooterVariant` styles are covered by Chromatic
  test('renders with correct styles when `stickyFooterVariant` is "grey"', () => {
    render(
      <Form
        stickyFooter
        stickyFooterVariant="grey"
        saveButton={<Button>Save</Button>}
      />,
    );

    expect(screen.getByTestId("form-footer")).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor025)",
    );
    expect(screen.getByTestId("form-footer")).toHaveStyleRule(
      "border-top",
      "1px solid var(--colorsUtilityMajor050)",
    );
  });

  // for coverage - `disableStickyOnSmallScreen` styles are covered by Chromatic
  test("disables sticky footer on small screens when `disableStickyOnSmallScreen` and `stickyFooter` are set", () => {
    render(
      <Form
        stickyFooter
        disableStickyOnSmallScreen
        saveButton={<Button>Save</Button>}
      />,
    );

    expect(screen.getByTestId("form-footer")).toHaveStyleRule(
      "position",
      "static",
      { media: "screen and (max-width: 600px)" },
    );
    expect(screen.getByTestId("form-footer")).toHaveStyleRule(
      "box-shadow",
      "none",
      { media: "screen and (max-width: 600px)" },
    );
  });
});
