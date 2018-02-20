import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
* A Text widget.
*
* == How to use a Text in a component:
*
* In your file:
*
*   import Text from 'carbon/lib/components/text'
*
* To render the Text:
*
*   <Text preloading={ true }>
*     My text content
*   </Text>
*
*
* You can pass a prop of 'preloading' to the component which shifts the alignment of the pointer.
* This defaults to 'false'.
*
* @class Text
* @constructor
*/
class Text extends React.Component {
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
    isVisible: PropTypes.bool,

    /**
     * The preloading  to use for the text
     *
     * @property preloading
     * @type {Boolean}
     */
    preloading: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    isVisible: true,
    preloading: false
  };

  /**
   * Main classes
   *
   * @method mainClasses
   * @return {String} classNames for text
   */
  get mainClasses() {
    return classNames(
      'carbon-text',
      { 'carbon-text--preloading': this.props.preloading },
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

export default Text;
