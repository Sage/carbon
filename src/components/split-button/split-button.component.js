import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Icon from '../icon/icon';
import Button from '../button';
import StyledSplitButtonContainer, { StyledToggleButton } from './split-button.style';
import StyledSplitButtonChildrenContainer from './split-button-children.style';
import { validProps } from '../../utils/ether/ether';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';
import { THEMES } from '../../style/themes';

export class SplitButton extends React.Component {
  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary' or 'secondary'.
     */
    as: PropTypes.string,

    /**
     * A custom value for the data-element attribute
     */
    'data-element': PropTypes.string,

    /**
     * A custom value for the data-element attribute
     */
    'data-role': PropTypes.string,

    /**
     * The additional button to display.
     */
    children: PropTypes.node.isRequired,

    /**
     * Gives the button a disabled state.
     */
    disabled: PropTypes.bool,

    // keyNavigation: PropTypes.bool,

    /**
     * The size of the buttons in the SplitButton.
     */
    size: PropTypes.oneOf(OptionsHelper.sizesRestricted),

    /**
     * The text to be displayed in the SplitButton.
     */
    text: PropTypes.string.isRequired,

    /**
     * The business theme passed to the component from the theme provider
     */
    theme: PropTypes.object
  }

  static defaultProps = {
    as: 'secondary',
    disabled: false,
    size: 'medium'
  }

  static safeProps = ['as', 'disabled', 'size']

  constructor(props) {
    super(props);
    this.componentTags = this.componentTags.bind(this);
    this.additionalButtons = [];
    this.listening = false;
  }

  state = {
    /**
     * Tracks whether the additional buttons should be visible.
     */
    showAdditionalButtons: false
  }

  /**
   * Shows the additional buttons.
   */
  showButtons = () => {
    this.setState({ showAdditionalButtons: true });
    if (!this.listening) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.listening = true;
    }
  }

  /**
   * Hides additional buttons.
   */
  hideButtons = () => {
    this.setState({ showAdditionalButtons: false });
    if (this.listening) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.listening = false;
    }
  }

  activeElementIndex(node) {
    return node === document.activeElement;
  }

  handleKeyDown = (ev) => {
    const { children } = this.props;
    const currentIndex = this.additionalButtons.findIndex(this.activeElementIndex);
    let nextIndex = -1;

    if (Events.isUpKey(ev)) {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
      ev.preventDefault();
    } else if (Events.isDownKey(ev)) {
      nextIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
      ev.preventDefault();
    }
    this.additionalButtons[nextIndex].focus();
  }

  /**
   * Returns props for the main button.
   */
  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.onFocus = this.hideButtons;
    return props;
  }

  /**
   * Returns props for the toggle.
   */
  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      displayed: this.state.showAdditionalButtons,
      onClick: (ev) => { ev.preventDefault(); },
      onFocus: this.showButtons,
      renderAs: this.props.as,
      size: this.props.size
    };

    if (!this.props.disabled) {
      opts.onMouseEnter = this.showButtons;
    }

    return opts;
  }

  /**
   * Returns the data tags for the component.
   */
  componentTags() {
    return {
      'data-component': 'split-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }

  addRef(ref, index) {
    if (!ref) return;
    if (this.additionalButtons[index] !== ref) this.additionalButtons[index] = ref;
  }

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    return (
      <div>
        <Button
          { ...this.mainButtonProps }
          data-element='main-button'
        >
          { this.props.text}
        </Button>

        <StyledToggleButton
          { ...this.toggleButtonProps }
          data-element='open'
        >
          <Icon type='dropdown' />
        </StyledToggleButton>
      </div>
    );
  }

  childrenWithProps() {
    const { children, theme } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.map((child, index) => {
      const props = {
        key: index.toString(),
        ref: button => this.addRef(button, index),
        tabIndex: -1
      };
      if (theme && theme.name === THEMES.classic) props.size = 'medium';

      return React.cloneElement(child, props);
    });
  }

  /**
   * Returns the HTML for the additional buttons.
   */
  get renderAdditionalButtons() {
    const children = this.childrenWithProps();
    if (!this.state.showAdditionalButtons) return null;
    return (
      <StyledSplitButtonChildrenContainer
        displayButtons={ this.state.showAdditionalButtons }
        data-element='additional-buttons'
      >
        { children }
      </StyledSplitButtonChildrenContainer>
    );
  }

  render() {
    return (
      <StyledSplitButtonContainer
        onMouseLeave={ this.hideButtons }
        { ...this.componentTags() }
      >
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </StyledSplitButtonContainer>
    );
  }
}
export default withTheme(SplitButton);
