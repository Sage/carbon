import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { CSSTransition } from 'react-transition-group';
import { shallow, mount } from 'enzyme';
import BaseCarousel, { Carousel, Slide } from './carousel.component';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import {
  CarouselStyledIconLeft,
  CarouselSelectorInputStyle,
  CarouselStyledIconRight,
  CarouselPreviousButtonWrapperStyle,
  CarouselStyledIcon,
  CarouselButtonStyle,
  CarouselSliderWrapper,
  CarouselSelectorWrapperStyle,
  CarouselSelectorLabelStyle,
  CarouselSelectorInputWrapperStyle,
  CarouselNextButtonWrapperStyle
} from './carousel.style';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
/* global jest */

describe('BaseCarousel', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <BaseCarousel theme={ classicTheme } className='foobar'>
        <Slide />
        <Slide />
        <Slide />
      </BaseCarousel>
    );
  });

  describe('componentWillMount', () => {
    describe('when slideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        const wrapper = shallow(
          <BaseCarousel slideIndex={ 1 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(1);
      });
    });

    describe('when initialSlideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        const wrapper = shallow(
          <BaseCarousel initialSlideIndex={ 2 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(2);
      });
    });

    describe('when initialSelectedId is not passed', () => {
      it('defaults the initial slide to slide 0', () => {
        const wrapper = shallow(
          <BaseCarousel theme={ classicTheme }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(0);
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

    beforeEach(() => {
      wrapper.instance().enableButtonsAfterTimeout = enableButtonsAfterTimeoutSpy;
    });

    it('navigates between slides correctly when the slideIndex prop changes', () => {
      // Initial state
      expect(wrapper.state().selectedSlideIndex).toEqual(0);
      expect(wrapper.state().disabled).toBeFalsy();
      expect(enableButtonsAfterTimeoutSpy).not.toHaveBeenCalled();

      // Move to slide 2
      wrapper.setProps({ slideIndex: 2 });

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(1);

      // Move to slide 1
      wrapper.setProps({ slideIndex: 1 });

      expect(wrapper.state().selectedSlideIndex).toEqual(1);
      expect(wrapper.instance().transitionDirection).toEqual('previous');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(2);

      // Move to slide 3
      wrapper.setProps({ slideIndex: 3 });

      expect(wrapper.state().selectedSlideIndex).toEqual(0);
      expect(wrapper.instance().transitionDirection).toEqual('previous');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(3);

      // Move to slide -1
      wrapper.setProps({ slideIndex: -1 });

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);

      // Move to slide 2
      wrapper.setProps({ slideIndex: 2 });

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);

      // Undefined slideIndex
      wrapper.setProps({ slideIndex: undefined });

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);
    });

    describe('when onSlideChange is set', () => {
      it('calls onSlideChange', () => {
        const onSlideChangeSpy = jasmine.createSpy();
        wrapper.setProps({ onSlideChange: onSlideChangeSpy });
        wrapper.setProps({ slideIndex: 1 });

        expect(onSlideChangeSpy).toHaveBeenCalledWith(1, 'previous');
      });
    });
  });

  describe('enableButtonsAfterTimeout', () => {
    it('sets a timeout', () => {
      spyOn(window, 'setTimeout');
      instance.enableButtonsAfterTimeout();
      expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 750);
    });

    it('sets the disabled state to false', () => {
      jest.useFakeTimers();
      instance.setState({ disabled: true });
      instance.enableButtonsAfterTimeout();
      jest.runTimersToTime(750);
      expect(instance.state.disabled).toBeFalsy();
    });
  });

  describe('onPreviousClick', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

    beforeEach(() => {
      wrapper.instance().enableButtonsAfterTimeout = enableButtonsAfterTimeoutSpy;
      wrapper.setState({ selectedSlideIndex: 2 });
      wrapper.instance().onPreviousClick();
    });

    it('decrements the selectedSlideIndex', () => {
      expect(wrapper.state().selectedSlideIndex).toEqual(1);
    });

    it('sets the transistion direction to previous', () => {
      expect(wrapper.instance().transitionDirection).toEqual('previous');
    });

    it('disables the buttons', () => {
      expect(wrapper.state().disabled).toBeTruthy();
    });

    it('calls to re-enable buttons after timeout', () => {
      expect(wrapper.instance().enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when on slide 0', () => {
      it('sets the slideIndex to the last slide', () => {
        wrapper.setState({ selectedSlideIndex: 0 });
        wrapper.instance().onPreviousClick();
        expect(wrapper.state().selectedSlideIndex).toEqual(2);
      });
    });

    describe('when onSlideChange is set', () => {
      it('calls onSlideChange', () => {
        const onSlideChangeSpy = jasmine.createSpy();
        wrapper.setProps({ onSlideChange: onSlideChangeSpy });
        wrapper.setState({ selectedSlideIndex: 0 });
        wrapper.instance().onPreviousClick();
        expect(wrapper.state().selectedSlideIndex).toEqual(2);
        expect(onSlideChangeSpy).toHaveBeenCalledWith(2, 'previous');
      });
    });
  });

  describe('onNextClick', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

    beforeEach(() => {
      wrapper.instance().enableButtonsAfterTimeout = enableButtonsAfterTimeoutSpy;
      wrapper.setState({ selectedSlideIndex: 0 });
      wrapper.instance().onNextClick();
    });

    it('increments the selectedSlideIndex', () => {
      expect(wrapper.state().selectedSlideIndex).toEqual(1);
    });

    it('sets the transistion direction to next', () => {
      expect(wrapper.instance().transitionDirection).toEqual('next');
    });

    it('disables the buttons', () => {
      expect(wrapper.state().disabled).toBeTruthy();
    });

    it('calls to re-enable buttons after timeout', () => {
      expect(wrapper.instance().enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when on the last slide', () => {
      it('sets the slideIndex to the first slide', () => {
        wrapper.setState({ selectedSlideIndex: 2 });
        wrapper.instance().onNextClick();
        expect(wrapper.state().selectedSlideIndex).toEqual(0);
      });
    });

    describe('when onSlideChange is set', () => {
      it('calls onSlideChange', () => {
        const onSlideChangeSpy = jasmine.createSpy();
        wrapper.setProps({ onSlideChange: onSlideChangeSpy });
        wrapper.setState({ selectedSlideIndex: 2 });
        wrapper.instance().onNextClick();
        expect(wrapper.state().selectedSlideIndex).toEqual(0);
        expect(onSlideChangeSpy).toHaveBeenCalledWith(0, 'next');
      });
    });
  });

  describe('onSlideSelection', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </BaseCarousel>
        );

    beforeEach(() => {
      wrapper.instance().enableButtonsAfterTimeout = enableButtonsAfterTimeoutSpy;
      wrapper.setState({ selectedSlideIndex: 0 });
      const ev = { target: { value: 2 } };
      wrapper.instance().onSlideSelection(ev);
    });

    it('sets the new slideIndex', () => {
      expect(wrapper.state().selectedSlideIndex).toEqual(2);
    });

    it('disables the buttons', () => {
      expect(wrapper.state().disabled).toBeTruthy();
    });

    it('calls to re-enable the buttons', () => {
      expect(wrapper.instance().enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when new slide index is greater than current', () => {
      it('sets the transistion group to NEXT', () => {
        expect(wrapper.instance().transitionDirection).toEqual('next');
      });
    });

    describe('when new slide index is less than current', () => {
      it('sets the transistion group to PREVIOUS', () => {
        wrapper.setState({ selectedSlideIndex: 2 });
        const ev = { target: { value: 1 } };
        wrapper.instance().onSlideSelection(ev);
        expect(wrapper.instance().transitionDirection).toEqual('previous');
      });
    });

    describe('when onSlideChange is set', () => {
      it('calls onSlideChange', () => {
        const onSlideChangeSpy = jasmine.createSpy();
        wrapper.setProps({ onSlideChange: onSlideChangeSpy });
        wrapper.setState({ selectedSlideIndex: 2 });
        const ev = { target: { value: 1 } };
        wrapper.instance().onSlideSelection(ev);
        expect(wrapper.instance().transitionDirection).toEqual('previous');
        expect(onSlideChangeSpy).toHaveBeenCalledWith(1, 'previous');
      });
    });
  });

  describe('previousButtonProps', () => {
    describe('when buttons are disabled', () => {
      it('does not add a onClick', () => {
        instance.setState({ disabled: true });
        expect(instance.previousButtonProps().onClick).toBeUndefined();
      });
    });

    describe('when buttons are not disabled', () => {
      it('adds a onClick', () => {
        instance.setState({ disabled: false });
        expect(instance.previousButtonProps().onClick).toBeDefined();
      });
    });
  });

  describe('numOfSlides', () => {
    describe('when one child', () => {
      it('returns 1', () => {
        instance = TestUtils.renderIntoDocument(
          <BaseCarousel theme={ classicTheme } className='foobar'>
            <Slide />
          </BaseCarousel>
        );

        expect(instance.numOfSlides()).toEqual(1);
      });
    });

    describe('when an array of children', () => {
      it('returns the number of children', () => {
        expect(instance.numOfSlides()).toEqual(3);
      });
    });
  });

  describe('visibleSlides', () => {
    let slide, wrapper;

    beforeEach(() => {
      wrapper = mount(
        <BaseCarousel theme={ classicTheme }>
          <Slide />
        </BaseCarousel>
      );

      slide = wrapper.instance().visibleSlide();
    });

    it('returns a slide instance', () => {
      expect(slide.type).toEqual(CSSTransition);
    });

    it('adds an active and a padded classes', () => {
      expect(wrapper.find(Slide).props().isPadded).toBe(true);
    });

    describe('when the previous button is disabled', () => {
      it('adds a padded classes', () => {
        wrapper.setProps({ enablePreviousButton: false });

        expect(wrapper.find(Slide).props().isPadded).toBe(true);
      });
    });

    describe('when the next button is disabled', () => {
      it('adds a padded classes', () => {
        wrapper.setProps({ enableNextButton: false });

        expect(wrapper.find(Slide).props().isPadded).toBe(true);
      });
    });
  });

  describe('slideSelector', () => {
    describe('when enableSlideSelector is set to true', () => {
      const wrapper = shallow(
        <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
          <Slide />
          <Slide />
          <Slide />
        </BaseCarousel>
      );

      it('renders a button for each slide', () => {
        const buttons = wrapper.find(CarouselSelectorInputStyle);

        expect(buttons.exists()).toBeTruthy();
        expect(buttons.length).toEqual(3);
      });
    });

    describe('when enableSlideSelector is set to false', () => {
      const wrapper = shallow(
        <BaseCarousel
          theme={ classicTheme } initialSlideIndex={ 0 }
          enableSlideSelector={ false }
        >
          <Slide />
        </BaseCarousel>
      );

      it('does not render the slide selector', () => {
        const buttons = wrapper.find(CarouselSelectorInputStyle);
        expect(buttons.exists()).toBeFalsy();
      });
    });
  });

  describe('previousButton', () => {
    describe('when enablePreviousButton is set to true', () => {
      const wrapper = shallow(
        <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
          <Slide />
        </BaseCarousel>
      );

      it('renders a previous button', () => {
        const arrow = wrapper.find(CarouselStyledIconLeft);
        expect(arrow.exists()).toBeTruthy();
      });
    });

    describe('when enablePreviousButton is set to false', () => {
      const wrapper = shallow(
        <BaseCarousel
          theme={ classicTheme } initialSlideIndex={ 0 }
          enablePreviousButton={ false }
        >
          <Slide />
        </BaseCarousel>
      );

      it('does not render a previous button', () => {
        const arrow = wrapper.find('.carbon-carousel__previous-arrow');
        expect(arrow.exists()).toBeFalsy();
      });
    });
  });

  describe('nextButton', () => {
    describe('when enableNextButton is set to true', () => {
      const wrapper = shallow(
        <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
          <Slide />
        </BaseCarousel>
      );

      it('renders a next button', () => {
        const arrow = wrapper.find(CarouselStyledIconRight);
        expect(arrow.exists()).toBeTruthy();
      });
    });

    describe('when enableNextButton is set to false', () => {
      const wrapper = shallow(
        <BaseCarousel
          theme={ classicTheme } initialSlideIndex={ 0 }
          enableNextButton={ false }
        >
          <Slide />
        </BaseCarousel>
      );

      it('does not render a next button', () => {
        const arrow = wrapper.find(CarouselStyledIconRight);
        expect(arrow.exists()).toBeFalsy();
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <BaseCarousel
          theme={ classicTheme }
          data-element='bar' data-role='baz'
          initialSlideIndex={ 0 }
        >
          <Slide />
        </BaseCarousel>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'carousel', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(
        <BaseCarousel theme={ classicTheme } initialSlideIndex={ 0 }>
          <Slide data-element='slide' />
        </BaseCarousel>
      );

      it('should has expected data elements', () => {
        wrapper.find('[data-element="slide"]').exists();
        wrapper.find('[data-element="visible-slide"]').exists();
      });
    });
  });

  describe('classNames', () => {
    it('uses a custom name if supplied', () => {
      const wrapper = shallow(
        <BaseCarousel theme={ classicTheme } transition='foo'>
          <Slide />
        </BaseCarousel>
      );
      const transitionGroup = wrapper.find(CSSTransition);
      expect(transitionGroup.props().classNames).toEqual('carousel-transition-foo');
    });
  });
});

