import React from 'react';
import Button from './../button';
import classNames from 'classnames';
import Icon from './../icon';

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
 *   <Banner
 *      title="This is a title"
 *      message="This is my message."
 *      buttonAction={ this.handleButtonClick } />
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
     * Customizes the appearance through icon and colour
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'info'
     */
    as: React.PropTypes.string,

    /**
     * Title to be displayed.
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string.isRequired,

    /**
     * Message to be displayed.
     *
     * @property message
     * @type {String}
     */
    message: React.PropTypes.string.isRequired,

    /**
     * Text to display on button.
     *
     * @property buttonText
     * @type {String}
     * @default 'Got it!'
     */
    buttonText: React.PropTypes.string,

    /**
     * The action to trigger on click.
     *
     * @property buttonAction
     * @type {func}
     */
    buttonAction: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    as: 'info',
    buttonText: 'Got it!'
  }

  /**
   * Classes for the banner
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-banner',
      `carbon-banner--${this.props.as}`,
      this.props.className
    );
  }

  /**
   * Classes for the button action
   *
   * @method buttonClasses
   * @return {String} classNames for button
   */
  get buttonClasses() {
    return classNames(
      'carbon-banner__action',
      `carbon-banner__action--${this.props.as}`
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <div className="carbon-banner__content">
          <Icon className="carbon-banner__icon" type={ this.props.as } />

          <div className='carbon-banner__info'>
            <div className='carbon-banner__title'>
              { this.props.title }
            </div>

            <div className='carbon-banner__message'>
              { this.props.message }
            </div>
          </div>

          <Button onClick={ this.props.buttonAction } className={ this.buttonClasses }>
            { this.props.buttonText }
          </Button>
        </div>
      </div>
    );
  }
}

export default Banner;
