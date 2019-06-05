import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import Button from '../button';
import StyledSplitButton from './split-button.style';
import StyledSplitButtonToggle from './split-button-toggle.style';
import StyledSplitButtonChildrenContainer from './split-button-children.style';
import { validProps } from '../../utils/ether/ether';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';
import guid from '../../utils/helpers/guid';

class SplitButton extends Component {
  constructor(props) {
    super(props);
    this.buttonLabelId = guid();
    this.additionalButtons = [];
    this.listening = false;
    this.isToggleButtonFocused = false;
    this.userInputType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
  }

  state = {
    showAdditionalButtons: false
  }

  splitButtonNode = React.createRef();

  focusToggleButton = () => {
    this.isToggleButtonFocused = true;
    this.showButtons();
  }

  showButtons = () => {
    document.addEventListener(this.userInputType, this.handleClickOutside);
    this.setState({ showAdditionalButtons: true });

    if (!this.listening) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.listening = true;
    }
  }

  hideButtons = () => {
    if (this.isToggleButtonFocused) return;

    this.setState({ showAdditionalButtons: false });
    document.removeEventListener(this.userInputType, this.handleClickOutside);

    if (this.listening) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.listening = false;
    }
  }

  handleClickOutside = (ev) => {
    if (!this.splitButtonNode.current.contains(ev.target)) {
      this.hideButtons();
    }
  }

  isActiveElement(node) {
    return node === document.activeElement;
  }

  handleKeyDown = (ev) => {
    const { children } = this.props;
    const currentIndex = this.additionalButtons.findIndex(this.isActiveElement);
    let nextIndex = -1;
    if (Events.isUpKey(ev)) {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
      ev.preventDefault();
    } if (Events.isDownKey(ev)) {
      nextIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
      ev.preventDefault();
    } else if (Events.isTabKey(ev)) {
      // timeout enforces thet the "hideButtons" method will be run after browser focuses on the next element
      setTimeout(this.hideButtons, 0);
    }

    if (nextIndex > -1) {
      this.additionalButtons[nextIndex].focus();
    }
  }

  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.onFocus = this.hideButtons;
    props.onTouchStart = this.hideButtons;

    return props;
  }

  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      displayed: this.state.showAdditionalButtons,
      onTouchStart: this.showButtons,
      onFocus: this.focusToggleButton,
      onBlur: () => { this.isToggleButtonFocused = false; },
      onKeyDown: this.handleToggleButtonKeyDown,
      buttonType: this.props.buttonType || this.props.as,
      size: this.props.size
    };

    if (!this.props.disabled) {
      opts.onMouseEnter = this.showButtons;
    }

    return opts;
  }

  componentTags = () => {
    return {
      'data-component': 'split-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }

  addRef(ref, index) {
    if (!ref) return;
    this.additionalButtons[index] = ref;
  }

  get renderMainButton() {
    return [
      <Button
        data-element='main-button'
        key='main-button'
        id={ this.buttonLabelId }
        { ...this.mainButtonProps }
      >
        { this.props.text}
      </Button>,
      <StyledSplitButtonToggle
        aria-haspopup='true'
        aria-expanded={ this.state.showAdditionalButtons }
        aria-label='Show more'
        data-element='toggle-button'
        key='toggle-button'
        { ...this.toggleButtonProps }
      >
        <Icon type='dropdown' />
      </StyledSplitButtonToggle>
    ];
  }

  handleToggleButtonKeyDown = (ev) => {
    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      this.additionalButtons[0].focus();
    }
  }

  childrenWithProps() {
    const { children } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.map((child, index) => {
      const props = {
        key: index.toString(),
        role: 'menu-item',
        ref: button => this.addRef(button, index),
        tabIndex: -1
      };
      return React.cloneElement(child, props);
    });
  }

  get renderAdditionalButtons() {
    const children = this.childrenWithProps();

    if (!this.state.showAdditionalButtons) return null;

    return (
      <StyledSplitButtonChildrenContainer
        role='menu'
        aria-labelledby={ this.buttonLabelId }
        data-element='additional-buttons'
      >
        { children }
      </StyledSplitButtonChildrenContainer>
    );
  }

  componentWillUnmount() {
    document.removeEventListener(this.userInputType, this.handleClickOutside);
  }

  render() {
    return (
      <StyledSplitButton
        aria-haspopup='true'
        onMouseLeave={ this.hideButtons }
        ref={ this.splitButtonNode }
        { ...this.componentTags() }
      >
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </StyledSplitButton>
    );
  }
}

SplitButton.propTypes = {
  /** Button type: "primary" | "secondary" */
  buttonType: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** Button type: "primary" | "secondary" for legacy theme */
  as: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** The additional button to display. */
  children: PropTypes.node.isRequired,
  /** A custom value for the data-element attribute */
  'data-element': PropTypes.string,
  /** A custom value for the data-role attribute */
  'data-role': PropTypes.string,
  /** Gives the button a disabled state. */
  disabled: PropTypes.bool,
  /** The size of the buttons in the SplitButton. */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The text to be displayed in the SplitButton. */
  text: PropTypes.string.isRequired
};

SplitButton.defaultProps = {
  as: 'secondary',
  disabled: false,
  size: 'medium'
};

SplitButton.safeProps = ['buttonType', 'as', 'disabled', 'size'];

export default SplitButton;
