import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import SplitButton from '../split-button';
import StyledMultiActionButton from './multi-action-button.style';
import Button from '../button';

class MultiActionButton extends SplitButton {
  /**
   * Returns the props for the main button.
   */
  get multiActionButtonProps() {
    const { iconType, iconPosition, ...props } = this.props;

    props['aria-haspopup'] = 'true';
    props['aria-expanded'] = this.state.showAdditionalButtons;
    props['aria-label'] = 'Show more';
    props['data-element'] = 'toggle-button';
    props.key = 'toggle-button';
    props.onKeyDown = this.handleToggleButtonKeyDown;

    return props;
  }

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    return (
      <Button
        { ...this.multiActionButtonProps }
        { ...this.toggleButtonProps }
      >
        { this.props.text}
        <Icon
          type='dropdown'
          bgTheme='none'
          iconColor={ this.getIconColor(this.props.buttonType) }
          disabled={ this.toggleButtonProps.disabled }
        />
      </Button>
    );
  }

  componentTags = () => {
    return {
      'data-component': 'multi-action-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }

  render() {
    return (
      <StyledMultiActionButton
        buttonType={ this.props.buttonType || this.props.as }
        displayed={ this.state.showAdditionalButtons }
        align={ this.props.align }
      >
        { super.render() }
      </StyledMultiActionButton>
    );
  }
}

MultiActionButton.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
   */
  as: PropTypes.string,

  /**
   * The text to be displayed in the SplitButton.
   */
  text: PropTypes.string.isRequired,

  /**
   * Gives the button a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * A custom value for the data-element attribute
   */
  'data-element': PropTypes.string,

  /**
   * A custom value for the data-element attribute
   */
  'data-role': PropTypes.string,

  /**
   * Aligns the button's options, can be set to `right`.
   */
  align: PropTypes.string
};

export default MultiActionButton;
