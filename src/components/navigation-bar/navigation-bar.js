import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppWrapper from './../app-wrapper';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * Renders a full width application bar.
 */
class NavigationBar extends React.Component {
  static propTypes = {
    /**
     * Determines the style of the component eg. primary/secondary
     *
     * @property as
     * @type {String}
     * @default primary
     */
    as: PropTypes.string
  }

  static defaultProps = {
    as: "primary"
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-navigation-bar",
      this.props.className,
      `carbon-navigation-bar--${this.props.as}`
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes } { ...tagComponent('navigation-bar', this.props) }>
        <AppWrapper className="carbon-navigation-bar__content">
          { this.props.children }
        </AppWrapper>
      </div>
    );
  }
}

export default NavigationBar;
