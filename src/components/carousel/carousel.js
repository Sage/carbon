import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { compact, assign } from 'lodash';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';

import Icon from '../icon';
import Slide from './slide';
import './carousel.scss';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 750;

class Carousel extends React.Component {
  static propTypes = {

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * The selected tab on page load
     */
    initialSlideIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /**
     * The selected slide
     */
    slideIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /**
     * Individual tabs
     */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),

    /**
     * Enables the slide selector
     */
    enableSlideSelector: PropTypes.bool,

    /**
     * Enables the previous button
     */
    enablePreviousButton: PropTypes.bool,

    /**
     * Enables the next button
     */
    enableNextButton: PropTypes.bool,

    /**
     * Action to be called on slide change
     */
    onSlideChange: PropTypes.func,

    /**
     * Controls which transition to use.
     */
    transition: PropTypes.string
  }

  static defaultProps = {
    initialSlideIndex: 0,
    enableSlideSelector: true,
    enablePreviousButton: true,
    enableNextButton: true,
    transition: 'slide'
  }

  constructor(...args) {
    super(...args);

    /**
     * Direction of animation
     *
     * @property transitionDirection
     */
    this.transitionDirection = NEXT;

    this.mainClasses = this.mainClasses.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onSlideSelection = this.onSlideSelection.bind(this);
    this.enableButtonsAfterTimeout = this.enableButtonsAfterTimeout.bind(this);
    this.previousButtonProps = this.previousButtonProps.bind(this);
    this.nextButtonProps = this.nextButtonProps.bind(this);
    this.numOfSlides = this.numOfSlides.bind(this);
    this.visibleSlide = this.visibleSlide.bind(this);
    this.slideSelector = this.slideSelector.bind(this);
    this.nextClasses = this.nextClasses.bind(this);
    this.previousClasses = this.previousClasses.bind(this);
    this.previousButtonClasses = this.previousButtonClasses.bind(this);
    this.nextButtonClasses = this.nextButtonClasses.bind(this);
    this.slideSelectorClasses = this.slideSelectorClasses.bind(this);
    this.transitionName = this.transitionName.bind(this);
  }

  state = {
    selectedSlideIndex: null, // Currently selected slide
    disabled: false // Next/Previous buttons disabled state
  };

  /**
   * A lifecycle method that is called after before initial render.
   * Can set up state of component without causing a re-render
   *
   * @method componentWillMount
   */
  componentWillMount() {
    const selectedIndex = Number(this.props.slideIndex) || Number(this.props.initialSlideIndex);
    this.setState({ selectedSlideIndex: selectedIndex });
  }

  /**
   * A lifecycle method that is called before re-render.
   *
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.slideIndex === 'undefined') { return; }

    const newIndex = this.verifyNewIndex(nextProps.slideIndex);
    const currentIndex = this.state.selectedSlideIndex;

    if (newIndex === currentIndex) return;

    if (newIndex > currentIndex) {
      this.transitionDirection = NEXT;
    } else {
      this.transitionDirection = PREVIOUS;
    }

    this.handleSlideChange(newIndex);
  }

  /**
   * Handles clicking on the previous button
   *
   * @method onPreviousClick
   */
  onPreviousClick() {
    let newIndex = this.state.selectedSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.numOfSlides() - 1;
    }
    this.transitionDirection = PREVIOUS;
    this.handleSlideChange(newIndex);
  }

  /**
   * Handles clicking on the next button
   *
   * @method onNextClick
   */
  onNextClick() {
    const newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides();
    this.transitionDirection = NEXT;
    this.handleSlideChange(newIndex);
  }

  /**
   * Handles clicking slide selector
   *
   * @method onSlideSelection
   */
  onSlideSelection(ev) {
    const newSlideSelection = Number(ev.target.value);
    this.transitionDirection = newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
    this.handleSlideChange(newSlideSelection);
  }

  /**
   * Verifies the new index and corrects it if necessary
   *
   * @method verifyNewIndex
   * @param newIndex {Integer}
   * @return {Integer}
   */
  verifyNewIndex(newIndex) {
    if (newIndex < 0) {
      // If the new index is negative, select the last slide
      return this.numOfSlides() - 1;
    }

    if (newIndex > this.numOfSlides() - 1) {
      // If the new index is bigger than the number of slides, select the first slide
      return 0;
    }

    return newIndex;
  }

  /**
   * Handle the slide change to the newIndex
   *
   * @method handleSlideChange
   * @param newIndex {Integer}
   */
  handleSlideChange(newIndex) {
    this.setState({ disabled: true, selectedSlideIndex: newIndex });
    this.enableButtonsAfterTimeout();

    if (this.props.onSlideChange) {
      this.props.onSlideChange(newIndex, this.transitionDirection);
    }
  }

  /**
   * Gets the next div classes
   *
   * @method nextClasses
   */
  nextClasses() {
    return classNames(
      'carbon-carousel__navigation',
      'carbon-carousel__next'
    );
  }

  /**
   * Gets the previous div classes
   *
   * @method previousClasses
   */
  previousClasses() {
    return classNames(
      'carbon-carousel__navigation',
      'carbon-carousel__previous'
    );
  }

  /**
   * Gets the previous button classes
   *
   * @method previousButtonClasses
   */
  previousButtonClasses() {
    return classNames(
      'carbon-carousel__buttons',
      'carbon-carousel__previous-button'
    );
  }

  /**
   * Gets the next button classes
   *
   * @method nextButtonClasses
   */
  nextButtonClasses() {
    return classNames(
      'carbon-carousel__buttons',
      'carbon-carousel__next-button'
    );
  }

  /**
   * Gets the slide selector footer classes
   *
   * @method nextButtonClasses
   */
  slideSelectorClasses() {
    return classNames('carbon-carousel__selector');
  }

  /**
   * Re-enables the next and previous buttons after timeout
   *
   * @method enableButtonsAfterTimeout
   * @return {Void}
   */
  enableButtonsAfterTimeout() {
    setTimeout(() => {
      this.setState({ disabled: false });
    }, TRANSITION_TIME);
  }

  /**
   * Gets the main classes
   *
   * @method mainClasses
   */
  mainClasses() {
    return classNames(
      'carbon-carousel',
      this.props.className
    );
  }

  /**
   * Gets the props for the previous button
   *
   * @method previousButtonProps
   */
  previousButtonProps() {
    const props = {
      className: this.previousButtonClasses()
    };

    if (!this.state.disabled) {
      props.onClick = this.onPreviousClick;
    }

    return props;
  }

  /**
   * Gets the props for the next button
   *
   * @method nextButtonProps
   */
  nextButtonProps() {
    const props = {
      className: this.nextButtonClasses()
    };

    if (!this.state.disabled) {
      props.onClick = this.onNextClick;
    }

    return props;
  }

  /**
   * Gets the number of slides
   *
   * @method numOfSlides
   */
  numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  /**
   * Gets the currently visible slide
   *
   * @method visibleSlide
   */
  visibleSlide() {
    let index = this.state.selectedSlideIndex;
    const visibleSlide = compact(React.Children.toArray(this.props.children))[index],
        slideClassNames = classNames(
          'carbon-slide carbon-slide--active',
          visibleSlide.props.className,
          { 'carbon-slide--padded': this.props.enablePreviousButton || this.props.enableNextButton }
        );

    index = visibleSlide.props.id || index;

    const additionalProps = {
      className: slideClassNames,
      'data-element': 'visible-slide',
      key: `carbon-slide-${index}`
    };

    return React.cloneElement(visibleSlide, assign({}, visibleSlide.props, additionalProps));
  }

  /**
   * Renders the slideSelector footer
   *
   * @method slideSelector
   */
  slideSelector() {
    if (!this.props.enableSlideSelector) { return null; }

    const buttons = [];

    for (let i = 0; i < this.numOfSlides(); i++) {
      buttons.push(
        <span
          className='carbon-carousel__selector-inputs' key={ i }
          data-element='selector-inputs'
        >
          <input
            disabled={ this.state.disabled }
            className='carbon-carousel__selector-input'
            data-element='selector-input'
            name='carousel-slide'
            id={ `carousel-slide-${i}` }
            type='radio' value={ i }
            onChange={ this.onSlideSelection }
            checked={ this.state.selectedSlideIndex === i }
          />
          <label
            className='carbon-carousel__selector-label'
            data-element='selector-label'
            htmlFor={ `carousel-slide-${i}` }
          />
        </span>
      );
    }

    return (
      <div className={ this.slideSelectorClasses() }>
        { buttons }
      </div>
    );
  }

  /**
   * Renders the previous button
   *
   * @method previousButton
   */
  previousButton() {
    if (!this.props.enablePreviousButton) { return null; }

    return (
      <div className={ this.previousClasses() }>
        <button
          { ...this.previousButtonProps() }
          data-element='previous'
          type='button'
        >
          <Icon className='carbon-carousel__previous-arrow' type='dropdown' />
        </button>
      </div>
    );
  }

  /**
   * Renders the next button
   *
   * @method nextButton
   */
  nextButton() {
    if (!this.props.enableNextButton) { return null; }

    return (
      <div className={ this.nextClasses() }>
        <button
          { ...this.nextButtonProps() }
          data-element='next'
          type='button'
        >
          <Icon className='carbon-carousel__next-arrow' type='dropdown' />
        </button>
      </div>
    );
  }

  /**
   * Returns the current transition name
   *
   * @method transitionName
   */
  transitionName() {
    if (this.props.transition === 'slide') {
      return `slide-${this.transitionDirection}`;
    }

    return `carousel-transition-${this.props.transition}`;
  }

  /**
   * Renders the Slide Component
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses() } { ...tagComponent('carousel', this.props) }>

        <div className='carbon-carousel__content'>
          { this.previousButton() }

          <CSSTransitionGroup
            component='div'
            className='carbon-carousel__transition'
            transitionName={ this.transitionName() }
            transitionEnterTimeout={ TRANSITION_TIME }
            transitionLeaveTimeout={ TRANSITION_TIME }
          >
            { this.visibleSlide() }
          </CSSTransitionGroup>

          { this.nextButton() }
        </div>

        { this.slideSelector() }

      </div>
    );
  }
}

export { Carousel, Slide };
