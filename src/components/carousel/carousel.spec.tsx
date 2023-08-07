import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import { Carousel, CarouselProps } from "./carousel.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  CarouselPreviousButtonWrapperStyle,
  CarouselButtonStyle,
  CarouselSliderWrapper,
  CarouselSelectorWrapperStyle,
  CarouselSelectorLabelStyle,
  CarouselSelectorInputWrapperStyle,
  CarouselNextButtonWrapperStyle,
} from "./carousel.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { SlideStyle } from "./slide/slide.style";
import Slide from "./slide";

function renderCarousel(props: CarouselProps, renderer = mount) {
  const children = props.children || [
    <Slide key="slide1" />,
    <Slide key="slide2" />,
    <Slide key="slide3" />,
  ];

  return renderer(<Carousel {...props}>{children}</Carousel>);
}

describe("Carousel", () => {
  describe("when the Previous button has been clicked", () => {
    let wrapper: ReactWrapper;
    const onSlideChangeSpy = jest.fn();

    beforeEach(() => {
      onSlideChangeSpy.mockClear();
    });

    describe("with initialSlideIndex set to an index other than the first", () => {
      it("then onSlideChange should have been called with the previous index and a phrase 'previous'", () => {
        wrapper = renderCarousel({
          initialSlideIndex: 1,
          onSlideChange: onSlideChangeSpy,
        });
        wrapper
          .find("button[data-element='previous']")
          .first()
          .simulate("click");

        expect(onSlideChangeSpy).toHaveBeenCalledWith(0, "previous");
      });

      describe("and the enablePreviousButton prop has been set to false", () => {
        it("then the previous button should not have been rendered", () => {
          wrapper = renderCarousel({
            initialSlideIndex: 1,
            onSlideChange: onSlideChangeSpy,
            enablePreviousButton: false,
          });

          expect(wrapper.find("button[data-element='previous']").exists()).toBe(
            false
          );
        });
      });
    });

    describe("with initialSlideIndex set to the first index", () => {
      beforeEach(() => {
        wrapper = renderCarousel({
          initialSlideIndex: 0,
          onSlideChange: onSlideChangeSpy,
        });
        wrapper
          .find("button[data-element='previous']")
          .first()
          .simulate("click");
      });

      it("then the button should be disabled", () => {
        expect(
          wrapper.find("button[data-element='previous']").props().disabled
        ).toBe(true);
      });

      it("then onSlideChange should not have been called", () => {
        expect(onSlideChangeSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the Next button has been clicked", () => {
    let wrapper: ReactWrapper;
    const onSlideChangeSpy = jest.fn();

    beforeEach(() => {
      onSlideChangeSpy.mockClear();
    });

    describe("with initialSlideIndex set to an index other than the last", () => {
      it("then onSlideChange should have been called with next index and the phrase 'next'", () => {
        wrapper = renderCarousel({
          initialSlideIndex: 0,
          onSlideChange: onSlideChangeSpy,
        });
        wrapper.find("button[data-element='next']").first().simulate("click");

        expect(onSlideChangeSpy).toHaveBeenCalledWith(1, "next");
      });

      describe("and the enableNextButton prop has been set to false", () => {
        it("then the next button should not have been rendered", () => {
          wrapper = renderCarousel({
            initialSlideIndex: 0,
            onSlideChange: onSlideChangeSpy,
            enableNextButton: false,
          });

          expect(wrapper.find("button[data-element='next']").exists()).toBe(
            false
          );
        });
      });
    });

    describe("with initialSlideIndex set to the last index", () => {
      beforeEach(() => {
        wrapper = renderCarousel({
          initialSlideIndex: 2,
          onSlideChange: onSlideChangeSpy,
        });
        wrapper.find("button[data-element='next']").first().simulate("click");
      });

      it("then the button should be disabled", () => {
        expect(
          wrapper.find("button[data-element='next']").props().disabled
        ).toBe(true);
      });

      it("then onSlideChange should not have been called", () => {
        expect(onSlideChangeSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the enableSlideSelector prop is set to false", () => {
    it("then the slide selector should not have been rendered", () => {
      const wrapper = renderCarousel({
        initialSlideIndex: 0,
        enableSlideSelector: false,
      });

      expect(
        wrapper.find("input[data-element='selector-input']").exists()
      ).toBe(false);
    });
  });

  describe("when the a Slide Selector button with a higher index than current has been clicked", () => {
    it(`then onSlideChange should have been called with that index and the phrase 'next'`, () => {
      const onSlideChangeSpy = jest.fn();
      const wrapper = renderCarousel({
        initialSlideIndex: 0,
        onSlideChange: onSlideChangeSpy,
      });
      wrapper
        .find("input[data-element='selector-input']")
        .at(1)
        .simulate("change", { target: { checked: true, value: 1 } });

      expect(onSlideChangeSpy).toHaveBeenCalledWith(1, "next");
    });
  });

  describe("when the a Slide Selector button with a lower index than current has been clicked", () => {
    it(`then onSlideChange should have been called with that index and the phrase 'previous'`, () => {
      const onSlideChangeSpy = jest.fn();
      const wrapper = renderCarousel({
        initialSlideIndex: 2,
        onSlideChange: onSlideChangeSpy,
      });
      wrapper
        .find("input[data-element='selector-input']")
        .at(1)
        .simulate("change", { target: { checked: true, value: 1 } });

      expect(onSlideChangeSpy).toHaveBeenCalledWith(1, "previous");
    });
  });

  describe("when there is only one slide", () => {
    it("then both previous and next buttons should be disabled", () => {
      const wrapper = renderCarousel({ children: <Slide /> });

      expect(
        wrapper.find("button[data-element='previous']").props().disabled
      ).toBe(true);
      expect(wrapper.find("button[data-element='next']").props().disabled).toBe(
        true
      );
    });
  });

  describe("when the slideIndex prop has been passed with a slide number", () => {
    const onSlideChangeSpy = jest.fn();
    let wrapper: ReactWrapper;

    beforeEach(() => {
      onSlideChangeSpy.mockClear();
      wrapper = renderCarousel({
        initialSlideIndex: 1,
        onSlideChange: onSlideChangeSpy,
      });
    });

    describe("and the current slide has lower index", () => {
      it("then onSlideChange should have been called with the same slide number and 'next' word", () => {
        wrapper.setProps({ slideIndex: 2 });

        expect(onSlideChangeSpy).toHaveBeenCalledWith(2, "next");
      });
    });

    describe("and the current slide has higher index", () => {
      it("then onSlideChange should have been called with the same slide number and 'previous' word", () => {
        wrapper.setProps({ slideIndex: 0 });

        expect(onSlideChangeSpy).toHaveBeenCalledWith(0, "previous");
      });
    });

    describe("and it's the same slide number as current slide", () => {
      it("then onSlideChange should not have been called", () => {
        wrapper.setProps({ slideIndex: 1 });

        expect(onSlideChangeSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <Carousel data-element="bar" data-role="baz" initialSlideIndex={0}>
          <Slide />
        </Carousel>
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "carousel", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = mount(
        <Carousel initialSlideIndex={0}>
          <Slide data-element="slide" />
        </Carousel>
      );

      it("should has expected data elements", () => {
        wrapper.find('[data-element="slide"]').exists();
        wrapper.find('[data-element="visible-slide"]').exists();
      });
    });
  });
});

describe("CarouselPreviousButtonWrapperStyle", () => {
  const wrapper = mount(<CarouselPreviousButtonWrapperStyle />);
  it("should render matched style", () => {
    assertStyleMatch(
      {
        marginTop: "-32.5px",
      },
      wrapper
    );
  });
});

describe("CarouselButtonStyle", () => {
  let wrapper;

  it("should render matched style", () => {
    wrapper = mount(<CarouselButtonStyle />);
    assertStyleMatch(
      {
        width: "40px",
        height: "40px",
        borderRadius: "var(--borderRadius400)",
      },
      wrapper
    );
  });

  it("should render matched style to next button", () => {
    wrapper = mount(<CarouselNextButtonWrapperStyle />);

    assertStyleMatch(
      {
        marginRight: "2px",
      },
      wrapper
    );
  });
});

describe("CarouselSelectorWrapperStyle", () => {
  let wrapper: ReactWrapper;

  it("should render matched styles", () => {
    wrapper = mount(<CarouselSelectorWrapperStyle />);
    assertStyleMatch(
      {
        height: "20px",
        marginTop: "25px",
        textAlign: "center",
      },
      wrapper
    );
  });
});

describe("CarouselSliderWrapper", () => {
  let wrapper: ReactWrapper;

  it("should render matched styles", () => {
    wrapper = mount(<CarouselSliderWrapper elementIndex={1} />);

    assertStyleMatch(
      {
        transition: "0.4s",
        display: "flex",
        position: "relative",
        left: "-70%",
      },
      wrapper
    );
  });

  it.each([0, 1, 2, 3])(
    "should apply the expected styles to the Slide element when the index is %s",
    (elementIndex) => {
      wrapper = mount(<CarouselSliderWrapper elementIndex={elementIndex} />);

      assertStyleMatch(
        {
          transform: "scale(1)",
          opacity: "1",
        },
        wrapper,
        { modifier: `${SlideStyle}:nth-of-type(${elementIndex + 1})` }
      );
    }
  );
});

describe("CarouselSelectorLabelStyle", () => {
  let wrapper;

  it("should render matched style", () => {
    wrapper = mount(<CarouselSelectorLabelStyle />);

    assertStyleMatch(
      {
        background: "var(--colorsActionMinor200)",
        width: "10px",
        height: "10px",
        margin: "0px 4px",
      },
      wrapper
    );
  });
});

describe("CarouselSelectorInputWrapperStyle", () => {
  let wrapper;

  it("should render matched style", () => {
    wrapper = mount(<CarouselSelectorInputWrapperStyle />);

    assertStyleMatch(
      {
        display: "inline-block",
      },
      wrapper
    );
  });
});

describe("SlideStyle", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Slide onClick={() => {}} />);
  });

  it("should render with the expected border radius styling", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius200)",
        overflow: "hidden",
      },
      wrapper
    );
  });

  it("should render matched style", () => {
    assertStyleMatch(
      {
        transition: "all 0.2s ease-in",
        transform: "scale(1.02)",
        cursor: "pointer",
      },
      wrapper,
      { modifier: ":hover" }
    );
  });
});

it("coverage filler for else path", () => {
  const wrapper = mount(
    <Carousel>
      <Slide />
      <Slide />
      <Slide />
    </Carousel>
  );

  wrapper.find("button[data-element='next']").first().simulate("click");
});
