import React from "react";
import { mount as enzymeMount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { GridContainer, GridItem } from ".";
import { baseTheme } from "../../style/themes";

const paddingProps = [
  ["p", "padding"],
  ["pl", "paddingLeft"],
  ["pr", "paddingRight"],
  ["pt", "paddingTop"],
  ["pb", "paddingBottom"],
  ["px", "paddingLeft"],
  ["px", "paddingRight"],
  ["py", "paddingTop"],
  ["py", "paddingBottom"],
];

const item1900 = {
  gridColumn: "1 / 9",
  gridRow: 2,
  maxWidth: "900px",
};

const item11300 = {
  alignSelf: "stretch",
  gridColumn: "1 / 13",
  gridRow: 1,
  justifySelf: "stretch",
  maxWidth: "1300px",
};

const item11500 = {
  alignSelf: "stretch",
  gridColumn: "1 / 7",
  gridRow: 1,
  justifySelf: "stretch",
  maxWidth: "1500px",
};

const item2900 = {
  alignSelf: "stretch",
  gridColumn: "1 / 9",
  gridRow: 3,
  justifySelf: "stretch",
  maxWidth: "900px",
};

const item21300 = {
  gridColumn: "1 / 13",
  gridRow: 2,
  maxWidth: "1300px",
};

const item21500 = {
  alignSelf: "stretch",
  gridColumn: "7 / 13",
  gridRow: 1,
  justifySelf: "stretch",
  maxWidth: "1500px",
};

const item3900 = {
  alignSelf: "stretch",
  gridColumn: "1 / 9",
  gridRow: 1,
  justifySelf: "stretch",
  maxWidth: "900px",
};

const item31300 = {
  alignSelf: "stretch",
  gridColumn: "1 / 13",
  gridRow: 3,
  justifySelf: "stretch",
  maxWidth: "1300px",
};

const item31500 = {
  gridColumn: "1 / 13",
  gridRow: 2,
  maxWidth: "1500px",
};

const mount = (attachTo) => {
  return enzymeMount(
    <GridContainer id="testContainer">
      <GridItem responsiveSettings={[item11500, item11300, item1900]}>
        1
      </GridItem>
      <GridItem responsiveSettings={[item21500, item21300, item2900]}>
        2
      </GridItem>
      <GridItem responsiveSettings={[item31500, item3900, item31300]}>
        3
      </GridItem>
    </GridContainer>,
    { attachTo }
  );
};

describe("Grid", () => {
  describe("GridContainer", () => {
    it("renders as expected", () => {
      const elem = mount();
      expect(elem).toBeDefined();
    });

    it("renders as the css grid and applies the default style rules", () => {
      const elem = mount();
      assertStyleMatch(
        {
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridTemplateRows: "auto",
          width: "auto",
          padding: "40px",
          gridGap: "40px",
        },
        elem
      );
    });

    it("requires a child", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      enzymeMount(<GridContainer />);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        // eslint-disable-next-line max-len
        "Warning: Failed prop type: The prop `children` is marked as required in `GridContainer`, but its value is `undefined`.\n    in GridContainer"
      );
      global.console.error.mockReset();
    });

    it("rejects children if not GridItems", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      enzymeMount(
        <GridContainer>
          <p>invalid children</p>
        </GridContainer>
      );
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        // eslint-disable-next-line max-len
        "Warning: Failed prop type: Invalid prop `children` supplied to `GridContainer`."
      );
      global.console.error.mockReset();
    });

    describe.each(paddingProps)(
      'when a custom padding is specified using the "%s" styled system props',
      (styledSystemProp, propName) => {
        it(`then that ${propName} should have been set on the GridContainer`, () => {
          const props = { [styledSystemProp]: "15px" };
          const wrapper = enzymeMount(
            <GridContainer id="testContainer" {...props}>
              <GridItem>1</GridItem>
              <GridItem>2</GridItem>
              <GridItem>3</GridItem>
            </GridContainer>
          );

          expect(
            assertStyleMatch({ [propName]: "15px" }, wrapper, {
              media: "screen",
            })
          );
        });
      }
    );

    describe('when a custom grid-gap is specified using the "gridGap" styled system prop', () => {
      it("then that grid-gap should have been set on the GridContainer", () => {
        const wrapper = enzymeMount(
          <GridContainer id="testContainer" gridGap="15px">
            <GridItem>1</GridItem>
            <GridItem>2</GridItem>
            <GridItem>3</GridItem>
          </GridContainer>
        );

        expect(
          assertStyleMatch({ gridGap: "15px" }, wrapper, { media: "screen" })
        );
      });
    });
  });

  describe("GridItem", () => {
    /* the aim here is not to test that CSS media queries work. we are simply */
    /* checking that styled components are built and applied correctly        */
    it("builds the style rules for the GridItem with responsiveSettings", () => {
      expect(
        TestRenderer.create(
          <GridContainer id="testContainer">
            <GridItem responsiveSettings={[item11500, item11300, item1900]}>
              1
            </GridItem>
            <GridItem responsiveSettings={[item21500, item21300, item2900]}>
              2
            </GridItem>
            <GridItem responsiveSettings={[item31500, item3900, item31300]}>
              3
            </GridItem>
          </GridContainer>
        )
      ).toMatchSnapshot();
    });

    it("builds the style rules for the GridItem with custom align and justify", () => {
      expect(
        TestRenderer.create(
          <GridContainer id="testContainer">
            <GridItem alignSelf="start" justifySelf="left">
              1
            </GridItem>
            <GridItem alignSelf="start" justifySelf="center">
              1
            </GridItem>
            <GridItem alignSelf="start" justifySelf="right">
              1
            </GridItem>
          </GridContainer>
        )
      ).toMatchSnapshot();
    });

    describe("when a custom padding is specified using one of the styled system props", () => {
      it("then that padding should have been set on the GridItem", () => {
        const wrapper = enzymeMount(
          <GridContainer id="testContainer">
            <GridItem p="15px">1</GridItem>
            <GridItem pl="15px">2</GridItem>
            <GridItem pr="15px">3</GridItem>
            <GridItem pt="15px">4</GridItem>
            <GridItem pb="15px">5</GridItem>
            <GridItem px="15px">6</GridItem>
            <GridItem py="15px">7</GridItem>
          </GridContainer>
        );

        expect(
          assertStyleMatch({ padding: "15px" }, wrapper.find(GridItem).first())
        );
        expect(
          assertStyleMatch(
            { paddingLeft: "15px" },
            wrapper.find(GridItem).at(1)
          )
        );
        expect(
          assertStyleMatch(
            { paddingRight: "15px" },
            wrapper.find(GridItem).at(2)
          )
        );
        expect(
          assertStyleMatch({ paddingTop: "15px" }, wrapper.find(GridItem).at(3))
        );
        expect(
          assertStyleMatch(
            { paddingBottom: "15px" },
            wrapper.find(GridItem).at(4)
          )
        );
        expect(
          assertStyleMatch(
            {
              paddingLeft: "15px",
              paddingRight: "15px",
            },
            wrapper.find(GridItem).at(5)
          )
        );
        expect(
          assertStyleMatch(
            {
              paddingTop: "15px",
              paddingBottom: "15px",
            },
            wrapper.find(GridItem).at(6)
          )
        );
      });
    });

    describe(`when a custom padding is specified as a number in responsiveSettings,
      using one of the styled system props`, () => {
      it("then the padding specified in a theme spacing property should have been set on the GridItem", () => {
        const wrapper = enzymeMount(
          <GridContainer id="testContainer">
            <GridItem responsiveSettings={[{ p: 3, maxWidth: "1500px" }]}>
              1
            </GridItem>
            <GridItem responsiveSettings={[{ pl: 3, maxWidth: "1500px" }]}>
              2
            </GridItem>
            <GridItem responsiveSettings={[{ pr: 3, maxWidth: "1500px" }]}>
              3
            </GridItem>
            <GridItem responsiveSettings={[{ pt: 3, maxWidth: "1500px" }]}>
              4
            </GridItem>
            <GridItem responsiveSettings={[{ pb: 3, maxWidth: "1500px" }]}>
              5
            </GridItem>
          </GridContainer>
        );

        expect(
          assertStyleMatch(
            { padding: `${baseTheme.space[3]}px` },
            wrapper.find(GridItem).first(),
            { media: "screen and (max-width:1500px)" }
          )
        );
        expect(
          assertStyleMatch(
            { paddingLeft: `${baseTheme.space[3]}px` },
            wrapper.find(GridItem).at(1),
            { media: "screen and (max-width:1500px)" }
          )
        );
        expect(
          assertStyleMatch(
            { paddingRight: `${baseTheme.space[3]}px` },
            wrapper.find(GridItem).at(2),
            { media: "screen and (max-width:1500px)" }
          )
        );
        expect(
          assertStyleMatch(
            { paddingTop: `${baseTheme.space[3]}px` },
            wrapper.find(GridItem).at(3),
            { media: "screen and (max-width:1500px)" }
          )
        );
        expect(
          assertStyleMatch(
            { paddingBottom: `${baseTheme.space[3]}px` },
            wrapper.find(GridItem).at(4),
            { media: "screen and (max-width:1500px)" }
          )
        );
      });
    });
  });
});
