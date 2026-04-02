import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from "./typography.component";
import { List, ListItem } from "./list.component";

describe("variant mapping - deprecated variants to supported variants", () => {
  it("should map h1-large variant to h1", () => {
    render(<Typography variant="h1-large">Heading</Typography>);
    const h1large = screen.getByRole("heading", { level: 1 });

    expect(h1large).toHaveStyleRule(
      "font",
      "var(--global-font-static-heading-l)",
    );
    expect(h1large).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should map segment-header variant to section-heading", () => {
    render(<Typography variant="segment-header">Segment Header</Typography>);
    const segmentHeader = screen.getByRole("heading", { level: 2 });

    expect(segmentHeader).toHaveStyleRule(
      "font",
      "var(--global-font-static-heading-m)",
    );
    expect(segmentHeader).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
    expect(segmentHeader).toBeVisible();
  });

  it("should map segment-header-small variant to section-subheading", () => {
    render(
      <Typography variant="segment-header-small">
        Segment header small
      </Typography>,
    );
    const segmentHeaderSmall = screen.getByRole("heading", { level: 3 });

    expect(segmentHeaderSmall).toHaveStyleRule(
      "font",
      "var(--global-font-static-heading-s)",
    );
    expect(segmentHeaderSmall).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should map segment-subheader and segment-subheader-alt variants to h5", () => {
    render(
      <>
        <Typography variant="segment-subheader">Subheader</Typography>
        <Typography variant="segment-subheader-alt">Subheader Alt</Typography>
      </>,
    );
    const segmentHeaders = screen.getAllByRole("heading", { level: 5 });

    expect(segmentHeaders[0]).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-m)",
    );
    expect(segmentHeaders[0]).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );

    expect(segmentHeaders[1]).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-m)",
    );
    expect(segmentHeaders[1]).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });
});

describe("direct semantic variant usage", () => {
  it("should render h1 variant as h1 element", () => {
    render(<Typography variant="h1">Heading 1</Typography>);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toHaveStyleRule("font", "var(--global-font-static-heading-l)");
    expect(h1).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render h2 variant as h2 element", () => {
    render(<Typography variant="h2">Heading 2</Typography>);

    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h2).toHaveStyleRule("font", "var(--global-font-static-heading-m)");
    expect(h2).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render h3 variant as h3 element", () => {
    render(<Typography variant="h3">Heading 3</Typography>);

    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h3).toHaveStyleRule("font", "var(--global-font-static-heading-s)");
    expect(h3).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render h4 variant as h4 element", () => {
    render(<Typography variant="h4">Heading 4</Typography>);

    const h4 = screen.getByRole("heading", { level: 4 });

    expect(h4).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-l)",
    );
    expect(h4).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render h5 variant as h5 element", () => {
    render(<Typography variant="h5">Heading 5</Typography>);

    const h5 = screen.getByRole("heading", { level: 5 });

    expect(h5).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-m)",
    );
    expect(h5).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render section-heading variant as h2 element", () => {
    render(<Typography variant="section-heading">Section</Typography>);

    const sectionHeading = screen.getByRole("heading", { level: 2 });

    expect(sectionHeading).toHaveStyleRule(
      "font",
      "var(--global-font-static-heading-m)",
    );
    expect(sectionHeading).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render section-subheading variant as h3 element", () => {
    render(<Typography variant="section-subheading">Subsection</Typography>);

    const sectionSubheading = screen.getByRole("heading", { level: 3 });

    expect(sectionSubheading).toHaveStyleRule(
      "font",
      "var(--global-font-static-heading-s)",
    );
    expect(sectionSubheading).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render p variant as p element", () => {
    render(<Typography variant="p">Paragraph</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render span variant as span element, but be styled like a p element", () => {
    render(<Typography variant="span">Span text</Typography>);

    const span = screen.getByText("Span text");
    expect(span.tagName).toBe("SPAN");

    expect(span).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(span).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render small variant as small element, but be styled like a p element", () => {
    render(<Typography variant="small">Small text</Typography>);

    const small = screen.getByText("Small text");
    expect(small.tagName).toBe("SMALL");

    expect(small).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(small).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render big variant as big element, but be styled like a p element", () => {
    render(<Typography variant="big">Big text</Typography>);

    const big = screen.getByText("Big text");
    expect(big.tagName).toBe("BIG");

    expect(big).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(big).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render sup variant as sup element", () => {
    render(<Typography variant="sup">Superscript</Typography>);

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(sup).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render sub variant as sub element", () => {
    render(<Typography variant="sub">Subscript</Typography>);

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(sub).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render strong variant as strong element", () => {
    render(<Typography variant="strong">Strong text</Typography>);

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
    expect(strong).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render b variant as b element", () => {
    render(<Typography variant="b">Bold text</Typography>);

    const bold = screen.getByText("Bold text");
    expect(bold.tagName).toBe("B");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
    expect(bold).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render em variant as em element, but be styled like a p element", () => {
    render(<Typography variant="em">Emphasis text</Typography>);

    const em = screen.getByRole("emphasis");

    expect(em).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(em).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render ul variant as ul element", () => {
    render(
      <Typography variant="ul">
        <li>Item</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");
    expect(ul.tagName).toBe("UL");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(ul).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should render ol variant as ol element", () => {
    render(
      <Typography variant="ol">
        <li>Item</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");
    expect(ol.tagName).toBe("OL");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(ol).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });
});

