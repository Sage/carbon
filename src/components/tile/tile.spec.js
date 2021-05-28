import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import { css } from "styled-components";
import Tile from ".";
import { TileContent } from "./tile.style";
import Content from "../content";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
  testStyledSystemWidth,
} from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";

function render(props, renderer = TestRenderer.create) {
  return renderer(
    <Tile {...props}>
      <Content key="one">Child 1</Content>
      <Content>Child 2</Content>
    </Tile>
  );
}

describe("Tile", () => {
  it("renders base styles", () => {
    const wrapper = render({});

    expect(wrapper).toMatchSnapshot();
  });

  describe("wrapping of children in TileContent components", () => {
    describe("standard", () => {
      const wrapper = render({}, mount);
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
    testStyledSystemSpacing(
      (props) => <Tile {...props} headerSpace={{ p: 3 }} />,
      { p: 3 }
    );

    testStyledSystemWidth((props) => <Tile {...props} />);

    describe("as", () => {
      it('renders a white background when as === "tile"', () => {
        const wrapper = render({ as: "tile" }).toJSON();

        assertStyleMatch({ backgroundColor: "#FFFFFF" }, wrapper);
      });

      it('renders a transparent background when as === "transparent"', () => {
        const wrapper = render({ as: "transparent" }).toJSON();

        assertStyleMatch({ backgroundColor: "transparent" }, wrapper);
      });
    });

    describe("orientation", () => {
      describe("when it is horizontal", () => {
        const wrapper = render({ orientation: "horizontal" }).toJSON();

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "row" }, wrapper);
        });
      });

      describe("when it is vertical", () => {
        const wrapper = render({ orientation: "vertical" }).toJSON();

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "column" }, wrapper);
        });
      });
    });
  });

  describe("TileContent", () => {
    describe("styles", () => {
      function renderTileContent(props) {
        return TestRenderer.create(
          <TileContent {...props}>Test</TileContent>
        ).toJSON();
      }

      testStyledSystemSpacing((props) => (
        <TileContent {...props}>Test</TileContent>
      ));

      testStyledSystemWidth((props) => (
        <TileContent {...props}>Test</TileContent>
      ));

      it("has the correct base styles", () => {
        const wrapper = renderTileContent();

        assertStyleMatch(
          {
            position: "relative",
            flexGrow: "1",
            width: undefined,
          },
          wrapper
        );
      });

      describe('orientation="horizontal"', () => {
        const wrapper = mount(<TileContent isHorizontal>test</TileContent>);

        it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
          assertStyleMatch(
            {
              marginTop: "0",
              borderLeft: `solid 1px ${baseTheme.tile.separator}`,
            },
            wrapper,
            {
              modifier: css`
                ${`& + ${TileContent}`}
              `,
            }
          );
        });

        it("should not set padding right to last component", () => {
          assertStyleMatch(
            {
              paddingRight: "0",
            },
            wrapper,
            { modifier: ":last-of-type" }
          );
        });

        it("should not set padding left to first component", () => {
          assertStyleMatch(
            {
              paddingLeft: "0",
            },
            wrapper,
            { modifier: ":first-of-type" }
          );
        });
      });

      describe('orientation="vertical"', () => {
        const wrapper = mount(<TileContent isVertical>test</TileContent>);

        it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
          assertStyleMatch(
            {
              marginTop: "0",
              borderTop: `solid 1px ${baseTheme.tile.separator}`,
            },
            wrapper,
            {
              modifier: css`
                ${`& + ${TileContent}`}
              `,
            }
          );
        });

        it("should not set padding bottom to last component", () => {
          assertStyleMatch(
            {
              paddingBottom: "0",
            },
            wrapper,
            { modifier: ":last-of-type" }
          );
        });

        it("should not set padding top to first component", () => {
          assertStyleMatch(
            {
              paddingTop: "0",
            },
            wrapper,
            { modifier: ":first-of-type" }
          );
        });
      });

      it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
        const wrapper = mount(<TileContent isVertical>test</TileContent>);

        assertStyleMatch(
          {
            marginTop: "0",
            borderTop: `solid 1px ${baseTheme.tile.separator}`,
          },
          wrapper,
          {
            modifier: css`
              ${`& + ${TileContent}`}
            `,
          }
        );
      });
    });
  });
});
