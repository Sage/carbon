import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Event from '../../utils/helpers/events/events';
import { validProps } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';
import {
  StyledBlock,
  StyledCollapsibleContent,
  StyledContent,
  StyledDescription,
  StyledEditAction,
  StyledEditContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow
} from './pod.style.js';

class Pod extends React.Component {
  static propTypes = {
    /**
     * Enables/disables the border around the pod.
     */
    border: PropTypes.bool,

    /**
     * Children elements
     */
    children: PropTypes.node,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Determines the padding around the pod.
     * Values: 'none', 'small', 'medium' or 'large'.
     */
    padding: PropTypes.string,

    /**
     * Applies a theme to the Pod.
     * Value: primary, secondary, tile
     */
    as: PropTypes.string,

    /**
     * The collapsed state of the pod
     *
     * undefined - Pod is not collapsible
     * true - Pod is closed
     * false - Pod is open
     */
    collapsed: PropTypes.bool,

    /**
     * Title for the pod h4 element
     * always shown
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Optional subtitle for the pod
     */
    subtitle: PropTypes.string,

    /**
     * Aligns the title to left, right or center
     */
    alignTitle: PropTypes.string,

    /**
     * Description for the pod
     * Not shown if collapsed
     */
    description: PropTypes.string,

    /**
     * A component to render as a Pod footer.
     */
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Supplies an edit action to the pod.
     */
    onEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),

    /**
     * Determines if the editable pod content should be full width.
     */
    editContentFullWidth: PropTypes.bool,

    /**
     * Determines if the edit button should be hidden until the user
     * hovers over the content.
     */
    displayEditButtonOnHover: PropTypes.bool,

    /**
     * Determines if clicking the pod content calls the onEdit action
     */
    triggerEditOnContent: PropTypes.bool,

    /**
     * Resets edit button styles to an older version
     */
    internalEditButton: PropTypes.bool
  };

  static defaultProps = {
    border: true,
    as: 'primary',
    padding: 'medium',
    alignTitle: 'left'
  };

  state = {
    collapsed: this.props.collapsed
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps() {
    if (this.state.isHovered) {
      this.toggleHoverState(false);
    }
    if (this.state.isFocused) {
      this.toggleFocusState(false);
    }
  }

  podHeader() {
    if (!this.props.title) {
      return null;
    }

    const isCollapsable = this.state.collapsed !== undefined;

    return (
      <StyledHeader
        alignTitle={ this.props.alignTitle }
        internalEditButton={ this.props.internalEditButton }
        padding={ this.props.padding }
        isCollapsed={ this.state.collapsed }
        onClick={ isCollapsable && this.toggleCollapse }
      >
        <StyledTitle data-element='title'>{this.props.title}</StyledTitle>
        {this.props.subtitle && <StyledSubtitle data-element='subtitle'>{this.props.subtitle}</StyledSubtitle>}
        {isCollapsable && <StyledArrow isCollapsed={ this.state.collapsed } />}
      </StyledHeader>
    );
  }

  podDescription() {
    if (this.props.description) {
      return <StyledDescription data-element='description'>{this.props.description}</StyledDescription>;
    }
    return null;
  }

  podContent() {
    if (!this.state.collapsed) {
      return (
        <StyledCollapsibleContent>
          {this.podDescription()}
          <div>{this.props.children}</div>
        </StyledCollapsibleContent>
      );
    }
    return null;
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  footer() {
    const { footer, padding } = this.props;

    if (!this.props.footer) {
      return null;
    }

    return (
      <StyledFooter
        data-element='footer'
        padding={ padding }
        podTheme={ this.props.as }
      >
        {footer}
      </StyledFooter>
    );
  }

  edit() {
    const {
      onEdit, internalEditButton, as, padding, border, displayEditButtonOnHover
    } = this.props;

    if (!onEdit) {
      return null;
    }

    return (
      <StyledEditContainer { ...this.hoverOverEditEvents() } internalEditButton={ internalEditButton }>
        <StyledEditAction
          contentTriggersEdit={ this.props.triggerEditOnContent }
          data-element='edit'
          displayOnlyOnHover={ displayEditButtonOnHover }
          icon='edit'
          internalEditButton={ internalEditButton }
          isFocused={ this.state.isFocused }
          isHovered={ this.state.isHovered }
          noBorder={ !border }
          padding={ padding }
          podTheme={ as }
          { ...this.linkProps() }
        >
          {I18n.t('actions.edit', { defaultValue: 'Edit' })}
        </StyledEditAction>
      </StyledEditContainer>
    );
  }

  linkProps = () => {
    const { onEdit } = this.props;
    let props = {};

    if (typeof onEdit === 'string') {
      props.to = onEdit;
    } else if (typeof onEdit === 'object') {
      props = onEdit;
    }

    return props;
  };

  hoverOverEditEvents() {
    const props = {
      onMouseEnter: this.toggleHoverState.bind(this, true),
      onMouseLeave: this.toggleHoverState.bind(this, false),
      onFocus: this.toggleFocusState.bind(this, true),
      onBlur: this.toggleFocusState.bind(this, false)
    };

    if (typeof this.props.onEdit === 'function') {
      props.onClick = this.processPodEditEvent;
      props.onKeyDown = this.processPodEditEvent;
    }

    return props;
  }

  shouldContentHaveEditProps() {
    return (this.props.triggerEditOnContent || this.props.displayEditButtonOnHover) && this.props.onEdit;
  }

  processPodEditEvent = (ev) => {
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, 'keydown')) {
      ev.preventDefault();
      this.props.onEdit(ev);
    }
  };

  toggleHoverState = (val) => {
    this.setState({ isHovered: val });
  };

  toggleFocusState = (val) => {
    this.setState({ isFocused: val });
    this.setState({ isHovered: val });
  };

  render() {
    const { ...props } = validProps(this);

    return (
      <StyledPod
        { ...props }
        internalEditButton={ this.props.internalEditButton }
        { ...tagComponent('pod', this.props) }
      >
        <StyledBlock
          contentTriggersEdit={ this.shouldContentHaveEditProps() }
          editable={ this.props.onEdit }
          fullWidth={ this.props.editContentFullWidth }
          internalEditButton={ this.props.internalEditButton }
          isFocused={ this.state.isFocused }
          isHovered={ this.state.isHovered }
          noBorder={ !this.props.border }
          podTheme={ this.props.as }
          { ...(this.shouldContentHaveEditProps() ? this.hoverOverEditEvents() : {}) }
        >
          <StyledContent data-element='content' padding={ this.props.padding }>
            {this.podHeader()}
            {this.podContent()}
          </StyledContent>
          {this.footer()}
        </StyledBlock>

        {this.edit()}
      </StyledPod>
    );
  }
}

export default Pod;
