import React from "react";
import "jest-styled-components";
import { css } from "styled-components";
import { shallow, mount } from "enzyme";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";
import {
  LegendContainerStyle,
  FieldsetStyle,
  FieldsetContentStyle,
} from "./fieldset.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import classicTheme from "../../../style/themes/classic";

function render(props, renderer = shallow) {
  return renderer(
    <Fieldset {...props}>
      <Textbox />
    </Fieldset>
  );
}

const basicWrapper = render();

describe("Fieldset", () => {
  it("renders correctly", () => {
    expect(basicWrapper).toMatchSnapshot();
  });

  describe("Fieldset Legend", () => {
    it("is rendered if supplied", () => {
      const wrapper = render({ legend: "Legend" });
      expect(wrapper.find(LegendContainerStyle).exists()).toEqual(true);
    });

    it("is not rendered if omited", () => {
      expect(basicWrapper.find(LegendContainerStyle).exists()).toEqual(false);
    });

    it("applies classic theme styling", () => {
      assertStyleMatch(
        {
          color: "#003349",
          fontSize: "14px",
          fontWeight: "bold",
          lineHeight: "14px",
          padding: "0 6px",
        },
        mount(<LegendContainerStyle theme={classicTheme} />),
        { modifier: css`legend` }
      );
    });

    it("applies the correct inline styles", () => {
      assertStyleMatch(
        {
          marginRight: "32px",
          height: "34px !important",
        },
        mount(<LegendContainerStyle inline />)
      );
    });
  });

  describe("Fieldset FieldsetContentStyle", () => {
    it("is rendered if supplied", () => {
      const wrapper = render({ inline: true });
      expect(wrapper.find(FieldsetContentStyle).get(0).props.inline).toEqual(
        true
      );
    });

    it("is not rendered if omited", () => {
      expect(
        basicWrapper.find(FieldsetContentStyle).get(0).props.inline
      ).toEqual(false);
    });

    it("applies the correct inline styles", () => {
      assertStyleMatch(
        {
          display: "flex",
        },
        mount(<FieldsetContentStyle inline />)
      );
    });
  });

  describe("style overrides", () => {
    let wrapper;
    const customStyleObject = {
      backgroundColor: "red",
      display: "flex",
      fontSize: "200px",
    };
    const styleOverride = {
      root: customStyleObject,
      legend: customStyleObject,
    };

    beforeEach(() => {
      wrapper = render({ styleOverride, legend: "Legend" }, mount);
    });

    it("renders root element with properly assigned styles", () => {
      assertStyleMatch(customStyleObject, wrapper.find(FieldsetStyle));
    });

    it("renders legend element with properly assigned styles", () => {
      assertStyleMatch(customStyleObject, wrapper.find(LegendContainerStyle));
    });
  });
});
