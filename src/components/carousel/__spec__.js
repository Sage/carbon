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
          <Carousel slideIndex={ 1 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(1);
      });
    });

    describe('when initialSlideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        const wrapper = shallow(
          <Carousel initialSlideIndex={ 2 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(2);
      });
    });

    describe('when initialSelectedId is not passed', () => {
      it('defaults the initial slide to slide 0', () => {
        const wrapper = shallow(
          <Carousel>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(wrapper.state('selectedSlideIndex')).toEqual(0);
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <Carousel initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
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
      jasmine.clock().install();

      instance.setState({ disabled: true });
      instance.enableButtonsAfterTimeout();
      jasmine.clock().tick(750);

      expect(instance.state.disabled).toBeFalsy();

      jasmine.clock().uninstall();
    });
  });

  describe('onPreviousClick', () => {
    const enableButtonsAfterTimeoutSpy = jasmine.createSpy(),
        wrapper = shallow(
          <Carousel initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
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
          <Carousel initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
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
          <Carousel initialSlideIndex={ 0 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
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
    let slide, wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Carousel >
          <Slide />
        </Carousel>
      );

      slide = wrapper.instance().visibleSlide();
    });

    it('returns a slide instance', () => {
      expect(slide.type).toEqual(Slide);
    });

    it('adds an active and a padded classes', () => {
      expect(slide.props.className).toEqual('carbon-slide carbon-slide--active carbon-slide--padded');
    });

    describe('when the previous button is disabled', () => {
      it('adds an active and a padded classes', () => {
        wrapper.setProps({ enablePreviousButton: false });
        slide = wrapper.instance().visibleSlide();

        expect(slide.props.className).toEqual('carbon-slide carbon-slide--active carbon-slide--padded');
      });
    });

    describe('when the next button is disabled', () => {
      it('adds an active and a padded classes', () => {
        wrapper.setProps({ enableNextButton: false });
        slide = wrapper.instance().visibleSlide();

        expect(slide.props.className).toEqual('carbon-slide carbon-slide--active carbon-slide--padded');
      });
    });

    describe('when both buttons are disabled', () => {
      it('adds an active class', () => {
        wrapper.setProps({ enablePreviousButton: false, enableNextButton: false });
        slide = wrapper.instance().visibleSlide();

        expect(slide.props.className).toEqual('carbon-slide carbon-slide--active');
      });
    });
  });

  describe('slideSelector', () => {
    describe('when enableSlideSelector is set to true', () => {
      const wrapper = shallow(
        <Carousel initialSlideIndex={ 0 }>
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
        <Carousel initialSlideIndex={ 0 } enableSlideSelector={ false }>
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
        <Carousel initialSlideIndex={ 0 }>
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
        <Carousel initialSlideIndex={ 0 } enablePreviousButton={ false }>
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
        <Carousel initialSlideIndex={ 0 }>
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
        <Carousel initialSlideIndex={ 0 } enableNextButton={ false }>
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
