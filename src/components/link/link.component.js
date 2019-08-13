import React from 'react';
import PropTypes from 'prop-types';
import { assign } from 'lodash';
import { Link as RouterLink } from 'react-router';
import Icon from '../icon';
import { validProps } from '../../utils/ether';
import Event from '../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';
import { LinkStyle, LinkStyleAnchor } from './link.style';
import OptionsHelper from '../../utils/helpers/options-helper';

class Link extends React.Component {
  static safeProps = ['onClick'];

  onKeyDown = (ev) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // return early if there is no onClick or there is a href prop
    // or the event is not an enter key
    if (this.props.href || !Event.isEnterKey(ev)) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(ev);
    }
  }

  renderLinkIcon = (currentAlignment = 'left') => {
    const hasProperAlignment = this.props.icon && (this.props.iconAlign === currentAlignment);

    return hasProperAlignment ? this.icon : null;
  }

  get icon() {
    return (
      <Icon
        type={ this.props.icon }
        tooltipMessage={ this.props.tooltipMessage }
        tooltipAlign={ this.props.tooltipAlign }
        tooltipPosition={ this.props.tooltipPosition }
        bgTheme='none'
        iconColor='business-color'
        disabled={ this.props.disabled }
      />
    );
  }

  get tabIndex() {
    return this.props.tabbable && !this.props.disabled ? '0' : '-1';
  }

  get componentProps() {
    let { ...props } = validProps(this);
    props.tabIndex = this.tabIndex;

    props = assign({}, props, tagComponent('link', this.props));

    delete props.href;
    delete props.tabbable;
    delete props.to;

    props.className = this.props.className;
    props.onKeyDown = this.onKeyDown;
    props.iconAlign = this.props.iconAlign;
    return props;
  }

  /**
   * className `@carbon-link__content` is related to `ShowEditPod` component
   * */
  renderLinkContent() {
    return (
      <span>
        {this.renderLinkIcon()}

        <span className='carbon-link__content'>{this.props.children}</span>

        {this.renderLinkIcon('right')}
      </span>
    );
  }

  renderLink() {
    if (this.props.to) {
      return (
        <LinkStyleAnchor
          as={ RouterLink } to={ this.props.to }
          { ...this.componentProps }
        >
          {this.renderLinkContent()}
        </LinkStyleAnchor>
      );
    }

    return (
      <LinkStyleAnchor href={ this.props.href } { ...this.componentProps }>
        {this.renderLinkContent()}
      </LinkStyleAnchor>
    );
  }

  render() {
    return (
      <LinkStyle
        data-component='link' disabled={ this.props.disabled }
      >
        {this.renderLink()}
      </LinkStyle>
    );
  }
}

Link.propTypes = {
  /** Child content to render in the link. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** The disabled state of the link. */
  disabled: PropTypes.bool,
  /** An href for an anchor tag. */
  href: PropTypes.string,
  /** An icon to display next to the link. */
  icon: PropTypes.string,
  /** Which side of the link to the render the link. */
  iconAlign: PropTypes.string,
  /** Function called when the mouse is clicked. */
  onClick: PropTypes.func,
  /** Function called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Whether to include the link in the tab order of the page */
  tabbable: PropTypes.bool,
  /** Using `to` instead of `href` will create a React Router link rather than a web href. */
  to: PropTypes.string,
  /** A message to display as a tooltip to the link. */
  tooltipMessage: PropTypes.string,
  /** Positions the tooltip with the link. */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** Aligns the tooltip. */
  tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges)
};

Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default Link;
