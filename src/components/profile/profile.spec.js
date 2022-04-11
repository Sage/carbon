import React from "react";
import { shallow, mount } from "enzyme";

import Profile from "./profile.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";
import Browser from "../../__internal__/utils/helpers/browser";
import {
  ProfileNameStyle,
  ProfileEmailStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
} from "./profile.style";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

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
    });

    describe("initials", () => {
      it("calculates the initials when not provided", () => {
        instance = shallow(<Profile name="Foo Bar Baz" email="foo@bar.com" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual(
          "FBB"
        );
      });

      it("returns empty string when name is an empty string", () => {
        instance = shallow(<Profile name="" email="foo@bar.com" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual("");
      });

      it("returns empty string when name is a space", () => {
        instance = shallow(<Profile name=" " email="foo@bar.com" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual("");
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
    ["XS", "1px", "Xs"],
    ["S", "1px", "S"],
    ["M", "4px", "M"],
    ["ML", "8px", "Ml"],
    ["L", "14px", "L"],
    ["XL", "24px", "Xl"],
    ["XXL", "32px", "Xxl"],
  ])(
    "when a src prop is passed and the size is %s",
    (size, margin, fontSize) => {
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

        assertStyleMatch(
          {
            font: `var(--typographyProfileEmail${fontSize})`,
          },
          wrapper.find(ProfileEmailStyle)
        );

        assertStyleMatch(
          {
            font: `var(--typographyProfileName${fontSize})`,
          },
          wrapper.find(ProfileNameStyle)
        );
      });
    }
  );
});

describe("styled-system", () => {
  testStyledSystemMargin((props) => (
    <Profile name="profile" email="foo" {...props} />
  ));
});
