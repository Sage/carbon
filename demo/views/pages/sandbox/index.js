/* eslint-disable new-parens */
import React from 'react';
import Select from '__experimental__/components/select';

class Sandbox extends React.Component {
  state = {
    val: [

    ]
  }

  // state = {
  //   val: { value: '1', label: 'Purple' }
  // }

  render() {
    return (
      <Select
        labelInline
        onChange={ ev => this.setState({ val: ev.target.value }) }
        value={ this.state.val }
        label='Foo'
        // eslint-disable-next-line no-undef
        validations={ [new PresenceValidation] }
      >
        <div>option 1</div>
        <div>option 2</div>
      </Select>
    );
  }
}

export default Sandbox;
