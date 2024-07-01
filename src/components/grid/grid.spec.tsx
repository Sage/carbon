import React from "react";
import { mount as enzymeMount } from "enzyme";
import TestRenderer from "react-test-renderer";

import { assertStyleMatch } from "../../__spec_helper__/__internal__/test-utils";
import { GridContainer, GridItem } from ".";
import { getSpacing } from "./grid-item/grid-item.style";

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

const gridContainerProps = [
  ["gridGap", "15px"],
  ["gridRowGap", "15px"],
  ["gridColumnGap", "15px"],
  ["gridAutoFlow", "row dense"],
  ["gridAutoRows", "1fr"],
  ["gridAutoColumns", "1fr"],
  ["gridTemplateRows", "100px 1fr"],
  ["gridTemplateColumns", "100px 1fr"],
  ["gridTemplateAreas", "foo bar"],
];

const gridItemProps = [
  ["gridArea", "foo / bar"],
  ["gridColumn", "1 / 3"],
  ["gridRow", "1 / 3"],
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

const mount = () => {
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
    </GridContainer>
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

          assertStyleMatch({ [propName]: "15px" }, wrapper, {
            media: "screen",
          });
        });
      }
    );

    describe.each(gridContainerProps)(
      "when a custom %s is specified using that styled system prop",
      (propName, propValue) => {
        it(`then the ${propName} attribute should have been set on the GridContainer`, () => {
          const wrapper = enzymeMount(
            <GridContainer id="testContainer" {...{ [propName]: propValue }}>
              <GridItem>1</GridItem>
              <GridItem>2</GridItem>
              <GridItem>3</GridItem>
            </GridContainer>
          );

          assertStyleMatch({ [propName]: propValue }, wrapper, {
            media: "screen",
          });
        });
      }
    );
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

        assertStyleMatch({ padding: "15px" }, wrapper.find(GridItem).first());

        assertStyleMatch({ paddingLeft: "15px" }, wrapper.find(GridItem).at(1));

        assertStyleMatch(
          { paddingRight: "15px" },
          wrapper.find(GridItem).at(2)
        );
        assertStyleMatch({ paddingTop: "15px" }, wrapper.find(GridItem).at(3));

        assertStyleMatch(
          { paddingBottom: "15px" },
          wrapper.find(GridItem).at(4)
        );

        assertStyleMatch(
          {
            paddingLeft: "15px",
            paddingRight: "15px",
          },
          wrapper.find(GridItem).at(5)
        );

        assertStyleMatch(
          {
            paddingTop: "15px",
            paddingBottom: "15px",
          },
          wrapper.find(GridItem).at(6)
        );
      });
    });

    describe(`when a custom padding is specified as a number in responsiveSettings,
      using one of the styled system props`, () => {
      [...Array(12).keys()].forEach((prop) => {
        it("then the padding specified in a theme spacing should have been set on the GridItem", () => {
          const wrapper = enzymeMount(
            <GridContainer id="testContainer">
              <GridItem responsiveSettings={[{ p: prop, maxWidth: "1500px" }]}>
                1
              </GridItem>
              <GridItem responsiveSettings={[{ pl: prop, maxWidth: "1500px" }]}>
                2
              </GridItem>
              <GridItem responsiveSettings={[{ pr: prop, maxWidth: "1500px" }]}>
                3
              </GridItem>
              <GridItem responsiveSettings={[{ pt: prop, maxWidth: "1500px" }]}>
                4
              </GridItem>
              <GridItem responsiveSettings={[{ pb: prop, maxWidth: "1500px" }]}>
                5
              </GridItem>
            </GridContainer>
          );

          assertStyleMatch(
            { padding: getSpacing(prop) },
            wrapper.find(GridItem).first(),
            { media: "screen and (max-width:1500px)" }
          );

          assertStyleMatch(
            { paddingLeft: getSpacing(prop) },
            wrapper.find(GridItem).at(1),
            { media: "screen and (max-width:1500px)" }
          );

          assertStyleMatch(
            { paddingRight: getSpacing(prop) },
            wrapper.find(GridItem).at(2),
            { media: "screen and (max-width:1500px)" }
          );

          assertStyleMatch(
            { paddingTop: getSpacing(prop) },
            wrapper.find(GridItem).at(3),
            { media: "screen and (max-width:1500px)" }
          );

          assertStyleMatch(
            { paddingBottom: getSpacing(prop) },
            wrapper.find(GridItem).at(4),
            { media: "screen and (max-width:1500px)" }
          );
        });
      });
    });

    describe.each(gridItemProps)(
      "when a custom %s is specified using that styled system prop",
      (propName, propValue) => {
        it(`then the ${propName} attribute should have been set on the GridItem`, () => {
          const wrapper = enzymeMount(
            <GridContainer id="testContainer">
              <GridItem {...{ [propName]: propValue }}>1</GridItem>
              <GridItem>2</GridItem>
              <GridItem>3</GridItem>
            </GridContainer>
          );

          assertStyleMatch(
            { [propName]: propValue },
            wrapper.find(GridItem).at(0)
          );
        });
      }
    );
  });
});
