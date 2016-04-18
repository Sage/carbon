import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';
import TooltipIDecorator from './../../utils/decorators/tooltip-decorator';
/**
 * A Help widget.
 *
 * == How to use a Help in a component:
 *
 * In your file
 *
 *   import Help from 'carbon/lib/components/help';
 *
 * To render a help component:
 *
 *   <Help tooltipMessage={ this.props.tooltipMessage } />
 *
 *  You can also pass additional props of tooltipPosition and pointerAlign.
 *
 * @class Help
 * @constructor
 * @decorators {TooltipIDecorator}
 */
const Help = TooltipIDecorator(class Help extends React.Component{

  static propTypes = {
    /**
     * Sets the checked state of the checkbox
     *
     * @property defaultChecked
     * @type {String}
     */
    tooltipMessage: React.PropTypes.string.isRequired,

    /**
     * Position of tooltip relative to
     *
     * @property tooltipPosition
     * @type {String} Options: { top, bottom, right, left }
     * @default top
     */
    tooltipPosition: React.PropTypes.string,

    /**
     * Aligment of pointer
     *
     * @property pointerAlign
     * @type {String} Options: { top, bottom, right, left, center }
     * @default center
     */
    pointerAlign: React.PropTypes.string,

    /**
     * Whether to display the help component inline
     *
     * @property inline
     * @type {Boolean}
     * @default false
     */
    inline: React.PropTypes.bool
  };

  static defaultProps = {
    inline: false
  }
  /**
   * Return component classes
   *
   * @method mainClasses
   * @return {String} classes
   */
  get mainClasses() {
    return classNames(
      'ui-help',
      {'ui-help--inline': this.props.inline },
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
        <Icon
          type='info'
          tooltipMessage={ this.props.tooltipMessage }
          tooltipPosition={ this.props.tooltipPosition }
          pointerAlign={ this.props.pointerAlign } />
      </div>
    );
  }
});

export default Help;
