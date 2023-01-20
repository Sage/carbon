import React from "react";
import { mount } from "enzyme";
import Tile from ".";
import { TileContent } from "./tile.style";
import Content from "../content";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
  testStyledSystemWidth,
} from "../../__spec_helper__/test-utils";
import { TileProps } from "./tile.component";

function renderTile(props: TileProps) {
  return mount(
    <Tile {...props}>
      <Content key="one">Child 1</Content>
      <Content>Child 2</Content>
    </Tile>
  );
}

describe("Tile", () => {
  describe("wrapping of children in TileContent components", () => {
    describe("standard", () => {
      const wrapper = renderTile({});
      const tileContents = wrapper.find(TileContent).getElements();

      it("contains one TileContent for each child", () => {
        expect(tileContents.length).toBe(2);
      });

      it.each([0, 1])(
        "TileContent[%i] contains the passed Content as its own child",
        (childIndex) => {
          expect(tileContents[childIndex].props.children.type.name).toBe(
            "Content"
          );
          expect(tileContents[childIndex].props.children.props.children).toBe(
            `Child ${childIndex + 1}`
          );
        }
      );
    });

    describe("when something causes a child element to return nothing", () => {
      const children = [<Content key="one">Child 1</Content>, undefined];

      const wrapper = mount(<Tile>{children}</Tile>);

      const tileContents = wrapper.find(TileContent).getElements();

      it("only contains one TileContent", () => {
        expect(tileContents.length).toBe(1);
      });
    });
  });

  describe("styles", () => {
    testStyledSystemSpacing((props) => <Tile {...props} />, { p: 3 });

    testStyledSystemWidth((props) => <Tile {...props} />);

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

  describe("TileContent", () => {
    describe("styles", () => {
      testStyledSystemSpacing((props) => (
        <TileContent {...props}>Test</TileContent>
      ));

      testStyledSystemWidth((props) => (
        <TileContent {...props}>Test</TileContent>
      ));
    });
  });
});
