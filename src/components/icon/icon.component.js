import React from 'react';
import PropTypes from 'prop-types';
import TooltipDecorator from '../../utils/decorators/tooltip-decorator';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import StyledIcon from './icon.style';
import OptionsHelper from '../../utils/helpers/options-helper';

class Icon extends React.Component {
  /** Return component props */
  get componentProps() {
    return validProps(this);
  }

  /** Return Icon type with overrides */
  get type() {
    // switch tweaks icon names for actual icons in the set
    switch (this.props.type) {
      case 'help':
        return 'question';
      case 'maintenance':
        return 'settings';
      case 'new':
        return 'gift';
      case 'success':
        return 'tick';
      case 'messages':
      case 'email':
        return 'message';
      default:
        return this.props.type;
    }
  }

  /** Renders the component. */
  render() {
    return [
      <StyledIcon
        bgSize={ this.props.bgSize }
        bgShape={ this.props.bgShape }
        bgTheme={ this.props.bgTheme }
        fontSize={ this.props.fontSize }
        iconColor={ this.props.iconColor }
        disabled={ this.props.disabled }
        type={ this.type }
        key='icon'
        className={ this.props.className || null }
        { ...this.componentProps }
        { ...tagComponent('icon', this.props) }
        ref={ (comp) => {
          this._target = comp;
        } }
        data-element={ this.type }
      />,
      this.tooltipHTML
    ];
  }
}

Icon.propTypes = {
  /** Add classes to this component */
  className: PropTypes.string,
  /** Icon type */
  type: PropTypes.string.isRequired,
  /** Background size */
  bgSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Background shape */
  bgShape: PropTypes.oneOf(OptionsHelper.shapes),
  /** Background color theme */
  bgTheme: PropTypes.oneOf([...OptionsHelper.colors, ...OptionsHelper.iconBackgrounds, '']),
  /** Icon font size */
  fontSize: PropTypes.oneOf(OptionsHelper.sizesBinary),
  /** Icon color */
  iconColor: PropTypes.oneOf(OptionsHelper.iconColors),
  /** Sets the icon in the disabled state */
  disabled: PropTypes.bool
};

Icon.defaultProps = {
  bgSize: 'small',
  fontSize: 'small',
  disabled: false
};

export default TooltipDecorator(Icon);
