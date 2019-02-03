import React from 'react';
import { Select, Option } from '__experimental__/components/select'; 

const people = [
  { value: '1', text: 'Brian' },
  { value: '2', text: 'Emma' },
  { value: '3', text: 'Fred' },
  { value: '4', text: 'Martha' },
  { value: '5', text: 'Peter' },
  { value: '6', text: 'Samantha' },
  { value: '7', text: 'Steven' },
  { value: '8', text: 'Victoria' },
  { value: '9', text: 'William' },
  { value: '10', text: 'Yann' }
]

class Sandbox extends React.Component {
  state = {
    people: [{
      value: '1',
      text: 'Brian'
    }, {
      value: '6',
      text: 'Samantha'
    }],

    country: {
      value: '2',
      text: 'Ireland'
    }
  }

  render() {
    return(
      <div style={ { width: '800px', margin: '0 auto' } }>
        <Select
          label='Choose People'
          value={ this.state.people }
          onChange={ ev => this.setState({ people: ev.target.value }) }
          labelAlign='right'
          labelInline
        >
          { people.filter(person => !this.state.people.find(item => item.value === person.value)).map(person => <Option { ...person } />) }
        </Select>

        <Select
          label='Choose Country'
          value={ this.state.country }
          onChange={ ev => this.setState({ country: ev.target.value }) }
          labelAlign='right'
          labelInline
        >
          <Option text='England' value='1' />
          <Option text='Ireland' value='2' />
          <Option text='Scotland' value='3' />
          <Option text='Wales' value='4' />
        </Select>
      </div>
    )
  }
};

export default Sandbox;
