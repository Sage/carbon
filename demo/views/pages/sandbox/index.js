import React from 'react';
import Select from '__experimental__/components/select';

class Sandbox extends React.Component {
  // state = {
  //   val: [
  //     { value: '1', label: 'Purple' },
  //     { value: '2', label: 'Orange' },
  //     { value: '3', label: 'Green' }
  //   ]
  // }

  state = {
    val: { value: '1', label: 'Purple' }
  }

  render() {
    return(
      <Select
        onChange={ ev => this.setState({ val: ev.target.value }) }
        value={ this.state.val }
        label='Foo'
        validations={ [new PresenceValidation] }
      >
        <div>option 1</div>
        <div>option 2</div>
      </Select>
    )
  }
};

export default Sandbox;
