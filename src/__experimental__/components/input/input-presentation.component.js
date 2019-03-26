import React from 'react';
import PropTypes from 'prop-types';
import { filterOutInputEvents } from '../../../utils/ether/ether';
import InputPresentationStyle from './input-presentation.style';

const InputPresentationContext = React.createContext();

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on fieldProps being
// fed into this component from the decorated parent component and a div
// wrapping the carbon-input-presentation that handles the fieldProps if you want
// to use the full supported feature set of a Carbon component. Over time we
// will add additional supported on the decorated features without the need
// for the decorators themselves.

class InputPresentation extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    hasFocus: false
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

  handleMouseOver = () => {
    this.setState({ hasMouseOver: true });
  }

  handleMouseOut = () => {
    this.setState({ hasMouseOver: false });
  }

  render() {
    const { children, ...props } = this.props;
    const filteredProps = filterOutInputEvents(props);

    return (
      <InputPresentationStyle
        hasFocus={ this.state.hasFocus }
        role='presentation'
        ref={ this.container }
        onMouseDown={ this.handleMouseDown }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        { ...filteredProps }
      >
        <InputPresentationContext.Provider value={ this.contextForInput() }>
          { children }
        </InputPresentationContext.Provider>
      </InputPresentationStyle>
    );
  }
}

export { InputPresentationContext, InputPresentation };
