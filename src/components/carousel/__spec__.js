import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Carousel, Slide } from './carousel';

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
    describe('when initialSlideIndex is passed', () => {
      it('sets the intial slide to the prop', () => {
        instance = TestUtils.renderIntoDocument(
          <Carousel initialSlideIndex={ 1 }>
            <Slide />
            <Slide />
            <Slide />
          </Carousel>
        );

        expect(instance.state.selectedSlideIndex).toEqual(1);
      });
    });

    describe('when initialSelectedId is not passed', () => {
      it('defaults the initial slide to slide 0', () => {
        expect(instance.state.selectedSlideIndex).toEqual(0);
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
      let ev = { target: { value: 2 } };
      instance.onSlideSelection(ev)
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
        let ev = { target: { value: 1 } };
        instance.onSlideSelection(ev)
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
    it('renders a button for each slide', () => {
      let buttons = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-carousel__selector-input');
      expect(buttons.length).toEqual(3);
    });
  });
});
