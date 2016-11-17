import React from 'react';
import classNames from 'classnames';
import TooltipDecorator from './../../utils/decorators/tooltip-decorator';
import Icons from './icons';
import { validProps } from '../../utils/ether';

/**
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * For information on how to use the Tooltip Decorator see the decorator docs.
 *
 * @class Icon
 * @constructor
 */
const Icon = TooltipDecorator(class Icon extends React.Component {

  /**
   * Checks if we have an SVG available, otherwise will fall back
   * to using the icon font.
   *
   * @method renderIcon
   * @return {HTML}
   */
  get renderIcon() {
    return Icons[this.type];
  }

  /**
   * Return component props
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = validProps(this);

    delete props.className;
    props.type = this.type;

    return props;
  }

  /**
   * Return component classes
   *
   * @method mainClasses
   * @return {String} classes
   */
  get mainClasses() {
    let icon = this.renderIcon;

    let classes = classNames(
      'carbon-icon',
      this.props.className, {
        [`icon-${this.type}`]: !icon
      }
    );
    return classes;
  }

  /**
   * Return Icon type with overrides
   *
   * @method type
   * @return {String} icon type
   */
  get type() {
    // switch tweaks icon names for actual icons in the set
    switch(this.props.type) {
      case 'help':        return 'question';
      case 'maintenance': return 'settings';
      case 'new':         return 'gift';
      case 'success':     return 'tick';
      default:            return this.props.type;
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <span
        className={ this.mainClasses }
        { ...this.componentProps }
        ref={ (comp) => this._target = comp }
      >
        { this.iconSvgHTML() }
        { this.tooltipHTML }
      </span>
    );
  }

  iconSvgHTML = () => {
    if (this.renderIcon) {
      return (<span className="carbon-icon__svg-icon" dangerouslySetInnerHTML={ this.renderIcon } />);
    }
  }
});

export default Icon;
