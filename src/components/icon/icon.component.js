import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TooltipDecorator from '../../utils/decorators/tooltip-decorator';
import Icons from './icons';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './icon.scss';

const Icon = TooltipDecorator(class Icon extends React.Component {
  static propTypes = {
    /** Add classes to this component */
    className: PropTypes.string,
    /** Icon type */
    type: PropTypes.string.isRequired,
    /** Background size */
    bgSize: PropTypes.oneOf(['small', 'medium', 'large']),
    /** Background shape */
    bgShape: PropTypes.oneOf(['square', 'rounded-rect', 'circle']),
    /** Background color theme */
    bgTheme: PropTypes.string
  };

  static defaultProps = {
    bgSize: 'small'
  };

  /** Checks if we have an SVG available, otherwise will fall back to using the icon font. */
  get renderIcon() {
    return Icons[this.type];
  }

  /** Return component props */
  get componentProps() {
    const { ...props } = validProps(this);

    delete props.className;
    delete props.bgSize;
    delete props.bgShape;
    delete props.bgTheme;
    delete props.tooltipType;
    delete props.tooltipVisible;

    return props;
  }

  /** Return component classes */
  get mainClasses() {
    const icon = this.renderIcon;
    const hasShape = this.props.bgShape || this.props.bgTheme;

    const classes = classNames(
      'carbon-icon',
      this.props.className, {
        [`icon-${this.type}`]: !icon
      }, {
        'carbon-icon--shape': hasShape,
        [`carbon-icon--${this.props.bgSize}`]: hasShape,
        [`carbon-icon--${this.props.bgShape}`]: this.props.bgShape,
        [`carbon-icon--${this.props.bgTheme}`]: this.props.bgTheme
      }
    );
    return classes;
  }

  /** Return Icon type with overrides */
  get type() {
    // switch tweaks icon names for actual icons in the set
    switch (this.props.type) {
      case 'help': return 'question';
      case 'maintenance': return 'settings';
      case 'new': return 'gift';
      case 'success': return 'tick';
      default: return this.props.type;
    }
  }

  /** Renders the component. */
  render() {
    return [
      <span
        key='icon'
        className={ this.mainClasses }
        { ...this.componentProps }
        { ...tagComponent('icon', this.props) }
        ref={ (comp) => { this._target = comp; } }
        data-element={ this.type }
      >
        { this.iconSvgHTML() }
      </span>,
      this.tooltipHTML
    ];
  }

  iconSvgHTML = () => {
    const icon = this.renderIcon;
    if (icon) {
      /* eslint-disable react/no-danger */
      return (
        <span className='carbon-icon__svg-icon' dangerouslySetInnerHTML={ icon } />
      );
      /* eslint-enable react/no-danger */
    }

    return null;
  }
});

export default Icon;
