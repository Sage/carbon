import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { compact, assign } from 'lodash';
import { withTheme } from 'styled-components';
import tagComponent from '../../utils/helpers/tags';
import Page from './page/page.component';
import {
  PagesWrapperStyle,
  PagesContent
} from './pages.style';
import baseTheme from '../../style/themes/base';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 500;

class Pages extends React.Component {
  constructor(...args) {
    super(...args);

    /** Direction of animation */
    this.transitionDirection = NEXT;
  }

  state = {
    // Currently selected page
    pageIndex: Number(this.props.pageIndex) || Number(this.props.initialpageIndex)
  };

  /** A lifecycle method that is called before re-render. */
  componentDidUpdate(prevProps) {
    if (this.props.pageIndex === prevProps.pageIndex) return;
    if (typeof this.props.pageIndex === 'undefined') return;

    const newIndex = this.verifyNewIndex(this.props.pageIndex);
    const currentIndex = this.state.pageIndex;

    if (newIndex === currentIndex) return;
    if (newIndex > currentIndex) {
      this.transitionDirection = NEXT;
    } else {
      this.transitionDirection = PREVIOUS;
    }

    this.handleStateUpdate(newIndex);
  }

  handleStateUpdate(newIndex) {
    this.setState({
      pageIndex: newIndex
    });
  }

  /** Verifies the new index and corrects it if necessary */
  verifyNewIndex(newIndex) {
    if (newIndex < 0) {
      // If the new index is negative, select the last page
      return this.numOfPages() - 1;
    }

    if (newIndex > this.numOfPages() - 1) {
      // If the new index is bigger than the number of slides, select the first page
      return 0;
    }

    return newIndex;
  }

  /** Gets the number of slides */
  numOfPages = () => {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  };

  /** Gets the currently visible page */
  visiblePage = () => {
    let index = this.state.pageIndex;

    const visiblePage = compact(React.Children.toArray(this.props.children))[index];

    index = visiblePage.props.id || index;

    const additionalProps = {
      transitionName: this.transitionName,
      timeout: TRANSITION_TIME,
      'data-element': 'visible-page',
      key: `carbon-page-${index}`,
      className: visiblePage.props.className
    };

    return React.cloneElement(visiblePage, assign({}, visiblePage.props, additionalProps));
  };

  /** Returns the current transition name */
  transitionName = () => {
    if (this.props.transition === 'slide') {
      return `slide-${this.transitionDirection}`;
    }

    return `carousel-transition-${this.props.transition}`;
  };

  /** Renders the Slide Component */
  render() {
    return (
      <PagesWrapperStyle className={ this.props.className } { ...tagComponent('carousel', this.props) }>
        <PagesContent className='carbon-carousel__content' theme={ this.props.theme }>
          <TransitionGroup>
            {this.visiblePage()}
          </TransitionGroup>
        </PagesContent>
      </PagesWrapperStyle>
    );
  }
}

Pages.propTypes = {
  /** [legacy] Custom className */
  className: PropTypes.string,
  /** The selected tab on page load */
  initialpageIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  pageIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /** Individual tabs */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  /** Controls which transition to use. */
  transition: PropTypes.string,
  /** theme is used only to support legacy code */
  theme: PropTypes.object
};

Pages.defaultProps = {
  initialpageIndex: 0,
  transition: 'slide',
  theme: baseTheme
};

const PagesWithHOC = withTheme(Pages);

export default Pages;

export { PagesWithHOC as Pages, Page };
