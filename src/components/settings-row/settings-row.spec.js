import React from "react";
import { shallow, mount } from "enzyme";

import SettingsRow from ".";

import {
  StyledSettingsRow,
  StyledSettingsRowInput,
} from "./settings-row.style";
import Heading from "../heading";
import { rootTagTest } from "../../utils/helpers/tags/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";

describe("SettingsRow", () => {
  describe("render", () => {
    const name = "foobar-row";
    const title = "Some Title";
    const childId = "my_child";
    const children = <span id={childId} />;
    let wrapper = shallow(
      <SettingsRow className={name} title={title}>
        {children}
      </SettingsRow>
    );

    it("renders a Heading with a title and separator but no divider", () => {
      const head = wrapper.find(Heading);

      expect(head.length).toEqual(1);
      expect(head.prop("title")).toEqual(title);
      expect(head.prop("separator")).toBeFalsy();
      expect(head.prop("divider")).toBeFalsy();
    });

    it("renders children in the input column", () => {
      expect(
        wrapper.find(StyledSettingsRowInput).contains(children)
      ).toBeTruthy();
    });

    describe("when divider property is true", () => {
      it("adds border to the component", () => {
        wrapper = mount(<SettingsRow title={title} divider />);

        assertStyleMatch(
          {
            borderBottom: `1px solid ${baseTheme.palette.slateTint(90)}`,
            paddingBottom: "30px",
          },
          wrapper.find(StyledSettingsRow)
        );
      });
    });

    describe("when description is provided", () => {
      const description = <span>Some descriptive text</span>;
      let head;

      beforeEach(() => {
        wrapper = shallow(
          <SettingsRow title={title} description={description} />
        );
        head = wrapper.find(Heading);
      });

      it("passes description as subheader", () => {
        expect(head.prop("subheader")).toEqual(description);
      });

      it("passes true as separator prop", () => {
        expect(head.prop("separator")).toBeTruthy();
      });
    });

    describe("when title is not provided", () => {
      it("does not render a header", () => {
        wrapper = shallow(
          <SettingsRow className={name}>{children}</SettingsRow>
        );

        expect(wrapper.find(Heading).length).toEqual(0);
      });
    });
  });

  describe("tags on component", () => {
    const wrapper = shallow(<SettingsRow data-element="bar" data-role="baz" />);

    it("include correct component, element and role data tags", () => {
      rootTagTest(wrapper, "settings-row", "bar", "baz");
    });
  });
});
