import React from 'react';
import PropTypes from 'prop-types';
import InputPresentationStyle from './input-presentation.style';
import extractProps from '../../../utils/helpers/extract-props';
import Logger from '../../../utils/logger/logger';

const InputPresentationContext = React.createContext();

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on fieldProps being
// fed into this component from the decorated parent component and a div
// wrapping the carbon-input-presentation that handles the fieldProps if you want
// to use the full supported feature set of a Carbon component. Over time we
// will add additional supported on the decorated features without the need
// for the decorators themselves.

let deprecatedWarnTriggered = false;

class InputPresentation extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    /** Allows to override existing component styles */
    styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }

  state = {
    hasFocus: false,
    hasMouseOver: false
  }

  input = {}

  container = React.createRef()

  onFocus = () => this.setState({ hasFocus: true })

  onBlur = () => this.setState({ hasFocus: false })

  assignInput = (input) => { this.input = input; }

  contextForInput() {
    return {
      hasFocus: this.state.hasFocus,
      hasMouseOver: this.state.hasMouseOver,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      inputRef: this.assignInput
    };
  }

  // use mouse down rather than click to accomodate click and drag events too
  handleMouseDown = () => {
    // use a zero timeout to ensure focus is applied even on click and drag events
    setTimeout(() => this.input.current.focus());
  }

  handleMouseEnter = () => this.setState({ hasMouseOver: true });

  handleMouseLeave = () => this.setState({ hasMouseOver: false });

  render() {
    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      // eslint-disable-next-line max-len
      Logger.deprecate('`styleOverride` that is used in the `InputPresentation` component is deprecated and will soon be removed.');
    }
    const { children, styleOverride, ...props } = this.props;
    const styleProps = extractProps(props, InputPresentationStyle);

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <InputPresentationStyle
        hasFocus={ this.state.hasFocus }
        role='presentation'
        ref={ this.container }
        onMouseDown={ this.handleMouseDown }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        styleOverride={ styleOverride }
        { ...styleProps }
      >
        <InputPresentationContext.Provider value={ this.contextForInput() }>
          { children }
        </InputPresentationContext.Provider>
      </InputPresentationStyle>
    );
  }
}

export { InputPresentationContext, InputPresentation };
