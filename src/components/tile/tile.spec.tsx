import React from "react";
import { mount } from "enzyme";
import { Tile, TileContent } from ".";
import StyledTileContent from "./tile-content/tile-content.style";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
  testStyledSystemWidth,
  testStyledSystemHeight,
} from "../../__spec_helper__/test-utils";
import { TileProps } from "./tile.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledTile from "./tile.style";

function renderTile(props: TileProps) {
  return mount(
    <Tile {...props}>
      <TileContent key="one">Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>
  );
}

describe("Tile", () => {
  testStyledSystemSpacing((props) => <Tile {...props}>Test</Tile>, { p: 3 });

  testStyledSystemWidth((props) => <Tile {...props}>Test</Tile>);

  describe("wrapping of children in TileContent components", () => {
    describe("when something causes a child element to return nothing", () => {
      const children = [
        <TileContent key="one">Child 1</TileContent>,
        <TileContent key="two">{null}</TileContent>,
      ];

      const wrapper = mount(<Tile>{children}</Tile>);

      const tileContents = wrapper.find(StyledTileContent).getElements();

      it("only contains one TileContent", () => {
        expect(tileContents.length).toBe(1);
      });
    });
  });

  describe("styles", () => {
    testStyledSystemSpacing((props) => <Tile {...props} />, { p: 3 });

    testStyledSystemWidth((props) => <Tile {...props} />);

    testStyledSystemHeight((props) => <Tile {...props} />);

    describe("variant", () => {
      it('renders a white background when variant prop is "tile"', () => {
        const wrapper = renderTile({ variant: "tile" });

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityYang100)",
            border: "var(--borderWidth100) solid var(--colorsUtilityMajor100)",
          },
          wrapper
        );
      });

      it('renders a transparent background when variant prop is "transparent"', () => {
        const wrapper = renderTile({ variant: "transparent" });

        assertStyleMatch({ backgroundColor: "transparent" }, wrapper);
      });

      it('renders with expected background and border styles when variant is "active"', () => {
        const wrapper = renderTile({ variant: "active" });

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsActionMajor025)",
            borderColor: "var(--colorsActionMajor500)",
          },
          wrapper
        );
      });

      it('renders with expected background and border styles when variant is "grey"', () => {
        const wrapper = renderTile({ variant: "grey" });

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor025)",
            borderColor: "var(--colorsUtilityMajor200)",
          },
          wrapper
        );
      });
    });

    describe("custom borders", () => {
      it.each<[TileProps["borderVariant"], string]>([
        ["selected", "colorsUtilityYin100"],
        ["positive", "colorsSemanticPositive500"],
        ["negative", "colorsSemanticNegative500"],
        ["caution", "colorsSemanticCaution500"],
        ["info", "colorsSemanticInfo500"],
      ])(
        "renders with expected border when borderVariant is set to %s",
        (borderVariant, borderVariantToken) => {
          const wrapper = renderTile({ borderVariant });

          assertStyleMatch(
            {
              border: `var(--borderWidth100) solid var(--${borderVariantToken})`,
            },
            wrapper
          );
        }
      );

      it.each<TileProps["borderWidth"]>([
        "borderWidth000",
        "borderWidth100",
        "borderWidth200",
        "borderWidth300",
        "borderWidth400",
      ])(
        "renders with expected border width when borderWidth set to %s",
        (borderWidth) => {
          const wrapper = renderTile({ borderWidth });

          assertStyleMatch(
            {
              border: `var(--${borderWidth}) solid var(--colorsUtilityMajor100)`,
            },
            wrapper
          );
        }
      );
    });

    describe("orientation", () => {
      describe("when it is horizontal", () => {
        const wrapper = renderTile({ orientation: "horizontal" });

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "row" }, wrapper);
        });
      });

      describe("when it is vertical", () => {
        const wrapper = renderTile({ orientation: "vertical" });

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "column" }, wrapper);
        });
      });
    });
  });

  it.each<TileProps["roundness"]>(["default", "large", "small"])(
    "render with the expected border radius when roundness is %s",
    (roundness) => {
      const wrapper = renderTile({ roundness });
      let result: string;
      switch (roundness) {
        case "small":
          result = "var(--borderRadius050)";
          break;
        case "large":
          result = "var(--borderRadius200)";
          break;
        default:
          result = "var(--borderRadius100)";
          break;
      }

      assertStyleMatch({ borderRadius: result }, wrapper);
    }
  );

  it("has proper data attributes applied to elements", () => {
    const wrapper = mount(
      <Tile data-element="foo" data-role="bar">
        content
      </Tile>
    );
    rootTagTest(wrapper.find(StyledTile), "tile", "foo", "bar");
  });
});
