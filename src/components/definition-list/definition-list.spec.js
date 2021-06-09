import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import mintTheme from "../../style/themes/mint";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import { StyledDtDiv, StyledDdDiv } from "./definition-list.style";
import Dl from "./dl.component";
import Dt from "./dt.component";
import Dd from "./dd.component";

describe("DefinitionList", () => {
  let wrapper;

  const renderWrapper = (id, props, render = mount) => {
    const definitionObject = {
      Dl: (
        <Dl {...props}>
          <Dt>Foo</Dt>
          <Dd>Barr</Dd>
        </Dl>
      ),
      Dt: <Dt {...props}>Foo</Dt>,
      Dd: <Dd {...props}>Barr</Dd>,
    };

    return render(
      <ThemeProvider theme={mintTheme}>{definitionObject[id]}</ThemeProvider>
    );
  };

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
      null,
      (component) => component.find(Dt)
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
      null,
      (component) => component.find(Dd)
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
          true && {
            definition: "First",
            description: "1st Description",
          },
          false && {
            definition: "Second",
            description: "2nd Description",
          },
          true && {
            definition: "Third",
            description: "3rd Description",
          },
        ];

        wrapper = mount(
          <Dl>
            {definitions.map(
              (x) =>
                !!x && (
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
      wrapper = renderWrapper("Dl", {});
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
      wrapper = renderWrapper("Dt", {});
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          paddingRight: "24px",
          color: "rgba(0,0,0,0.9)",
          marginBottom: "16px",
        },
        wrapper
      );
    });

    it("matches the expected default styles of Dd", () => {
      wrapper = renderWrapper("Dd", {});
      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
          color: "rgba(0,0,0,0.65)",
          marginBottom: "16px",
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
          paddingRight: "16px",
          color: "rgba(0,0,0,0.9)",
          marginBottom: "8px",
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
          color: "rgba(0,0,0,0.65)",
          marginBottom: "8px",
          marginLeft: "0px",
        },
        wrapper
      );
    });

    it.each(["left", "center", "right"])(
      "matches the custom text alignments passed to Dl and Dd",
      (align) => {
        assertStyleMatch(
          {
            textAlign: `${align}`,
          },
          renderWrapper("Dl", { dtTextAlign: align, ddTextAlign: align }).find(
            StyledDtDiv,
            StyledDdDiv
          )
        );
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
});
