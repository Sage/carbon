import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';

/**
 * A Banner widget.
 *
 * == How to use a Banner in a component:
 *
 * In your file:
 *
 *   import Banner from 'carbon/lib/components/banner';
 *
 * To render the Banner:
 *
 *   <Banner title="This is a title" open={ true }>
 *     My banner content
 *   </Banner>
 *
 * Additionally you can pass optional props to the Banner component
 *
 *   as: Customizes the appearence of the banner changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 *   buttonText: allows you to customize the button text.
 *
 * @class Banner
 * @constructor
 */
class Banner extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through colour
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'error'
     */
    as: React.PropTypes.string,

    /**
     * Determines if the banner is open.
     *
     * @property open
     * @type {Boolean}
     * @default true
     */
    open: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'error',
    open: true
  }

  /**
   * Classes to be applied to the component.
   *
   * @method componentClasses
   */
  get componentClasses() {
    return classNames(
      'ui-banner',
      this.props.className,
      'ui-banner--' + this.props.as
    );
  }

  get titleHTML() {
    if (this.props.title) {
      return(
        <div className='ui-banner__title'>
          { this.props.title }
        </div>
      );
    }
  }

  get bannerContent() {
    return this.props.open ? (
      <div className={ this.componentClasses }>
        <div className="ui-banner__type">
          <Icon className="ui-banner__type-icon" type={ this.props.as } />
        </div>
        <div className="ui-banner__content">
          { this.titleHTML }
          <div className="ui-banner__body">
            { this.props.children }
          </div>
        </div>
      </div>
    ) : null;
  }

  render() {
    return (this.bannerContent);
  }
}

export default Banner;