describe("deprecated props - font styling and truncation overrides", () => {
  it("should apply deprecated fontSize prop override", () => {
    render(<Typography fontSize="9px">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule("font-size", "9px");
  });

  it("should apply deprecated fontWeight prop override", () => {
    render(<Typography fontWeight="700">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule("font-weight", "700");
  });

  it("should apply deprecated lineHeight prop override", () => {
    render(<Typography lineHeight="1.5">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule("line-height", "1.5");
  });

  it("should combine multiple font overrides", () => {
    render(
      <Typography fontSize="18px" fontWeight="600" lineHeight="1.8">
        Text
      </Typography>,
    );
    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule("font-size", "18px");
    expect(element).toHaveStyleRule("font-weight", "600");
    expect(element).toHaveStyleRule("line-height", "1.8");
  });

  it("should apply truncation styles when truncate is true", () => {
    render(<Typography truncate>Long text that should truncate</Typography>);
    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule("overflow", "hidden");
    expect(element).toHaveStyleRule("white-space", "nowrap");
    expect(element).toHaveStyleRule("text-overflow", "ellipsis");
  });
});

describe("supported CSS text overrides", () => {
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
    render(<Typography {...props}>Text</Typography>);

    const element = screen.getByRole("paragraph");

    expect(element).toHaveStyleRule(
      `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
      value,
    );
  });
});

describe("next typography props (forward compatibility)", () => {
  it("should apply fluid prop", () => {
    render(<Typography fluid>Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse prop", () => {
    render(<Typography inverse>Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should apply size prop", () => {
    render(<Typography size="L">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply weight prop", () => {
    render(<Typography weight="medium">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply tint prop", () => {
    render(<Typography tint="alt">Text</Typography>);

    const element = screen.getByRole("paragraph");
    expect(element).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-alt)",
    );
  });
});

describe("Attributes (id, aria-hidden, aria-live, role)", () => {
  it("should set id attribute when provided", () => {
    render(<Typography id="test-id">Text with ID</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("id", "test-id");
  });

  it("should set aria-hidden attribute when provided", () => {
    render(<Typography aria-hidden="true">Hidden text</Typography>);

    const paragraph = screen.getByText("Hidden text");

    expect(paragraph).toHaveAttribute("aria-hidden", "true");
  });

  it("should set aria-live attribute to polite when provided", () => {
    render(<Typography aria-live="polite">Live region text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "polite");
  });

  it("should set aria-live attribute to assertive when provided", () => {
    render(
      <Typography aria-live="assertive">Assertive live region</Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "assertive");
  });

  it("should set aria-live attribute to off when provided", () => {
    render(<Typography aria-live="off">Non-live region</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "off");
  });

  it("should set role attribute to status when provided", () => {
    render(<Typography role="status">Status message</Typography>);

    const paragraph = screen.getByRole("status");

    expect(paragraph).toHaveAttribute("role", "status");
  });

  it("should set role attribute to alert when provided", () => {
    render(<Typography role="alert">Alert message</Typography>);

    const paragraph = screen.getByRole("alert");

    expect(paragraph).toHaveAttribute("role", "alert");
  });
});

describe("List component (legacy)", () => {
  it("should render List with ul element by default", () => {
    render(
      <List>
        <ListItem>Item 1</ListItem>
      </List>,
    );

    const listElement = screen.getByRole("list");
    expect(listElement.tagName).toBe("UL");
  });

  it("should render List with ol element when as='ol'", () => {
    render(
      <List as="ol">
        <ListItem>Item 1</ListItem>
      </List>,
    );

    const listElement = screen.getByRole("list");
    expect(listElement.tagName).toBe("OL");
  });

  it("should render ListItem as li element", () => {
    render(
      <List>
        <ListItem>Item 1</ListItem>
      </List>,
    );
    const itemElement = screen.getByRole("listitem");
    expect(itemElement).toBeVisible();
  });

  it("should pass variant from List to ListItem", () => {
    render(
      <List variant="p">
        <ListItem>List item</ListItem>
      </List>,
    );
    const itemElement = screen.getByText("List item");

    // ListItem should be styled as a p element due to variant passed from List, even though it is semantically a list item
    expect(itemElement.tagName).toBe("LI");
    expect(itemElement).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(itemElement).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });
});

describe("unsupported variants - default fallback behavior", () => {
  it("should render unsupported variant as paragraph element", () => {
    render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Typography variant={"invalid-variant" as any}>Fallback text</Typography>,
    );
    const element = screen.getByRole("paragraph");
    expect(element).toBeVisible();
  });

  it("should apply props to unsupported variant fallback paragraph", () => {
    render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Typography variant={"unsupported" as any} id="unsupported-para">
        Content
      </Typography>,
    );
    const element = screen.getByRole("paragraph");
    expect(element).toHaveAttribute("id", "unsupported-para");
  });
});
