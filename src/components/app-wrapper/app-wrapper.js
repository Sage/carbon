import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * Manages the width and containment of your application.
 */
class AppWrapper extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string
  };

  constructor(...args) {
    super(...args);
    this.classes = this.classes.bind(this);
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes() } { ...tagComponent('app-wrapper', this.props) }>
        { this.props.children }
      </div>
    );
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  classes() {
    return classNames(
      'carbon-app-wrapper',
      this.props.className
    );
  }
}

export default AppWrapper;
