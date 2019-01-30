/* eslint-disable new-parens */
import React from 'react';
import { Select, Option } from '__experimental__/components/select';
import Input from '__experimental__/components/input';

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
    val: { label: 'hello', value: '2' }
  }

  render() {
    return (
      <div>
        <Input />
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
      </div>
    );

    <Select async={ () => {} } />
  }
}

export default Sandbox;
