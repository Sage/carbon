import React from 'react';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';
import Button from './../button';

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

  get numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  get visibleSlide() {
    let visibleSlide = compact(React.Children.toArray(this.props.children))[this.state.selectedSlideIndex]

    return React.cloneElement(visibleSlide, { className: 'ui-slide--active' });
  }

  get slideSelector() {
    let buttons = [];

    for(let i = 0; i < this.numOfSlides; i++) {
      buttons.push(
        <span key={ i }>
          <input
            name='carousel-slide'
            id={ `carousel-slide-${i}` }
            type='radio' value={ i }
            onChange={ this.onSlideSelection }
            checked={ this.state.selectedSlideIndex === i }
          />
          <label name='carousel-slide' htmlFor={ `carousel-slide-${i}` }/>
        </span>
      );
    }

    return buttons;
  }

  render() {
    return (
      <div>
        <div>
          <Button onClick={ this.onPreviousClick }>Previous</Button>
        </div>
        { this.visibleSlide }
        <div>
          <Button onClick={ this.onNextClick }>Next</Button>
        </div>
        { this.slideSelector }
      </div>
    );
  }
}

export default Carousel
