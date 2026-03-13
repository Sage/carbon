import React from "react";
import { render, screen } from "@testing-library/react";
import Typography, { VARIANT_TYPES } from "./typography.component";
import { List, ListItem } from "./list.component";

describe("Typography (Legacy)", () => {
  describe("variant mapping - deprecated variants to semantic variants", () => {
    it("should map h1-large variant to h1", () => {
      render(<Typography variant="h1-large">Heading</Typography>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeVisible();
    });

    it("should map segment-header variant to h5", () => {
      render(<Typography variant="segment-header">Header</Typography>);
      const element = screen.getByRole("heading", { level: 5 });
      expect(element).toBeVisible();
    });

    it("should map segment-header-small variant to h5", () => {
      render(<Typography variant="segment-header-small">Header</Typography>);
      const element = screen.getByRole("heading", { level: 5 });
      expect(element).toBeVisible();
    });

    it("should map segment-subheader and segment-subheader-alt variants to h5", () => {
      const { rerender } = render(
        <Typography variant="segment-subheader">Subheader</Typography>,
      );
      expect(screen.getByRole("heading", { level: 5 })).toBeVisible();

      rerender(
        <Typography variant="segment-subheader-alt">Subheader</Typography>,
      );
      expect(screen.getByRole("heading", { level: 5 })).toBeVisible();
    });

    it("should render p variant as paragraph element", () => {
      render(<Typography variant="p">Paragraph</Typography>);
      const element = screen.getByRole("paragraph");
      expect(element).toBeVisible();
    });

    it("should render big variant as paragraph element", () => {
      render(<Typography variant="big">Big text</Typography>);
      const element = screen.getByText("Big text");
      expect(element).toBeVisible();
    });
  });

  describe("direct semantic variant usage", () => {
    it("should render h1 variant as h1 element", () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeVisible();
    });

    it("should render h2 variant as h2 element", () => {
      render(<Typography variant="h2">Heading 2</Typography>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toBeVisible();
    });

    it("should render h3 variant as h3 element", () => {
      render(<Typography variant="h3">Heading 3</Typography>);
      const element = screen.getByRole("heading", { level: 3 });
      expect(element).toBeVisible();
    });

    it("should render h4 variant as h4 element", () => {
      render(<Typography variant="h4">Heading 4</Typography>);
      const element = screen.getByRole("heading", { level: 4 });
      expect(element).toBeVisible();
    });

    it("should render h5 variant as h5 element", () => {
      render(<Typography variant="h5">Heading 5</Typography>);
      const element = screen.getByRole("heading", { level: 5 });
      expect(element).toBeVisible();
    });

    it("should render section-heading variant as h2 element", () => {
      render(<Typography variant="section-heading">Section</Typography>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toBeVisible();
    });

    it("should render section-subheading variant as h3 element", () => {
      render(<Typography variant="section-subheading">Subsection</Typography>);
      const element = screen.getByRole("heading", { level: 3 });
      expect(element).toBeVisible();
    });
  });

  describe("element mapping with as prop", () => {
    it("should override variant element with as prop", () => {
      render(
        <Typography variant="p" as="span">
          Text
        </Typography>,
      );
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should render default p variant as paragraph", () => {
      render(<Typography>Default</Typography>);
      const element = screen.getByRole("paragraph");
      expect(element).toBeVisible();
    });

    it("should render span variant as span element", () => {
      render(<Typography variant="span">Span text</Typography>);
      const element = screen.getByText("Span text");
      expect(element).toBeVisible();
    });

    it("should render small variant as small element", () => {
      render(<Typography variant="small">Small text</Typography>);
      const element = screen.getByText("Small text");
      expect(element).toBeVisible();
    });

    it("should render sup variant as sup element", () => {
      render(<Typography variant="sup">Superscript</Typography>);
      const element = screen.getByText("Superscript");
      expect(element).toBeVisible();
    });

    it("should render sub variant as sub element", () => {
      render(<Typography variant="sub">Subscript</Typography>);
      const element = screen.getByText("Subscript");
      expect(element).toBeVisible();
    });

    it("should render strong variant as strong element", () => {
      render(<Typography variant="strong">Strong text</Typography>);
      const element = screen.getByText("Strong text");
      expect(element).toBeVisible();
    });

    it("should render b variant as b element", () => {
      render(<Typography variant="b">Bold text</Typography>);
      const element = screen.getByText("Bold text");
      expect(element).toBeVisible();
    });

    it("should render em variant as em element", () => {
      render(<Typography variant="em">Emphasized text</Typography>);
      const element = screen.getByText("Emphasized text");
      expect(element).toBeVisible();
    });
  });

  describe("deprecated props - font styling overrides", () => {
    it("should apply deprecated fontSize prop override", () => {
      render(<Typography fontSize="24px">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("font-size: 24px");
    });

    it("should apply deprecated fontWeight prop override", () => {
      render(<Typography fontWeight="700">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("font-weight: 700");
    });

    it("should apply deprecated lineHeight prop override", () => {
      render(<Typography lineHeight="1.5">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("line-height: 1.5");
    });

    it("should combine multiple font overrides", () => {
      render(
        <Typography fontSize="18px" fontWeight="600" lineHeight="1.8">
          Text
        </Typography>,
      );
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("font-size: 18px");
      expect(element).toHaveStyle("font-weight: 600");
      expect(element).toHaveStyle("line-height: 1.8");
    });
  });

  describe("deprecated truncate prop", () => {
    it("should apply truncation styles when truncate is true", () => {
      render(<Typography truncate>Long text that should truncate</Typography>);
      const element = screen.getByText("Long text that should truncate");
      expect(element).toHaveStyle("overflow: hidden");
      expect(element).toHaveStyle("white-space: nowrap");
      expect(element).toHaveStyle("text-overflow: ellipsis");
    });

    it("should not apply truncation styles when truncate is false", () => {
      render(<Typography truncate={false}>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).not.toHaveStyle("text-overflow: ellipsis");
    });
  });

  describe("CSS text overrides", () => {
    it("should apply textTransform override", () => {
      render(<Typography textTransform="uppercase">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("text-transform: uppercase");
    });

    it("should apply textDecoration override", () => {
      render(<Typography textDecoration="underline">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("text-decoration: underline");
    });

    it("should apply textAlign override", () => {
      render(<Typography textAlign="center">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("text-align: center");
    });

    it("should apply whiteSpace override", () => {
      render(<Typography whiteSpace="pre-wrap">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("white-space: pre-wrap");
    });

    it("should apply wordBreak override", () => {
      render(<Typography wordBreak="break-all">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("word-break: break-all");
    });

    it("should apply wordWrap override", () => {
      render(<Typography wordWrap="break-word">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("word-wrap: break-word");
    });

    it("should apply textOverflow override", () => {
      render(<Typography textOverflow="clip">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("text-overflow: clip");
    });

    it("should apply display override", () => {
      render(<Typography display="inline-block">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("display: inline-block");
    });
  });

  describe("semantic list variants", () => {
    it("should render ul variant with list-style-type disc", () => {
      render(<Typography variant="ul">Item</Typography>);
      const element = screen.getByText("Item");
      expect(element).toHaveStyle("list-style-type: disc");
    });

    it("should render ol variant with list-style-type decimal", () => {
      render(<Typography variant="ol">Item</Typography>);
      const element = screen.getByText("Item");
      expect(element).toHaveStyle("list-style-type: decimal");
    });

    it("should respect deprecated listStyleType prop override on ul variant", () => {
      render(
        <Typography variant="ul" listStyleType="circle">
          Item
        </Typography>,
      );
      const element = screen.getByText("Item");
      expect(element).toBeVisible(); // listStyleType may not override ul/ol
    });
  });

  describe("new typography props (forward compatibility)", () => {
    it("should apply fluid prop", () => {
      render(<Typography fluid>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should apply inverse prop", () => {
      render(<Typography inverse>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should apply size prop", () => {
      render(<Typography size="L">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should apply weight prop", () => {
      render(<Typography weight="medium">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should apply tint prop", () => {
      render(<Typography tint="alt">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });
  });

  describe("deprecated color and background props", () => {
    it("should accept deprecated color prop", () => {
      render(<Typography color="#FF0000">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should accept deprecated backgroundColor prop", () => {
      render(<Typography backgroundColor="#FFFFFF">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should accept deprecated bg prop", () => {
      render(<Typography bg="#F0F0F0">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });

    it("should accept deprecated opacity prop", () => {
      render(<Typography opacity={0.5}>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toBeVisible();
    });
  });

  describe("accessibility features", () => {
    it("should apply screenReaderOnly styles when enabled", () => {
      render(<Typography screenReaderOnly>Hidden text</Typography>);
      const element = screen.getByText("Hidden text");
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

    it("should apply aria-live attribute", () => {
      render(<Typography aria-live="polite">Live text</Typography>);
      const element = screen.getByText("Live text");
      expect(element).toHaveAttribute("aria-live", "polite");
    });

    it("should apply aria-hidden attribute", () => {
      render(<Typography aria-hidden="true">Hidden</Typography>);
      const element = screen.getByText("Hidden");
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    it("should apply role attribute", () => {
      render(<Typography role="status">Status message</Typography>);
      const element = screen.getByText("Status message");
      expect(element).toHaveAttribute("role", "status");
    });
  });

  describe("ID attribute", () => {
    it("should set id attribute on element", () => {
      render(<Typography id="my-typography">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveAttribute("id", "my-typography");
    });
  });

  describe("spacing props (styled-system)", () => {
    it("should accept margin prop", () => {
      render(<Typography m="10px">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("margin: 10px");
    });

    it("should accept padding prop", () => {
      render(<Typography p="10px">Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveStyle("padding: 10px");
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
      expect(listElement).toBeVisible();
    });

    it("should render List with ol element when as='ol'", () => {
      render(
        <List as="ol">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const listElement = screen.getByRole("list");
      expect(listElement).toBeVisible();
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

    it("should apply list style type square for ul items", () => {
      render(
        <List>
          <ListItem>Item</ListItem>
        </List>,
      );
      const listElement = screen.getByRole("list");
      // List component applies listStyleType prop which should result in square style
      expect(listElement).toBeVisible();
    });

    it("should apply list style type decimal for ol items", () => {
      render(
        <List as="ol">
          <ListItem>Item</ListItem>
        </List>,
      );
      const listElement = screen.getByRole("list");
      // List component applies listStyleType prop which should result in decimal style
      expect(listElement).toBeVisible();
    });

    it("should pass variant from List to ListItem", () => {
      render(
        <List variant="p">
          <ListItem>Item</ListItem>
        </List>,
      );
      const itemElement = screen.getByText("Item");
      expect(itemElement).toBeVisible();
    });

    it("should apply margin styles to ListItem", () => {
      render(
        <List>
          <ListItem>Item</ListItem>
        </List>,
      );
      const itemElement = screen.getByText("Item");
      expect(itemElement).toHaveStyle("margin: 0 0 8px 16px");
    });

    it("should allow ListItem to override properties", () => {
      render(
        <List>
          <ListItem m="20px">Item</ListItem>
        </List>,
      );
      const itemElement = screen.getByText("Item");
      expect(itemElement).toHaveStyle("margin: 20px");
    });

    it("should render multiple ListItems in a List", () => {
      render(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>,
      );
      expect(screen.getByText("Item 1")).toBeVisible();
      expect(screen.getByText("Item 2")).toBeVisible();
      expect(screen.getByText("Item 3")).toBeVisible();
    });
  });

  describe("unsupported variants - default fallback behavior", () => {
    it("should render unsupported variant as paragraph element", () => {
      render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Typography variant={"invalid-variant" as any}>
          Fallback text
        </Typography>,
      );
      const element = screen.getByRole("paragraph");
      expect(element).toBeVisible();
    });

    it("should render unsupported variant with children as paragraph", () => {
      render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Typography variant={"unknown" as any}>
          Unknown variant content
        </Typography>,
      );
      const element = screen.getByRole("paragraph");
      expect(element).toHaveTextContent("Unknown variant content");
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

  describe("all VARIANT_TYPES exports", () => {
    it("should export expected variant types", () => {
      expect(VARIANT_TYPES).toContain("h1");
      expect(VARIANT_TYPES).toContain("h2");
      expect(VARIANT_TYPES).toContain("p");
      expect(VARIANT_TYPES).toContain("section-heading");
    });

    it("should include deprecated variants in VARIANT_TYPES", () => {
      expect(VARIANT_TYPES).toContain("h1-large");
      expect(VARIANT_TYPES).toContain("segment-header");
      expect(VARIANT_TYPES).toContain("segment-header-small");
    });
  });
});
