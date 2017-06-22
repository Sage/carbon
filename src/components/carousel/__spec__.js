import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { Carousel, Slide } from './carousel';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Carousel', () => {
  let instance;
  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Carousel className='foobar'>
        <Slide />
        <Slide />
        <Slide />
      </Carousel>
    );
  });

  describe('componentWillMount', () => {
    describe('when slideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        const wrapper = shallow(
          <Carousel data-element='bar' data-role='baz' slideIndex={ 1 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.instance().state.selectedSlideIndex).toEqual(1);
      });
    });

    describe('when initialSlideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        const wrapper = shallow(
          <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 1 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.instance().state.selectedSlideIndex).toEqual(1);
      });
    });

    describe('when initialSelectedId is not passed', () => {
      it('defaults the initial slide to slide 0', () => {
        const wrapper = shallow(
          <Carousel data-element='bar' data-role='baz'>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.instance().state.selectedSlideIndex).toEqual(0);
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    const wrapper = shallow(
      <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 }>
        <Slide />
        <Slide />
        <Slide />
      </Carousel>
    );
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy();

    beforeEach(() => {
      wrapper.instance().enableButtonsAfterTimeout = enableButtonsAfterTimeoutSpy;
    });

    it('navigate between slides correctly when the slideIndex prop changes', () => {
      // Initial state
      expect(wrapper.state().selectedSlideIndex).toEqual(0);
      expect(wrapper.state().disabled).toBeFalsy();
      expect(enableButtonsAfterTimeoutSpy).not.toHaveBeenCalled();
      // Move to slide 2
      wrapper.setProps({ slideIndex: 2 });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(1);

      // Move to slide 1
      wrapper.setProps({ slideIndex: 1 });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(1);
      expect(wrapper.instance().transitionDirection).toEqual('previous');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(2);

      // Move to slide 3
      wrapper.setProps({ slideIndex: 3 });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(0);
      expect(wrapper.instance().transitionDirection).toEqual('previous');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(3);

      // Move to slide -1
      wrapper.setProps({ slideIndex: -1 });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');
      expect(wrapper.state().disabled).toBeTruthy();
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);

      // Move to slide 2
      wrapper.setProps({ slideIndex: 2 });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);

      // Undefined slideIndex
      wrapper.setProps({ slideIndex: undefined });
      wrapper.rerender();

      expect(wrapper.state().selectedSlideIndex).toEqual(2);
      expect(enableButtonsAfterTimeoutSpy.calls.count()).toEqual(4);
    });
  });

  describe('enableButtonsAfterTimeout', () => {
    it('sets a timeout', () => {
      spyOn(window, 'setTimeout');
      instance.enableButtonsAfterTimeout();
      expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 750);
    });

    it('sets the disabled state to false', () => {
      jasmine.clock().install();

      instance.setState({ disabled: true });
      instance.enableButtonsAfterTimeout();
      jasmine.clock().tick(750);

      expect(instance.state.disabled).toBeFalsy();

      jasmine.clock().uninstall();
    });
  });

  describe('onPreviousClick', () => {
    beforeEach(() => {
      spyOn(instance, 'enableButtonsAfterTimeout');
      instance.setState({ selectedSlideIndex: 2 });
      instance.onPreviousClick();
    });

    it('decrements the selectedSlideIndex', () => {
      expect(instance.state.selectedSlideIndex).toEqual(1);
    });

    it('sets the transistion direction to previous', () => {
      expect(instance.transitionDirection).toEqual('previous');
    });

    it('disables the buttons', () => {
      expect(instance.state.disabled).toBeTruthy();
    });

    it('calls to re-enable buttons after timeout', () => {
      expect(instance.enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when on slide 0', () => {
      it('sets the slideIndex to the last slide', () => {
        instance.setState({ selectedSlideIndex: 0 });
        instance.onPreviousClick();
        expect(instance.state.selectedSlideIndex).toEqual(2);
      });
    });
  });

  describe('onNextClick', () => {
    beforeEach(() => {
      spyOn(instance, 'enableButtonsAfterTimeout');
      instance.setState({ selectedSlideIndex: 0 });
      instance.onNextClick();
    });

    it('increments the selectedSlideIndex', () => {
      expect(instance.state.selectedSlideIndex).toEqual(1);
    });

    it('sets the transistion direction to next', () => {
      expect(instance.transitionDirection).toEqual('next');
    });

    it('disables the buttons', () => {
      expect(instance.state.disabled).toBeTruthy();
    });

    it('calls to re-enable buttons after timeout', () => {
      expect(instance.enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when on the last slide', () => {
      it('sets the slideIndex to the first slide', () => {
        instance.setState({ selectedSlideIndex: 2 });
        instance.onNextClick();
        expect(instance.state.selectedSlideIndex).toEqual(0);
      });
    });
  });

  describe('onSlideSelection', () => {
    beforeEach(() => {
      spyOn(instance, 'enableButtonsAfterTimeout');
      instance.setState({ selectedSlideIndex: 0 });
      const ev = { target: { value: 2 } };
      instance.onSlideSelection(ev);
    });

    it('sets the new slideIndex', () => {
      expect(instance.state.selectedSlideIndex).toEqual(2);
    });

    it('disables the buttons', () => {
      expect(instance.state.disabled).toBeTruthy();
    });

    it('calls to re-enable the buttons', () => {
      expect(instance.enableButtonsAfterTimeout).toHaveBeenCalled();
    });

    describe('when new slide index is greater than current', () => {
      it('sets the transistion group to NEXT', () => {
        expect(instance.transitionDirection).toEqual('next');
      });
    });

    describe('when new slide index is less than current', () => {
      it('sets the transistion group to PREVIOUS', () => {
        instance.setState({ selectedSlideIndex: 2 });
        const ev = { target: { value: 1 } };
        instance.onSlideSelection(ev);
        expect(instance.transitionDirection).toEqual('previous');
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the carousel base class', () => {
      TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-carousel');
    });

    it('returns any passed prop names', () => {
      TestUtils.findRenderedDOMComponentWithClass(instance, 'foobar');
    });
  });

  describe('nextClasses', () => {
    it('returns the class for the next button area', () => {
      expect(instance.nextClasses()).toEqual('carbon-carousel__navigation carbon-carousel__next');
    });
  });

  describe('previousClasses', () => {
    it('returns the class for the previous button area', () => {
      expect(instance.previousClasses()).toEqual('carbon-carousel__navigation carbon-carousel__previous');
    });
  });

  describe('previousButtonClasses', () => {
    it('returns the class for the previous button', () => {
      expect(instance.previousButtonClasses()).toEqual('carbon-carousel__buttons carbon-carousel__previous-button');
    });
  });

  describe('nextButtonClasses', () => {
    it('returns the class for the next button', () => {
      expect(instance.nextButtonClasses()).toEqual('carbon-carousel__buttons carbon-carousel__next-button');
    });
  });

  describe('slideSelectorClassses', () => {
    it('returns the class for the slide selector', () => {
      expect(instance.slideSelectorClasses()).toEqual('carbon-carousel__selector');
    });
  });

  describe('previousButtonProps', () => {
    it('adds the previous button classNames', () => {
      expect(instance.previousButtonProps().className).toEqual(instance.previousButtonClasses());
    });

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
          <Carousel className='foobar'>
            <Slide />
          </Carousel>
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
    let slide;

    beforeEach(() => {
      slide = instance.visibleSlide();
    });

    it('returns a slide instance', () => {
      expect(slide.type).toEqual(Slide);
    });

    it('adds a active class', () => {
      expect(slide.props.className).toEqual('carbon-slide carbon-slide--active');
    });
  });

  describe('slideSelector', () => {
    describe('when enableSlideSelector is set to true', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 }>
          <Slide />
          <Slide />
          <Slide />
        </Carousel>
      );

      it('renders a button for each slide', () => {
        const buttons = wrapper.find('.carbon-carousel__selector-input');

        expect(buttons.exists()).toBeTruthy();
        expect(buttons.length).toEqual(3);
      });
    });

    describe('when enableSlideSelector is set to false', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 } enableSlideSelector={ false }>
          <Slide />
        </Carousel>
      );

      it('does not render the slide selector', () => {
        const buttons = wrapper.find('.carbon-carousel__selector-input');
        expect(buttons.exists()).toBeFalsy();
      });
    });
  });

  describe('previousButton', () => {
    describe('when enablePreviousButton is set to true', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 }>
          <Slide />
        </Carousel>
      );

      it('renders a previous button', () => {
        const arrow = wrapper.find('.carbon-carousel__previous-arrow');
        expect(arrow.exists()).toBeTruthy();
      });
    });

    describe('when enablePreviousButton is set to false', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 } enablePreviousButton={ false }>
          <Slide />
        </Carousel>
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
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 }>
          <Slide />
        </Carousel>
      );

      it('renders a next button', () => {
        const arrow = wrapper.find('.carbon-carousel__next-arrow');
        expect(arrow.exists()).toBeTruthy();
      });
    });

    describe('when enableNextButton is set to false', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 } enableNextButton={ false }>
          <Slide />
        </Carousel>
      );

      it('does not render a next button', () => {
        const arrow = wrapper.find('.carbon-carousel__next-arrow');
        expect(arrow.exists()).toBeFalsy();
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <Carousel data-element='bar' data-role='baz' initialSlideIndex={ 0 }>
          <Slide />
        </Carousel>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'carousel', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(
        <Carousel initialSlideIndex={ 0 }>
          <Slide data-element='slide' />
        </Carousel>
      );

      elementsTagTest(wrapper, [
        'next',
        'previous',
        'selector-input',
        'selector-label',
        'visible-slide'
      ]);
    });
  });
});
