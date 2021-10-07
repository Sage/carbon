import React from "react";
import { ThemeProvider } from "styled-components";
import { mount, shallow } from "enzyme";
import mintTheme from "../../style/themes/mint";
import Content from "./content.component.js";
import {
  StyledContent,
  StyledContentTitle,
  StyledContentBody,
} from "./content.style.js";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";

describe("Content", () => {
  let wrapper;

  const renderWrapper = (props, render = mount) => {
    return render(
      <ThemeProvider theme={mintTheme}>
        <Content {...props}>Foo</Content>
      </ThemeProvider>
    );
  };

  testStyledSystemMargin((props) => <Content {...props}>Foo</Content>);

  describe("render", () => {
    it("renders a title", () => {
      wrapper = renderWrapper();
      expect(wrapper.find(StyledContentTitle).exists()).toBe(true);
    });

    it("renders a custom title", () => {
      wrapper = renderWrapper({
        title: <span>Title</span>,
      });
      expect(wrapper.find("span").text()).toBe("Title");
    });

    it("renders a body", () => {
      wrapper = renderWrapper();
      expect(wrapper.find(StyledContentBody).exists()).toBe(true);
    });
  });

  describe("styles", () => {
    describe("renders correct styles for the Content component", () => {
      it("if there is more than one Content component next to each other", () => {
        wrapper = renderWrapper();
        assertStyleMatch(
          {
            marginTop: "15px",
          },
          wrapper,
          { modifier: `& + ${StyledContent}` }
        );
      });

      it.each([
        ["center", "center"],
        ["right", "right"],
        ["left", "left"],
      ])(" if prop is `%s`", (a, exptected) => {
        wrapper = renderWrapper({ align: a });
        assertStyleMatch(
          {
            textAlign: exptected,
          },
          wrapper
        );
      });

      it("if there is prop align ", () => {
        wrapper = renderWrapper();
        assertStyleMatch(
          {
            marginTop: "15px",
          },
          wrapper,
          { modifier: `& + ${StyledContent}` }
        );
      });

      it("if there is prop `inline` used along with `bodyFullWidth`", () => {
        wrapper = renderWrapper({ inline: true, bodyFullWidth: true });
        assertStyleMatch(
          {
            marginTop: "15px",
          },
          wrapper.find(StyledContentBody)
        );
      });
    });

    describe("renders correct styles for title", () => {
      it("as default", () => {
        wrapper = renderWrapper();
        assertStyleMatch(
          {
            display: "block",
            fontWeight: "bold",
            color: baseTheme.text.colors,
          },
          wrapper.find(StyledContentTitle)
        );
      });

      it("if `titleWidth` is 50", () => {
        wrapper = renderWrapper({ titleWidth: "50" });
        assertStyleMatch(
          {
            width: "calc(50% - 30px)",
          },
          wrapper.find(StyledContentTitle)
        );
      });

      it("if prop `inline` is false and prop `align` is center", () => {
        wrapper = renderWrapper({ inline: false, align: "center" });
        assertStyleMatch(
          {
            textAlign: "center",
          },
          wrapper.find(StyledContentTitle)
        );
      });

      it("if prop `variant` is `secondary` and prop `align` is center", () => {
        wrapper = renderWrapper({ variant: "secondary" });
        assertStyleMatch(
          {
            color: baseTheme.content.secondaryColor,
            fontWeight: "normal",
          },
          wrapper.find(StyledContentTitle)
        );
      });

      it("if prop `inline` is true and prop `align` is center", () => {
        wrapper = renderWrapper({ inline: true, align: "center" });
        assertStyleMatch(
          {
            textAlign: "right",
            width: "calc(50% - 30px)",
          },
          wrapper.find(StyledContentTitle)
        );
      });
    });

    describe("render correct styles for body", () => {
      it("as default", () => {
        wrapper = renderWrapper();
        assertStyleMatch(
          {
            display: "block",
            marginTop: "2px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          },
          wrapper.find(StyledContentBody)
        );
      });

      it("if prop `inline` is true", () => {
        wrapper = renderWrapper({ inline: true });
        assertStyleMatch(
          {
            display: "inline-block",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            marginTop: "0",
            marginLeft: "30px",
            textAlign: "left",
          },
          wrapper.find(StyledContentBody)
        );
      });

      it("if prop `align` is center and prop `inline` is true", () => {
        wrapper = renderWrapper({ inline: true, align: "center" });
        assertStyleMatch(
          {
            width: "50%",
          },
          wrapper.find(StyledContentBody)
        );
      });

      it("if prop `bodyFullWidth` is true", () => {
        wrapper = renderWrapper({ bodyFullWidth: true });
        assertStyleMatch(
          {
            width: "100%",
          },
          wrapper.find(StyledContentBody)
        );
      });

      it("if prop `titleWidth` is 90", () => {
        wrapper = renderWrapper({ titleWidth: "90" });
        assertStyleMatch(
          {
            width: "10%",
          },
          wrapper.find(StyledContentBody)
        );
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        wrapper = shallow(
          <Content data-element="bar" data-role="baz">
            <div />
          </Content>
        );
        rootTagTest(wrapper, "content", "bar", "baz");
      });
    });
  });
});
