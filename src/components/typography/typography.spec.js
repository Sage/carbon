import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import { mintTheme } from "../../style/themes";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import Typography, { List, ListItem } from ".";

const assert = ({ as, ...css }, props) => {
  const wrapper = mount(
    <ThemeProvider theme={mintTheme}>
      <Typography {...props} />
    </ThemeProvider>
  );
  if (as) {
    expect(wrapper.find(as).length).toBe(1);
  }
  assertStyleMatch(css, wrapper);
};

const pStyling = {
  fontSize: "14px",
  lineHeight: "21px",
  fontWeight: "400",
  textTransform: "none",
  textDecoration: "none",
  verticalAlign: undefined,
  color: "rgba(0,0,0,0.90)",
  display: undefined,
  padding: "0",
  margin: "0 0 16px",
  listStyleType: undefined,
};

describe("Typography", () => {
  describe("default variants", () => {
    it("applies p styling by default", () => {
      assert({ ...pStyling, as: "p" });
    });

    it("applies p styling", () => {
      assert({ ...pStyling, as: "p" }, { variant: "p" });
    });

    it("applies h1-large styling", () => {
      assert(
        {
          fontSize: "32px",
          as: "h1",
          lineHeight: "40px",
          fontWeight: "900",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h1-large" }
      );
    });

    it("applies h1 styling", () => {
      assert(
        {
          fontSize: "24px",
          as: "h1",
          lineHeight: "31px",
          fontWeight: "900",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h1" }
      );
    });

    it("applies h2 styling", () => {
      assert(
        {
          fontSize: "22px",
          as: "h2",
          lineHeight: "29px",
          fontWeight: "700",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h2" }
      );
    });

    it("applies h3 styling", () => {
      assert(
        {
          fontSize: "20px",
          as: "h3",
          lineHeight: "26px",
          fontWeight: "700",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h3" }
      );
    });

    it("applies h4 styling", () => {
      assert(
        {
          fontSize: "18px",
          as: "h4",
          lineHeight: "23px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h4" }
      );
    });

    it("applies h5 styling", () => {
      assert(
        {
          fontSize: "16px",
          as: "h5",
          lineHeight: "21px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "h5" }
      );
    });

    it("applies segment-header styling", () => {
      assert(
        {
          fontSize: "20px",
          as: "h5",
          lineHeight: "26px",
          fontWeight: "900",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "segment-header" }
      );
    });

    it("applies segment-header-small styling", () => {
      assert(
        {
          fontSize: "18px",
          as: "h5",
          lineHeight: "23px",
          fontWeight: "900",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "segment-header-small" }
      );
    });

    it("applies segment-subheader styling", () => {
      assert(
        {
          fontSize: "16px",
          as: "h5",
          lineHeight: "31px",
          fontWeight: "700",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "segment-subheader" }
      );
    });

    it("applies segment-subheader-alt styling", () => {
      assert(
        {
          fontSize: "14px",
          as: "h5",
          lineHeight: "21px",
          fontWeight: "700",
          textTransform: "uppercase",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "segment-subheader-alt" }
      );
    });

    it("applies small styling", () => {
      assert(
        {
          fontSize: "13px",
          as: "small",
          lineHeight: "20px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "small" }
      );
    });

    it("applies big styling", () => {
      assert(
        {
          fontSize: "16px",
          as: "p",
          lineHeight: "24px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "big" }
      );
    });

    it("applies sup styling", () => {
      assert(
        {
          fontSize: "13px",
          as: "sup",
          lineHeight: "20px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: "super",
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "sup" }
      );
    });

    it("applies sub styling", () => {
      assert(
        {
          fontSize: "13px",
          as: "sub",
          lineHeight: "20px",
          fontWeight: "400",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: "sub",
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "sub" }
      );
    });

    it("applies strong styling", () => {
      assert(
        {
          fontSize: "14px",
          as: "strong",
          lineHeight: "21px",
          fontWeight: "900",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "strong" }
      );
    });

    it("applies b styling", () => {
      assert(
        {
          fontSize: "14px",
          as: "b",
          lineHeight: "21px",
          fontWeight: "700",
          textTransform: "none",
          textDecoration: "none",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "b" }
      );
    });

    it("applies em styling", () => {
      assert(
        {
          fontSize: "14px",
          as: "em",
          lineHeight: "21px",
          fontWeight: "700",
          textTransform: "none",
          textDecoration: "underline",
          verticalAlign: undefined,
          color: "rgba(0,0,0,0.90)",
          display: undefined,
          padding: "0",
          margin: "0",
        },
        { variant: "em" }
      );
    });
  });

  describe("overrides", () => {
    it("changes the element", () => {
      assert(
        {
          as: "span",
        },
        { variant: "p", as: "span" }
      );
    });

    it("changes the size", () => {
      assert(
        {
          fontSize: "99px",
        },
        { variant: "p", fontSize: "99px" }
      );
    });

    it("changes the weight", () => {
      assert(
        {
          fontWeight: "900",
        },
        { variant: "p", fontWeight: "900" }
      );
    });

    it("changes the text transform", () => {
      assert(
        {
          textTransform: "uppercase",
        },
        { variant: "p", textTransform: "uppercase" }
      );
    });

    it("changes the text decoration", () => {
      assert(
        {
          textDecoration: "underline",
        },
        { variant: "p", textDecoration: "underline" }
      );
    });

    it("changes the line height", () => {
      assert(
        {
          lineHeight: "50px",
        },
        { variant: "p", lineHeight: "50px" }
      );
    });

    it("changes the display", () => {
      assert(
        {
          display: "block",
        },
        { variant: "p", display: "block" }
      );
    });

    it("changes the opacity", () => {
      assert(
        {
          opacity: "10%",
        },
        { variant: "p", opacity: "10%" }
      );
    });

    describe.each([
      ["color", "color"],
      ["bg", "backgroundColor"],
      ["backgroundColor", "backgroundColor"],
    ])("changes the color using the `%s` prop", (prop, css) => {
      it("uses the palette instead of a CSS string", () => {
        assert(
          {
            [css]: "#FFB500",
          },
          { variant: "p", [prop]: "gold" }
        );
      });

      it("uses theme.colors", () => {
        assert(
          {
            [css]: "#00815D",
          },
          { variant: "p", [prop]: "primary" }
        );
      });

      it("uses theme.palette", () => {
        assert(
          {
            [css]: "#61E961",
          },
          { variant: "p", [prop]: "brilliantGreenTint38" }
        );
      });

      it("uses opacityAt(black)", () => {
        assert(
          {
            [css]: "rgba(0,0,0,0.10)",
          },
          { variant: "p", [prop]: "blackOpacity10" }
        );
      });

      it("uses opacityAt(white)", () => {
        assert(
          {
            [css]: "rgba(255,255,255,0.10)",
          },
          { variant: "p", [prop]: "whiteOpacity10" }
        );
      });

      it("uses CSS strings", () => {
        assert(
          {
            [css]: "blue",
          },
          { variant: "p", [prop]: "blue" }
        );

        assert(
          {
            [css]: "#eee",
          },
          { variant: "p", [prop]: "#eee" }
        );
      });
    });
  });

  testStyledSystemSpacing((props) => <Typography {...props} />);
});

describe("List", () => {
  it.each([
    ["ul", "square"],
    ["ol", "decimal"],
  ])("renders as a %s", (as, listStyleType) => {
    const wrapper = mount(
      <ThemeProvider theme={mintTheme}>
        <List as={as}>
          <ListItem>Bread</ListItem>
          <ListItem>Milk</ListItem>
          <ListItem>Sugar</ListItem>
        </List>
      </ThemeProvider>
    );

    const ul = wrapper.find(as);
    assertStyleMatch(
      {
        ...pStyling,
        listStyleType,
      },
      ul
    );

    const listItems = wrapper.find("li");
    expect(listItems.length).toBe(3);

    listItems.forEach((listItem) => {
      assertStyleMatch(
        {
          ...pStyling,
          margin: "0 0 8px 16px",
        },
        listItem
      );
    });
  });

  testStyledSystemSpacing((props) => <List {...props} />);

  testStyledSystemSpacing((props) => <ListItem {...props} />);
});
