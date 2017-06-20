import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { compact, assign } from 'lodash';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';

import Icon from './../icon';

import Slide from './slide';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 750;

class Carousel extends React.Component {
  static propTypes = {

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The selected tab on page load
     *
     * @property initialSelectedTabId
     * @type {String}
     * @default firstTab
     */
    initialSlideIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /**
     * Individual tabs
     *
     * @property children
     * @type {Object | Array}
     */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),

    /**
     * Enables the slide selector
     *
     * @property enableSlideSelector
     * @type {Boolean}
     */
    enableSlideSelector: PropTypes.bool
  }

  static defaultProps = {
    initialSlideIndex: 0,
    enableSlideSelector: true
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
    const selectedIndex = Number(this.props.initialSlideIndex);
    this.setState({ selectedSlideIndex: selectedIndex });
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
    this.setState({ disabled: true, selectedSlideIndex: newIndex });
    this.enableButtonsAfterTimeout();
  }

  /**
   * Handles clicking on the next button
   *
   * @method onNextClick
   */
  onNextClick() {
    const newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides();
    this.transitionDirection = NEXT;
    this.setState({ disabled: true, selectedSlideIndex: newIndex });
    this.enableButtonsAfterTimeout();
  }

  /**
   * Handles clicking slide selector
   *
   * @method onSlideSelection
   */
  onSlideSelection(ev) {
    const newSlideSelection = Number(ev.target.value);
    this.transitionDirection = newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
    this.setState({ disabled: true, selectedSlideIndex: newSlideSelection });
    this.enableButtonsAfterTimeout();
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
    return classNames(
      'carbon-carousel__selector'
    );
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
    const index = this.state.selectedSlideIndex;
    const visibleSlide = compact(React.Children.toArray(this.props.children))[index];

    const additionalProps = {
      className: classNames('carbon-slide carbon-slide--active', visibleSlide.props.className),
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
    if(this.props.enableSlideSelector) {
      const buttons = [];

      for (let i = 0; i < this.numOfSlides(); i++) {
        buttons.push(
          <span className='carbon-carousel__selector-inputs' key={ i } data-element='selector-inputs'>
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

      return buttons;
    }
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

          <div className={ this.previousClasses() }>
            <button { ...this.previousButtonProps() } data-element='previous'>
              <Icon className='carbon-carousel__previous-arrow' type='dropdown' />
            </button>
          </div>

          <ReactCSSTransitionGroup
            transitionName={ `slide-${this.transitionDirection}` }
            transitionEnterTimeout={ TRANSITION_TIME }
            transitionLeaveTimeout={ TRANSITION_TIME }
          >
            { this.visibleSlide() }
          </ReactCSSTransitionGroup>

          <div className={ this.nextClasses() }>
            <button { ...this.nextButtonProps() } data-element='next'>
              <Icon className='carbon-carousel__next-arrow' type='dropdown' />
            </button>
          </div>
        </div>

        <div className={ this.slideSelectorClasses() }>
          { this.slideSelector() }
        </div>

      </div>
    );
  }
}

export { Carousel, Slide };
