import React from 'react';
import classNames from 'classnames';
import './input-box.style.scss';

const InputBoxContext = React.createContext();

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on fieldProps being
// fed into this component from the decorated parent component and a div
// wrapping the carbon-input-box that handles the fieldProps.

class InputBox extends React.Component {
  state = {
    hasFocus: false
  }

  onFocus = () => this.setState({ hasFocus: true })
  onBlur = () => this.setState({ hasFocus: false })

  contextForInput() {
    return {
      hasFocus: this.state.hasFocus,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }
  }

  classNames() {
    return classNames('carbon-input-box', {
      'carbon-input-box--has-focus': this.state.hasFocus
    })
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div { ...props }>
        <div className={ this.classNames() }>
          <InputBoxContext.Provider value={ this.contextForInput() }>
            { children }
          </InputBoxContext.Provider>
        </div>
      </div>
    );
  }
};

export { InputBoxContext, InputBox };
