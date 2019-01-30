/* eslint-disable new-parens */
import React from 'react';
import { Select, Option } from '__experimental__/components/select';

class Sandbox extends React.Component {
  // state = {
  //   val: [{
  //     label: 'Green Tower',
  //     value: '1'
  //   }, {
  //     label: 'Green Turtle',
  //     value: '2'
  //   }]
  // }

  state = {
    val: undefined
  }

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
        <Option text='Green Tower' />
        <Option text='Green Turtle' />
        <Option text='Big Green' />
      </Select>
    );

    <Select async={ () => {} } />
  }
}

export default Sandbox;
