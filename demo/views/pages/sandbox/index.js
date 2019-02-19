import React from 'react';
import { Option, SelectAsync } from '__experimental__/components/select-async';

class Sandbox extends React.Component {
  state = {
    val: []
  }

  render() {
    return (
      <div style={ { width: '300px', margin: '50px auto' } }>
        <SelectAsync
          label='Choose Item'
          endpoint='/countries'
          value={ this.state.val }
          onChange={ ev => this.setState({ val: ev.target.value }) }
        />
      </div>
    );
  }
}

export default Sandbox;
