import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import Button from '../button';
import StyledSplitButtonContainer, { StyledToggleButton } from './split-button.style';
import StyledSplitButtonChildrenContainer from './split-button-children.style';
import { validProps } from '../../utils/ether/ether';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';

class SplitButton extends React.Component {
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
     * Custom className
     */
    className: PropTypes.string,

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
    text: PropTypes.string.isRequired
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
  }

  state = {
    /**
     * Tracks whether the additional buttons should be visible.
     */
    showAdditionalButtons: false,
    selectedIndex: -1, // defaults to nothing being highlighted
    isClassic: null
  }

  /**
   * Shows the additional buttons.
   */
  showButtons = () => {
    this.setState({ showAdditionalButtons: true });
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Hides additional buttons.
   */
  hideButtons = () => {
    this.setState({ showAdditionalButtons: false, selectedIndex: -1 });
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  navigateButton() {
    const { selectedIndex } = this.state;
    this.additionalButtons[selectedIndex].focus();
  }

  handleUpPress(index, length) {
    if (index > 0) {
      this.setState(prevState => ({ selectedIndex: prevState.selectedIndex - 1 }));
    } else {
      this.setState({ selectedIndex: length - 1 });
    }
    this.navigateButton();
  }

  handleDownPress(index, length) {
    if (index < length - 1) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex + 1
      }));
    } else {
      this.setState({ selectedIndex: 0 });
    }
    this.navigateButton();
  }

  handleKeyDown = (ev) => {
    const { selectedIndex } = this.state;
    const { children } = this.props;
    if (Events.isUpKey(ev)) {
      ev.preventDefault();
      this.splitButtons.forEach(btn => btn.blur());
      this.handleUpPress(selectedIndex, children.length);
    } else if (Events.isDownKey(ev)) {
      this.splitButtons[1].blur();
      ev.preventDefault();
      this.splitButtons.forEach(btn => btn.blur());
      this.handleDownPress(selectedIndex, children.length);
    }
  }

  /**
   * Returns props for the main button.
   */
  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.onFocus = this.showButtons;
    return props;
  }

  /**
   * Returns props for the toggle.
   */
  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      displayed: this.state.showAdditionalButtons,
      // onBlur: this.hideButtons,
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
    this[identifier][index] = ref;
  }

  handleTheme = (theme) => {
    console.log(this.state.isClassic);
    if (this.state.isClassic) return null;
    // this.setState({ isClassic: theme.NAME === 'classic' });

    return null;
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
          checkTheme={ this.handleTheme }
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

  addButtonRef(index) {
    this.additionalButtons[index] = React.createRef();
  }

  addChildProps() {
    const { children } = this.props;
    let childArray = children;
    if (!Array.isArray(children)) childArray = [children];

    return childArray.map((child, index) => {
      return React.cloneElement(child,
        {
          key: index.toString(),
          ref: button => this.addRef('additionalButtons', button, index)
        });
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
        { this.addChildProps() }
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

export default SplitButton;
