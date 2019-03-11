import React from 'react';
import { Option, SelectAsync } from '__experimental__/components/select-async';
import { transform } from 'babel-standalone';
import Button from '__experimental__/components/button';
import './sandbox.scss';

class Preview extends React.Component {
  state = {
    error: false
  }

  compile = () => {
    let code = this.props.code;

    if (code.length === 0) {
      code = '<div />';
    }

    try {
      const compiledCode = eval(transform(code, { presets: ['es2015', 'react'] }).code);
      this._lastWorkingExample = code;
      if (this.state.error) setTimeout(() => { this.setState({ error: false }); });
      return compiledCode;
    } catch (err) {
      setTimeout(() => { this.setState({ error: err.message }); });
      return eval(transform(this._lastWorkingExample, { presets: ['es2015', 'react'] }).code);
    }
  }

  render() {
    return (
      <div className='sandbox-preview'>
        { this.compile() }
        { this.state.error && (
          <div className='sandbox-error'>
            <strong>Render failed:</strong> there is a syntax error!<br />
            { this.state.error }
          </div>
        ) }
      </div>
    );
  }
}

class Sandbox extends React.Component {
  state = {
    val: [],
    code: ''
  }

  updateCode = (ev) => {
    this.setState({ code: ev.target.value });
  }

  catchTab = (ev) => {
    if (ev.keyCode === 9) {
      ev.preventDefault();
      const input = ev.target;
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      const newValue = `${input.value.substring(0, startPos)
      }  ${
        input.value.substring(endPos, input.value.length)}`;

      this.setState({ code: newValue }, () => {
        const newPos = startPos + 2;
        input.setSelectionRange(newPos, newPos);
      });
    }
  }

  render() {
    return (
      <div className={ `sandbox sandbox-orientation-${this.state.orientation ? 'horizontal' : 'vertical'}` }>

        <Button />
      </div>
    );
  }
}

export default Sandbox;
