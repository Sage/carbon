import React from "react";
import { shallow, mount } from "enzyme";
import Fieldset, { FieldsetProps } from "./fieldset.component";
import Textbox from "../textbox";
import { LegendContainerStyle, FieldsetContentStyle } from "./fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { noThemeSnapshot } from "../../__spec_helper__/enzyme-snapshot-helper";

function render(props: FieldsetProps = {}, renderer = shallow) {
  return renderer(
    <Fieldset {...props}>
      <Textbox />
    </Fieldset>
  );
}

const basicWrapper = render();

describe("Fieldset", () => {
  testStyledSystemMargin((props) => (
    <Fieldset {...props}>
      <Textbox />
    </Fieldset>
  ));

  it("renders correctly", () => {
    expect(noThemeSnapshot(basicWrapper)).toMatchSnapshot();
  });

  describe("Fieldset Legend", () => {
    it("is rendered if supplied", () => {
      const wrapper = render({ legend: "Legend" });
      expect(wrapper.find(LegendContainerStyle).exists()).toEqual(true);
    });

    it("is not rendered if omited", () => {
      expect(basicWrapper.find(LegendContainerStyle).exists()).toEqual(false);
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
});
