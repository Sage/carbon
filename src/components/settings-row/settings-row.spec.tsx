import React from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import SettingsRow from ".";
import {
  StyledSettingsRow,
  StyledSettingsRowInput,
} from "./settings-row.style";
import Heading, { HeadingType } from "../heading";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

describe("SettingsRow", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  testStyledSystemMargin((props) => <SettingsRow {...props} />, {
    m: "0",
  });

  describe("render", () => {
    const name = "foobar-row";
    const title = "Some Title";
    const description = <span>Some descriptive text</span>;
    const childId = "my_child";
    const children = <span id={childId} />;
    let wrapper: ReactWrapper | ShallowWrapper;

    wrapper = shallow(
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
            borderBottom: "1px solid var(--colorsUtilityMajor050)",
            paddingBottom: "30px",
          },
          wrapper.find(StyledSettingsRow)
        );
      });
    });

    describe("when description is provided", () => {
      let head: ShallowWrapper;

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

    describe("when headingType prop is provided", () => {
      it.each<HeadingType>(["h1", "h2", "h3", "h4", "h5"])(
        "HTML heading element is correct when headingType is %s",
        (headingType) => {
          wrapper = mount(
            <SettingsRow
              headingType={headingType}
              title={title}
              description={description}
            >
              Content for settings
            </SettingsRow>
          );

          expect(wrapper.find(headingType).text()).toBe(title);
        }
      );
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
