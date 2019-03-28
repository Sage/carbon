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

class Link extends React.Component {
  static safeProps = ['onClick'];

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(ev) {
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
    return this.props.tabbable && this.props.disabled ? '-1' : '0';
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

  renderLinkContent() {
    return (
      <span>
        {this.renderLinkIcon()}

        <span>{this.props.children}</span>

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
      <LinkStyle disabled={ this.props.disabled }>
        {this.renderLink()}
      </LinkStyle>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconAlign: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabbable: PropTypes.bool,
  to: PropTypes.string,
  tooltipMessage: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipAlign: PropTypes.string
};

Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default Link;
