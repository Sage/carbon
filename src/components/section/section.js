import React from 'react';

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
     * @type {Node}
     */
    children: React.PropTypes.node,

    /**
     * Pass a custom value for the title
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string.isRequired
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ `carbon-section ${this.props.className}` }>
        <h2 className='carbon-section__title'>{ this.props.title }</h2>
        { this.props.children }
      </div>
    );
  }
}

export default Section;
