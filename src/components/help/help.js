import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../icon';
import TooltipDecorator from './../../utils/decorators/tooltip-decorator';
import tagComponent from '../../utils/helpers/tags';

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
 *   <Help>{ this.props.helpMessage }</Help>
 *
 *  You can also pass additional props of tooltipPosition and tooltipAlign.
 *
 * @class Help
 * @constructor
 * @decorators {TooltipDecorator}
 */
const Help = TooltipDecorator(class Help extends React.Component {

  static propTypes = {

    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Message to display in tooltip
     *
     * @property children
     * @type {String}
     */
    children: PropTypes.string,

    /**
     * Position of tooltip relative to target
     *
     * @property tooltipPosition
     * @type {String} Options: { top, bottom, right, left }
     * @default top
     */
    tooltipPosition: PropTypes.string,

    /**
     * Aligment of pointer
     *
     * @property tooltipAlign
     * @type {String} Options: { top, bottom, right, left, center }
     * @default center
     */
    tooltipAlign: PropTypes.string,

    /**
     * A path for the anchor
     *
     * @property href
     * @type {String}
     */
    href: PropTypes.string
  };

  static defaultProps = {
    tooltipPosition: 'top',
    tooltipAlign: 'center'
  }

  /**
   * Return component classes
   *
   * @method mainClasses
   * @return {String} classes
   */
  get mainClasses() {
    return classNames(
      'carbon-help',
      { 'carbon-help__href': this.props.href },
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
      <a
        className={ this.mainClasses }
        href={ this.props.href }
        target='_blank'
        rel='noopener noreferrer'
        { ...tagComponent('help', this.props) }
      >
        <Icon
          type='help'
          tooltipMessage={ this.props.children }
          tooltipPosition={ this.props.tooltipPosition }
          tooltipAlign={ this.props.tooltipAlign }
        />
      </a>
    );
  }
});

export default Help;
