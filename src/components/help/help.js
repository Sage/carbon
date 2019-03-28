import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import './help.scss';

class Help extends React.Component {
  static propTypes = {

    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * Message to display in tooltip
     */
    children: PropTypes.string,

    /**
     * Position of tooltip relative to target
     */
    tooltipPosition: PropTypes.string,

    /**
     * Aligment of pointer
     */
    tooltipAlign: PropTypes.string,

    /**
     * A path for the anchor
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
}

export default Help;
