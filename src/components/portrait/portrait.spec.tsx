import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { shallow, mount, EnzymePropSelector } from "enzyme";
import { ThemeProvider } from "styled-components";
import MD5 from "crypto-js/md5";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import Portrait, { PortraitSizes } from "./portrait.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  StyledIcon,
  StyledCustomImg,
  StyledPortraitContainer,
  StyledPortraitInitials,
  StyledPortraitGravatar,
} from "./portrait.style";
import profileConfigSizes, { ProfileSize } from "../profile/profile.config";
import Tooltip from "../tooltip";
import CarbonProvider from "../carbon-provider";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";
import { sageTheme } from "../../style/themes";

function renderDLS(element: JSX.Element) {
  return mount(<ThemeProvider theme={sageTheme}>{element}</ThemeProvider>);
}

function renderFindTypeSuccess(
  element: JSX.Element,
  type: EnzymePropSelector,
  expectedProps: Record<string, unknown>
) {
  expect(renderDLS(element).find(type).props()).toMatchObject(expectedProps);
}

function renderFindTypeFail(element: JSX.Element, type: EnzymePropSelector) {
  expect(renderDLS(element).find(type)).toHaveLength(0);
}

describe("PortraitComponent", () => {
  testStyledSystemMargin((props) => <Portrait {...props} />);

  describe("Portrait styles", () => {
    it("applies expected styles to Portrait container", () => {
      const wrapper = mount(
        <Portrait shape="circle" initials="AB" darkBackground={false} />
      );

      assertStyleMatch(
        {
          overflow: "hidden",
          border: "1px solid var(--colorsUtilityReadOnly600)",
          display: "inline-block",
        },
        wrapper.find(StyledPortraitContainer)
      );
    });

    it("applies expected styles to Portrait with initials", () => {
      const wrapper = mount(
        <Portrait shape="circle" initials="AB" darkBackground={false} />
      );

      assertStyleMatch(
        {
          fontWeight: "bold",
          display: "flex",
          whiteSpace: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          height: "inherit",
          width: "inherit",
        },
        wrapper.find(StyledPortraitInitials)
      );
    });

    it("applies expected styles to Portrait with src", () => {
      const wrapper = mount(
        <Portrait
          shape="circle"
          src="https://example.com/example.jpg"
          darkBackground={false}
        />
      );

      assertStyleMatch(
        {
          height: "inherit",
          width: "inherit",
        },
        wrapper.find(StyledCustomImg)
      );
    });

    it("applies expected styles to Portrait with gravatar", () => {
      const wrapper = mount(
        <Portrait
          shape="circle"
          gravatar="chris.barber@sage.com"
          darkBackground={false}
        />
      );

      assertStyleMatch(
        {
          width: "inherit",
          height: "inherit",
        },
        wrapper.find(StyledPortraitGravatar)
      );
    });

    it("applies expected styling to Portrait with icon", () => {
      const wrapper = mount(
        <Portrait shape="square" darkBackground={false} iconType="image" />
      );

      assertStyleMatch(
        {
          color: "inherit",
          height: "inherit",
          width: "inherit",
        },
        wrapper.find(StyledIcon),
        { modifier: "&&" }
      );
    });
  });

  describe.each(["XS", "S", "M", "ML", "L", "XL", "XXL"] as PortraitSizes[])(
    "size style checks - with icon",
    (size) => {
      const wrapper = mount(<Portrait size={size} />);

      it.each([PORTRAIT_SIZE_PARAMS[size].iconDimensions])(
        `icon font size checks when size is ${size}`,
        (iconDimensions) => {
          assertStyleMatch(
            {
              fontSize: `${iconDimensions}px`,
            },
            wrapper.find(StyledIcon),
            { modifier: "&&::before" }
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `width checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              width: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `height checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              height: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );
    }
  );

  describe.each(["XS", "S", "M", "ML", "L", "XL", "XXL"] as ProfileSize[])(
    "size style checks - with initials",
    (size) => {
      const wrapper = mount(<Portrait initials="TD" size={size} />);

      it.each([profileConfigSizes[size].initialSize])(
        `initials font size checks when size is ${size}`,
        (initialSize) => {
          assertStyleMatch(
            {
              fontSize: initialSize,
            },
            wrapper.find(StyledPortraitInitials)
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `width checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              width: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `height checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              height: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );
    }
  );

  describe.each(["XS", "S", "M", "ML", "L", "XL", "XXL"] as PortraitSizes[])(
    "size style checks - with src",
    (size) => {
      const wrapper = mount(
        <Portrait src="https://example.com/example.jpg" size={size} />
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `width checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              width: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `height checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              height: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );
    }
  );

  describe.each(["XS", "S", "M", "ML", "L", "XL", "XXL"] as PortraitSizes[])(
    "size style checks - with gravatar",
    (size) => {
      const wrapper = mount(
        <Portrait gravatar="chris.barber@sage.com" size={size} />
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `width checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              width: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );

      it.each([PORTRAIT_SIZE_PARAMS[size].dimensions])(
        `height checks when size is ${size}`,
        (dimensions) => {
          assertStyleMatch(
            {
              height: `${dimensions}px`,
            },
            wrapper.find(StyledPortraitContainer)
          );
        }
      );
    }
  );

  describe("colour checks - initials", () => {
    it("renders the correct colours when darkBackground is false", () => {
      const wrapper = mount(<Portrait initials="JD" />);

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin090)",
          backgroundColor: "var(--colorsUtilityReadOnly400)",
        },
        wrapper.find(StyledPortraitContainer)
      );
    });

    it("renders the correct colours when darkBackground is true", () => {
      const wrapper = mount(<Portrait initials="JD" darkBackground />);

      assertStyleMatch(
        {
          color: "var(--colorsUtilityReadOnly600)",
          backgroundColor: "var(--colorsUtilityYin090)",
        },
        wrapper.find(StyledPortraitContainer)
      );
    });
  });

  describe("colour checks - icon", () => {
    it("renders the correct colours when darkBackground is false", () => {
      const wrapper = mount(<Portrait />);

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin090)",
          backgroundColor: "var(--colorsUtilityReadOnly400)",
        },
        wrapper.find(StyledPortraitContainer)
      );
    });

    it("renders the correct colours when darkBackground is true", () => {
      const wrapper = mount(<Portrait darkBackground />);

      assertStyleMatch(
        {
          color: "var(--colorsUtilityReadOnly600)",
          backgroundColor: "var(--colorsUtilityYin090)",
        },
        wrapper.find(StyledPortraitContainer)
      );
    });
  });

  describe("render icon", () => {
    const testFail = (element: JSX.Element) =>
      renderFindTypeFail(element, StyledIcon);

    it("renders icon when not supplied with Gravatar or src or initials", () => {
      const wrapper = mount(
        <Portrait size="XXL" shape="square" darkBackground={false} />
      );
      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({ type: "individual", size: "XXL" })
      );
    });

    it("renders specified icon when not supplied with Gravatar, src or initials", () => {
      const wrapper = mount(
        <Portrait size="XXL" shape="square" darkBackground iconType="image" />
      );
      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({ type: "image", size: "XXL" })
      );
    });

    it("doesn't render icon when supplied with src", () => {
      testFail(<Portrait src="https://example.com/example.jpg" />);
    });

    it("doesn't render icon when supplied with initials", () => {
      testFail(<Portrait initials="AB" />);
    });

    it("doesn't render icon when supplied with src and initials", () => {
      testFail(
        <Portrait src="https://example.com/example.jpg" initials="AB" />
      );
    });

    it("doesn't render icon when supplied with Gravatar and initials", () => {
      testFail(<Portrait gravatar="example@example.com" initials="AB" />);
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait
            size="XXL"
            shape="square"
            darkBackground={false}
            onClick={onClickFn}
          />
        );

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait size="L" darkBackground={false} onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render initials", () => {
    const expectedProps = {
      children: "AB",
      size: "M",
    };

    const testSuccess = (element: JSX.Element) =>
      renderFindTypeSuccess(element, StyledPortraitInitials, expectedProps);
    const testFail = (element: JSX.Element) =>
      renderFindTypeFail(element, StyledPortraitInitials);

    it("renders initials when supplied with initials but no Gravatar or src", () => {
      testSuccess(<Portrait initials="AB" />);
    });

    it("doesn't render initials when supplied with src", () => {
      testFail(<Portrait src="https://example.com/example.jpg" />);
    });

    it("doesn't render initials when supplied with Gravatar and empty initials but no src", () => {
      testFail(<Portrait gravatar="example@example.com" initials="" />);
    });

    it("can render the DLS theme", () => {
      jest.spyOn(console, "error");
      const props = {
        size: "XXL",
        initials: "AB",
        darkBackground: false,
        theme: sageTheme,
      } as const;
      renderDLS(<Portrait {...props} />);
      renderDLS(<Portrait {...props} darkBackground />);
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(<Portrait initials="AB" onClick={onClickFn} />);

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(<Portrait initials="AB" onClick={onClickFn} />);
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render Gravatar", () => {
    const gravatarEmail = "example@example.com";
    const base = "https://www.gravatar.com/avatar/";
    const hash = MD5(gravatarEmail);
    const dimensions = 40;
    const expectedSrc = `${base}${hash}?s=${dimensions}&d=404`;

    const expectedProps = {
      src: expectedSrc,
      alt: "foo",
    };

    const testSuccess = (element: JSX.Element) =>
      renderFindTypeSuccess(element, StyledPortraitGravatar, expectedProps);

    it("renders the Gravatar for the specified email address", () => {
      testSuccess(<Portrait gravatar={gravatarEmail} alt="foo" />);
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait gravatar={gravatarEmail} alt="foo" onClick={onClickFn} />
        );

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait gravatar={gravatarEmail} alt="foo" onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render custom image", () => {
    const imageUrl = "https://example.com/example.jpg";

    const testSuccess = (
      element: JSX.Element,
      expectedProps: Record<string, unknown>
    ) => renderFindTypeSuccess(element, StyledCustomImg, expectedProps);

    it("renders avatar when supplied with src but no Gravatar", () => {
      testSuccess(<Portrait src={imageUrl} alt="foo" />, {
        src: imageUrl,
        alt: "foo",
        "data-element": "user-image",
      });
    });

    it("renders empty alt attribute when alt prop is empty", () => {
      testSuccess(<Portrait src={imageUrl} alt="" />, {
        src: imageUrl,
        alt: "",
        "data-element": "user-image",
      });
    });

    it("renders empty alt attribute when alt prop is not supplied", () => {
      testSuccess(<Portrait src={imageUrl} />, {
        src: imageUrl,
        alt: "",
        "data-element": "user-image",
      });
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait src={imageUrl} alt="foo" onClick={onClickFn} />
        );
        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait src={imageUrl} alt="foo" onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("external images", () => {
    it("can handle an error when the Gravatar doesn't exist", () => {
      const wrapper = mount(<Portrait gravatar="example@example.com" />);
      expect(wrapper.find(StyledPortraitGravatar).exists()).toBeTruthy();
      ReactTestUtils.Simulate.error(
        wrapper.find(StyledPortraitGravatar).getDOMNode()
      ); // Triggers `onError` of <StyledPortraitGravatar>
      wrapper.update();
      expect(wrapper.find(StyledPortraitGravatar).exists()).toBeFalsy();
    });

    it("can handle an error when the custom image doesn't exist", () => {
      const wrapper = mount(<Portrait src="https://example.com/example.jpg" />);
      expect(wrapper.find(StyledCustomImg).exists()).toBeTruthy();
      ReactTestUtils.Simulate.error(wrapper.find(StyledCustomImg).getDOMNode()); // Triggers `onError` of <StyledCustomImg>
      wrapper.update();
      expect(wrapper.find(StyledCustomImg).exists()).toBeFalsy();
    });
  });

  describe("tags", () => {
    const imageUrl = "https://example.com/example.jpg";

    it("includes data tags for component, element and role on Portrait component", () => {
      const wrapper = shallow(
        <Portrait src={imageUrl} data-element="bar" data-role="baz" />,
        { context: { theme: sageTheme } }
      );
      rootTagTest(wrapper, "portrait", "bar", "baz");
    });

    it("includes user-image tag on internal elements when there is an image", () => {
      const rendered = renderDLS(<Portrait src={imageUrl} />);
      expect(
        rendered.find({ "data-element": "user-image" }).length
      ).toBeGreaterThan(0);
    });
  });

  it("renders a `Tooltip` if tooltipMessage is passed", () => {
    const wrapper = shallow(
      <Portrait initials="AB" tooltipMessage="message" />
    );

    expect(wrapper.find(Tooltip).exists()).toBeTruthy();
  });

  describe("invariant", () => {
    it("validates an invariant is thrown if `src` and `gravatar` are set at the same time", () => {
      const consoleSpy = jest.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      expect(() =>
        shallow(
          <Portrait src="https://example.com/example.jpg" gravatar="baz" />
        )
      ).toThrow(
        "The `src` prop cannot be used in conjunction with the `gravatar` prop. Please use one or the other."
      );

      consoleSpy.mockRestore();
    });

    it("validates an invariant is not thrown if `src` is passed and `gravatar` is not", () => {
      const consoleSpy = jest.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      expect(() =>
        shallow(<Portrait src="https://example.com/example.jpg" />)
      ).not.toThrow();

      consoleSpy.mockRestore();
    });

    it("validates an invariant is not thrown if `gravatar` is passed and `src` is not", () => {
      const consoleSpy = jest.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      expect(() => shallow(<Portrait gravatar="baz" />)).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe("roundedCornersOptOut", () => {
    it("sets the default shape to square when true", () => {
      const shape = mount(
        <CarbonProvider roundedCornersOptOut>
          <Portrait initials="AB" tooltipMessage="message" />
        </CarbonProvider>
      )
        .find(StyledPortraitContainer)
        .prop("shape");

      expect(shape).toEqual("square");
    });

    it("sets the default shape to circle when false", () => {
      const shape = mount(
        <CarbonProvider>
          <Portrait initials="AB" tooltipMessage="message" />
        </CarbonProvider>
      )
        .find(StyledPortraitContainer)
        .prop("shape");

      expect(shape).toEqual("circle");
    });
  });
});
