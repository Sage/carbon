import React from 'react';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';
import Button from './../button';
import Icon from './../icon';

class Carousel extends React.Component {

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

  /**
   * A lifecycle method that is called after before initial render.
   * Can set up state of component without causing a re-render
   *
   * @method componentWillMount
   */
  componentWillMount() {
    let selectedIndex = this.props.initialSlideIndex || 0

    this.setState({ selectedSlideIndex: selectedIndex });
  }

  onPreviousClick = () => {
    let newIndex = this.state.selectedSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.numOfSlides - 1;
    }
    this.setState({ selectedSlideIndex: newIndex });
  }

  onNextClick = () => {
    let newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides;
    this.setState({ selectedSlideIndex: newIndex });
  }

  onSlideSelection = (ev) => {
    this.setState({ selectedSlideIndex: Number(ev.target.value) });
  }

  get mainClasses() {
    return classNames(
      'ui-carousel'
    );
  }

  get nextClasses() {
    return classNames(
      'ui-carousel__navigation',
      'ui-carousel__next'
    );
  }

  get previousClasses() {
    return classNames(
      'ui-carousel__navigation',
      'ui-carousel__previous'
    );
  }

  get previousButtonClasses() {
    return classNames(
      'ui-carousel__buttons',
      'ui-carousel__previous-button'
    );
  }

  get nextButtonClasses() {
    return classNames(
      'ui-carousel__buttons',
      'ui-carousel__next-button'
    );
  }

  get slideSelectorClasses() {
    return classNames(
      'ui-carousel__selector'
    );
  }

  get numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  get visibleSlide() {
    let visibleSlide = compact(React.Children.toArray(this.props.children))[this.state.selectedSlideIndex]
    return React.cloneElement(visibleSlide, { className: 'ui-slide ui-slide--active' });
  }

  get slideSelector() {
    let buttons = [];

    for(let i = 0; i < this.numOfSlides; i++) {
      buttons.push(
        <span key={ i }>
          <input
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
          >
          </label>
        </span>
      );
    }

    return buttons;
  }

  render() {
    return (
      <div className={ this.mainClasses }>

        <div className='ui-carousel__content'>
          <div className={ this.previousClasses }>
            <button onClick={ this.onPreviousClick } className={ this.previousButtonClasses } >
              <Icon className='ui-carousel__previous-arrow' type='dropdown' />
            </button>
          </div>

          { this.visibleSlide }

          <div className={ this.nextClasses }>
            <button onClick={ this.onNextClick } className={ this.nextButtonClasses } >
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

export default Carousel
