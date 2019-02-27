import React from 'react';
import PropTypes from 'prop-types';
import guid from 'utils/helpers/guid';
import FormFieldStyle from './form-field.style';

const FormFieldContext = React.createContext();

class FormField extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    hasFocus: false,
    isHovered: false
  }

  input = {}

  container = React.createRef()

  onMouseEnter = () => this.setState({ isHovered: true });

  onMouseLeave = () => this.setState({ isHovered: false });

  onFocus = () => this.setState({ hasFocus: true })

  onBlur = () => this.setState({ hasFocus: false })

  assignInput = (input) => { this.input = input; }

  contextForInput() {
    return {
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      inputRef: this.assignInput,
      inputId: guid()
    };
  }

  // use mouse down rather than click to accomodate click and drag events too
  handleMouseDown = () => {
    // use a zero timeout to ensure focus is applied even on click and drag events
    setTimeout(() => this.input.current.focus());
  }

  render() {
    const { children } = this.props;

    return (
      <FormFieldStyle
        hasFocus={ this.state.hasFocus }
        role='presentation'
        ref={ this.container }
        onMouseDown={ this.handleMouseDown }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
      >
        <FormFieldContext.Provider value={ this.contextForInput() }>
          { children }
        </FormFieldContext.Provider>
      </FormFieldStyle>
    );
  }
}

export { FormFieldContext, FormField };