describe('When button get click', () => {
  let wrapper;

  it('should not change state of disabled', () => {
    wrapper = mount(
      <Carousel initialSlideIndex={ 0 }>
        <Slide />
        <Slide />
      </Carousel>
    );
    wrapper.find(CarouselButtonStyle).at(1).simulate('click');
    expect(wrapper.find(CarouselSliderWrapper).props().elementIndex).toEqual(1);
  });
});

describe('CarouselPreviousButtonWrapperStyle', () => {
  const wrapper = mount(<CarouselPreviousButtonWrapperStyle theme={ classicTheme } />);
  it('should render matched style', () => {
    assertStyleMatch({
      marginTop: '-22.5px'
    }, wrapper);
  });
});

describe('CarouselStyledIcon', () => {
  it('should render matched style when classic', () => {
    const wrapper = mount(<CarouselStyledIcon theme={ classicTheme } />);
    assertStyleMatch({
      fontSize: '25px'
    }, wrapper, { modifier: '&&::before' });
  });

  it('should render matched style when modern themed', () => {
    const wrapper = mount(<CarouselStyledIcon theme={ smallTheme } />);
    assertStyleMatch({
      color: '#FFFFFF'
    }, wrapper);
  });
});

describe('CarouselButtonStyle', () => {
  let wrapper;

  it('should render matched style when it is disabled', () => {
    wrapper = mount(<CarouselButtonStyle disabled />);
    assertStyleMatch({
      opacity: '0.1'
    }, wrapper);
  });

  it('should render matched style', () => {
    wrapper = mount(<CarouselButtonStyle theme={ classicTheme } />);
    assertStyleMatch({
      width: '45px',
      height: '45px',
      backgroundColor: '#CCD6DA',
      color: 'rgba(0,0,0,0.85)'
    }, wrapper);
  });

  it('should render matched style to next button', () => {
    wrapper = mount(<CarouselNextButtonWrapperStyle theme={ classicTheme } />);

    assertStyleMatch({
      marginRight: '0'
    }, wrapper);
  });
});

