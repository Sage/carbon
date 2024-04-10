import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import MD5 from "crypto-js/md5";

import Profile from "./profile.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  ProfileNameStyle,
  ProfileEmailStyle,
  ProfileTextStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileStyle,
} from "./profile.style";
import {
  StyledCustomImg,
  StyledPortraitContainer,
  StyledPortraitInitials,
} from "../portrait/portrait.style";
import { StyledLink } from "../link/link.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

import profileConfigSizes, { ProfileSize } from "./profile.config";

describe("Profile", () => {
  let instance: ShallowWrapper | ReactWrapper;
  let loggerSpy: jest.SpyInstance | jest.Mock;

  beforeEach(() => {
    loggerSpy = jest.spyOn(console, "warn");
    instance = mount(<Profile />);
  });

  afterEach(() => {
    loggerSpy.mockRestore();
    instance.unmount();
  });

  afterAll(() => {
    loggerSpy.mockClear();
    jest.clearAllMocks();
  });

  describe("console warning", () => {
    const warningMessage =
      "[WARNING] The `email` or `text` prop should not be used without the `name` prop in `Profile`." +
      " Please use the `name` prop as well as `email` or `text`.";

    it("validates a warning is logged in the console once", () => {
      mount(
        <>
          <Profile email="john@doe.com" />
          <Profile text="Some other text about John here" />
        </>
      );

      expect(loggerSpy).toHaveBeenCalledWith(warningMessage);

      expect(loggerSpy).toHaveBeenCalledTimes(1);

      loggerSpy.mockRestore();
    });
  });

  describe("render", () => {
    beforeEach(() => {
      instance = shallow(<Profile />);
    });

    describe("classes", () => {
      it("returns the correct classes", () => {
        instance.setProps({ className: "foo" });
        expect(instance.hasClass("foo")).toBeTruthy();
      });
    });

    describe("initials", () => {
      it("calculates the correct initial when only a name is provided", () => {
        instance = shallow(<Profile name="John Doe" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual(
          "JD"
        );
      });

      it.each([
        ["John Doe", "JD"],
        ["John Dan Doe", "JDD"],
      ])(
        "calculates the correct initials when only a name is provided",
        (name, initials) => {
          instance = shallow(<Profile name={name} />);
          expect(instance.find(ProfileAvatarStyle).props().initials).toEqual(
            initials
          );
        }
      );

      it.each([
        "John David Daniel Doe",
        "John David Daniel Damien Doe",
        "John David Daniel Damien Dack Doe",
      ])(
        "calculates the correct maximum initials of three, when only a long name is provided",
        (name) => {
          instance = shallow(<Profile name={name} />);
          expect(instance.find(ProfileAvatarStyle).props().initials).toEqual(
            "JDD"
          );
        }
      );

      it("returns an empty initials string if no name is provided", () => {
        instance = shallow(<Profile name="" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual("");
      });

      it("returns an empty initials string if provided name has no identifiable word boundaries", () => {
        instance = shallow(<Profile name="!@£$%" />);
        expect(instance.find(ProfileAvatarStyle).props().initials).toEqual("");
      });
    });

    describe("text", () => {
      it("renders the name", () => {
        instance.setProps({ name: "John Doe" });
        expect(instance.find(ProfileNameStyle).text()).toEqual("John Doe");
      });

      it("renders the email", () => {
        instance.setProps({ name: "John Doe", email: "john@doe.com" });
        expect(instance.find(ProfileEmailStyle).text()).toEqual("john@doe.com");
      });

      it("renders the email as link component", () => {
        instance.setProps({ name: "John Doe", email: "john@doe.com" });
        expect(instance.find(StyledLink).children.length).toEqual(1);
      });

      it("renders email with a mailto href", () => {
        instance.setProps({ name: "John Doe", email: "john@doe.com" });
        expect(instance.find(ProfileEmailStyle).prop("href")).toBe(
          "mailto: john@doe.com"
        );
      });

      it("renders the readonly text", () => {
        instance.setProps({
          name: "John Doe",
          text: "Some other text about John here",
        });
        expect(instance.find(ProfileTextStyle).text()).toEqual(
          "Some other text about John here"
        );
      });

      it("just renders a portrait component, no other children when name, email or text props are not passed", () => {
        instance.setProps({ initials: "JD" });
        expect(instance.find(ProfileDetailsStyle).isEmptyRender()).toBe(true);
        instance = mount(<Profile initials="JD" />);
        expect(instance.find(StyledPortraitInitials).text()).toBe("JD");
      });
    });
  });

  describe("Profile Styles", () => {
    const wrapper = mount(
      <Profile
        name="John Doe"
        email="john@doe.com"
        text="Some other text about John here"
      />
    );

    it("applies expected styles to Profile container", () => {
      assertStyleMatch(
        {
          borderRadius: "inherit",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "row",
        },
        wrapper.find(ProfileStyle)
      );
    });

    it("applies expected styles to Portrait container", () => {
      assertStyleMatch(
        {
          flexShrink: "0",
        },
        wrapper.find(ProfileStyle),
        { modifier: `${StyledPortraitContainer}` }
      );
    });

    it("applies expected styles to Profile name", () => {
      assertStyleMatch(
        {
          fontWeight: "bold",
        },
        wrapper.find(ProfileNameStyle)
      );
    });

    it("applies expected styles to Profile Details", () => {
      assertStyleMatch(
        {
          verticalAlign: "middle",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
        wrapper.find(ProfileDetailsStyle)
      );
    });
  });

  describe.each(["XS", "S", "M", "ML", "L", "XL", "XXL"] as ProfileSize[])(
    "size style checks",
    (size) => {
      const wrapper = mount(
        <Profile
          name="John Doe"
          email="john@doe.com"
          text="Some other text about John here"
          size={size}
        />
      );

      it.each([profileConfigSizes[size].nameSize])(
        `name font size checks when size is ${size}`,
        (fontSize) => {
          assertStyleMatch(
            {
              fontSize,
            },
            wrapper.find(ProfileNameStyle)
          );
        }
      );

      it.each([profileConfigSizes[size].emailSize])(
        `email font size checks when size is ${size}`,
        (fontSize) => {
          assertStyleMatch(
            {
              fontSize,
            },
            wrapper.find(ProfileEmailStyle),
            { modifier: "a" }
          );
        }
      );

      it.each([profileConfigSizes[size].emailSize])(
        `text font size checks when size is ${size}`,
        (fontSize) => {
          assertStyleMatch(
            {
              fontSize,
            },
            wrapper.find(ProfileTextStyle)
          );
        }
      );

      it.each([profileConfigSizes[size].lineHeight])(
        `line height checks when size is ${size}`,
        (lineHeight) => {
          assertStyleMatch(
            {
              lineHeight,
            },
            wrapper.find(ProfileDetailsStyle)
          );
        }
      );

      it.each([profileConfigSizes[size].marginLeft])(
        `margin-left checks when size is ${size}`,
        (marginLeft) => {
          assertStyleMatch(
            {
              marginLeft,
            },
            wrapper.find(ProfileDetailsStyle)
          );
        }
      );
    }
  );

  describe("colour checks", () => {
    it("renders the correct colours when darkBackground is false", () => {
      const wrapper = mount(
        <Profile
          name="John Doe"
          email="john@doe.com"
          text="Some other text about John here"
        />
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin090)",
          backgroundColor: "transparent",
        },
        wrapper.find(ProfileStyle)
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMajor500)",
        },
        wrapper.find(ProfileEmailStyle),
        { modifier: "> a" }
      );
    });

    it("renders the correct colours when darkBackground is true", () => {
      const wrapper = mount(
        <Profile
          name="John Doe"
          email="john@doe.com"
          text="Some other text about John here"
          darkBackground
        />
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityReadOnly600)",
          backgroundColor: "var(--colorsUtilityYin090)",
        },
        wrapper.find(ProfileStyle)
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMajor350)",
        },
        wrapper.find(ProfileEmailStyle),
        { modifier: "a" }
      );
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <Profile
          data-element="bar"
          data-role="baz"
          email="bun"
          name="John Doe"
        />
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "profile", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = shallow(<Profile email="bun" name="John Doe" />);
      elementsTagTest(wrapper, ["email", "name"]);
    });
  });

  describe("src", () => {
    it('should render a user image when a "src" prop is provided', () => {
      const wrapper = shallow(
        <Profile
          initials="JD"
          src="https://example.com/example.jpg"
          email="john@doe.com"
          name="John Doe"
        />
      );
      expect(wrapper.find(ProfileAvatarStyle).props()["data-element"]).toEqual(
        "user-image"
      );
    });

    it("alt text on user image should be provided via alt prop", () => {
      const wrapper = mount(
        <Profile
          initials="JD"
          src="https://example.com/example.jpg"
          email="john@doe.com"
          name="John Doe"
          alt="John V Doe"
        />
      );
      expect(wrapper.find(StyledCustomImg).prop("alt")).toBe("John V Doe");
    });

    it("alt text on user image should be the name passed, if no alt prop is provided", () => {
      const wrapper = mount(
        <Profile
          src="https://example.com/example.jpg"
          email="john@doe.com"
          name="John Doe"
        />
      );
      expect(wrapper.find(StyledCustomImg).prop("alt")).toEqual("John Doe");
    });
  });

  describe("gravatar", () => {
    const gravatarEmail = "chris.barber@sage.com";
    const base = "https://www.gravatar.com/avatar/";
    const hash = MD5(gravatarEmail);
    const dimensions = 40;
    const expectedSrc = `${base}${hash}?s=${dimensions}&d=404`;

    it("should render a gravatar if passed email matches gravatar account", () => {
      const wrapper = mount(
        <Profile email={gravatarEmail} name="Chris Barber" />
      );

      expect(wrapper.find("img").prop("src")).toEqual(expectedSrc);
    });

    it("alt text on gravatar should be provided via alt prop", () => {
      const wrapper = mount(
        <Profile
          email="chris.barber@sage.com"
          name="Chris Barber"
          alt="Mr Chris Barber"
        />
      );

      expect(wrapper.find("img").prop("alt")).toEqual("Mr Chris Barber");
    });

    it("alt text on user image should be the name passed if no alt prop is provided", () => {
      const wrapper = mount(
        <Profile email="chris.barber@sage.com" name="Chris Barber" />
      );

      expect(wrapper.find("img").prop("alt")).toEqual("Chris Barber");
    });
  });

  describe("styled-system", () => {
    testStyledSystemMargin((props) => (
      <Profile name="profile" email="foo" {...props} />
    ));
  });
});
