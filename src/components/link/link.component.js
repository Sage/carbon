import React from "react";
import PropTypes from "prop-types";
import Icon from "../icon";
import Event from "../../utils/helpers/events";
import LinkStyle from "./link.style";
import OptionsHelper from "../../utils/helpers/options-helper";
import tagComponent from "../../utils/helpers/tags";

class InternalLink extends React.Component {
  static safeProps = ["onClick"];

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
  };

  renderLinkIcon = (currentAlignment = "left") => {
    const hasProperAlignment =
      this.props.icon && this.props.iconAlign === currentAlignment;

    return hasProperAlignment ? this.icon : null;
  };

  get icon() {
    return (
      <Icon
        type={this.props.icon}
        bgTheme="none"
        iconColor="business-color"
        disabled={this.props.disabled}
        ariaLabel={this.props.ariaLabel}
        tooltipMessage={this.props.tooltipMessage}
        tooltipPosition={this.props.tooltipPosition}
      />
    );
  }

  get tabIndex() {
    return this.props.tabbable && !this.props.disabled ? "0" : "-1";
  }

  get componentProps() {
    return {
      onKeyDown: this.onKeyDown,
      onMouseDown: this.props.onMouseDown,
      disabled: this.props.disabled,
      onClick: this.handleClick,
      tabIndex: this.tabIndex,
      target: this.props.target,
      ref: this.props.innerRef,
      href: this.props.href,
      rel: this.props.rel,
    };
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
      {this.renderLinkIcon()}

      <span className="carbon-link__content">
        {this.props.isSkipLink ? "Skip to main content" : this.props.children}
      </span>

      {this.renderLinkIcon("right")}
    </>
  );

  createLinkBasedOnType = () => {
    let type = "a";

    if (this.props.onClick) {
      type = "button";
    }

    return React.createElement(
      type,
      { ...this.componentProps },
      this.linkContent()
    );
  };

  render() {
    const { disabled, className, iconAlign, children, isSkipLink } = this.props;

    return (
      <LinkStyle
        isSkipLink={isSkipLink}
        disabled={disabled}
        className={className}
        iconAlign={iconAlign}
        hasContent={Boolean(children)}
        {...tagComponent("link", this.props)}
        {...(isSkipLink && { "data-element": "skip-link" })}
      >
        {this.createLinkBasedOnType()}
      </LinkStyle>
    );
  }
}

InternalLink.propTypes = {
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
  /** A message to display as a tooltip to the link. */
  tooltipMessage: PropTypes.string,
  /** Positions the tooltip with the link. */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** Allows to create skip link */
  isSkipLink: PropTypes.bool,
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target: PropTypes.string,
  /** Ref to be forwarded
   * @ignore
   * @private
   */
  innerRef: PropTypes.object,
  /** Aria label for accessibility purposes */
  ariaLabel: PropTypes.string,
  /** allows to set rel property in <a> tag */
  rel: PropTypes.string,
};

InternalLink.defaultProps = {
  iconAlign: "left",
  tabbable: true,
  hasContent: true,
};

const Link = React.forwardRef((props, ref) => (
  <InternalLink innerRef={ref} {...props} />
));

Link.defaultProps = InternalLink.defaultProps;
Link.propTypes = InternalLink.propTypes;
Link.displayName = "Link";

export { InternalLink };
export default Link;
