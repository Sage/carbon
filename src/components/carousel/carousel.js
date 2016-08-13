import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { compact, assign } from 'lodash';
import classNames from 'classnames';

import Icon from './../icon';

import Slide from './slide';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 750;

class Carousel extends React.Component {

  /**
   * Direction of animation
   *
   * @property transitionDirection
   */
  transitionDirection = NEXT;

  static propTypes = {

    /**
     * The selected tab on page load
     *
     * @property initialSelectedTabId
     * @type {String}
     * @default firstTab
     */
    initialSlideIndex: React.PropTypes.number,

    /**
     * Individual tabs
     *
     * @property children
     * @type {Object | Array}
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ])
  }

  state = {
    selectedSlideIndex: null, // Currently selected slide
    disabled: false // Next/Previous buttons disabled state
  }

  /**
   * A lifecycle method that is called after before initial render.
   * Can set up state of component without causing a re-render
   *
   * @method componentWillMount
   */
  componentWillMount() {
    let selectedIndex = this.props.initialSlideIndex || 0;

    this.setState({ selectedSlideIndex: selectedIndex });
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
   * Handles clicking on the previous button
   *
   * @method onPreviousClick
   */
  onPreviousClick = () => {
    let newIndex = this.state.selectedSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.numOfSlides - 1;
    }
    this.transitionDirection = PREVIOUS;
    this.setState({ disabled: true, selectedSlideIndex: newIndex });
    this.enableButtonsAfterTimeout();
  }

  /**
   * Handles clicking on the next button
   *
   * @method onNextClick
   */
  onNextClick = () => {
    let newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides;
    this.transitionDirection = NEXT;
    this.setState({ disabled: true, selectedSlideIndex: newIndex });
    this.enableButtonsAfterTimeout();
  }

  /**
   * Handles clicking slide selector
   *
   * @method onSlideSelection
   */
  onSlideSelection = (ev) => {
    let newSlideSelection = Number(ev.target.value);
    this.transitionDirection = newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
    this.setState({ disabled: true, selectedSlideIndex: newSlideSelection });
    this.enableButtonsAfterTimeout();
  }

  /**
   * Gets the main classes
   *
   * @method mainClasses
   */
  get mainClasses() {
    return classNames(
      'ui-carousel',
      this.props.className
    );
  }

  /**
   * Gets the next div classes
   *
   * @method nextClasses
   */
  get nextClasses() {
    return classNames(
      'ui-carousel__navigation',
      'ui-carousel__next'
    );
  }

  /**
   * Gets the previous div classes
   *
   * @method previousClasses
   */
  get previousClasses() {
    return classNames(
      'ui-carousel__navigation',
      'ui-carousel__previous'
    );
  }

  /**
   * Gets the previous button classes
   *
   * @method previousButtonClasses
   */
  get previousButtonClasses() {
    return classNames(
      'ui-carousel__buttons',
      'ui-carousel__previous-button'
    );
  }

  /**
   * Gets the next button classes
   *
   * @method nextButtonClasses
   */
  get nextButtonClasses() {
    return classNames(
      'ui-carousel__buttons',
      'ui-carousel__next-button'
    );
  }

  /**
   * Gets the slide selector footer classes
   *
   * @method nextButtonClasses
   */
  get slideSelectorClasses() {
    return classNames(
      'ui-carousel__selector'
    );
  }

  /**
   * Gets the props for the previous button
   *
   * @method previousButtonProps
   */
  get previousButtonProps() {
    let props = {
      className: this.previousButtonClasses
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
  get nextButtonProps() {
    let props = {
      className: this.nextButtonClasses
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
  get numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  /**
   * Gets the currently visible slide
   *
   * @method visibleSlide
   */
  get visibleSlide() {
    let index = this.state.selectedSlideIndex;
    let visibleSlide = compact(React.Children.toArray(this.props.children))[index];

    let additionalProps = {
      className: classNames('ui-slide ui-slide--active', visibleSlide.props.className),
      key: `ui-slide-${ index }`
    };

    return React.cloneElement(visibleSlide, assign({}, visibleSlide.props, additionalProps));
  }

  /**
   * Renders the slideSelector footer
   *
   * @method slideSelector
   */
  get slideSelector() {
    let buttons = [];

    for(let i = 0; i < this.numOfSlides; i++) {
      buttons.push(
        <span className='ui-carousel__selector-inputs' key={ i }>
          <input
            disabled={ this.state.disabled }
            className='ui-carousel__selector-input'
            name='carousel-slide'
            id={ `carousel-slide-${i}` }
            type='radio' value={ i }
            onChange={ this.onSlideSelection }
            checked={ this.state.selectedSlideIndex === i }
          />
          <label
            className='ui-carousel__selector-label'
            htmlFor={ `carousel-slide-${i}` }
          />
        </span>
      );
    }

    return buttons;
  }

  /**
   * Renders the Slide Component
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        <div className='ui-carousel__content'>

          <div className={ this.previousClasses }>
            <button { ...this.previousButtonProps }>
              <Icon className='ui-carousel__previous-arrow' type='dropdown' />
            </button>
          </div>

          <ReactCSSTransitionGroup
            transitionName={ `slide-${ this.transitionDirection }` }
            transitionEnterTimeout={ TRANSITION_TIME }
            transitionLeaveTimeout={ TRANSITION_TIME }
          >
            { this.visibleSlide }
          </ReactCSSTransitionGroup>

          <div className={ this.nextClasses }>
            <button { ...this.nextButtonProps }>
              <Icon className='ui-carousel__next-arrow' type='dropdown' />
            </button>
          </div>
        </div>

        <div className={ this.slideSelectorClasses }>
          { this.slideSelector }
        </div>

      </div>
    );
  }
}

export { Carousel, Slide };
