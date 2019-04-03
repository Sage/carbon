import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import Button from '../button';
import StyledSplitButtonContainer,
{ StyledToggleButton, StyledSplitButtonChildrenContainer } from './split-button.style';
import { validProps } from '../../utils/ether/ether';
import OptionsHelper from '../../utils/helpers/options-helper';

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

  static safeProps = ['disabled', 'as']

  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
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
  }

  /**
   * Hides additional buttons.
   */
  hideButtons = () => {
    this.setState({ showAdditionalButtons: false });
  }

  /**
   * Returns props for the main button.
   */
  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    return props;
  }

  /**
   * Returns props for the toggle.
   */
  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      renderAs: this.props.as,
      onClick: (ev) => { ev.preventDefault(); },
      displayed: this.state.showAdditionalButtons,
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

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    const {
      as,
      ...rest
    } = this.mainButtonProps;
    return (
      <div>
        <Button
          renderAs={ as }
          { ...rest }
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

  /**
   * Returns the HTML for the additional buttons.
   */
  get renderAdditionalButtons() {
    return (
      <StyledSplitButtonChildrenContainer
        displayButtons={ this.state.showAdditionalButtons }
        data-element='additional-buttons'
      >
        { this.props.children.map((child) => {
          return React.cloneElement(child, { className: 'horribleHack' });
        }) }
      </StyledSplitButtonChildrenContainer>
    );
  }

  render() {
    return (
      <StyledSplitButtonContainer
        className={ this.mainClasses } onMouseLeave={ this.hideButtons }
        { ...this.componentTags() }
      >
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </StyledSplitButtonContainer>
    );
  }
}

export default SplitButton;
