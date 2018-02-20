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
     * The id attribute to use for the text
     *
     * @property id
     * @type {String}
     */
    id: PropTypes.string,

    /**
     * The isVisible attribute to use for the text
     *
     * @property id
     * @type {String}
     */
    isVisible: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    isVisible: true
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
      { 'carbon-preview--placeholder': !this.props.children },
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    if (!this.props.isVisible) { return null; }
    return (<div id={ this.props.id } className={ this.mainClasses }>{ this.props.children }</div>);
  }
}

export default Preview;
