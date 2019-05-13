import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import { Link as RouterLink } from 'react-router';
import Icon from '../icon';
import { validProps } from '../../utils/ether';
import Event from '../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';
import LinkStyle from './link.style';
import './link.scss';

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
    const classes = classNames(
      'carbon-link__icon',
      `carbon-link__icon--align-${this.props.iconAlign}`
    );

    return (
      <Icon
        type={ this.props.icon }
        className={ classes }
        tooltipMessage={ this.props.tooltipMessage }
        tooltipAlign={ this.props.tooltipAlign }
        tooltipPosition={ this.props.tooltipPosition }
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
        <RouterLink to={ this.props.to } { ...this.componentProps }>
          {this.renderLinkContent()}
        </RouterLink>
      );
    }

    return (
      <a href={ this.props.href } { ...this.componentProps }>
        {this.renderLinkContent()}
      </a>
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
  tooltipPosition: PropTypes.string,
  /** Aligns the tooltip. */
  tooltipAlign: PropTypes.string
};

Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default Link;
