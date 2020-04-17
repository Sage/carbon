import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Event from '../../utils/helpers/events';
import LinkStyle from './link.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import tagComponent from '../../utils/helpers/tags';

class Link extends React.Component {
  static safeProps = ['onClick'];

  onKeyDown = (ev) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // return early if there is no onClick or there is a href prop
    // or the event is not an enter key
    if (this.props.href || (!Event.isEnterKey(ev) && !Event.isSpaceKey(ev))) {
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
    const props = {
      onKeyDown: this.onKeyDown,
      onMouseDown: this.props.onMouseDown,
      disabled: this.props.disabled,
      onClick: this.handleClick,
      tabIndex: this.tabIndex
    };

    if (this.props.to) {
      props.to = this.props.to;
    } else {
      props.href = this.props.href;
    }

    return props;
  }

  handleClick = (ev) => {
    if (this.props.disabled) {
      ev.preventDefault();
    } else if (this.props.onClick) {
      this.props.onClick(ev);
    }
  };

  /**
   * className `@carbon-link__content` is related to `ShowEditPod` component
   * */

  linkContent = () => (
    <>
      { this.renderLinkIcon() }

      <span className='carbon-link__content'>{this.props.children}</span>

      { this.renderLinkIcon('right') }
    </>
  )

  createLinkBasedOnType = () => {
    let type = 'a';

    if (this.props.to && this.props.routerLink) {
      type = this.props.routerLink;
    } else if (this.props.onClick) {
      type = 'button';
    }

    return React.createElement(
      type,
      { ...this.componentProps },
      this.linkContent()
    );
  }

  render() {
    const {
      disabled, className, iconAlign
    } = this.props;

    return (
      <LinkStyle
        disabled={ disabled }
        className={ className }
        iconAlign={ iconAlign }
        { ...tagComponent('link', this.props) }
      >
        {this.createLinkBasedOnType()}
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
  /** Function called when a mouse down event triggers. */
  onMouseDown: PropTypes.func,
  /** Whether to include the link in the tab order of the page */
  tabbable: PropTypes.bool,
  /** Using `to` an passing in a component to the `routerLink` prop will render a routing link instead of a web href. */
  to: PropTypes.string,
  /** A message to display as a tooltip to the link. */
  tooltipMessage: PropTypes.string,
  /** Positions the tooltip with the link. */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** Aligns the tooltip. */
  tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  /** A routing component to render when the to prop is set */
  routerLink: PropTypes.func
};

Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default Link;