describe('CarouselSelectorWrapperStyle', () => {
  let wrapper;

  it('should render matched styles', () => {
    wrapper = mount(<CarouselSelectorWrapperStyle theme={ classicTheme } />);
    assertStyleMatch({
      height: '20px',
      marginTop: '5px',
      textAlign: 'center'
    }, wrapper);
  });
});

describe('CarouselSliderWrapper', () => {
  let wrapper;

  it('should render matched styles', () => {
    wrapper = mount(<CarouselSliderWrapper elementIndex={ 1 } />);

    assertStyleMatch({
      transition: '.4s',
      display: 'flex',
      position: 'relative',
      left: '-70%'
    }, wrapper);
  });
});

describe('CarouselSelectorLabelStyle', () => {
  let wrapper;

  it('should render matched style', () => {
    wrapper = mount(<CarouselSelectorLabelStyle theme={ classicTheme } />);

    assertStyleMatch({
      border: '1px solid #4C6F7F',
      background: 'transparent',
      width: '8px',
      height: '8px',
      margin: '0px 5px'
    }, wrapper);
  });
});

describe('CarouselSelectorInputWrapperStyle', () => {
  let wrapper;

  it('should render matched style', () => {
    wrapper = mount(<CarouselSelectorInputWrapperStyle theme={ classicTheme } />);

    assertStyleMatch({
      width: '22px'
    }, wrapper);
  });
});

describe('SlideStyle', () => {
  let wrapper;

  it('should render matched style', () => {
    wrapper = mount(<Slide onClick={ () => { } } style={ classicTheme } />);
    assertStyleMatch({
      transition: 'all 0.2s ease-in',
      transform: 'scale(1.02)',
      cursor: 'pointer'
    }, wrapper, { modifier: ':hover' });
  });
});
