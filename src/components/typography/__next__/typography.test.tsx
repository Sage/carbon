import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from ".";
import { testStyledSystemSpacing } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemSpacing(
  (props) => <Typography {...props}>Test</Typography>,
  () => screen.getByText("Test"),
);

describe("h1", () => {
  it("should render as h1 with correct font/color tokens", () => {
    render(<Typography variant="h1">Heading text</Typography>);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveStyle("font: var(--global-font-static-heading-l)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h1" fluid>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading");

    expect(heading).toHaveStyle("font: var(--global-font-fluid-heading-l)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h1" inverse>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h1" as="h2">
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toBeVisible();
  });
});

describe("h2", () => {
  it("should render as h2 with correct font/color tokens", () => {
    render(<Typography variant="h2">Heading text</Typography>);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle("font: var(--global-font-static-heading-m)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h2" fluid>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-heading-m)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h2" inverse>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h2" as="h3">
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeVisible();
  });
});

describe("h3", () => {
  it("should render as h3 with correct font/color tokens", () => {
    render(<Typography variant="h3">Heading text</Typography>);

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle("font: var(--global-font-static-heading-s)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h3" fluid>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-heading-s)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h3" inverse>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h3" as="h4">
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeVisible();
  });
});

describe("h4", () => {
  it("should render as h4 with correct font/color tokens", () => {
    render(<Typography variant="h4">Heading text</Typography>);

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toHaveStyle("font: var(--global-font-static-subheading-l)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h4" fluid>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-subheading-l)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h4" inverse>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h4" as="h5">
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 5 });

    expect(heading).toBeVisible();
  });
});

describe("h5", () => {
  it("should render as h5 with correct font/color tokens", () => {
    render(<Typography variant="h5">Heading text</Typography>);

    const heading = screen.getByRole("heading", { level: 5 });

    expect(heading).toHaveStyle("font: var(--global-font-static-subheading-m)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h5" fluid>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 5 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-subheading-m)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h5" inverse>
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 5 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h5" as="h4">
        Heading text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeVisible();
  });
});

describe("section-heading", () => {
  it("should render as h2 with correct font/color tokens", () => {
    render(<Typography variant="section-heading">Section text</Typography>);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle("font: var(--global-font-static-heading-m)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="section-heading" fluid>
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-heading-m)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="section-heading" inverse>
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="section-heading" as="h3">
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeVisible();
  });
});

describe("section-subheading", () => {
  it("should render as h3 with correct font/color tokens", () => {
    render(<Typography variant="section-subheading">Section text</Typography>);

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle("font: var(--global-font-static-heading-s)");
    expect(heading).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="section-subheading" fluid>
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle("font: var(--global-font-fluid-heading-s)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="section-subheading" inverse>
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="section-subheading" as="h4">
        Section text
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeVisible();
  });
});

describe("p", () => {
  it("should render as p element with default props", () => {
    render(<Typography>Paragraph text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-static-body-regular-m)",
    );
    expect(paragraph).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply regular size by default", () => {
    render(
      <Typography variant="p" size="regular">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is large", () => {
    render(
      <Typography variant="p" size="large">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(
      <Typography variant="p" weight="regular">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="p" weight="medium">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(
      <Typography variant="p" tint="default">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "color: var(--container-standard-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="p" tint="alt">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "color: var(--container-standard-standard-txt-alt)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="p" fluid weight="medium" size="large">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "font: var(--global-font-fluid-body-medium-l)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="p" inverse>
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyle(
      "color: var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="p" as="h1">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("heading", { level: 1 });

    expect(paragraph).toBeVisible();
  });
});

it("should apply screenReaderOnly styles when `screenReaderOnly` is true", () => {
  render(
    <Typography variant="p" screenReaderOnly>
      Hidden text
    </Typography>,
  );

  const element = screen.getByRole("paragraph");

  expect(element).toHaveStyle({
    border: "0",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
  });
});

it.each([
  { prop: "display", value: "flex" },
  { prop: "textAlign", value: "center" },
  { prop: "textTransform", value: "uppercase" },
  { prop: "textDecoration", value: "underline" },
  { prop: "whiteSpace", value: "nowrap" },
  { prop: "wordBreak", value: "break-all" },
  { prop: "wordWrap", value: "break-word" },
  { prop: "textOverflow", value: "ellipsis" },
  { prop: "overflow", value: "hidden" },
])("should apply CSS override `$prop`=$value", ({ prop, value }) => {
  const props = { [prop]: value };
  render(
    <Typography variant="p" {...props}>
      Text
    </Typography>,
  );

  const element = screen.getByText("Text");

  expect(element).toHaveStyle(
    `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value}`,
  );
});

describe("Accessibility attributes (aria-hidden, aria-live, role)", () => {
  it("should set aria-hidden attribute when provided", () => {
    render(
      <Typography variant="p" aria-hidden="true">
        Hidden text
      </Typography>,
    );

    const paragraph = screen.getByText("Hidden text");

    expect(paragraph).toHaveAttribute("aria-hidden", "true");
  });

  it("should set aria-live attribute to polite when provided", () => {
    render(
      <Typography variant="p" aria-live="polite">
        Live region text
      </Typography>,
    );

    const paragraph = screen.getByText("Live region text");

    expect(paragraph).toHaveAttribute("aria-live", "polite");
  });

  it("should set aria-live attribute to assertive when provided", () => {
    render(
      <Typography variant="p" aria-live="assertive">
        Assertive live region
      </Typography>,
    );

    const paragraph = screen.getByText("Assertive live region");

    expect(paragraph).toHaveAttribute("aria-live", "assertive");
  });

  it("should set aria-live attribute to off when provided", () => {
    render(
      <Typography variant="p" aria-live="off">
        Non-live region
      </Typography>,
    );

    const paragraph = screen.getByText("Non-live region");

    expect(paragraph).toHaveAttribute("aria-live", "off");
  });

  it("should set role attribute to status when provided", () => {
    render(
      <Typography variant="p" role="status">
        Status message
      </Typography>,
    );

    const paragraph = screen.getByText("Status message");

    expect(paragraph).toHaveAttribute("role", "status");
  });

  it("should set role attribute to alert when provided", () => {
    render(
      <Typography variant="p" role="alert">
        Alert message
      </Typography>,
    );

    const paragraph = screen.getByText("Alert message");

    expect(paragraph).toHaveAttribute("role", "alert");
  });
});
