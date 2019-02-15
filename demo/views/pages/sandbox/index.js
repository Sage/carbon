import React from 'react';
import { Option, SelectAsync } from '__experimental__/components/select-async';

class Sandbox extends React.Component {
  state = {
    val: []
  }

  render() {
    return (
      <SelectAsync
        endpoint='/countries'
        value={ this.state.val }
        onChange={ ev => this.setState({ val: ev.target.value }) }
      />
    );
  }
}

export default Sandbox;
