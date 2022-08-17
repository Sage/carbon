import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "styled-components";
import mintTheme from "../../style/themes/mint";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import {
  StyledDl,
  StyledDt,
  StyledDtDiv,
  StyledDdDiv,
  ElementAlignment,
} from "./definition-list.style";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt.component";
import Dd from "./dd.component";
import DlContext from "./__internal__/dl.context";

type nodeType = "Dl" | "Dt" | "Dd";

const renderWrapper = (
  id: nodeType,
  props: Partial<DlProps> = {},
  render = mount
) => {
  const { asSingleColumn } = props;

  const definitionObject = {
    Dl: (
      <Dl {...props}>
        <Dt>Foo</Dt>
        <Dd>Barr</Dd>
      </Dl>
    ),
    Dt: asSingleColumn ? (
      <DlContext.Provider value={{ asSingleColumn: true }}>
        <Dt {...props}>Foo</Dt>
      </DlContext.Provider>
    ) : (
      <Dt {...props}>Foo</Dt>
    ),
    Dd: <Dd {...props}>Barr</Dd>,
  };

  return render(
    <ThemeProvider theme={mintTheme}>{definitionObject[id]}</ThemeProvider>
  );
};

describe("DefinitionList", () => {
  let wrapper: ReactWrapper;

  testStyledSystemSpacing((props) => (
    <ThemeProvider theme={mintTheme}>
      <Dl {...props}>
        <Dt>Description</Dt>
        <Dd>This is a test</Dd>
      </Dl>
    </ThemeProvider>
  ));

  describe("dt", () => {
    testStyledSystemSpacing(
      (props) => (
        <ThemeProvider theme={mintTheme}>
          <Dl>
            <Dt {...props}>Description</Dt>
            <Dd>This is a test</Dd>
          </Dl>
        </ThemeProvider>
      ),
      undefined,
      (component: ReactWrapper) =>
        (component.find(Dt) as unknown) as ReactWrapper
    );
  });

  describe("dd", () => {
    testStyledSystemSpacing(
      (props) => (
        <ThemeProvider theme={mintTheme}>
          <Dl>
            <Dt>Description</Dt>
            <Dd {...props}>This is a test</Dd>
          </Dl>
        </ThemeProvider>
      ),
      undefined,
      (component) => (component.find(Dd) as unknown) as ReactWrapper
    );
  });

  describe("if composed with React Fragment", () => {
    it("should render correctly", () => {
      wrapper = mount(
        <Dl>
          <Dt>Title</Dt>
          <Dd>Description</Dd>
          <>
            <Dt>Title inside of React Fragment</Dt>
            <Dd>Description inside of React Fragment</Dd>
          </>
        </Dl>
      );

      expect(wrapper.find(Dt).length).toEqual(2);
      expect(wrapper.find(Dd).length).toEqual(2);
    });
  });

  describe("with conditionally rendered children", () => {
    describe("with inline definitions", () => {
      it("should render the correct amount of list items", () => {
        wrapper = mount(
          <Dl>
            {true && (
              <>
                <Dt>First</Dt>
                <Dd>1st Description</Dd>
              </>
            )}
            {false && (
              <>
                <Dt>Second</Dt>
                <Dd>2nd Description</Dd>
              </>
            )}
            {true && (
              <>
                <Dt>Third</Dt>
                <Dd>3rd Description</Dd>
              </>
            )}
          </Dl>
        );

        expect(wrapper.find(Dt).length).toEqual(2);
        expect(wrapper.find(Dd).length).toEqual(2);
      });
    });

    describe("when mapping from an object", () => {
      it("should render the correct amount of list items", () => {
        const definitions = [
          {
            definition: "First",
            description: "1st Description",
          },
          undefined,
          {
            definition: "Third",
            description: "3rd Description",
          },
        ];

        wrapper = mount(
          <Dl>
            {definitions.map(
              (x) =>
                x && (
                  <React.Fragment key={x.definition}>
                    <Dt>{x.definition}</Dt>
                    <Dd>{x.description}</Dd>
                  </React.Fragment>
                )
            )}
          </Dl>
        );

        expect(wrapper.find(Dt).length).toEqual(2);
        expect(wrapper.find(Dd).length).toEqual(2);
      });
    });
  });

  describe("styles", () => {
    it("matches the expected default styles of Dl", () => {
      wrapper = renderWrapper("Dl");
      assertStyleMatch(
        {
          display: "grid",
          height: "auto",
          width: "100%",
          backgroundColor: "transparent",
          gridTemplateRows: "auto",
          gridTemplateColumns: "50% auto",
        },
        wrapper
      );
    });

    it("matches the expected default styles of Dt", () => {
      wrapper = renderWrapper("Dt");
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          color: "var(--colorsUtilityYin090)",
        },
        wrapper
      );

      assertStyleMatch(
        {
          paddingRight: "var(--spacing300)",
          marginBottom: "var(--spacing200)",
        },
        wrapper.find(StyledDt)
      );
    });

    it("matches the expected default styles of Dd", () => {
      wrapper = renderWrapper("Dd");
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          color: "var(--colorsUtilityYin065)",
          marginBottom: "var(--spacing200)",
          marginLeft: "0px",
        },
        wrapper
      );
    });

    it("matches the custom styles applied to Dl", () => {
      wrapper = renderWrapper("Dl", { w: 45 });
      assertStyleMatch(
        {
          gridTemplateColumns: "45% auto",
        },
        wrapper
      );
    });

    it("matches the custom styles applied to Dt", () => {
      wrapper = renderWrapper("Dt", { mb: 1, pr: 2 });
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          paddingRight: "var(--spacing200)",
          color: "var(--colorsUtilityYin090)",
          marginBottom: "var(--spacing100)",
        },
        wrapper
      );
    });

    it("matches the custom styles applied to Dd", () => {
      wrapper = renderWrapper("Dd", { mb: 1 });
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          color: "var(--colorsUtilityYin065)",
          marginBottom: "var(--spacing100)",
          marginLeft: "0px",
        },
        wrapper
      );
    });

    describe.each(["left", "center", "right"] as ElementAlignment[])(
      "when the align prop is set to %s",
      (align) => {
        it("matches the custom text alignments passed to Dt", () => {
          assertStyleMatch(
            {
              textAlign: `${align}`,
            },
            renderWrapper("Dl", {
              dtTextAlign: align,
              ddTextAlign: align,
            }).find(StyledDtDiv)
          );
        });

        it("matches the custom text alignments passed to Dd", () => {
          assertStyleMatch(
            {
              textAlign: `${align}`,
            },
            renderWrapper("Dl", {
              dtTextAlign: align,
              ddTextAlign: align,
            }).find(StyledDdDiv)
          );
        });
      }
    );
  });

  describe("Children of Dl", () => {
    beforeEach(() => {
      wrapper = renderWrapper("Dl", {});
    });
    it("should contain dt", () => {
      expect(wrapper.find(StyledDtDiv).props().children.type).toEqual(Dt);
    });

    it("should contain dd", () => {
      expect(wrapper.find(StyledDdDiv).props().children.length).toEqual(1);
    });
  });

  describe("asSingleColumn", () => {
    it("applies the expected styling to Dl", () => {
      wrapper = renderWrapper("Dl", { asSingleColumn: true });

      assertStyleMatch(
        {
          lineHeight: "21px",
        },
        wrapper.find(StyledDl)
      );
    });

    it("applies the expected styling to Dt", () => {
      wrapper = renderWrapper("Dt", { asSingleColumn: true });

      assertStyleMatch(
        {
          marginBottom: undefined,
          paddingRight: undefined,
        },
        wrapper.find(StyledDt)
      );
    });

    it("applies the expected spacing when mb and pr props are passed to Dt", () => {
      wrapper = renderWrapper("Dt", { asSingleColumn: true, mb: 3, pr: 5 });

      assertStyleMatch(
        {
          marginBottom: "var(--spacing300)",
          paddingRight: "var(--spacing500)",
        },
        wrapper.find(StyledDt)
      );
    });
  });
});
