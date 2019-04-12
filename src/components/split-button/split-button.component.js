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
     * The busineess theme passed to the component from the theme provider
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
    this.splitButtons = [];
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

  activeIndex(node) {
    return node === document.activeElement;
  }

  scrollToNextButton(index) {
    this.additionalButtons[index].focus();
  }

  handleUpPress(index, length) {
    const decrementedIndex = index > 0 ? index - 1 : length - 1;

    this.scrollToNextButton(decrementedIndex);
  }

  handleDownPress(index, length) {
    const incrementedIndex = index < length - 1 ? index + 1 : 0;

    this.scrollToNextButton(incrementedIndex);
  }

  handleKeyDown = (ev) => {
    const { children } = this.props;
    if (Events.isUpKey(ev)) {
      ev.preventDefault();
      this.splitButtons.forEach(btn => btn.blur());
      this.handleUpPress(this.additionalButtons.findIndex(this.activeIndex), children.length);
    } else if (Events.isDownKey(ev)) {
      ev.preventDefault();
      this.splitButtons.forEach(btn => btn.blur());
      this.handleDownPress(this.additionalButtons.findIndex(this.activeIndex), children.length);
    }
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
      ref: this.toggle,
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

  addRef(identifier, ref, index) {
    if (this[identifier][index] !== ref) this[identifier][index] = ref;
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
          ref={ main => this.addRef('splitButtons', main, 0) }
        >
          { this.props.text}
        </Button>

        <StyledToggleButton
          { ...this.toggleButtonProps }
          data-element='open'
          ref={ toggle => this.addRef('splitButtons', toggle, 1) }
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
        ref: button => this.addRef('additionalButtons', button, index),
        tabIndex: -1
      };
      if (theme && theme.name === 'classic') props.size = 'medium';

      return React.cloneElement(child, props);
    });
  }

  /**
   * Returns the HTML for the additional buttons.
   */
  get renderAdditionalButtons() {
    if (!this.state.showAdditionalButtons) return null;
    return (
      <StyledSplitButtonChildrenContainer
        displayButtons={ this.state.showAdditionalButtons }
        data-element='additional-buttons'
      >
        { this.childrenWithProps() }
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
