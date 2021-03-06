import React, { Component } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Icon from "../icon";
import Button, { ButtonWithForwardRef } from "../button";
import StyledSplitButton from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import Events from "../../utils/helpers/events";
import guid from "../../utils/helpers/guid";
import Popover from "../../__internal__/popover";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const CONTENT_WIDTH_RATIO = 0.75;

class SplitButton extends Component {
  constructor(props) {
    super(props);
    this.buttonLabelId = guid();
    this.additionalButtons = [];
    this.listening = false;
    this.isToggleButtonFocused = false;
    this.userInputType =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";

    this.splitButtonNode = React.createRef();
    this.buttonContainer = React.createRef();
  }

  state = {
    showAdditionalButtons: false,
    minWidth: 0,
  };

  focusToggleButton = () => {
    this.isToggleButtonFocused = true;
    this.showButtons();
  };

  showButtons = () => {
    document.addEventListener(this.userInputType, this.handleClickOutside);
    this.setState({
      showAdditionalButtons: true,
      minWidth:
        CONTENT_WIDTH_RATIO *
        this.splitButtonNode.current.getBoundingClientRect().width,
    });

    if (!this.listening) {
      document.addEventListener("keydown", this.handleKeyDown);
      this.listening = true;
    }
  };

  hideButtons = () => {
    if (this.isToggleButtonFocused) return;

    this.setState({ showAdditionalButtons: false });
    document.removeEventListener(this.userInputType, this.handleClickOutside);

    if (this.listening) {
      document.removeEventListener("keydown", this.handleKeyDown);
      this.listening = false;
    }
  };

  handleClickOutside = ({ target }) => {
    if (
      !this.splitButtonNode.current.contains(target) &&
      this.buttonContainer.current &&
      !this.buttonContainer.current.contains(target)
    ) {
      this.hideButtons();
    }
  };

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
    }
    if (Events.isDownKey(ev)) {
      nextIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
      ev.preventDefault();
    } else if (Events.isTabKey(ev)) {
      // timeout enforces thet the "hideButtons" method will be run after browser focuses on the next element
      setTimeout(this.hideButtons, 0);
    }

    if (nextIndex > -1) {
      this.additionalButtons[nextIndex].focus();
    }
  };

  get mainButtonProps() {
    const {
      as,
      buttonType,
      disabled,
      iconType,
      onClick,
      size,
      subtext,
    } = this.props;

    return {
      onMouseEnter: this.hideButtons,
      onFocus: this.hideButtons,
      onTouchStart: this.hideButtons,
      iconPosition: this.props.iconPosition,
      as,
      buttonType,
      disabled,
      iconType,
      onClick,
      size,
      subtext,
    };
  }

  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      displayed: this.state.showAdditionalButtons,
      onTouchStart: this.showButtons,
      onFocus: this.focusToggleButton,
      onBlur: () => {
        this.isToggleButtonFocused = false;
      },
      onKeyDown: this.handleToggleButtonKeyDown,
      buttonType: this.props.buttonType || this.props.as,
      size: this.props.size,
    };

    if (!this.props.disabled) {
      opts.onMouseEnter = this.showButtons;
    }

    return opts;
  }

  componentTags = () => {
    return {
      "data-component": "split-button",
      "data-element": this.props["data-element"],
      "data-role": this.props["data-role"],
    };
  };

  addRef(ref, index) {
    if (!ref) return;
    this.additionalButtons[index] = ref;
  }

  getIconColor(buttonType) {
    const colorsMap = {
      primary: "on-dark-background",
      secondary: "business-color",
    };
    return colorsMap[buttonType];
  }

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    return [
      <Button
        data-element="main-button"
        key="main-button"
        id={this.buttonLabelId}
        {...this.mainButtonProps}
      >
        {this.props.text}
      </Button>,
      <StyledSplitButtonToggle
        aria-haspopup="true"
        aria-expanded={this.state.showAdditionalButtons}
        aria-label="Show more"
        data-element="toggle-button"
        key="toggle-button"
        {...this.toggleButtonProps}
      >
        <Icon
          type="dropdown"
          bgTheme="none"
          iconColor={this.getIconColor(this.toggleButtonProps.buttonType)}
          disabled={this.toggleButtonProps.disabled}
        />
      </StyledSplitButtonToggle>,
    ];
  }

  handleToggleButtonKeyDown = (ev) => {
    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      this.additionalButtons[0].focus();
    }
  };

  childrenWithProps() {
    const { children } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.filter(Boolean).map((child, index) => {
      const props = {
        key: index.toString(),
        role: "menuitem",
        ref: (button) => this.addRef(button, index),
        tabIndex: -1,
      };
      if (child.type === Button) {
        return <ButtonWithForwardRef {...child.props} {...props} />;
      }

      return React.cloneElement(child, props);
    });
  }

  get renderAdditionalButtons() {
    const children = this.childrenWithProps();

    if (!this.state.showAdditionalButtons) return null;

    return (
      <Popover placement="bottom-end" reference={this.splitButtonNode}>
        <StyledSplitButtonChildrenContainer
          role="menu"
          aria-label={this.props.text}
          data-element="additional-buttons"
          align={this.props.align}
          minWidth={this.state.minWidth}
          ref={this.buttonContainer}
        >
          {children}
        </StyledSplitButtonChildrenContainer>
      </Popover>
    );
  }

  componentWillUnmount() {
    document.removeEventListener(this.userInputType, this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <StyledSplitButton
        aria-haspopup="true"
        onMouseLeave={this.hideButtons}
        ref={this.splitButtonNode}
        {...this.componentTags()}
        {...filterStyledSystemMarginProps(this.props)}
      >
        {this.renderMainButton}
        {this.renderAdditionalButtons}
      </StyledSplitButton>
    );
  }
}

SplitButton.propTypes = {
  ...marginPropTypes,
  /** Button type: "primary" | "secondary" */
  buttonType: PropTypes.oneOf(["primary", "secondary"]),
  /** Button type: "primary" | "secondary" for legacy theme */
  as: PropTypes.oneOf(["primary", "secondary"]),
  /** The additional button to display. */
  children: PropTypes.node.isRequired,
  /** A custom value for the data-element attribute */
  "data-element": PropTypes.string,
  /** A custom value for the data-role attribute */
  "data-role": PropTypes.string,
  /** Gives the button a disabled state. */
  disabled: PropTypes.bool,
  /** The size of the buttons in the SplitButton. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** The text to be displayed in the SplitButton. */
  text: PropTypes.string.isRequired,
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition: PropTypes.oneOf(["before", "after"]),
  /** Set align of the rendered content */
  align: PropTypes.oneOf(["left", "right"]),
};

SplitButton.defaultProps = {
  as: "secondary",
  disabled: false,
  size: "medium",
  iconPosition: "before",
  align: "left",
};

SplitButton.safeProps = ["buttonType", "as", "disabled", "size"];

export default SplitButton;
