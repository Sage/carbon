import React from 'react';
import classNames from 'classnames';

/**
 * A section wrapper.
 *
 * This is a standalone section wrapper used for layout.
 *
 * == How to use a Section in a component:
 *
 * In your file
 *
 *   import Section from 'carbon/lib/components/section';
 *
 * To render the Section:
 *
 *   <Section />
 *
 * @class Section
 * @constructor
 */
class Section extends React.Component {

  static propTypes = {

    /**
     * The elements to be rendered in the section
     *
     * @property children
     * @type {Object | Array}
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),

    /**
     * Pass a custom value for the title
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string.isRequired
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-section',
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <h2>{ this.props.title }</h2>
        { this.props.children }
      </div>
    );
  }
}

export default Section;
