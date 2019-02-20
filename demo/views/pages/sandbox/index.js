import React from 'react';
import { transform } from 'babel-standalone';
import './sandbox.scss';
// import Form from '../../../../src/components/form';
import Textbox from '../../../../src/__experimental__/components/textbox';

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
  render() {
    return (
      <Textbox
        info={ [new PresenceValidation()] }
      />
    );
  }
}

export default Sandbox;
