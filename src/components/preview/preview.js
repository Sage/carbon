import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
* A Preview widget.
*
* == How to use a Preview in a component:
*
* In your file:
*
*   import Preview from 'carbon/lib/components/preview'
*
* To render the Preview:
*
*   <Preview>
*     My text content
*   </Preview>
*
*
*
* @class Text
* @constructor
*/
class Preview extends React.Component {
  static propTypes = {
    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * The bool attribute to use for the text
     *
     * @property id
     * @type {Boolean}
     */
    loading: PropTypes.bool
  };

  static defaultProps = {
    className: ''
  };

  /**
   * Main classes
   *
   * @method mainClasses
   * @return {String} classNames for text
   */
  get mainClasses() {
    return classNames(
      'carbon-preview',
      { 'carbon-preview--placeholder': this.isLoading },
      this.props.className
    );
  }

  get isLoading () {
    if (typeof this.props.loading !== 'undefined') {
      return this.props.loading;
    }

    return !this.props.children;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        { this.props.children }
      </div>
    );
  }
}

export default Preview;
