import React from "react";
import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Profile from "./profile.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";
import Browser from "../../utils/helpers/browser";
import {
  ProfileNameStyle,
  ProfileEmailStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
} from "./profile.style";

import { assertStyleMatch } from "../../__spec_helper__/test-utils";

describe("Profile", () => {
  let instance;
  const fillRectFn = jest.fn();
  const fillTextFn = jest.fn();

  beforeAll(() => {
    spyOn(Browser, "getDocument").and.returnValue({
      createElement: () => {
        return {
          getContext: () => {
            return {
              font: null,
              textAlign: null,
              fillStyle: null,
              fillRect: fillRectFn,
              fillText: fillTextFn,
            };
          },
          width: 10,
          height: 10,
          toDataURL: () => {
            return "data:image/png";
          },
        };
      },
    });
  });

  describe("render", () => {
    beforeEach(() => {
      instance = shallow(
        <Profile name="Foo" email="foo@bar.com" initials="FB" />
      );
    });

    describe("classes", () => {
      it("returns the correct classes", () => {
        instance.setProps({ className: "foo" });
        expect(instance.hasClass("foo")).toBeTruthy();
      });

      it("renders the large class if applied", () => {
        instance = TestRenderer.create(
          <Profile name="Foo" email="foo@bar.com" initials="FB" large />
        );

        expect(instance).toMatchSnapshot();
      });
    });

    describe("initials", () => {
      it("calculates the initials when not provided", () => {
        instance = TestUtils.renderIntoDocument(
          <Profile name="Foo Bar Baz" email="foo@bar.com" />
        );
        expect(instance.initials).toEqual("FBB");
      });
    });

    describe("text", () => {
      it("renders the name", () => {
        instance.setProps({ name: "test name" });
        expect(instance.find(ProfileNameStyle).text()).toEqual("test name");
      });

      it("renders the email", () => {
        instance.setProps({ email: "john@doe.com" });
        expect(instance.find(ProfileEmailStyle).text()).toEqual("john@doe.com");
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <Profile data-element="bar" data-role="baz" email="bun" name="dy" />
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "profile", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = shallow(<Profile email="bun" name="dy" />);
      elementsTagTest(wrapper, ["email", "name"]);
    });
  });
});

describe("ProfileAvatarStyle", () => {
  it('should render a user image when a "src" prop is provided', () => {
    const wrapper = shallow(
      <Profile initials="AS" src="Foo" email="foo" name="foo" />
    );
    expect(wrapper.find(ProfileAvatarStyle).props()["data-element"]).toEqual(
      "user-image"
    );
  });
});

describe("ProfileDetailStyle", () => {
  describe.each([
    ["XS", "1px"],
    ["S", "1px"],
    ["M", "4px"],
    ["ML", "8px"],
    ["L", "14px"],
    ["XL", "24px"],
    ["XXL", "32px"],
  ])("when a src prop is passed and the size is %s", (size, margin) => {
    it("renders the expected styles", () => {
      const wrapper = mount(
        <Profile initials="AS" size={size} src="Foo" email="foo" name="foo" />
      );
      assertStyleMatch(
        {
          marginTop: margin,
        },
        wrapper.find(ProfileDetailsStyle)
      );
    });
  });
});
